import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase-config';
import { TextField, Button, Typography, Box } from '@mui/material';
import './AuthForm.css';  // Importando o arquivo de estilos CSS

const AuthForm = ({ onAuthSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(''); // Limpa erros anteriores
    try {
      if (isLogin) {
        if (!email || !password) {
          setError('Email e senha são obrigatórios.');
          return;
        }
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        if (!email || !password) {
          setError('Email e senha são obrigatórios.');
          return;
        }
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onAuthSuccess();
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <Box className="auth-container">
      <Box className="auth-form">
        <Typography variant="h5" className="auth-title">
          {isLogin ? 'Login' : 'Sign Up'}
        </Typography>
        {error && <Typography className="auth-error">{error}</Typography>}
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            type="email"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-field"
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-field"
          />
          <Box className="auth-buttons">
            <Button type="submit" variant="contained" color="primary" className="auth-button">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
            <Button onClick={() => setIsLogin(!isLogin)} color="secondary" className="auth-toggle-button">
              {isLogin ? 'Create an Account' : 'Login with Existing Account'}
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AuthForm;
