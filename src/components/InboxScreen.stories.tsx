import type { Meta } from '@storybook/react';
import { fireEvent, waitFor, waitForElementToBeRemoved, within } from '@storybook/testing-library';
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
  play: async ({ canvasElement }: { canvasElement: HTMLCanvasElement }) => {
    const canvas = within(canvasElement);
    // Waits for the component to transition from the loading state
    await waitForElementToBeRemoved(await canvas.findByTestId('loading'));
    // Waits for the component to be updated based on the store
    await waitFor(() => {
      // Simulates pinning the first task
      fireEvent.click(canvas.getByLabelText('pinTask-1'));
      // Simulates pinning the third task
      fireEvent.click(canvas.getByLabelText('pinTask-3'));
    });
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
