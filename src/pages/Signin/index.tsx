import React, { useState } from 'react';
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const Signin = () => {
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
    console.log(email + '' + password);
    axios
      .post('http://localhost:3000/login', {
        email,
        password,
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
        console.log('error: ');
        console.log(error);
      });
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

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-primary" onClick={handleRequest}>
              Sign in
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signin;
