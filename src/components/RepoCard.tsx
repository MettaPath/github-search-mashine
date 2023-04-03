import React, { useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { IRepo } from '../models/models';
import { switchIcon } from '../utils/iconsSwitcher';
import { minutsConverter } from '../utils/minutsConverter';



export function RepoCard({ repo }: { repo: IRepo }) {

    const repoData = {
        dateOfAdd: new Date().toLocaleDateString(),
        timeOfAdd: `${new Date().getHours()}:${minutsConverter()}`,
        avatar_url: repo.owner.avatar_url,
        url: repo.html_url,
        owner: repo.owner.login,
        owner_url: repo.owner.html_url,
        language: repo.language ? repo.language : '',
        name: repo.name,
        description: repo?.description,
        created: new Date(repo.created_at).toLocaleDateString(),
        updated: new Date(repo.updated_at).toLocaleDateString(),
    };
    const { addFavorite, removeFavorite } = useActions();
    const { favorites } = useAppSelector(state => state.github);

    const [isFav, setIsFav] = useState(favorites.some(item => item.url === repo.html_url));

    const addToFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        addFavorite(repoData);
        setIsFav(true);
    };

    const removeFromFavorite = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        removeFavorite(repoData);
        setIsFav(false);
    };

    return (
        <div className="border py-3 px-5 rounded mb-2 md:hover:shadow-md md:hover:bg-gray-100 transition-all font-mono">
            <a href={repo.html_url} target="_blank" rel="noreferrer">
                <img className="w-16 h-16 rounded mb-1" src={repo.owner.avatar_url} alt="avater" />
                <div className="w-full h-px border-b border-zinc-900"></div>
                <h2 className="text-lg font-bold">{repo.full_name}</h2>
                <p className="text-sm">
                    Forks: <span className="font-bold mr-2">{repo.forks}</span>
                    Watchers: <span className="font-bold mr-2">{repo.watchers}</span>
                    Language: <span className="font-bold">{switchIcon(repo.language)}</span>
                </p>
                <p className="text-sm flex flex-row">
                    created:
                    <span className="mr-2 font-bold">
                        {new Date(repo.created_at).toLocaleDateString()}
                    </span>
                    updated:
                    <span className="font-bold">
                        {new Date(repo.updated_at).toLocaleDateString()}
                    </span>
                </p>

                <p className="text-sm font-thin">{repo?.description}</p>

                {!isFav &&
                <button
                    className="mr-2 px-2 px-4 bg-yellow-400 rounded md:hover:bg-sky-700 transition-all transition-all"
                    onClick={addToFavorite}
                >
                    Add
                </button>
                }
                { isFav &&
                <button
                    className="px-2 px-4 bg-yellow-400 rounded md:hover:bg-red-400 transition-all transition-all"
                    onClick={removeFromFavorite}
                >
                    Remove
                </button>
                }
            </a>
        </div>
    );
}
