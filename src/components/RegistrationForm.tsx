import * as React from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { useState } from 'react';
import { auth } from '../services/fireBaseConfig';
import { GitHubRed } from './Icons/GitHubRed';
import { Link } from 'react-router-dom';

export function RegistrationForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
            try {
            await createUserWithEmailAndPassword(auth, email, password);
                console.log("User registered successfully!");
                const user = auth.currentUser;
                if (user) {
                await sendEmailVerification(user);
                setSuccessMessage("Successful registration! Please check your inbox and verify your email.");
                }
                if (errorMessage) {
                    setErrorMessage("");
                }
                setPassword('');
                setEmail('');
            } catch (error: any) {
                if (successMessage) {
                    setSuccessMessage("");
                }

                switch (error.code) {
                case 'auth/email-already-in-use':
                    error.message = 'Email already in use.';
                    break;
                case 'auth/weak-password':
                    error.message = 'Password should be at least 6 characters';
                    break;
                default:
                    error.message = 'Sign up error, please try again later';
                break;
            }

                setErrorMessage(error.message);
            }
        };

    return (
        <div className="h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center max-w-[340px] items-center border py-5 px-5 rounded mb-10 shadow-md bg-gray-100">
                <GitHubRed />
                <h3 className="font-mono font-bold text-xl pt-2 mb-4">Sign up to GitHub Search</h3>
                <form className="font-mono flex flex-col justify-center mb-2" onSubmit={handleRegister}>
                    {(successMessage) && <p className="text-xs text-center text-green-500 mb-2">{successMessage}</p>}
                    {errorMessage && <p className="text-xs text-red-500">{errorMessage}</p>}
                    <label className="text-sm" htmlFor="email">
                        Email address
                            <input
                                required
                                className="border border-neutral-900 rounded py-1 px-1 w-full h-[30px] text-lg md:text-sm mb-2 focus:outline-none"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                    </label>
                    <label className="text-sm" htmlFor="password">
                        Password
                            <input
                                required
                                className="border border-neutral-900 rounded py-1 px-1 w-full h-[30px] text-lg md:text-sm mb-2 focus:outline-none"
                                type="password"
                                id="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                    </label>
                <button
                    className="text-sm shadow-md px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all"
                    type="submit">Sign up
                </button>
                </form>
                <div className="w-full h-px border-b border-zinc-900 mb-2"></div>
                <p className="text-sm flex flex-row">
                    <span className="mr-1">
                        You have account?
                    </span>
                    <span>
                        <Link className="text-blue-500 md:hover:text-blue-800 md:hover:underline" to="/login">Sign in</Link>
                    </span>
                </p>
        </div>
    </div>
    );
};
