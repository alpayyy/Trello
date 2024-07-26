import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Button, Paper, Input } from '@mui/material';
import { createCardForUser } from '../store/KanbanSlice/kanbanSlice';
const AddCard = ({ userId }) => {
    const [cardName, setCardName] = useState('');
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardName.trim() !== '') {
            dispatch(createCardForUser({ userId, title: cardName }));
            setCardName('');
        }
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
                gap:"16px" ,
                margin: '10vh auto',
                justifyContent:"center",

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
                sx={{ width: '100%', border: "1px solid " }}
            >
                Kart Ekle
            </Button>
        </Paper>
    );
}

export default AddCard;
