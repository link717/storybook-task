import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Provider } from 'react-redux';
import { TaskBoxType } from 'lib/store';
import { ITask } from './Task';
import * as TaskStories from './Task.stories';
import TaskList from './TaskList';

export const MockedState = {
  tasks: [
    { ...TaskStories.Default.args.task, id: '1', title: 'Task 1' },
    { ...TaskStories.Default.args.task, id: '2', title: 'Task 2' },
    { ...TaskStories.Default.args.task, id: '3', title: 'Task 3' },
    { ...TaskStories.Default.args.task, id: '4', title: 'Task 4' },
    { ...TaskStories.Default.args.task, id: '5', title: 'Task 5' },
    { ...TaskStories.Default.args.task, id: '6', title: 'Task 6' },
  ],
  status: 'idle',
  error: null,
} satisfies TaskBoxType;

interface IMockstoreProps extends React.PropsWithChildren {
  taskboxState: TaskBoxType;
}

// A super-simple mock of a redux store
const Mockstore = ({ taskboxState, children }: IMockstoreProps) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: 'taskbox',
          initialState: taskboxState,
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
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

const meta = {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{ padding: '3rem' }}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
} satisfies Meta<typeof TaskList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [(story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>],
};

export const WithPinnedTasks: Story = {
  decorators: [
    (story) => {
      const pinnedtasks = [...MockedState.tasks.slice(0, 5), { id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED' }] satisfies ITask[];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedtasks,
          }}
        >
          {story()}
        </Mockstore>
      );
    },
  ],
};

export const Loading: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          status: 'loading',
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};

export const Empty: Story = {
  decorators: [
    (story) => (
      <Mockstore
        taskboxState={{
          ...MockedState,
          tasks: [],
        }}
      >
        {story()}
      </Mockstore>
    ),
  ],
};
