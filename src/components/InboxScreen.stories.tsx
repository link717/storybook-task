import type { Meta } from '@storybook/react';
import { rest } from 'msw';
import React from 'react';
import { Provider } from 'react-redux';
import InboxScreen from './InboxScreen';
import { MockedState } from './TaskList.stories';
import store from '../lib/store';

const meta = {
  component: InboxScreen,
  title: 'InboxScreen',
  decorators: [(story) => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
} satisfies Meta<typeof InboxScreen>;

export default meta;

export const Default = {
  parameters: {
    msw: {
      handlers: [
        rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (req, res, ctx) => {
          return res(ctx.json(MockedState.tasks));
        }),
      ],
    },
  },
};

export const Error = {
  parameters: {
    msw: {
      handlers: [
        rest.get('https://jsonplaceholder.typicode.com/todos?userId=1', (req, res, ctx) => {
          return res(ctx.status(403));
        }),
      ],
    },
  },
};
