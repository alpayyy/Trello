import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCards, moveTask } from '../../store/KanbanSlice/kanbanSlice';
import Column from './Column';

const StyledColumns = styled('div')({
  display: 'flex',
  margin: '10vh auto',
  width: '100%',
  gap: '16px',
  justifyContent: 'center',
  alignItems: 'flex-start'
});

function KanbanBoard() {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.kanban.lists);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserCards(user.id));
    }
  }, [user, dispatch]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    dispatch(moveTask({ source, destination }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <StyledColumns>
        {lists.map((list) => (
          <Column key={list.id} list={list} tasks={list.tasks} />
        ))}
      </StyledColumns>
    </DragDropContext>
  );
}

export default KanbanBoard;
