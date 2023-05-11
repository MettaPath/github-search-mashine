import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import * as React from 'react';
import { useState } from 'react';
import { auth, storage } from '../services/fireBaseConfig';
import { updateProfile } from 'firebase/auth';
import { useAppSelector } from '../hooks/redux';
import { Pen } from './Icons/Pen';
import { useActions } from '../hooks/actions';
import { RotatingLines } from 'react-loader-spinner';

export function ImageUploadForm() {
    const { updateAvatar } = useActions();
    const { photoURL } = useAppSelector(state => state.auth.user);
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
        setImage(e.target.files[0]);
        setImageUrl(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
    const user = auth.currentUser;
    e.preventDefault();
    if (!image) {
        return;
        }
        setLoading(true);
        const fileRef = ref(storage, `avatars/${image.name}`);
        await uploadBytes(fileRef, image);
        const url = await getDownloadURL(fileRef);
        if (user) {
            try {
                await updateProfile(user, {
                photoURL: url,
                });
                updateAvatar(url);
                setImageUrl(url);
            } catch (error) {
                console.error(error);
            }
        }
        setLoading(false);
    };

   return (
        <div className="relative">
            <form onSubmit={(e) => handleSubmit(e)} lang="en">
            <label
                className="w-[200px] h-[200px] rounded-full"
                htmlFor="file-upload"
                style={{ cursor: 'pointer' }}
            >
                {imageUrl ? (
                <img src={imageUrl} alt="Avatar" className="w-[200px] h-[200px] rounded-full object-cover bg-black border border-slate-800" />
                ) : (
                <img
                    src={
                    photoURL != null
                        ? photoURL
                        : 'https://firebasestorage.googleapis.com/v0/b/github-search-a5e8e.appspot.com/o/avatars%2Fuseravatar.png?alt=media&token=74779d8e-3e38-4a5c-9bfb-eadb74170c82'
                    }
                    className="w-[200px] h-[200px] rounded-full bg-slate-400 object-cover border border-slate-800"
                    alt="Avatar"
                />
                )}
            </label>
            <button
                type="button"
                className="absolute top-0 left-[150px] bg-slate-200 md:hover:bg-slate-50 rounded-full p-2 mr-2 mb-2"
                onClick={() => {
                const fileUpload = document.getElementById('file-upload');
                if (fileUpload && !loading) {
                    fileUpload.click();
                }
                }}
            >
                <Pen />
            </button>
            <input
                id="file-upload"
                type="file"
                accept=".png, .jpg, .jpeg"
                style={{ display: 'none' }}
                onChange={(e) => handleImageChange(e)}
            />
            <button
                className="flex justify-center items-center text-sm shadow-md px-1 mb-1 h-[25px] min-w-[50px] bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all"
                type="submit"
                disabled={loading}
            >
                {loading ? <RotatingLines
                            strokeColor="grey"
                            strokeWidth="5"
                            animationDuration="0.75"
                            width="22"
                            visible={true}
                            /> : 'Upload'}
            </button>
            </form>
        </div>
);

};
