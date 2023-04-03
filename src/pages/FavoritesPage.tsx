import { nanoid } from 'nanoid';
import React, { useRef, useState } from 'react';
import { useActions } from '../hooks/actions';
import { useAppSelector } from '../hooks/redux';
import { switchIcon } from '../utils/iconsSwitcher';
import TextareaAutosize from 'react-textarea-autosize';
import { minutsConverter } from '../utils/minutsConverter';

export function FavoritesPage() {
  const { removeFavorite, addFavoriteNote, removeFavoriteNote } = useActions();
  const { favorites } = useAppSelector(state => state.github);
  const { notes } = useAppSelector(state => state.githubNotes);
  const [isNote, setIsNote] = useState('');
  const [isNoteVisible, setIsNotesVisible] = useState<boolean[]>(Array(favorites.length).fill(false));

  const textAreaRefs = useRef<Array<React.RefObject<HTMLTextAreaElement>>>(
    favorites.map(() => React.createRef())
  );

  const handlerNotesOpener = (mapIndex: number) => {
    setIsNotesVisible(prevState => {
    const newState = [...prevState];
      newState[mapIndex] = !newState[mapIndex];
    return newState;
  });
  };

  const handlerSubmit = (name: string) => {
    addFavoriteNote({
      name: name,
      note: isNote,
      id: nanoid(),
      date: new Date().toLocaleDateString(),
      time: `${new Date().getHours()}:${minutsConverter()}`,
    })
    setIsNote('');

    // const values = textAreaRefs.current.map((ref) => ref.current?.value || '');
    // console.log(values);
    textAreaRefs.current.forEach((ref) => {
      if (ref.current) {
        ref.current.value = '';
      }
    })
  };

  const handlerRemover = (
    dateOfAdd: string,
    timeOfAdd: string | number,
    avatar_url: string,
    url: string,
    owner: string,
    language: string,
    name: string,
    owner_url: string,
    created: string,
    updated: string,

    ) => {
    removeFavorite
      ({
        dateOfAdd: dateOfAdd,
        timeOfAdd: timeOfAdd,
        avatar_url: avatar_url,
        url: url,
        owner: owner,
        language: language ? language : '',
        name: name,
        owner_url: owner_url,
        created: created,
        updated: updated,
      })
  };

  if (favorites.length < 1) return <p className="text-center">No items</p>

  return (
    <div className="container mx-auto p-5 pt-5 h-screen w-screen font-mono">
      <div>
        <h2 className="text-lg font-bold mb-2">Favorites repos list</h2>
      </div>
      <ul className="list-none w-full flex-column justify-center">
        {favorites.map((repo, i) => (
          <li className="relative flex-column flex-wrap md:w-1/2 justify-between mb-5 border-2 bg-gradient-to-r from-indigo-300 rounded p-2" key={repo.name}>
            <div className="absolute text-sm top-0 md:top-[0px] right-0 mb-4 w-full h-4 bg-stone-700">
              <p className="text-right text-xs text-white pr-1">
                <span>added {repo.dateOfAdd}</span>
                <span> {repo.timeOfAdd}</span>
              </p>
            </div>
            <div className="flex items-end pt-3">
              <a
              href={repo.owner_url}
              target="_blank"
              rel="noreferrer"
            >
            <img className="inline mr-1 relative w-16 h-16 mb-1 rounded" src={repo.avatar_url} alt="avatar" />
            </a>
            <button className="text-sm max-h-6 px-2 px-1 mr-1 mb-1 bg-yellow-400 rounded md:hover:bg-sky-700 transition-all">
                <a
                href={repo.url}
                target="_blank"
                rel="noreferrer"
              >
                Go to repo
              </a>
            </button>
            <button
                    className="text-sm max-h-6 px-2 px-1 mb-1 bg-red-400 rounded bg-yellow-400 rounded md:hover:bg-red-400 transition-all display-inline-block"
              onClick=
              {
                () =>
                  handlerRemover
                    (
                    repo.dateOfAdd,
                    repo.timeOfAdd,
                    repo.avatar_url,
                    repo.url,
                    repo.owner,
                    repo.language,
                    repo.name,
                    repo.owner_url,
                    repo.created,
                    repo.updated,
                    )
              }
                >
                    Remove
              </button>
            </div>
            <div className="w-full h-px border-b border-zinc-900"></div>
            <p className="text-left font-bold">{repo.name}</p>
            <p className="text-left text-sm font-semibol text-orange-700">Owner: {repo.owner}</p>
            <p className="text-sm flex flex-row">
                    created:
                    <span className="mr-2 font-bold">
                        {repo.created}
                    </span>
                    updated:
                    <span className="font-bold">
                        {repo.updated}
                    </span>
                </p>
            <p className="text-left text-sm font-semibold">Language: {switchIcon(repo.language)}</p>
            <p className="text-left">{repo.description}</p>
              <div className="w-full mb-1 h-px border-b border-zinc-900"></div>
            <button onClick={() => handlerNotesOpener(i)} className="text-sm max-h-6 px-1 mr-1 mb-1 bg-yellow-400 rounded md:hover:bg-sky-700 transition-all">
              <span className="text-sm">
              {isNoteVisible[i] ? "Close notes" : `Notes(${notes.filter(note => (note.name === repo.name)).length})`}
              </span>
            </button>

            {isNoteVisible[i] && (
              <div className="pb-2">
              {
                notes
                  .filter(note => (note.name === repo.name))
                  .map(note =>
                  (<div key={nanoid()}>
                        <p key={note.id} className="rounded relative flex flex-col border mb-1 pb-2 bg-gray-200">
                      <span className="flex items-center justify-between border w-full pl-1 text-sm font-thin bg-gradient-to-r from-indigo-500">{note.date} {note.time}
                        <button
                        className="transition-all display-inline-block text-xl text-red-400 mr-1 md:hover:text-red-700 "
                        onClick={() => {
                          removeFavoriteNote({
                            note: note.note,
                            id: note.id,
                          })
                        }}
                      >
                      &#10006;
                      </button>
                      </span>
                      <span className="pl-1 whitespace-pre-wrap break-words">
                        {note.note}
                      </span>
                      </p>
                        </div>
                    )
                  )
              }
              </div>
            )}
            {isNoteVisible[i] &&
              <form className="flex border items-start border-slate-700 rounded p-2"
              onSubmit={(e) => {
                e.preventDefault();
                handlerSubmit(repo.name);
                }}>
                <TextareaAutosize
                style={{resize: "none"}}
                required
                ref={textAreaRefs.current[i]}
                className="w-full rounded p-1 h-2 focus:outline-none mr-1"
                placeholder="Add your note here..."
                onChange={(e) => {
                  setIsNote(e.currentTarget.value);
              }}>
              </TextareaAutosize>
              <button type='submit' className="translate-y-0.6 text-2xl block rounded text-slate-700 pl-1 md:hover:text-sky-700 transition-all">&#5125;</button>
            </form>
            }
          </li>))}
      </ul>
    </div>
  );
}
