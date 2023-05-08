import * as React from 'react';
import { useAppSelector } from '../../hooks/redux';
import { Link } from 'react-router-dom';

export function User() {
    const { photoURL } = useAppSelector(state => state.auth.user);
    return (
        <Link to={"/profile"}>
            <img src={(photoURL != null) ? photoURL : 'https://firebasestorage.googleapis.com/v0/b/github-search-a5e8e.appspot.com/o/avatars%2Fuseravatar.png?alt=media&token=74779d8e-3e38-4a5c-9bfb-eadb74170c82'} alt="user" className="border border-slate-300 rounded-full h-[40px] w-[40px] max-h-[40px] max-w-[40px] bg-slate-300 object-cover" />
        </Link>

    );
}
