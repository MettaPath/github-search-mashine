import { useLayoutEffect } from 'react';
import { useDispatch } from 'react-redux';
import { onSnapshot, doc } from 'firebase/firestore';

import { fetchFavoriteNotes } from '../store/github/github.fav.notes';
import { auth, firestore } from '../services/fireBaseConfig';
import { fetchFavorites } from '../store/github/github.slice';

export const useFirestoreSubscriptions = () => {
	const dispatch = useDispatch<any>();

	useLayoutEffect(() => {
		const uid = auth.currentUser?.uid;
		if (uid) {
			const favoriteNotesRef = doc(firestore, 'favoriteNotes', uid);
			const favoritesRef = doc(firestore, 'favorites', uid);

			const unsubscribeNotes = onSnapshot(favoriteNotesRef, (doc) => {
				if (doc.exists()) {
					dispatch(fetchFavoriteNotes());
				}
			});

			const unsubscribeFav = onSnapshot(favoritesRef, (doc) => {
				if (doc.exists()) {
					dispatch(fetchFavorites());
				}
			});

			return () => {
				unsubscribeNotes();
				unsubscribeFav();
			};
		}
	}, [dispatch]);

	return null;
};
