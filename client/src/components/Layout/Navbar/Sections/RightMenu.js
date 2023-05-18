import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import axios from 'axios';

function RightMenu() {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const logoutHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('Logout failed.');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu>
        <li>
          <NavLink to="/login">Sign In</NavLink>
        </li>
        <li>
          <NavLink to="/register">Sign Up</NavLink>
        </li>
      </Menu>
    );
  } else {
    return (
      <Menu>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/video/upload"
          >Video</NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (isActive ? 'active' : '')}
            to="/logout"
            onClick={logoutHandler}
          >
            Logout
          </NavLink>
        </li>
      </Menu>
    );
  }
}

const Menu = styled.ul`
  display: flex;
  gap: 2rem;

  li {
    list-style: none;
  }

  a {
    color: #1c1c1e;
    text-decoration: none;
    font-size: 14px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }

    &.active {
      opacity: 1;
      font-weight: 700;
    }
  }
`;

export default RightMenu;
