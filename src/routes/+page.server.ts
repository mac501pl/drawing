import { redirect } from '@sveltejs/kit';
import { addDoc, collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/server/firebase.config';
import type { Player } from '$lib/model/api';

export async function load({ cookies }) {
  const playerId = cookies.get('player-id');
  if (!playerId) {
    return { alreadyAPlayer: false };
  }

  const playerSnapshot = doc(db, 'players', playerId);
  const player = await getDoc(playerSnapshot);

  if (player.exists()) {
    return { alreadyAPlayer: true, playerData: player.data() as Player };
  }

  return; // TODO
}

export const actions = {
  default: async ({ request, cookies }) => {
    const { name: playerName, numberOfPlayers } = Object.fromEntries(await request.formData()) as { name: string; numberOfPlayers: string };

    const player = await addDoc(collection(db, 'players'), { name: playerName });
    const game = await addDoc(collection(db, 'games'), { players: [], stages: [], numberOfPlayers: Number(numberOfPlayers), locked: false });

    cookies.set('player-id', player.id);
    throw redirect(303, game.id);
  },
};
