import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { firestore } from "../../services/fireBaseConfig";
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth } from "../../services/fireBaseConfig";

const LS_FAV_KEY = 'rfk';

interface GithubState {
    favorites: IGitHubObj[];

}
export interface IGitHubObj {
    dateOfAdd: string,
    timeOfAdd: string | number,
    avatar_url: string;
    name: string;
    url: string;
    owner: string;
    language: string;
    owner_url: string;
    description?: string;
    created: string;
    updated: string;
}

const initialState: GithubState = {
    favorites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
}
export const githubSlice = createSlice({

    name: 'github',
    initialState,
    reducers: {

        addFavorite(state, action: PayloadAction<IGitHubObj>) {
            state.favorites.push(action.payload);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
                const uid = auth.currentUser?.uid;
                const userDocRef = doc(collection(firestore, 'favorites'), uid);
                if (userDocRef) {
                    updateDoc(userDocRef, {
                        favorites: state.favorites,
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
        removeFavorite(state, action: PayloadAction<IGitHubObj>) {
            state.favorites = state.favorites.filter(f => f.url !== action.payload.url);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
                const uid = auth.currentUser?.uid;
                const userDocRef = doc(collection(firestore, 'favorites'), uid);
                if (userDocRef) {
                    updateDoc(userDocRef, {
                        favorites: state.favorites,
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
        builder
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
            });
    },
});

export const fetchFavorites = createAsyncThunk('favorites/fetchFavorites', async () => {
    try {
        const uid = auth.currentUser?.uid;
        if (uid) {
            const userDocRef = doc(firestore, 'favorites', uid);
            const userDocSnap = await getDoc(userDocRef);
            const userData = userDocSnap.data();
            if (userData && userData.favorites) {
                return userData.favorites;
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
});

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
