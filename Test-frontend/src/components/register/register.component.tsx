import React, { useState } from 'react';
import axiosInstance from '../../interceptor/axiosInstance';
import { useNavigate } from 'react-router-dom';
import './register.css';
const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();
  
    const handleRegister = async () => {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden');
        return;
      }
  
      try {
        const response = await axiosInstance.post('/auth/register', {
          email,
          password,
        });
        setSuccess('Registro exitoso. Redirigiendo al login...');
        setTimeout(() => navigate('/'), 2000);
      } catch (error) {
        setError('Error al registrarse. Verifica los datos ingresados.');
      }
    };
  
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7fc',
        padding: '20px',
      }}>
        <h1 style={{ fontSize: '2rem', color: '#333', marginBottom: '20px' }}>Registro</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={{
              margin: '10px 0',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            style={{
              margin: '10px 0',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirmar Contraseña"
            style={{
              margin: '10px 0',
              padding: '12px',
              fontSize: '1rem',
              border: '1px solid #ccc',
              borderRadius: '4px',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            style={{
              marginTop: '15px',
              padding: '12px',
              backgroundColor: '#4a90e2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
              cursor: 'pointer',
            }}
          >
            Registrarse
          </button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <p>
        ¿Ya tienes cuenta?{' '}
        <span
          onClick={() => navigate('/')}
          style={{ color: '#4a90e2', cursor: 'pointer' }}
        >
          Inicia sesión aquí
        </span>
      </p>
      </div>
    );
  };
  
  export default Register;
  