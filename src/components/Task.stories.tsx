import type { Meta, StoryObj } from '@storybook/react';
import Task from './Task';

const meta = {
  component: Task,
} satisfies Meta<typeof Task>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default = {
  args: {
    task: {
      id: '1',
      title: 'Test Task',
      state: 'TASK_INBOX',
    },
  },
} satisfies Story;

export const Pinned: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_PINNED',
    },
  },
};

export const Archived: Story = {
  args: {
    task: {
      ...Default.args.task,
      state: 'TASK_ARCHIVED',
    },
  },
};
