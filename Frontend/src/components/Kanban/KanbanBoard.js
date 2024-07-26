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
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {

      const list = lists.find(list => list.id.toString() === source.droppableId);
      const updatedTasks = Array.from(list.tasks);
      const [movedTask] = updatedTasks.splice(source.index, 1);
      updatedTasks.splice(destination.index, 0, movedTask);

      const updatedList = {
        ...list,
        tasks: updatedTasks,
      };

      dispatch({
        type: 'kanban/updateList',
        payload: updatedList
      });
    } else {
      dispatch(moveTask({
        taskId: draggableId,
        sourceCardId: source.droppableId,
        destinationCardId: destination.droppableId
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
