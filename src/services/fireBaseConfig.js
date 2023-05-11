// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
	apiKey: 'AIzaSyCfDgKM80PKqBI85joVrybZNSeaSdPH9EQ',
	authDomain: 'github-search-a5e8e.firebaseapp.com',
	projectId: 'github-search-a5e8e',
	storageBucket: 'github-search-a5e8e.appspot.com',
	messagingSenderId: '974859182326',
	appId: '1:974859182326:web:1a73e122bb7f464ab2ccd7',
	measurementId: 'G-05HM9S2NT8',
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
// services
export const auth = getAuth();
export const firestore = getFirestore(app);
export const storage = getStorage(app);
