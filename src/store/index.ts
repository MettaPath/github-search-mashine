import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";
import { githubNoteReducer } from "./github/github.fav.notes";
import { githubReducer } from "./github/github.slice";

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        github: githubReducer,
        githubNotes: githubNoteReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    }).concat(githubApi.middleware)
});

setupListeners(store.dispatch);

export type  RootState = ReturnType<typeof store.getState>
