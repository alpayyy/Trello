import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';

function CardDialog({ open, handleClose, card, handleAddCard, handleUpdateCard }) {
  const [cardTitle, setCardTitle] = useState('');
  const [cardDescription, setCardDescription] = useState('');


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
    if (card) {
      handleUpdateCard(card.id, cardData);
    } else {
      handleAddCard(cardData);
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{card ? 'Kartı Güncelle' : 'Yeni Kart Ekle'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Lütfen kart bilgilerini girin.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Kart Başlığı"
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
