import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Name, setName] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('Password and Confirm Password must be the same.');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };

    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        navigate('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };

  return (
    <Container>
      <RegisterForm
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <Title>Create an account</Title>
        <InputContainer>
          <label htmlFor="">Email</label>
          <input
            type="email"
            value={Email}
            onChange={onEmailHandler}
            placeholder="email"
            required="required"
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Name</label>
          <input
            type="text"
            value={Name}
            onChange={onNameHandler}
            placeholder="name"
            required="required"
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Password</label>
          <input
            type="password"
            value={Password}
            onChange={onPasswordHandler}
            placeholder="password"
            required="required"
          />
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Confirm Password</label>
          <input
            type="password"
            value={ConfirmPassword}
            onChange={onConfirmPasswordHandler}
            placeholder="confirm password"
            required="required"
          />
        </InputContainer>

        <SubmitButton type="submit">Create account</SubmitButton>
      </RegisterForm>
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
const RegisterForm = styled.form`
  width: 380px;
  height: auto;
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

export default RegisterPage;
