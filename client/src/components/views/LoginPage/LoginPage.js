import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      if (response.payload.loginSuccess) {
        navigate('/');
        window.localStorage.setItem('userId', response.payload.userId);
      } else {
        alert('Error');
      }
    });
  };

  return (
    <Container>
      <LoginForm
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <Title>Welcome back</Title>
        <InputContainer>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="youname@example.com"
            required="required"
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="yourpassword"
            required="required"
          />
        </InputContainer>

        <SubmitButton type="submit">Sign In</SubmitButton>

        <SignUpLink>
          <p>Don't have an account?</p>
          <Link to="/register">sign up</Link>
        </SignUpLink>
      </LoginForm>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: calc(100vh - 176px);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 1rem;
`;
const LoginForm = styled.form`
  width: 380px;
  height: 380px;
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 12px;
    display: none;
  }

  input {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #c7c7cc;
    outline: none;
    height: 2rem;
    padding: 1.2rem 0;
    transition: 0.35s all;
    font-size: 14px;

    &::placeholder {
      color: #c7c7cc;
    }

    &:focus {
      border-color: #1c1c1e;
    }

    &:valid {
      border-color: #1c1c1e;
    }
  }
`;
const SubmitButton = styled.button`
  background-color: #1c1c1e;
  color: #f2f2f7;
  border: none;
  height: 3rem;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 14px;
`;
const SignUpLink = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 14px;

  p {
    opacity: 0.7;
  }

  a {
    color: #1c1c1e;
    font-weight: 600;
  }
`;

export default LoginPage;
