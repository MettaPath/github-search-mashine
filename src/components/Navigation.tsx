import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { GitHub } from './Icons/GitHub';
import { auth } from '../services/fireBaseConfig';
import { useActions } from '../hooks/actions';
import { User } from './Icons/User';
import { Burger } from './Burger';

export function Navigation() {
	const { favorites } = useAppSelector((state) => state.github);
	const { logoutSuccess } = useActions();
	const isAuthenticated = useAppSelector(
		(state) => state.auth.isAuthenticated
	);
	console.log('autorization:', isAuthenticated);
	const { displayName, email } = useAppSelector((state) => state.auth.user);
	const navigate = useNavigate();

	const handleSignOut = async () => {
		try {
			await auth.signOut();
			navigate('/');
			logoutSuccess();
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {});

	return (
		<div className="w-screen h-[70px] shadow-md bg-gray-500 font-mono fixed z-30 mb-10">
			<nav className="container text-sm mx-auto flex justify-between items-center h-[70px] px-5 text-white">
				<div className="flex flex-row items-center justify-center">
					<Link
						to="/"
						className="font-mono text-lg mr-2 hidden md:block"
					>
						GitHub Search
					</Link>
					<Link to="/">
						<GitHub />
					</Link>
				</div>
				<span className="lg:flex flex-row justify-center items-center hidden">
					<Link
						to="/"
						className="mr-3 md:hover:text-neutral-900 transition-all"
					>
						Home
					</Link>
					{!isAuthenticated && (
						<div>
							<Link
								to="/login"
								className="mr-3 md:hover:text-neutral-900 transition-all"
							>
								Sign in
							</Link>
							<Link
								to="/signup"
								className="md:hover:text-neutral-900 md:hover:border-neutral-900 border rounded p-1 transition-all"
							>
								Sign up
							</Link>
						</div>
					)}
					{isAuthenticated && (
						<Link
							to="/favorites"
							className="mr-3 md:hover:text-neutral-900 transition-all"
						>
							Favorites
							<span className="text-sm">
								[{favorites.length}]
							</span>
						</Link>
					)}
					{isAuthenticated && (
						<div className="flex flex-row items-center">
							<Link
								to="/profile"
								className="md:hover:text-neutral-900 rounded transition-all mr-3"
							>
								Profile
							</Link>
							<button
								className="md:hover:text-neutral-900 transition-all mr-10"
								onClick={() => handleSignOut()}
							>
								Sign out
							</button>
							<div className="flex flex-row items-center border rounded p-1">
								<div className="flex flex-col text-xs">
									<p className="font-thin mr-2">
										You sign in as:
									</p>
									<p className="mr-2">
										{displayName ? displayName : email}
									</p>
								</div>
								<User />
							</div>
						</div>
					)}
				</span>
				<div className="lg:hidden block">
					<Burger />
				</div>
			</nav>
		</div>
	);
}
