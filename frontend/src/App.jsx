// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import GetStartedPage from './pages/GetStarted';  // Ta page d'accueil publique
import AuthPage from './pages/Auth';                  // Page connexion/inscription
import HomePage from './pages/Home';                  // Page Todo List (protégée)
import ErrorPage from './pages/ErrorPage';            // Page 404
import ProtectedRoute from './components/ProtectRoute';
import RouteLayout from './layouts/RouteLayout';  // layout avec gestion du loader
import ThemeToggle from './components/ThemeToggle';
// import BrowserTranslateToggle from './components/BrowserTranslateToggle';
// import LanguageToggle from './components/LanguageToggle';

function App() {
  return (
    <BrowserRouter>
      <RouteLayout>  {/* ← Tout est enveloppé ici */}
        <Routes>
          <Route path="/" element={<Navigate to="/getstarted" replace />} />
          <Route path="/getstarted" element={<GetStartedPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<HomePage />} />
          </Route>

          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <ThemeToggle />
        {/* <LanguageToggle /> */}
      </RouteLayout>
    </BrowserRouter>
  );
}

export default App;