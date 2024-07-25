import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, Input } from '@mui/material';
import { createCardForUser, fetchUserCards } from '../store/KanbanSlice/kanbanSlice'; // Make sure the action is correctly imported

const AddCard = ({ userId }) => {
    const [cardName, setCardName] = useState('');
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);


    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardName.trim() !== '') {
            dispatch(createCardForUser({ userId, title: cardName }));
            setCardName('');
        }
        dispatch(fetchUserCards(user.id));
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Input
                type="text"
                placeholder='Card name'
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
            />
            <Button
                sx={{ marginTop: "5px" }}
                variant="contained"
                color="primary"
                type="submit"
            >
                Add Card
            </Button>
        </Box>
    );
}

export default AddCard;
