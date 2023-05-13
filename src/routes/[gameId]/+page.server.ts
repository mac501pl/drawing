import { redirect } from '@sveltejs/kit';
import { arrayUnion, collection, doc, documentId, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore';
import mergeImages from 'merge-images';
import { Canvas, Image } from 'canvas';
import { db } from '../../lib/server/firebase.config.js';
import type { Game, Player } from '../../lib/model/api.js';

export async function load({ params, cookies }) {
  const playerId = cookies.get('player-id');

  if (!playerId) {
    throw redirect(303, `newPlayer?gameId=${params.gameId}`);
  }

  const playerSnapshot = doc(db, 'players', playerId);
  const gameSnapshot = doc(db, 'games', params.gameId);
  const [gameRef, playerRef] = await Promise.all([getDoc(gameSnapshot), getDoc(playerSnapshot)]);

  const game = gameRef.data() as Game;
  const player = playerRef.data() as Player;

  if (game.players.includes(playerId)) {
    return { game, player, canPlay: false, message: 'Już rysowałeś w tej grze!' };
  }

  if (game.locked) {
    return { game, player, canPlay: false, message: 'Ktoś inny już rysuje!' };
  }

  const gameFinished = game.finished ?? game.numberOfPlayers === game.stages?.length;
  if (gameFinished) {
    const imageUrl = await mergeImages(
      game.stages.map((stage, i) => ({ src: stage, x: 0, y: i * 300 })),
      { Canvas, Image, height: game.numberOfPlayers * 300 }
    );
    await updateDoc(gameSnapshot, { finished: true, finalImage: imageUrl, locked: true });
    const finishedGame = (await getDoc(gameSnapshot)).data() as Game;
    const playersReference = collection(db, 'players');
    const playersQuery = query(playersReference, where(documentId(), 'in', game.players));
    const players = (await getDocs(playersQuery)).docs.map((doc) => doc.data()) as Player[];
    return { gameSummary: { gameData: finishedGame, playerData: players } };
  }

  await updateDoc(gameSnapshot, { locked: true });

  return { game, player, canPlay: true };
}

export const actions = {
  finish: async ({ request, cookies }) => {
    const playerId = cookies.get('player-id');
    const { dataUrl } = Object.fromEntries(await request.formData()) as { dataUrl: string };
    const gameSnapshot = doc(db, 'games', new URL(request.url).pathname.substring(1));
    await updateDoc(gameSnapshot, { stages: arrayUnion(dataUrl), locked: false, players: arrayUnion(playerId) });

    return { success: true };
  },
};
