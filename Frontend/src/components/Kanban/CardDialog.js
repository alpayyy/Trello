import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { deleteTask } from "../../store/KanbanSlice/kanbanSlice"
function CardDialog({ open, handleClose, card, handleSaveTask }) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (card) {
      setCardTitle(card.title);
      setCardDescription(card.description || '');
    } else {
      setCardTitle('');
      setCardDescription('');
    }
  }, [card]);

  const handleSave = () => {
    const cardData = {
      title: cardTitle,
      description: cardDescription,
    };
    handleSaveTask(card ? card.id : null, cardData);
    setCardTitle(''); // Form alanını temizlemek için eklenmiştir
    setCardDescription(''); // Form alanını temizlemek için eklenmiştir
    handleClose();
  };

  const handleDelete = () => {
    if (card) {
      dispatch(deleteTask(card.id));
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{card ? 'Görevi Güncelle' : 'Yeni Görev Ekle'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lütfen görev bilgilerini girin.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Görev Başlığı"
          fullWidth
          variant="outlined"
          value={cardTitle}
          onChange={(e) => setCardTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Açıklama"
          fullWidth
          variant="outlined"
          value={cardDescription}
          onChange={(e) => setCardDescription(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
      
      {card && (
          <Button style={{backgroundColor:"red", color:"white"}} onClick={handleDelete} >
            Görevi Sil
          </Button>
        )}
        <Button onClick={handleClose} color="primary">
          İptal
        </Button>
        <Button onClick={handleSave} color="primary">
          {card ? 'Güncelle' : 'Ekle'}
        </Button>
        
      </DialogActions>
    </Dialog>
  );
}

export default CardDialog;
