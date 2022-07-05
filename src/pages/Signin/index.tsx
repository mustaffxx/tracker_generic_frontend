import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const Signin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentEmail = event.target.value;
    setEmail(currentEmail);
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = event.target.value;
    setPassword(currentPassword);
  };

  const handleRequest = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_BASE_URL + '/login',
      data: {
        email,
        password,
      },
    })
      .then((response) => {
        setErrorMessage('');
        console.log('ok: ');
        console.log(response);
      })
      .catch((error) => {
        setErrorMessage(
          'The email address or password you provided does not match our records.',
        );
        const errorData = {
          status: error.response.status,
          error: error.response.data.error,
          headers: error.response.headers,
        };
        console.log(errorData);
      });
  };

  const handleSignup = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/signup');
  };

  return (
    <div className="sign-form">
      <form className="box">
        {errorMessage !== '' && (
          <div className="notification is-danger is-light is-size-7">
            {errorMessage}
          </div>
        )}
        <div className="field">
          <label className="label">email</label>
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="email"
              onChange={handleEmail}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
          </p>
        </div>

        <div className="field">
          <label className="label">password</label>
          <p className="control has-icons-left">
            <input
              className="input"
              type="password"
              placeholder="password"
              onChange={handlePassword}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faLock} />
            </span>
          </p>
        </div>

        <div className="field is-grouped is-justify-content-space-between">
          <div className="control">
            <button className="button is-primary" onClick={handleRequest}>
              Sign in
            </button>
          </div>
          <div className="control">
            <button className="button is-primary" onClick={handleSignup}>
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
