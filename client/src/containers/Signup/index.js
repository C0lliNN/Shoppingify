import React from 'react';
import UnAuthContainer from '../UnAuthContainer';
import FormGroup from '../../components/UI/FormGroup';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import { useHistory } from 'react-router';
import { useState } from 'react';
import { EMAIL_REGEX } from '../../helpers/regex';
import { signupHandler, logout } from '../../store/actions';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';
import { Form, ButtonBar } from './styles';

function validateInput(data) {
  const { name, email, password, passwordConfirmation } = data;

  if (!name) {
    return 'The name is required';
  }
  if (name.length < 3 || name.length > 100) {
    return 'The name must contain between 3 and 100 chars';
  }
  if (!email) {
    return 'The email is required';
  }
  if (!email.match(EMAIL_REGEX)) {
    return 'Invalid Email Format';
  }
  if (!password) {
    return 'The password is required';
  }
  if (password.length < 6 || password.length > 255) {
    return 'The password must contain between 6 and 255 chars';
  }
  if (!passwordConfirmation) {
    return "The field 'Confirm Password' is required";
  }
  if (passwordConfirmation !== password) {
    return "The passwords don't match";
  }
  return null;
}

function Signup() {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  const { isLoading, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  async function handleSignupSubmit(event) {
    event.preventDefault();

    const payload = { name, email, password, passwordConfirmation };
    const error = validateInput(payload);

    if (error) {
      setShowModal(true);
      setModalTitle(error);
    } else {
      delete payload.passwordConfirmation;
      dispatch(signupHandler(payload));
    }
  }

  function handleLogin() {
    history.push('/login');
  }

  function closeModal() {
    setShowModal(false);
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
        <Form onSubmit={handleSignupSubmit} method="post" action="#">
          <FormGroup>
            <FormGroup.Label htmlFor="name">Name</FormGroup.Label>
            <FormGroup.Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="email">Email</FormGroup.Label>
            <FormGroup.Input
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="password">Password</FormGroup.Label>
            <FormGroup.Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label htmlFor="passwordConfirmation">
              Confirm Password
            </FormGroup.Label>
            <FormGroup.Input
              id="passwordConfirmation"
              type="password"
              placeholder="Repeat the password"
              value={passwordConfirmation}
              onChange={(event) => setPasswordConfirmation(event.target.value)}
            />
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

  return <UnAuthContainer title="Signup">{content}</UnAuthContainer>;
}

export default Signup;
