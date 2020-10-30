import React from 'react';
import FormGroup from '../../components/UI/FormGroup';
import Button from '../../components/UI/Button';
import { useHistory } from 'react-router';
import { EMAIL_REGEX } from '../../helpers/regex';
import { loginHandler, logout } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Form, ButtonBar, Error } from './styles';
import { TitleBar, Title } from '../../containers/_layouts/Default/styles';
import logo from '../../assets/images/logo.svg';
import { useForm } from 'react-hook-form';

function Login() {
  const history = useHistory();

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const { register, errors, handleSubmit } = useForm();

  const emailRef = register({
    required: {
      value: true,
      message: 'The email is required',
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
  });

  async function handleLoginSubmit(data, event) {
    event.preventDefault();
    dispatch(loginHandler(data.email, data.password));
  }

  function handleSignup() {
    history.push('/signup');
  }

  let content = null;

  if (isLoading) {
    content = <Spinner />;
  } else if (error) {
    content = (
      <>
        <ErrorMessage message={error} />
        <Button
          type="button"
          btnType="raised"
          variant="secondary"
          onClick={() => dispatch(logout())}
        >
          Try Again
        </Button>
      </>
    );
  } else {
    content = (
      <>
        <TitleBar>
          <img src={logo} alt="Shoppingify" />
          <Title>Login</Title>
          <img src={logo} alt="Shoppingify" />
        </TitleBar>
        <Form onSubmit={handleSubmit(handleLoginSubmit)}>
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
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              ref={passwordRef}
            />
            {errors?.password && <Error>{errors?.password.message}</Error>}
          </FormGroup>
          <ButtonBar>
            <Button type="button" btnType="flat" onClick={handleSignup}>
              Signup
            </Button>
            <Button type="submit" btnType="raised" variant="secondary">
              Login
            </Button>
          </ButtonBar>
        </Form>
      </>
    );
  }

  return content;
}

export default Login;
