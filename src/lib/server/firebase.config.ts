import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId } from '$env/static/private';

const firebaseConfig = { apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId };

export const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
