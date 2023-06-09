import * as React from 'react';
import { Link } from 'react-router-dom';
import { GitHubRed } from './Icons/GitHubRed';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../services/fireBaseConfig';

export function ResetPass() {
	const [email, setEmail] = React.useState('');
	const [errorMessage, setErrorMessage] = React.useState('');

	const handleResetPassword = async (
		event: React.FormEvent<HTMLFormElement>
	) => {
		event.preventDefault();
		try {
			await sendPasswordResetEmail(auth, email);
			setErrorMessage(
				'A password reset email has been sent to your email address.'
			);
			setEmail('');
		} catch (error: any) {
			setErrorMessage(error.message);
		}
	};

	return (
		<div className="h-screen flex justify-center items-center">
			<div className="flex flex-col justify-center max-w-[340px] items-center border py-5 px-5 rounded mb-10 shadow-md bg-gray-100">
				<GitHubRed />
				<h3 className="font-mono font-bold text-xl pt-2 mb-4">
					Reset password
				</h3>
				<form
					className="font-mono flex flex-col justify-center mb-2"
					onSubmit={handleResetPassword}
				>
					{errorMessage && (
						<p className="text-xs text-red-500">{errorMessage}</p>
					)}
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
					<button
						className="shadow-md text-sm px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 hover:text-white transition-all"
						type="submit"
					>
						Sent
					</button>
				</form>
				<div className="w-full h-px border-b border-zinc-900"></div>
				<p className="text-sm flex flex-row">
					<span className="mr-1">Don't have an account?</span>
					<span>
						<Link
							className="text-blue-500 md:hover:text-blue-800 md:hover:underline"
							to="/signup"
						>
							Sign up
						</Link>
					</span>
				</p>
			</div>
		</div>
	);
}
