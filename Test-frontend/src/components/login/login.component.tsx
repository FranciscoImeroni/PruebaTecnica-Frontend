import React, { useState } from 'react';
import AuthService from '../../services/auth/auth.service';
import './login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const data = await AuthService.login(email, password);
      console.log('Usuario autenticado:', data);

    
      navigate('/dashboard'); 

    } catch (err) {
      setError('Error al iniciar sesión. Verifique sus credenciales.');
    }
  };

  return (
    <div className="login-container">
      <h1>Iniciar Sesión</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
        />
        <button type="submit">Iniciar Sesión</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        ¿No tienes cuenta?{' '}
        <span
          onClick={() => navigate('/register')}
          style={{ color: '#4a90e2', cursor: 'pointer' }}
        >
          Regístrate aquí
        </span>
      </p>
    </div>
  );
};

export default Login;
