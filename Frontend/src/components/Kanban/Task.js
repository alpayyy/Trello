import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function Task({ card, onCardClick }) {
  const handleClickOpen = () => {
    onCardClick(card);
  };

  return (
    <Card
      style={{ backgroundColor: '#3A3A3A', color: '#FFFFFF', width: '100%' }}
      onClick={handleClickOpen}
    >
      <CardContent>
        <Typography>{card.title}</Typography>
        <Typography style={{ color: '#A4A4A4', width: '100%' }} variant="body2" component="p">
          {card.description}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default Task;
