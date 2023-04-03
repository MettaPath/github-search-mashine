import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const LS_FAV_NOTES = 'notes'


interface notesState {
notes: INote[];

}
interface INote {
    name?: string,
    note: string;
    id?: string;
    date?: string;
    time?: string;
}

const initialState: notesState = {
    notes: JSON.parse(localStorage.getItem(LS_FAV_NOTES) ?? '[]'),

}

export const githubNotesSlice = createSlice({
    name: 'githubNotes',
    initialState,
    reducers: {

        addFavoriteNote(state, action: PayloadAction<INote>) {
            state.notes.push(action.payload);
            localStorage.setItem(LS_FAV_NOTES, JSON.stringify(state.notes));
        },
        removeFavoriteNote(state, action: PayloadAction<INote>) {
            state.notes = state.notes.filter(f => (f.id !== action.payload.id));
            localStorage.setItem(LS_FAV_NOTES, JSON.stringify(state.notes));
        }
    }
})

export const githubNoteActions = githubNotesSlice.actions;
export const githubNoteReducer = githubNotesSlice.reducer;
