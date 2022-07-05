import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import validator from 'validator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelope,
  faLock,
  faIdCard,
} from '@fortawesome/free-solid-svg-icons';

import './styles.css';
import axios from 'axios';

const Signup = () => {
  useEffect(() => {
    setIsFormValid(
      isValid.login && isValid.password && nameErrorMessage === '',
    );
  });

  const navigate = useNavigate();

  const [isFormValid, setIsFormValid] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');

  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const [nameErrorMessage, setNameErrorMesage] = useState('');
  const [loginErrorMessage, setLoginErrorMessage] = useState('');
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const [isValid, setIsValid] = useState({ login: false, password: false });

  const handleName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentName = event.target.value;
    setName(currentName);
    if (
      currentName === '' ||
      currentName === undefined ||
      currentName === null ||
      !/^[A-Za-z ]+$/.test(currentName)
    ) {
      setNameErrorMesage('Insert valid name.');
    } else {
      setNameErrorMesage('');
    }
  };

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

  const handleRegister = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    axios({
      method: 'post',
      url: process.env.REACT_APP_API_BASE_URL + '/register',
      data: {
        name,
        email: login,
        password,
      },
    })
      .then((response) => {
        console.log('RESPONSE: ');
        console.log(response);
        setErrorMessage('');
        navigate('/');
      })
      .catch((error) => {
        console.log('ERROR: ');
        console.log(error);
        setErrorMessage('This email is already registered.');
      });
  };

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    navigate('/');
  };

  return (
    <div className="signup-form">
      <form className="box">
        {errorMessage !== '' && (
          <div className="notification is-danger is-light is-size-7">
            {errorMessage}
          </div>
        )}
        <div className="field">
          <label className="label">name</label>
          <p className="control has-icons-left has-icons-right">
            <input
              className="input"
              type="text"
              placeholder="your name"
              onChange={handleName}
            />
            <span className="icon is-small is-left">
              <FontAwesomeIcon icon={faIdCard} />
            </span>
            {nameErrorMessage !== '' && (
              <div className="help is-danger">{nameErrorMessage}</div>
            )}
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
            <button
              className="button is-primary"
              onClick={handleRegister}
              disabled={!isFormValid}
            >
              Register
            </button>
          </div>
          <div className="control">
            <button
              className="button is-primary is-light"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
