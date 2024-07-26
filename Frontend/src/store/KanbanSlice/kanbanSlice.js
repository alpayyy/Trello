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

export const deleteTask = createAsyncThunk(
  'kanban/deleteTask',
  async (taskId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_ENDPOINT}/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const deleteCard = createAsyncThunk(
  'kanban/deleteCard',
  async (cardId, { rejectWithValue }) => {
    try {
      await axios.delete(`${BASE_ENDPOINT}/cards/${cardId}`);
      return cardId;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const updateCardTitle = createAsyncThunk(
  'kanban/updateCardTitle',
  async ({ cardId, title }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}/cards/${cardId}`, { title });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const moveTask = createAsyncThunk(
  'kanban/moveTask',
  async ({ taskId, sourceCardId, destinationCardId, newOrder }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}/tasks/move`, {
        taskId,
        sourceCardId,
        destinationCardId,
        newOrder
      });

      // Veritabanından task'ları tekrar fetch et
      const userId = getState().auth.user.id;
      await dispatch(fetchUserCards(userId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);
export const reorderTasksWithinColumn = createAsyncThunk(
  'kanban/reorderTasksWithinColumn',
  async ({ cardId, taskId, newOrder }, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await axios.put(`${BASE_ENDPOINT}/tasks/move`, {
        taskId,
        sourceCardId: cardId,
        destinationCardId: cardId,
        newOrder
      });

      // Veritabanından task'ları tekrar fetch et
      const userId = getState().auth.user.id;
      await dispatch(fetchUserCards(userId));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data.error : 'Network error');
    }
  }
);

export const createCardForUser = createAsyncThunk(
  'kanban/createCardForUser',
  async ({ userId, title }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_ENDPOINT}/cards/user/${userId}`, { title });
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
        state.lists = action.payload.map(list => ({
          ...list,
          tasks: list.tasks.sort((a, b) => a.taskOrder - b.taskOrder)
        }));
      })
      .addCase(fetchUserCards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const list = state.lists.find(list => list.id === action.payload.cardId);
        if (list) {
          if (!list.tasks) list.tasks = [];
          list.tasks.push(action.payload);
          list.tasks.sort((a, b) => a.taskOrder - b.taskOrder);
        }
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const list = state.lists.find(list => list.tasks.some(task => task.id === action.payload.id));
        if (list) {
          const taskIndex = list.tasks.findIndex(task => task.id === action.payload.id);
          if (taskIndex > -1) {
            list.tasks[taskIndex] = action.payload;
            list.tasks.sort((a, b) => a.taskOrder - b.taskOrder);
          }
        }
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        // Task'ları fetchUserCards ile yenileme işlemi yapılacağı için burada işlem yapmaya gerek yok
      })
      .addCase(reorderTasksWithinColumn.fulfilled, (state, action) => {
        // Task'ları fetchUserCards ile yenileme işlemi yapılacağı için burada işlem yapmaya gerek yok
      })
      .addCase(createCardForUser.fulfilled, (state, action) => {
        state.lists.push({
          ...action.payload,
          tasks: []
        });
      })
      .addCase(deleteCard.fulfilled, (state, action) => {
        state.lists = state.lists.filter(list => list.id !== action.payload);
      })
      .addCase(updateCardTitle.fulfilled, (state, action) => {
        const listIndex = state.lists.findIndex(list => list.id === action.payload.id);
        if (listIndex > -1) {
          state.lists[listIndex].title = action.payload.title;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const list = state.lists.find(list => list.tasks.some(task => task.id === action.payload));
        if (list) {
          list.tasks = list.tasks.filter(task => task.id !== action.payload);
          list.tasks.sort((a, b) => a.taskOrder - b.taskOrder);
        }
      });
  }
});

export const { updateList } = kanbanSlice.actions;

export default kanbanSlice.reducer;
