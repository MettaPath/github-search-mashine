import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCredential } from 'firebase/auth';
import { firestore } from '../../services/fireBaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const LS_AUTH_FLAG = 'auth_flag';
const LS_USER_DATA = 'user_data';

interface AuthState {
	isAuthenticated: boolean;
	user: {
		email?: string | null;
		displayName?: string | null;
		emailVerified?: boolean | null;
		photoURL?: string | null;
		phoneNumber?: string | null;
	};
}

const initialState: AuthState = {
	isAuthenticated: JSON.parse(localStorage.getItem(LS_AUTH_FLAG) ?? 'false'),
	user: JSON.parse(localStorage.getItem(LS_USER_DATA) ?? '[]'),
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		loginSuccess(state, action: PayloadAction<UserCredential>) {
			state.isAuthenticated = true;
			const { email, displayName, emailVerified, photoURL, phoneNumber } =
				action.payload.user;
			state.user = {
				email,
				displayName,
				emailVerified,
				photoURL,
				phoneNumber,
			};

			localStorage.setItem(
				LS_AUTH_FLAG,
				JSON.stringify(state.isAuthenticated)
			);
			localStorage.setItem(LS_USER_DATA, JSON.stringify(state.user));

			// user
			const currentUser = action.payload.user;
			if (currentUser) {
				const userId = currentUser.uid;
				const userDocRef = doc(firestore, 'users', userId);
				const userData = {
					email: currentUser.email,
				};
				setDoc(userDocRef, userData, { merge: true })
					.then(() => {
						//
					})
					.catch((error) => {
						console.error(error);
					});
			}
			// favorites
			if (currentUser) {
				const userId = currentUser.uid;
				const favoritesDocRef = doc(firestore, 'favorites', userId);
				getDoc(favoritesDocRef)
					.then((docSnapshot) => {
						if (!docSnapshot.exists()) {
							const favorites = {
								favorites: [],
							};
							setDoc(favoritesDocRef, favorites)
								.then(() => {
									//
								})
								.catch((error) => {
									console.error(error);
								});
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
			// favorite notes
			if (currentUser) {
				const userId = currentUser.uid;
				const favoritesDocRef = doc(firestore, 'favoriteNotes', userId);
				getDoc(favoritesDocRef)
					.then((docSnapshot) => {
						if (!docSnapshot.exists()) {
							const favorites = {
								notes: [],
							};
							setDoc(favoritesDocRef, favorites)
								.then(() => {
									//
								})
								.catch((error) => {
									console.error(error);
								});
						}
					})
					.catch((error) => {
						console.error(error);
					});
			}
		},

		updateDisplayName(state, action: PayloadAction<string>) {
			const newDisplayName = action.payload;
			const changedUser = { ...state.user, displayName: newDisplayName };
			state.user = changedUser;
			localStorage.setItem(LS_USER_DATA, JSON.stringify(changedUser));
		},

		updateStoreEmail(state, action: PayloadAction<string>) {
			const newEmail = action.payload;
			const changedUser = {
				...state.user,
				email: newEmail,
				emailVerified: false,
			};
			state.user = changedUser;
			localStorage.setItem(LS_USER_DATA, JSON.stringify(changedUser));
		},

		updateAvatar(state, action: PayloadAction<string>) {
			const newAvatarURL = action.payload;
			const changedUser = { ...state.user, photoURL: newAvatarURL };
			state.user = changedUser;
			localStorage.setItem(LS_USER_DATA, JSON.stringify(changedUser));
		},

		updateAvatarSubscribe: (state, action: PayloadAction<string>) => {
			state.user.photoURL = action.payload;
			localStorage.setItem(LS_USER_DATA, JSON.stringify(state.user));
		},

		updateEmailVerified: (
			state,
			action: PayloadAction<boolean | undefined>
		) => {
			state.user.emailVerified = action.payload;
			localStorage.setItem(LS_USER_DATA, JSON.stringify(state.user));
		},

		refetchDisplayName(state, action: PayloadAction<string>) {
			const newDisplayName = action.payload;
			const changedUser = { ...state.user, displayName: newDisplayName };
			state.user = changedUser;
			localStorage.setItem(LS_USER_DATA, JSON.stringify(changedUser));
		},

		logoutSuccess(state) {
			state.isAuthenticated = false;
			state.user = {
				email: null,
				displayName: null,
				emailVerified: null,
				photoURL: null,
				phoneNumber: null,
			};
			localStorage.setItem(
				LS_AUTH_FLAG,
				JSON.stringify(state.isAuthenticated)
			);
			localStorage.setItem(LS_USER_DATA, JSON.stringify(state.user));
		},
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
