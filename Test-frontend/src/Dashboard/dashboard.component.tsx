import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './dashboard.css'; 

const Dashboard = () => {
  const navigate = useNavigate();

 
  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      navigate('/'); 
    }
  }, [navigate]);

  return (
    <div className="dashboard-container">
      <h1>Bienvenido al Dashboard</h1>
      <p>Decide qué gestionar:</p>
      <div className="buttons-container">
        <button
          onClick={() => navigate('/proyectos')} 
        >
          Gestionar Proyectos
        </button>
        <button
          onClick={() => navigate('/tasks')} 
        >
          Gestionar Tareas
        </button>
      </div>
      <button
        onClick={() => {
          localStorage.removeItem('access_token'); 
          navigate('/'); 
        }}
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
