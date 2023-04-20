import * as React from 'react';
import { Squash as Hamburger } from 'hamburger-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../hooks/redux';
import { auth } from '../services/fireBaseConfig'
import { useActions } from '../hooks/actions';
import { User } from './Icons/User';
import { useEffect } from 'react';

export function Burger() {
    const { logoutSuccess } = useActions();
    const { favorites } = useAppSelector(state => state.github);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);
    const userEmail = useAppSelector(state => state.auth?.user?.user?.email);
    const [isOpen, setOpen] = React.useState(false);
    const navigate = useNavigate();
    const dropRef = React.useRef<HTMLSpanElement>(null);

    const handleSignOut = async () => {
        try {
            await auth.signOut();
            console.log("User signed out successfully!");
            navigate('/');
            logoutSuccess();
            setOpen(false);
        } catch (error) {
            console.error(error);
        }
    };
    const handleSetOpen = () => {
        setOpen(false);
    }

    useEffect(() => {
        if (isOpen) {
            if (dropRef.current) {
            dropRef.current.classList.add('animate-menu-fade');
            }
        } else {
            if (dropRef.current) {
            dropRef.current.classList.remove('animate-menu-fade');
            }
        }
    },[isOpen])

return (
    <div className="relative flex flex-row items-center">
        {isAuthenticated &&
            <div className="flex flex-row">
                <span className="text-sm">[{userEmail}]</span>
                <User />
            </div>
        }
        <Hamburger size={25} toggled={isOpen} toggle={setOpen} />
        {isOpen && (
            <span
                className="absolute text-xl top-[49px] right-[-20px] flex flex-col justify-start items-end pt-14 pr-10 bg-gray-400 h-screen w-screen z-40"
                ref={dropRef}
            >
                    <Link onClick={() => handleSetOpen()} to="/" className="md:hover:text-neutral-900 transition-all mb-2">Home</Link>
                    {!isAuthenticated &&
                    <div className="flex flex-col items-end">
                        <Link onClick={() => handleSetOpen()} to="/login" className="md:hover:text-neutral-900 transition-all mb-2">Sign in</Link>
                        <Link onClick={() => handleSetOpen()} to="/signup" className="md:hover:text-neutral-900 md:hover:border-neutral-900 border rounded p-1 transition-all">Sign up</Link>
                    </div>
                    }
                    {isAuthenticated &&
                    <Link onClick={() => handleSetOpen()} to="/favorites" className="md:hover:text-neutral-900 transition-all mb-2">Favorites<span className="text-sm">[{favorites.length}]</span></Link>
                    }
                    {isAuthenticated &&
                        <div className="flex flex-row">
                    <button
                        className="md:hover:text-neutral-900 transition-all"
                        onClick={() => handleSignOut()}
                    >
                        Sign out
                    </button>
                        </div>
                }
            </span>
        )}
    </div>
);
}
