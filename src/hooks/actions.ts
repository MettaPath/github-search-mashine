import { bindActionCreators } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux"
import { githubNoteActions } from "../store/github/github.fav.notes";
import { githubActions } from "../store/github/github.slice";

const actions = {
    ...githubActions,
    ...githubNoteActions
};


export const useActions = () => {
    const dispatch = useDispatch();
    return bindActionCreators(actions, dispatch);
};
