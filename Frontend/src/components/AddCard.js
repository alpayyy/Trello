import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Paper, Input, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { createCardForUser } from '../store/KanbanSlice/kanbanSlice';

const AddCard = ({ userId }) => {
    const [cardName, setCardName] = useState('');
    const [confirmOpen, setConfirmOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardName.trim() !== '') {
            setConfirmOpen(true);
        }
    };

    const handleConfirmClose = () => {
        setConfirmOpen(false);
    };

    const handleConfirmAddCard = () => {
        dispatch(createCardForUser({ userId, title: cardName }));
        setCardName('');
        setConfirmOpen(false);
    };

    return (
        <Paper
            component="form"
            onSubmit={handleSubmit}
            sx={{
                padding: '16px',
                backgroundColor: 'secondary.main',
                color: '#FFFFFF',
                width: '100%',
                maxWidth: '200px',
                maxHeight: '100px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                margin: '10vh auto',
                justifyContent: 'center',
            }}
        >
            <Input
                type="text"
                placeholder='Card name'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                sx={{
                    backgroundColor: 'white',
                    marginBottom: '8px',
                    width: '100%',
                    padding: '8px',
                    borderRadius: '4px',
                }}
            />
            <Button
                variant="contained"
                color="secondary"
                type="submit"
                sx={{ width: '100%', border: '1px solid ' }}
            >
                Kart Ekle
            </Button>

            <Dialog
                open={confirmOpen}
                onClose={handleConfirmClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Kartı eklemek istediğinize emin misiniz?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Bu işlem yeni bir kart oluşturacaktır. Kartı eklemek istediğinizden emin misiniz?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmClose} color="primary">
                        Hayır
                    </Button>
                    <Button onClick={handleConfirmAddCard} color="primary" autoFocus>
                        Evet
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}

export default AddCard;
