import React, { useState } from 'react';
import { Paper, Typography, Button, useTheme } from '@mui/material';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { addCard, updateCard } from '../../store/KanbanSlice/kanbanSlice';
import CardDialog from './CardDialog';

function Column({ list, cards }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const handleClickOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  const handleAddCard = (cardData) => {
    if (cardData.title.trim()) {
      dispatch(addCard({ listId: list.id, ...cardData }));
      handleClose();
    }
  };

  const handleUpdateCard = (id, cardData) => {
    dispatch(updateCard({ cardId: id, ...cardData }));
  };

  return (
    <Paper
      elevation={5}
      style={{
        padding: '16px',
        backgroundColor: theme.palette.secondary.main,
        color: '#FFFFFF',
        width: '100%',
        maxWidth: '300px',
        height: 'auto',
      }}
    >
      <Typography style={{ color: theme.palette.customBlack.main }} variant="h6" gutterBottom>
        {list.title}
      </Typography>

      <Droppable droppableId={list.id}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {cards.map((card, index) => (
              <Draggable key={card.id} draggableId={card.id.toString()} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{ marginBottom: '8px', ...provided.draggableProps.style }}
                  >
                    <Task card={card} onCardClick={handleClickOpen} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button variant="outlined" style={{ color: '#000000', borderColor: '#000000' }} onClick={() => handleClickOpen(null)}>
        + Kart ekle
      </Button>

      <CardDialog open={open} handleClose={handleClose} card={selectedCard} handleAddCard={handleAddCard} handleUpdateCard={handleUpdateCard} />
    </Paper>
  );
}

export default Column;
