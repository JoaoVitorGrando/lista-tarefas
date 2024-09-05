import React, { useState, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, where } from 'firebase/firestore';
import { db, auth } from '../firebase-config';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import TaskItem from './taskItem';
import { TextField, Button, List, Typography, Box } from '@mui/material';
import './TaskList.css';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (user) {
      const tasksQuery = query(collection(db, 'tasks'), where('userId', '==', user.uid));
      const unsubscribe = onSnapshot(tasksQuery, (snapshot) => {
        const tasksList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTasks(tasksList);
      });
      return () => unsubscribe();
    }
  }, [user]);

  const handleAddTask = async () => {
    if (newTask.trim() && user) {
      await addDoc(collection(db, 'tasks'), { text: newTask, userId: user.uid });
      setNewTask('');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout Error:', error);
    }
  };

  return (
    <Box className="tasklist-container">
      <Box className="tasklist-content">
        <Typography variant="h5" className="tasklist-title">Tasks</Typography>
        <Button onClick={handleLogout} variant="outlined" color="secondary" className="tasklist-button">
          Logout
        </Button>
        <TextField
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          label="New Task"
          fullWidth
          margin="normal"
          className="tasklist-input"
        />
        <Button onClick={handleAddTask} variant="contained" color="primary" className="tasklist-button">
          Add Task
        </Button>
        <List className="tasklist-items">
          {tasks.map(task => (
            <TaskItem key={task.id} task={task} />
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default TaskList;
