import React, { useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserCards, moveTask, reorderTasksWithinColumn, updateList } from '../../store/KanbanSlice/kanbanSlice';
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
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      dispatch(reorderTasksWithinColumn({
        cardId: source.droppableId,
        taskId: draggableId,
        newOrder: destination.index
      }));
    } else {
      dispatch(moveTask({
        taskId: draggableId,
        sourceCardId: source.droppableId,
        destinationCardId: destination.droppableId,
        newOrder: destination.index,
        userId: user.id
      }));
    }
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
