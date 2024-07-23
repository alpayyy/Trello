import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { moveCard } from '../../store/KanbanSlice/kanbanSlice';
import Column from './Column';

const StyledColumns = styled('div')({
  display: 'flex',
  margin: '10vh auto',
  width: '100%',  // Genişliği arttırdık
  gap: '16px',  // Aralıkları biraz açtık
  justifyContent: 'center',  // Ortalanmış sütunlar
  alignItems: 'flex-start'  // Sütunların üstten hizalanması
});

function KanbanBoard() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.kanban.lists);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    dispatch(moveCard({ source, destination }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {lists.map((list) => (
          <Column key={list.id} list={list} cards={list.cards} />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
}

export default KanbanBoard;