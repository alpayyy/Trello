import React, { useState } from 'react';
import { Input, IconButton, Typography } from '@mui/material';
import { Edit, Save, Cancel } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { updateCardTitle } from '../store/KanbanSlice/kanbanSlice';

const UpdateCard = ({ list }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(list.title);

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleSave = () => {
    dispatch(updateCardTitle({ cardId: list.id, title: newTitle }));
    setIsEditing(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleTitleSave();
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
      {isEditing ? (
        <>
          <Input 
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleSave}
            onKeyDown={handleKeyDown}
            style={{ flexGrow: 1, marginRight: '8px', backgroundColor: "white" }}
          />
          <IconButton onClick={handleTitleSave} size="small">
            <Save fontSize="small" />
          </IconButton>
          <IconButton onClick={() => setIsEditing(false)} size="small">
            <Cancel fontSize="small" />
          </IconButton>
        </>
      ) : (
        <>
          <Typography style={{ color: '#000000', flexGrow: 1 }} variant="h6" gutterBottom>
            {list.title}
          </Typography>
          <IconButton onClick={() => setIsEditing(true)} size="small">
            <Edit fontSize="small" />
          </IconButton>
        </>
      )}
    </div>
  );
};

export default UpdateCard;
