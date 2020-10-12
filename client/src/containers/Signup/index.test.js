import React from 'react';
import { render } from '../../tests/utilities';
import Signup from '.';
import 'jest-styled-components';
import {
  fireEvent,
  waitForElement,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import axios from 'axios';

const payload = {
  name: null,
  email: null,
  password: null,
  passwordConfirmation: null,
};

jest.mock('axios');

function exec() {
  const { getByText, getAllByText, getByLabelText } = render(<Signup />);

  fireEvent.change(getByLabelText('Name'), { target: { value: payload.name } });
  fireEvent.change(getByLabelText('Email'), {
    target: { value: payload.email },
  });
  fireEvent.change(getByLabelText('Password'), {
    target: { value: payload.password },
  });
  fireEvent.change(getByLabelText('Confirm Password'), {
    target: { value: payload.passwordConfirmation },
  });
  fireEvent.click(getAllByText('Signup')[1]);

  return { getByText, getAllByText, getByLabelText };
}

describe('<Signup/>', () => {
  beforeEach(() => {
    payload.name = 'Raphael Collin';
    payload.email = 'raphael@test.com';
    payload.password = '111111111';
    payload.passwordConfirmation = '111111111';
  });

  it('should render correctly', () => {
    const { container } = render(<Signup />);

    expect(container).toMatchSnapshot();
  });
  it('should show an error modal if the name is empty', () => {
    payload.name = '';

    const { getByText } = exec();

    expect(getByText('The name is required')).not.toBeNull();
  });
  it('should show an error modal if the name.length is not between 3 and 100', () => {
    payload.name = 'ra';

    const { getByText } = exec();

    expect(
      getByText('The name must contain between 3 and 100 chars')
    ).not.toBeNull();
  });
  it('should show an error modal if the email is empty', () => {
    payload.email = '';

    const { getByText } = exec();

    expect(getByText('The email is required')).not.toBeNull();
  });
  it('should show an error modal if the email is invalid', () => {
    payload.email = '11111';

    const { getByText } = exec();

    expect(getByText('Invalid Email Format')).not.toBeNull();
  });
  it('should show an error modal if password is empty', () => {
    payload.password = '';

    const { getByText } = exec();

    expect(getByText('The password is required')).not.toBeNull();
  });
  it('should show an error modal if the password.length is not between 6 and 255', () => {
    payload.password = '1234';

    const { getByText } = exec();

    expect(
      getByText('The password must contain between 6 and 255 chars')
    ).not.toBeNull();
  });
  it('should show an error modal if the password confirmation is empty', () => {
    payload.passwordConfirmation = '';

    const { getByText } = exec();

    expect(
      getByText("The field 'Confirm Password' is required")
    ).not.toBeNull();
  });
  it('should show an error modal if the passwords do not match', () => {
    payload.password = '1111111111111';
    payload.passwordConfirmation = '222222222222';

    const { getByText } = exec();

    expect(getByText("The passwords don't match")).not.toBeNull();
  });
  it('should create the user and log in if the payload is valid', async () => {
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

    await waitForElementToBeRemoved(() => getByText('Signup'));
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
