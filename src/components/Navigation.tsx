import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { GitHub } from './Icons/GitHub';


export function Navigation() {
  const { favorites } = useAppSelector(state => state.github);

  return (
    <div className="w-screen h-[50px] px-5 shadow-md bg-gray-500 font-mono">
      <nav className="container mx-auto p-4 flex justify-between items-center h-[50px] px-5 text-white">
        <div className="flex flex-row">
        <Link to="/" className="font-bold mr-2 hidden md:block">GitHub Search</Link>
        <Link to="/"><GitHub/></Link>
        </div>
        <span>
          <Link to="/" className="mr-5 md:hover:text-purple-200">Home</Link>
          <Link to="/favorites" className="md:hover:text-purple-200">Favorites<span className="text-sm">({favorites.length})</span></Link>
        </span>
      </nav>
    </div>

  );
}
