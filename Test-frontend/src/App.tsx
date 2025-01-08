import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login/login.component';
import Register from './components/register/register.component';
import Dashboard from './Dashboard/dashboard.component';
import ProyectosComponent from './components/Project/proyecto.component'; 
import ProyectoDetalle from './components/ProyectDetails/proyecto-detalles';
import ProyectoEditar from './components/EditProject/editar-proyecto.component';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/proyectos" element={<ProyectosComponent />} />
        <Route path="/project/:id" element={<ProyectoDetalle />} />
        <Route path="/project/editar/:id" element={<ProyectoEditar />} />
      </Routes>
    </Router>
  );
};

export default App;
