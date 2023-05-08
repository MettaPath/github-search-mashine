import * as React from 'react';
import { useAppSelector } from '../hooks/redux';
import { useEffect, useState } from 'react';
import { auth } from '../services/fireBaseConfig';
import { EmailAuthProvider, reauthenticateWithCredential, sendEmailVerification, updateEmail, updatePassword, updateProfile } from 'firebase/auth';
import { useActions } from '../hooks/actions';
import { ImageUploadForm } from './ImageUploadForm';

export function Profile() {
    const { updateDisplayName, updateStoreEmail, updateEmailVerified } = useActions();
    const userEmailVerified = auth.currentUser?.emailVerified;

    const {
        email,
        displayName,
        emailVerified,
        } =
        useAppSelector(state => state.auth.user);

        // name
        const [name, setName] = useState(displayName || '');
        const [displayNameSuccess, setDisplayNameSuccess] = useState('');
        const [displayNameError, setDisplayNameError] = useState('');
        const [displayNameUpdated, setDisplayNameUpdated] = useState(false)

    const handleChangeName = async (e: React.FormEvent) => {
        const user = auth.currentUser;
        e.preventDefault();
        if (user) {
            try {
                await updateProfile(user, {
                    displayName: name,
                });
                updateDisplayName(name);
                setDisplayNameUpdated(true);
                setDisplayNameSuccess('Name updated successfully');
            } catch (error) {
                setDisplayNameError('Something went wrong')
            }
        }
    }
    // email
        const [newEmail, setNewEmail] = useState('');
        const [emailSuccess, setEmailSuccess] = useState('');
        const [emailError, setEmailError] = useState('');
        const [emailUpdated, setEmailUpdated] = useState(false)

    const handleChangeEmail = async (e: React.FormEvent, newEmail: string) => {
        e.preventDefault();

        if (!newEmail) {
            setEmailError("Please enter a valid email address");
            return;
        }

        if (newEmail === email) {
            setEmailError("New email address should be different from current one");
            return;
        }

        const user = auth.currentUser;
        if (user) {
            try {
                await updateEmail(user, newEmail);
                await sendEmailVerification(user);

                updateStoreEmail(newEmail);
                setEmailUpdated(true);
                setEmailSuccess(`Email has been updated and verification email has been sent on ${newEmail}`);

            } catch (error: any) {
                if (error.code === "auth/requires-recent-login") {
                    setEmailError("Your credentials are too old. Please log in again.");
                    return;
                } else {
                    setEmailError("Something went wrong");
                }
            }
        };
    };
    useEffect(() => {
        updateEmailVerified(userEmailVerified);
    }, [userEmailVerified, updateEmailVerified]);

    const sendVerificationEmail = async () => {
        const user = auth.currentUser;
        if (user) {
            try {
            await sendEmailVerification(user);
            setEmailSuccess("Verification email sent successfully!");
            } catch (error) {
            setEmailError("Error sending verification email, please try again later");
            }
        }
    };
    // pass
            const [oldPassword, setOldPassword] = useState('');
            const [newPassword, setNewPassword] = useState('');
            const [confirmPassword, setConfirmPassword] = useState('');
            const [passwordSuccess, setPasswordSuccess] = useState('');
            const [passwordError, setPasswordError] = useState('');
            const [passwordUpdated, setPasswordUpdated] = useState(false);

        const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setOldPassword(e.target.value);
        };

        const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setNewPassword(e.target.value);
        };

        const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setConfirmPassword(e.target.value);
        };


    const handleUpdatePassword = async (e: React.FormEvent) => {
            e.preventDefault();
            const user = auth.currentUser;
            if (user && user.email) {
            const credential = EmailAuthProvider.credential(user.email, oldPassword);
            try {
                await reauthenticateWithCredential(user, credential);
                if (newPassword === confirmPassword) {
                    await updatePassword(user, newPassword);
                    setPasswordUpdated(true);
                    setPasswordSuccess('Password updated successfully');
                    setOldPassword('');
                    setNewPassword('');
                    setConfirmPassword('');
                } else {
                    setPasswordError('New password and confirmation password do not match');
                }
            } catch (error: any) {
                if (error.code === 'auth/wrong-password') {
                setPasswordError('Old password is incorrect');
                } else {
                setPasswordError('Someting went wrong try again later')
                }
                if (error.code === 'auth/weak-password') {
                setPasswordError('Password should be at least 6 characters');
                } else {
                setPasswordError('Someting went wrong try again later')
                }
            }
        }
    };

    return (
        <div className="h-[100%] p-10 flex flex-col">
            <div className="flex flex-col justify-center lg:w-6/12 mx-auto mt-10 rounded shadow-md bg-gray-100 p-5">
                    <h3 className="text-xl font-bold mb-1">Profile settings</h3>
                <div className="w-full h-px border-b border-zinc-900 mb-2"></div>
                <div>
                    <h4 className="text-md font-bold mb-3">Personal data and avatar</h4>
            <ImageUploadForm />
            <form className="flex flex-col md:w-9/12 rounded mb-10" onSubmit={(e) => handleChangeName(e)}>
            <label
                className="relative text-sm flex flex-col font-medium"
                htmlFor="name"
            >
                Name
                <input
                required
                placeholder={displayName ? displayName : 'Add your name...'}
                className="border border-neutral-900 rounded py-1 px-1 lg:w-1/2 w-full h-[30px] text-lg md:text-sm focus:outline-none shadow-md"
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
                Name will be used in the account, you can always change it.
                        </label>
                        {!displayNameUpdated && <p className="text-xs text-red-500 mb-1">{displayNameError}</p>}
                        {displayNameUpdated && <p className="text-xs text-green-500 mb-1">{displayNameSuccess}</p>}
            <button className="w-fit shadow-md text-sm px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all" type="submit">Save changes</button>
            </form>
                </div>

                <div className="w-full h-px border-b border-zinc-900 mb-2"></div>

            <div>
                <h4 className="text-md font-bold mb-3">Email</h4>
            <form className="flex flex-col md:w-9/12 rounded mb-10" onSubmit={(e) => handleChangeEmail(e, newEmail)}>
                <label
                className="relative text-sm flex flex-col font-medium mb-2"
                htmlFor="name"
                >
                        Email address
                        {emailVerified &&
                        <span className="absolute left-24 top-0.5 text-xs text-green-600">Verified</span>
                        }
                        {(!emailVerified) &&
                        <span className="absolute left-24 top-0.5 text-xs text-red-500">Unverified</span>
                        }
                    <input

                    required
                    className="border border-neutral-900 rounded py-1 px-1 h-[30px] text-lg md:text-sm focus:outline-none shadow-md"
                    type="email"
                    id="email"
                    defaultValue={email ? email : newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                        />
                        The address is used to sign in to your account and also to reset your password.
                        </label>
                        {!emailUpdated && <p className="text-xs text-red-500 mb-1">{emailError}</p>}
                        {emailUpdated && <p className="text-xs text-green-500 mb-1">{emailSuccess}</p>}
                        <button className="w-fit shadow-md text-sm px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all" type="submit">Change email</button>
                        <button className="w-fit shadow-md text-sm px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all"
                        onClick={() => sendVerificationEmail()}
                        >Resend verification link</button>
                    </form>
                </div>

                <div className="w-full h-px border-b border-zinc-900 mb-2"></div>

            <div>
                <h4 className="text-md font-bold mb-3">Password</h4>
                <form className="flex flex-col md:w-9/12 rounded mb-10" onSubmit={(e) => handleUpdatePassword(e)}>
                <label
                className="relative text-sm flex flex-col font-medium"
                htmlFor="oldpass"
                >
                    Old password
                    <input
                    required
                    className="border border-neutral-900 rounded py-1 px-1 lg:w-1/2 h-[30px] text-lg md:text-sm mb-2 focus:outline-none"
                    type="password"
                    id="oldpass"
                    value={oldPassword}
                    onChange={(e) => handleOldPasswordChange(e)}
                    />
                </label>

                <label
                className="relative text-sm flex flex-col font-medium"
                htmlFor="newpass"
                >
                    New password
                    <input
                    required
                    className="border border-neutral-900 rounded py-1 px-1 lg:w-1/2 h-[30px] text-lg md:text-sm mb-2 focus:outline-none"
                    type="password"
                    id="newpass"
                    value={newPassword}
                    onChange={(e) => handleNewPasswordChange(e)}
                    />
                </label>
                <label
                className="relative text-sm flex flex-col font-medium"
                htmlFor="cofirmpass"
                >
                Confirm new password

                    <input
                    required
                    className="border border-neutral-900 rounded py-1 px-1 lg:w-1/2 h-[30px] text-lg md:text-sm mb-2 focus:outline-none"
                    type="password"
                    id="confirmpass"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e)}
                    />
                        </label>
                        {!passwordUpdated && <p className="text-xs text-red-500">{passwordError}</p>}
                        {passwordUpdated && <p className="text-xs text-green-500">{passwordSuccess}</p>}
                    <button className="w-fit shadow-md text-sm px-1 mb-1 h-[25px] bg-yellow-400 rounded md:hover:bg-sky-700 md:hover:text-white transition-all" type="submit">Change password</button>
                </form>
            </div>
                <div className="w-full h-px border-b border-zinc-900 mb-2"></div>
            </div>
        </div>
    );
}
