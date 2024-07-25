import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_ENDPOINT = "http://localhost:8080/api";

export const fetchUserCards = createAsyncThunk(
  'kanban/fetchUserCards',
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_ENDPOINT}/cards/user/${userId}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const addTask = createAsyncThunk(
  'kanban/addTask',
  async ({ listId, ...taskData }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_ENDPOINT}/tasks/card/${listId}`, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const updateTask = createAsyncThunk(
  'kanban/updateTask',
  async ({ taskId, ...taskData }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}/tasks/${taskId}`, taskData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const moveTask = createAsyncThunk(
  'kanban/moveTask',
  async ({ taskId, sourceCardId, destinationCardId }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}/tasks/move`, {
        taskId,
        sourceCardId,
        destinationCardId
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: {
    lists: [],
    loading: false,
    error: null
  },
  reducers: {
    updateList: (state, action) => {
      const listIndex = state.lists.findIndex(list => list.id === action.payload.id);
      if (listIndex > -1) {
        state.lists[listIndex] = action.payload;
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCards.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCards.fulfilled, (state, action) => {
        state.loading = false;
        state.lists = action.payload;
      })
      .addCase(fetchUserCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const list = state.lists.find(list => list.id === action.payload.cardId);
        if (list) {
          list.tasks.push(action.payload);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const list = state.lists.find(list => list.tasks.some(task => task.id === action.payload.id));
        if (list) {
          const taskIndex = list.tasks.findIndex(task => task.id === action.payload.id);
          if (taskIndex > -1) {
            list.tasks[taskIndex] = action.payload;
          }
        }
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const { id, cardId } = action.payload;
        const sourceList = state.lists.find(list => list.tasks.some(task => task.id === id));
        const destinationList = state.lists.find(list => list.id === cardId);

        if (sourceList && destinationList) {
          const task = sourceList.tasks.find(task => task.id === id);
          if (task) {
            sourceList.tasks = sourceList.tasks.filter(task => task.id !== id);
            destinationList.tasks.push(task);
          }
        }
      });
  }
});

export const { updateList } = kanbanSlice.actions;

export default kanbanSlice.reducer;
