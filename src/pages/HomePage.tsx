import React, { useEffect, useState } from 'react';
import { RepoCard } from '../components/RepoCard';
import { useDebounce } from '../hooks/debounce';
import { useLazyGetUserReposQuery, useSearchUsersQuery } from '../store/github/github.api';
import { GitHubRed } from '../components/Icons/GitHubRed';


export function HomePage() {
    const [search, setSearch] = useState('');
    const [dropdown, setDropdown] = useState(false);
    const debounced = useDebounce(search);
    const { isLoading, isError, data } = useSearchUsersQuery

        (debounced, {
            skip: debounced.length < 2,
            refetchOnFocus: true
        });

    const [fetchRepos, { isLoading: areReposloading, data: repos }] = useLazyGetUserReposQuery();

    const clickHandler = (username: string) => {
        fetchRepos(username)
        setDropdown(false);
    }

    useEffect(() => {
        setDropdown(debounced.length > 2 && data?.length! > 0)
    }, [debounced, data]);

    return (
        <div className="flex justify-center pt-20 mx-auto h-screen w-screen">
            {isError && <p className="text-center text-red-600">Something went wrong...</p>}
            <div className="relative w-[560px] pl-3 pr-3">
                <div className="flex flex-col items-center justify-center mb-3">
                <GitHubRed />
                    <h3 className="font-bold text-3xl font-mono text-center">FIND REPOS WHAT YOU NEED</h3>
                </div>
                <input
                    className="border rounded py-2 px-4 w-full h-[42px] mb-2"
                    type="text"
                    placeholder="Serach Github Username..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                {dropdown &&
                    <ul className="overflow-y-scroll list-none absolute md:top-[189px] left-3 right-0 max-h-[200px] shadow-md bg-white">
                    {isLoading && <p className="text-center">Loading...</p>}
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
                <div className="container p-3">
                    {areReposloading && <p className="text-center">Repos are loading...</p>}
                    {repos?.map(repo => <RepoCard repo={repo} key={repo.id} />)}
                </div>
            </div>
        </div>
  );
}
