import React, { useState } from 'react';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFont, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';

import './styles.css';

const Signup = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [isValid, setIsValid] = useState({ login: false, password: false });

  const handleLogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentLogin = event.target.value;
    setLogin(currentLogin);
    if (validator.isEmail(currentLogin)) {
      setIsValid({ login: true, password: isValid.password });
    } else {
      setIsValid({ login: false, password: isValid.password });
      setLoginErrorMessage('Insert valid email.');
    }
  };

  const handlePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentPassword = event.target.value;
    setPassword(currentPassword);
    if (validator.isStrongPassword(currentPassword)) {
      setIsValid({ login: isValid.login, password: true });
    } else {
      setIsValid({ login: isValid.login, password: false });
      setPasswordErrorMessage('Invalid password.');
    }
  };

  return (
    <div className="signup-form">
      <form className="box">
        <div className="field">
          <label className="label">Name</label>
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="Text input"
              value={login + ' ' + password}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faFont} />
            </span>
          </p>
        </div>

        <div className="field">
          <label className="label">login</label>
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="email"
              placeholder="email"
              onChange={handleLogin}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            {!isValid.login && (
              <div className="help is-danger">{loginErrorMessage}</div>
            )}
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
            {!isValid.password && (
              <div className="help is-danger">{passwordErrorMessage}</div>
            )}
          </p>
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button className="button is-primary">Register</button>
          </div>
          <div className="control">
            <button className="button is-primary is-light">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
