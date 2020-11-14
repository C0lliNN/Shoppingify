import React from 'react';
import FormGroup from '../../components/UI/FormGroup';
import Button from '../../components/UI/Button';
import { useHistory } from 'react-router';
import { EMAIL_REGEX } from '../../helpers/regex';
import { signupHandler } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner';
import { Form, ButtonBar, Error } from './styles';
import { TitleBar, Title } from '../../containers/_layouts/Default/styles';
import logo from '../../assets/images/logo.svg';
import { useForm } from 'react-hook-form';

function Signup() {
  const history = useHistory();

  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { register, handleSubmit, errors, getValues } = useForm();

  const nameRef = register({
    required: {
      value: true,
      message: 'The name is required',
    },
    minLength: {
      value: 3,
      message: 'The name must have more than 3 chars',
    },
    maxLength: {
      value: 100,
      message: 'The name must have less than 100 chars',
    },
  });

  const emailRef = register({
    required: {
      value: true,
      message: 'The email is required',
    },
    minLength: {
      value: 8,
      message: 'The email must have more than 8 chars',
    },
    maxLength: {
      value: 255,
      message: 'The email must have less than 255 chars',
    },
    pattern: {
      value: EMAIL_REGEX,
      message: 'The email is not valid',
    },
  });

  const passwordRef = register({
    required: {
      value: true,
      message: 'The password is required',
    },
    minLength: {
      value: 6,
      message: 'The password must have more than 6 chars',
    },
    maxLength: {
      value: 255,
      message: 'The password must have less than 255 chars',
    },
  });

  const passwordConfirmationRef = register({
    required: {
      value: true,
      message: 'The password Confirmation is required',
    },
    validate: (value) =>
      value === getValues('password') || "The password don't match",
  });

  async function handleSignupSubmit(data, event) {
    event.preventDefault();

    delete data.password_confirmation;
    dispatch(signupHandler(data));
  }

  function handleLogin() {
    history.push('/login');
  }

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else {
    content = (
      <>
        <TitleBar>
          <img src={logo} alt="Shoppingify" />
          <Title>Signup</Title>
          <img src={logo} alt="Shoppingify" />
        </TitleBar>
        <Form onSubmit={handleSubmit(handleSignupSubmit)}>
          <FormGroup>
            <FormGroup.Label htmlFor="name">Name</FormGroup.Label>
            <FormGroup.Input
              id="name"
              placeholder="Enter your name"
              name="name"
              ref={nameRef}
            />
            {errors?.name && <Error>{errors?.name.message}</Error>}
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="email">Email</FormGroup.Label>
            <FormGroup.Input
              id="email"
              placeholder="Enter your email"
              name="email"
              ref={emailRef}
            />
            {errors?.email && <Error>{errors?.email.message}</Error>}
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="password">Password</FormGroup.Label>
            <FormGroup.Input
              id="password"
              type="password"
              placeholder="Enter your password"
              name="password"
              ref={passwordRef}
            />
            {errors?.password && <Error>{errors?.password.message}</Error>}
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="passwordConfirmation">
              Confirm Password
            </FormGroup.Label>
            <FormGroup.Input
              id="passwordConfirmation"
              type="password"
              placeholder="Repeat the password"
              name="password_confirmation"
              ref={passwordConfirmationRef}
            />
            {errors?.password_confirmation && (
              <Error>{errors?.password_confirmation.message}</Error>
            )}
          </FormGroup>
          <ButtonBar>
            <Button type="button" btnType="flat" onClick={handleLogin}>
              login
            </Button>
            <Button type="submit" btnType="raised" variant="secondary">
              Signup
            </Button>
          </ButtonBar>
        </Form>
      </>
    );
  }

  return content;
}

export default Signup;
