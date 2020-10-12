import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import UnAuthContainer from '../UnAuthContainer/UnAuthContainer';
import { useState } from 'react';
import FormGroup from '../../components/UI/FormGroup';
import Button from '../../components/UI/Button/Button';
import Modal from '../../components/UI/Modal/Modal';
import { useHistory } from 'react-router';
import { EMAIL_REGEX } from '../../helpers/regex';
import { loginHandler, logout } from '../../store/actions';
import { connect } from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorMessage from '../../components/ErrorMessage';

const Form = styled.form`
  margin-top: 50px;
`;

const ButtonBar = styled.div`
  text-align: center;
  margin-top: 50px;
`;

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

function Login({ loginHandler, isLoading, error, reset }) {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState('');

  async function handleLoginSubmit(event) {
    event.preventDefault();

    const payload = { email, password };
    const error = validateInput(payload);

    if (error) {
      setShowModal(true);
      setModalTitle(error);
    } else {
      loginHandler(email, password);
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
          onClick={reset}
        >
          Try Again
        </Button>
      </>
    );
  } else {
    content = (
      <React.Fragment>
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
      </React.Fragment>
    );
  }

  return <UnAuthContainer title="Login">{content}</UnAuthContainer>;
}

Login.propTypes = {
  error: PropTypes.string,
  isLoading: PropTypes.bool.isRequired,
  loginHandler: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    isLoading: state.auth.isLoading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = {
  loginHandler,
  reset: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
