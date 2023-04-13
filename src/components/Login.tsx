import * as React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../services/fireBaseConfig';
import { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useDispatch } from 'react-redux';
import { fetchFavorites } from '../store/github/github.slice';
import { fetchFavoriteNotes } from '../store/github/github.fav.notes';
import { GitHubRed } from './Icons/GitHubRed';
import { Google } from './Icons/Google';
import 'firebaseui/dist/firebaseui.css';

export function Login() {
    const { loginSuccess } = useActions();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();

    const handleSignInWithGoogle = async () => {
        const provider = new GoogleAuthProvider();

        try {
        const result = await signInWithPopup(auth, provider);
        navigate('/');
        loginSuccess(result);
        await dispatch(fetchFavorites());
        await dispatch(fetchFavoriteNotes());
        } catch (error: any) {
        setErrorMessage(error.message);
        }
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Пользователь успешно вошел в систему!");
            navigate('/');
            loginSuccess(userCredential);
            await dispatch(fetchFavorites());
            await dispatch(fetchFavoriteNotes());
        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="flex flex-col justify-center max-w-[340px] items-center border py-5 px-5 rounded mb-10 shadow-md bg-gray-100">
                    <GitHubRed />
                    <h3 className="font-mono font-bold text-xl pt-2 mb-4">Sign in to GitHub Search</h3>
                <form className="font-mono flex flex-col justify-center mb-2" onSubmit={handleLogin}>
                    {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
            <label
                className="text-sm"
                htmlFor="email"
            >
            Email address
                <input
                required
                className="border border-neutral-900 rounded py-1 px-1 w-full h-[25px] mb-2 focus:outline-none"
                type="email"
                id="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />
            </label>
            <label
                className="text-sm"
                htmlFor="password"
            >
            Password
                <input
                required
                className="border border-neutral-900 rounded py-1 px-1 w-full h-[25px] mb-2 focus:outline-none"
                type="password"
                id="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
            />
            </label>
            <button className="shadow-md text-sm px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 hover:text-white transition-all" type="submit">Sign in</button>
                </form>
                <div className="flex flex-col items-center mb-1">
                    <p className="text-sm">Or sign in with:</p>
                    <button onClick={() => handleSignInWithGoogle()} className="rounded md:hover:bg-sky-700 transition-all p-0.5">
                    <Google />
                    </button>
                </div>
                <div className="w-full h-px border-b border-zinc-900"></div>
                <p className="text-sm flex flex-row">
                    <span className="mr-1">
                        Don't have an account?
                    </span>
                    <span>
                        <Link className="text-blue-500 md:hover:text-blue-800 md:hover:underline" to="/signup">Sign up</Link>
                    </span>
                </p>
            </div>
        </div>
    );
}
