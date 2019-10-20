import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
import App from '../App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

describe('App', () => {
  test('Should render without error', async () => {
    act(() => {
      ReactDOM.render(<App />, container);
    });

    expect(pretty(container.innerHTML)).toMatchSnapshot();
  });
});
