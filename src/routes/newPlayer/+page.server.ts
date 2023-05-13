import { addDoc, collection } from 'firebase/firestore';
import { db } from '$lib/server/firebase.config';
import { error, redirect } from '@sveltejs/kit';

export const actions = {
  default: async ({ request, cookies }) => {
    const gameId = new URL(request.url).searchParams.get('gameId');
    if (!gameId) {
      throw error(400, 'Coś poszło nie tak :(');
    }

    const { name: playerName } = Object.fromEntries(await request.formData()) as { name: string };

    const player = await addDoc(collection(db, 'players'), { name: playerName });

    cookies.set('player-id', player.id);
    throw redirect(303, gameId);
  },
};
