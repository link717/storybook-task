/* eslint-disable no-param-reassign */
/* A simple redux store/actions/reducer implementation.
 * A true app would be more complex and separated into different files.
 */
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ITask } from 'components/Task';

export type TaskBoxType = {
  tasks: ITask[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
};

const TaskBoxData: TaskBoxType = {
  tasks: [],
  status: 'idle',
  error: null,
};

/*
 * Creates an asyncThunk to fetch tasks from a remote endpoint.
 * You can read more about Redux Toolkit's thunks in the docs:
 * https://redux-toolkit.js.org/api/createAsyncThunk
 */

interface ITaskResponseData {
  id: string;
  title: string;
  completed: boolean;
}

export const fetchTasks = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos?userId=1');
  const data = await response.json();
  const result = data.map((task: ITaskResponseData) => ({
    id: `${task.id}`,
    title: task.title,
    state: task.completed ? 'TASK_ARCHIVED' : 'TASK_INBOX',
  }));
  return result;
});

/*
 * The store is created here.
 * You can read more about Redux Toolkit's slices in the docs:
 * https://redux-toolkit.js.org/api/createSlice
 */
const TasksSlice = createSlice({
  name: 'taskbox',
  initialState: TaskBoxData,
  reducers: {
    updateTaskState: (state, action) => {
      const { id, newTaskState } = action.payload;
      const taskIndex = state.tasks.findIndex((task) => task.id === id);
      if (taskIndex >= 0) {
        // eslint-disable-next-line no-param-reassign
        state.tasks[taskIndex].state = newTaskState;
      }
    },
  },
  /*
   * Extends the reducer for the async actions
   * You can read more about it at https://redux-toolkit.js.org/api/createAsyncThunk
   */
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
        state.error = null;
        state.tasks = [];
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        // Add any fetched tasks to the array
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state) => {
        state.status = 'failed';
        state.error = 'Something went wrong';
        state.tasks = [];
      });
  },
});

// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
  reducer: {
    taskbox: TasksSlice.reducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
