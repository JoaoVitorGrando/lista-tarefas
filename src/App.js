import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase-config';
import AuthForm from './components/authForm';
import TaskList from './components/TaskList';
import { Container, Typography } from '@mui/material';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Container>
        <Routes>
          <Route
            path="/"
            element={user ? <TaskList /> : <Navigate to="/login" />}
          />
          <Route
            path="/login"
            element={!user ? <AuthForm onAuthSuccess={() => setUser(auth.currentUser)} /> : <Navigate to="/" />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
