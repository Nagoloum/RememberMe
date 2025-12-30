// src/layouts/RouteLayout.jsx
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Loader from '../components/Loader';

export default function RouteLayout({ children }) {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Déclenche le loader à chaque changement de route
    setLoading(true);

    // Simule un petit délai pour une transition fluide (même si la page charge instantanément)
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); // 600ms → ajuste selon ton goût (400-800ms est idéal)

    return () => clearTimeout(timer);
  }, [location.pathname]); // Dépend du chemin

  return (
    <>
      {loading && <Loader />}
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </>
  );
}