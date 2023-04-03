import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_KEY = 'rfk'


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
        },
        removeFavorite(state, action: PayloadAction<IGitHubObj>) {
            state.favorites = state.favorites.filter(f => f.url !== action.payload.url);
            localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favorites));
        }
    }
})

export const githubActions = githubSlice.actions;
export const githubReducer = githubSlice.reducer;
