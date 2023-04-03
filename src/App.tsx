import React from 'react';
import { Route, Routes} from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { FavoritesPage } from './pages/FavoritesPage';
import { HomePage } from './pages/HomePage';
import { Footer } from './components/Footer';

function App() {
  return (
    <>
      <Navigation />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/favorites" element={<FavoritesPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
