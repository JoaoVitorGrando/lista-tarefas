import React, { useState } from 'react';
import { Button, TextField, ListItem, ListItemText, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';

const TaskItem = ({ task }) => {
  const [editing, setEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleEdit = async () => {
    if (editing && newText.trim()) {
      await updateDoc(doc(db, 'tasks', task.id), { text: newText });
    }
    setEditing(!editing);
  };

  const handleDelete = async () => {
    await deleteDoc(doc(db, 'tasks', task.id));
  };

  return (
    <ListItem>
      {editing ? (
        <TextField
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          onBlur={handleEdit}
          autoFocus
        />
      ) : (
        <ListItemText primary={task.text} />
      )}
      <IconButton onClick={handleEdit}>
        <EditIcon />
      </IconButton>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};

export default TaskItem;
