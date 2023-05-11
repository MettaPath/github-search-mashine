import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth, firestore } from '../../services/fireBaseConfig';
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const LS_FAV_NOTES = 'notes';

interface notesState {
	notes: INote[];
}
interface INote {
	name?: string;
	note: string;
	id?: string;
	date?: string;
	time?: string;
	repoUrl?: string;
}

const initialState: notesState = {
	notes: JSON.parse(localStorage.getItem(LS_FAV_NOTES) ?? '[]'),
};

export const githubNotesSlice = createSlice({
	name: 'githubNotes',
	initialState,
	reducers: {
		addFavoriteNote(state, action: PayloadAction<INote>) {
			state.notes.push(action.payload);
			localStorage.setItem(LS_FAV_NOTES, JSON.stringify(state.notes));
			const uid = auth.currentUser?.uid;
			const userDocRef = doc(collection(firestore, 'favoriteNotes'), uid);
			if (userDocRef) {
				updateDoc(userDocRef, {
					notes: state.notes,
				})
					.then(() => {
						//
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				console.error('user not exist');
			}
		},
		removeFavoriteNote(state, action: PayloadAction<INote>) {
			state.notes = state.notes.filter((f) => f.id !== action.payload.id);
			localStorage.setItem(LS_FAV_NOTES, JSON.stringify(state.notes));
			const uid = auth.currentUser?.uid;
			const userDocRef = doc(collection(firestore, 'favoriteNotes'), uid);
			if (userDocRef) {
				updateDoc(userDocRef, {
					notes: state.notes,
				})
					.then(() => {
						//
					})
					.catch((error) => {
						console.error(error);
					});
			} else {
				console.error('user not exist');
			}
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchFavoriteNotes.fulfilled, (state, action) => {
			state.notes = action.payload;
			localStorage.setItem(LS_FAV_NOTES, JSON.stringify(state.notes));
		});
	},
});

export const fetchFavoriteNotes = createAsyncThunk(
	'favoriteNotes/fetchFavoriteNote',
	async () => {
		try {
			const uid = auth.currentUser?.uid;

			if (uid) {
				const userDocRef = doc(firestore, 'favoriteNotes', uid);
				const userDocSnap = await getDoc(userDocRef);
				const userData = userDocSnap.data();
				if (userData && userData.notes) {
					return userData.notes;
				} else {
					return [];
				}
			} else {
				return [];
			}
		} catch (error) {
			console.error(error);
			throw error;
		}
	}
);

export const githubNoteActions = githubNotesSlice.actions;
export const githubNoteReducer = githubNotesSlice.reducer;
