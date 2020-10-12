import React from 'react';
import 'jest-styled-components';
import { render } from '../../tests/utilities';
import Login from '.';
import {
  fireEvent,
  waitForElementToBeRemoved,
  waitForElement,
} from '@testing-library/react';
import axios from 'axios';

let email;
let password;

function exec() {
  const { getByText, getAllByText, getByLabelText } = render(<Login />);

  fireEvent.change(getByLabelText('Email'), { target: { value: email } });
  fireEvent.change(getByLabelText('Password'), { target: { value: password } });
  fireEvent.click(getAllByText('Login')[1]);

  return { getByText, getAllByText, getByLabelText };
}

jest.mock('axios');

describe('<Login/>', () => {
  beforeEach(() => {
    email = 'test@test.com';
    password = '111111111';
  });

  it('should render correctly', () => {
    const { container } = render(<Login />);
    expect(container).toMatchSnapshot();
  });
  it('should show an error modal if the email is empty', () => {
    email = '';

    const { getByText } = exec();

    expect(getByText('The email is required')).not.toBeNull();
  });
  it('should show an error modal if the email is not valid', () => {
    email = '11111';

    const { getByText } = exec();

    expect(getByText('Invalid Email Format')).not.toBeNull();
  });
  it('show an error modal if the password is empty', () => {
    password = '';

    const { getByText } = exec();

    expect(getByText('The password is required')).not.toBeNull();
  });
  it('should login successfully if email and password are valid', async () => {
    axios.create.mockImplementationOnce(() => {
      return {
        post: () =>
          Promise.resolve({
            data: {
              token: 'TOKEN_EXP',
              expiresIn: 3600,
              name: 'Test',
            },
          }),
      };
    });

    const { getByText } = exec();

    await waitForElementToBeRemoved(() => getByText('Login'));
  });
  it('should show an error if the server responds with 4xx or 5xx', async () => {
    axios.create.mockImplementationOnce(() => {
      return {
        post: () => Promise.reject(new Error('Invalid Email')),
      };
    });

    const { getByText } = exec();

    await waitForElement(() => getByText('Something Went Wrong!'));
  });
});
