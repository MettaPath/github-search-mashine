import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { githubApi } from "./github/github.api";
import { githubNoteReducer } from "./github/github.fav.notes";
import { githubReducer } from "./github/github.slice";
import { authReducer } from "./auth/auth.slice";
import { firestore } from "../services/fireBaseConfig";
import { reduxFirestore } from "redux-firestore";
import thunk from "redux-thunk";

const firebaseInstance = firestore;

export const store = configureStore({
    reducer: {
        [githubApi.reducerPath]: githubApi.reducer,
        github: githubReducer,
        githubNotes: githubNoteReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['auth/loginSuccess'],
            ignoredPaths: ['auth.user'],
        },
    })
        .concat(thunk.withExtraArgument({firebaseInstance}))
        .concat(githubApi.middleware),
        enhancers: [reduxFirestore(firebaseInstance)],
});

setupListeners(store.dispatch);

export type  RootState = ReturnType<typeof store.getState>
