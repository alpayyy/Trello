import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Task({ task, onTaskClick }) {
  const handleClickOpen = () => {
    onTaskClick(task);
  };

  return (
    <Card
      style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', width: '100%' }}
      onClick={handleClickOpen}
    >
      <CardContent>
        <Typography>{task.title}</Typography>
        <Typography style={{ color: '#A4A4A4', width: '100%' }} variant="body2" component="p">
          {task.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Task;
