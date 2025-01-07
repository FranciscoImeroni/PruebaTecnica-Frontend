import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/login'); // Redirigir si no está autenticado
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <p>Contenido exclusivo para usuarios autenticados.</p>
      <button
        onClick={() => {
          localStorage.removeItem('jwtToken'); // Elimina el token
          navigate('/login'); // Redirige al login
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
