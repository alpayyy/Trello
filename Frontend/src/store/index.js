import { configureStore } from '@reduxjs/toolkit';
import kanbanReducer from './KanbanSlice/kanbanSlice';
import authReducer from './AuthSlice/authSlice';

const store = configureStore({
  reducer: {
    kanban: kanbanReducer,
    auth: authReducer,
  },
});

export default store;
