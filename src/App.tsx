import React, { useEffect } from 'react';
import { Route, Routes, useNavigate} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';
import { RegistrationForm } from './components/RegistrationForm';
import { Login } from './components/Login';
import { ResetPass } from './components/ResetPass';



function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const existingRoutes = ["/", "/favorites", "/login", "/signup", "/resetpass"];
    const path = window.location.pathname.replace(/\/github-search-mashine/, "");
    const isExistingRoute = existingRoutes.includes(path);
    if (!isExistingRoute) {
      navigate("/github-search-mashine/");
    }
  }, [navigate]);

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
