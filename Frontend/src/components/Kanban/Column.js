import React, { useState } from 'react';
import { Paper, Button, useTheme, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Delete } from '@mui/icons-material';
import Task from './Task';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { useDispatch } from 'react-redux';
import { addTask, updateTask, deleteCard } from '../../store/KanbanSlice/kanbanSlice';
import CardDialog from './CardDialog';
import UpdateCard from '../UpdateCard';

function Column({ list, tasks }) {
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleClickOpen = (task) => {
    setSelectedTask(task);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTask(null);
  };

  const handleSaveTask = (taskId, taskData) => {
    if (taskData.title.trim()) {
      if (taskId) {
        dispatch(updateTask({ taskId, ...taskData }));
      } else {
        dispatch(addTask({ listId: list.id, ...taskData }));
      }
      handleClose();
    }
  };

  const handleDeleteClick = () => {
    setConfirmOpen(true);
  };

  const handleConfirmClose = () => {
    setConfirmOpen(false);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteCard(list.id));
    setConfirmOpen(false);
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <UpdateCard list={list} />
        <IconButton onClick={handleDeleteClick} size="small">
          <Delete fontSize="small" />
        </IconButton>
      </div>

      <Droppable droppableId={list.id.toString()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {tasks && tasks
              .slice()  // Array'in kopyasını almak için slice() kullanın
              .sort((a, b) => a.taskOrder - b.taskOrder)
              .map((task, index) => (
                <Draggable key={task.id} draggableId={task.id.toString()} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={{ marginBottom: '8px', ...provided.draggableProps.style }}
                    >
                      <Task task={task} onTaskClick={handleClickOpen} />
                    </div>
                  )}
                </Draggable>
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      <Button variant="outlined" style={{ color: '#000000', borderColor: '#000000' }} onClick={() => handleClickOpen(null)}>
        + Görev ekle
      </Button>

      <CardDialog open={open} handleClose={handleClose} card={selectedTask} handleSaveTask={handleSaveTask} />

      <Dialog
        open={confirmOpen}
        onClose={handleConfirmClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Kartı silmek istediğinize emin misiniz?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Bu işlem geri alınamaz.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Hayır
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Evet
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

export default Column;
