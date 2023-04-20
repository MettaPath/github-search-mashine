import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { Login } from './components/Login';
import { ResetPass } from './components/ResetPass';



function App() {
  return (
    <>
      <Navigation />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<RegistrationForm />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/resetpass" element={<ResetPass />} />
          </Routes>
      <Footer />
    </>
  );
}

export default App;
