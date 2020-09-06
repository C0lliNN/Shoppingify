import React from 'react';
import App from '../../App';
import { render, fireEvent, waitForElement } from '@testing-library/react';
import { Provider } from 'react-redux';
import * as actionCreators from '../../store/actions/index';
import axios from 'axios';
import store from '../../store';

jest.mock('axios');

beforeEach(() => {
  axios.mockClear();
});

function mockAxios() {
  axios.create.mockImplementation(() => {
    return {
      post: () =>
        Promise.resolve({
          data: { token: 'TOKEN', expiresIn: 3600, name: 'Raphael' },
        }),
      get: () =>
        Promise.resolve({
          data: [
            {
              _id: '1',
              name: 'Banana',
              category: { _id: '11', name: 'fruit' },
              image: null,
            },
          ],
        }),
    };
  });
}

describe('<Logout/>', () => {
  it('should return to the login page after the logout button is pressed', async () => {
    mockAxios();

    const { getByLabelText, getByText } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    store.dispatch(actionCreators.loginHandler('test@test.com', '11111111'));

    await waitForElement(() => getByText('power_settings_new'));
    fireEvent.click(getByText('power_settings_new'));

    await waitForElement(() => getByLabelText('Email'));
    expect(getByLabelText('Password')).not.toBeNull();
  });
});
