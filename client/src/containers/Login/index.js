import React from 'react';
import { useState } from 'react';
import FormGroup from '../../components/UI/FormGroup';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { useHistory } from 'react-router';
import { EMAIL_REGEX } from '../../helpers/regex';
import { loginHandler, logout } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Form, ButtonBar } from './styles';
import { TitleBar, Title } from '../../containers/_layouts/Default/styles';
import logo from '../../assets/images/logo.svg';

function validateInput(data) {
  const { email, password } = data;

  if (!email) {
    return 'The email is required';
  }
  //prettier-ignore
  //eslint-disable-next-line
  if (!email.match(EMAIL_REGEX)) {
    return 'Invalid Email Format';
  }
  if (!password) {
    return 'The password is required';
  }
}

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const payload = { email, password };
    const error = validateInput(payload);

    if (error) {
      setShowModal(true);
      setModalTitle(error);
    } else {
      dispatch(loginHandler(email, password));
    }
  }

  function closeModal() {
    setShowModal(false);
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
        <Form action="#" method="post" onSubmit={handleLoginSubmit}>
          <FormGroup>
            <FormGroup.Label htmlFor="email">Email</FormGroup.Label>
            <FormGroup.Input
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            ></FormGroup.Input>
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="password">Password</FormGroup.Label>
            <FormGroup.Input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            ></FormGroup.Input>
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
        {showModal && (
          <Modal
            title={modalTitle}
            onClose={closeModal}
            okButton={
              <Button btnType="raised" variant="danger" onClick={closeModal}>
                OK
              </Button>
            }
          />
        )}
      </>
    );
  }

  return content;
}

export default Login;
