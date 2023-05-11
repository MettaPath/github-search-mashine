import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { Login } from './components/Login';
import { ResetPass } from './components/ResetPass';
import { Profile } from './components/Profile';

function App() {
	const location = useLocation();
	const [previousPath, setPreviousPath] = useState('');

	useEffect(() => {
		if (previousPath !== location.pathname) {
			setPreviousPath(location.pathname);
			localStorage.setItem('previousPath', location.pathname);
		}
	}, [location.pathname, previousPath]);

	useEffect(() => {
		const previousPath = localStorage.getItem('previousPath');
		if (previousPath && previousPath !== '/') {
			setPreviousPath(previousPath);
		}
	}, []);

	return (
		<>
			<Navigation />
			<Routes location={previousPath || location}>
				<Route path="/" element={<HomePage />} />
				<Route path="/signup" element={<RegistrationForm />} />
				<Route path="/login" element={<Login />} />
				<Route path="/favorites" element={<FavoritesPage />} />
				<Route path="/resetpass" element={<ResetPass />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
			<Footer />
		</>
	);
}

export default App;
