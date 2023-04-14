import React, { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { GitHubRed } from '../components/Icons/GitHubRed';
import { RotatingLines } from 'react-loader-spinner';
import { useAppSelector } from '../hooks/redux';
import { Info } from '../components/Info';


export function HomePage() {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const debounced = useDebounce(search);
    const isAuthenticated = useAppSelector(state => state.auth.isAuthenticated);

    const {isLoading, isError, data } = useSearchUsersQuery(debounced, {
        skip: debounced.length < 2,
        refetchOnFocus: true
        });

    const [fetchUserRepos, { isLoading: areReposloading, data: repos }] = useLazyGetUserReposQuery();

    const clickHandler = (username: string) => {
        fetchUserRepos(username)
        setDropdown(false);
        setSearch('');
    }

    useEffect(() => {
        setDropdown(debounced.length > 2 && data?.length! > 0)
    }, [debounced, data]);

    const handleKeyPress = (event: { key: string; }) => {
        if (event.key === "Enter") {
            fetchUserRepos(search)
            setSearch('');
            setDropdown(false);
        }
    };

    return (
        <div className="flex justify-center pt-20 min-h-screen">
            <div className="relative w-[560px] h-full pl-3 pr-3">
                {!isAuthenticated &&
                <Info />
                }
                <div className="flex flex-col items-center justify-center mb-3">
                <GitHubRed />
                    <h3 className="font-bold text-3xl font-mono text-center">FIND REPOS WHAT YOU NEED</h3>
                {(isError) && <p className="text-center text-red-600">Something went wrong...</p>}
                </div>
                <div className="flex flex-row">
                    <input
                    className="mr-1 border focus:outline-none border-neutral-900 rounded py-2 px-4 w-full h-[42px] mb-2"
                    type="text"
                    placeholder="Search Github Username..."
                    value={search}
                        onChange={e => setSearch(e.target.value)}
                        onKeyDown={handleKeyPress}
                />
                    <button
                        className="text-sm px-1 mb-1 h-[42px] w-1/4 bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all shadow-md"
                        onClick={() => clickHandler(search)}
                    >Find
                    </button>
                </div>

                {dropdown &&
                    <ul className="overflow-y-scroll list-none absolute md:top-[189px] left-3 right-3 max-h-[200px] shadow-md bg-white">
                    {(isLoading) && <p className="text-center">Loading...</p>}
                    {data?.map(user => (
                        <li
                            key={user.id}
                            className="py-2 px-4 md:hover:bg-gray-500 transition-colors cursor-pointer"
                            onClick={() => clickHandler(user.login)}
                        >
                            {user.login}
                        </li>
                    ))}
                    </ul>
                }
                <div className="p-3">
                    {areReposloading &&
                        <div className="w-full flex justify-center">
                            <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="46"
                            visible={true}
                            />
                        </div>
                    }
                    {(repos?.length === 0) &&
                        <div className="text-sm text-red-500 border shadow-md border-red-500 rounded p-1">
                        <p>
                        Such user does not exist or does not have public repositories.
                        </p>
                        <p>
                        Please specify the request parameters.
                        </p>
                        </div>
                    }
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
                </div>
            </div>
        </div>
    );
}
