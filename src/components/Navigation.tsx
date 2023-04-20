import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { GitHub } from './Icons/GitHub';
import { auth } from '../services/fireBaseConfig'
import { useActions } from '../hooks/actions';
import { User } from './Icons/User';
import { Burger } from "./Burger";



export function Navigation() {
  const { favorites } = useAppSelector(state => state.github);
  const { logoutSuccess } = useActions();
  const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
  // const userEmail = useAppSelector(state => state.auth?.user?.user?.email)
  const navigate = useNavigate();

  const handleSignOut = async () => {
  try {
    await auth.signOut();
    console.log("User signed out successfully!");
    navigate('/');
    logoutSuccess();
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="w-screen h-[50px] shadow-md bg-gray-500 font-mono">
      <nav className="container text-sm mx-auto flex justify-between items-center h-[50px] px-5 text-white">
        <div className="flex flex-row">
        <Link to="/" className="font-bold text-lg mr-2 hidden md:block">GitHub Search</Link>
        <Link to="/"><GitHub/></Link>
        </div>
        <span className="md:flex hidden">
          <Link to="/" className="mr-5 md:hover:text-neutral-900 transition-all">Home</Link>
          {!isAuthenticated &&
          <div>
            <Link to="/login" className="mr-3 md:hover:text-neutral-900 transition-all">Sign in</Link>
            <Link to="/signup" className="md:hover:text-neutral-900 md:hover:border-neutral-900 border rounded p-1 transition-all">Sign up</Link>
          </div>
          }
          {isAuthenticated &&
          <Link to="/favorites" className="mr-3 md:hover:text-neutral-900 transition-all">Favorites<span className="text-sm">[{favorites.length}]</span></Link>
          }
          {isAuthenticated &&
            <div className="flex flex-row">
          <User />
          <button
            className="mr-5 pl-1 md:hover:text-neutral-900 transition-all"
            onClick={() => handleSignOut()}
          >
            Sign out
          </button>
            </div>
          }
        </span>
        <div className="md:hidden block">
          <Burger />
        </div>
      </nav>
    </div>

  );
}
