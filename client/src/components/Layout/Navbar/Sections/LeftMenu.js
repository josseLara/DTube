import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

function LeftMenu() {
  return (
    <Menu>
      <li>
        <NavLink
          className={({ isActive }) => (isActive ? 'active' : '')}
          to="/subscription"
        >
          Subscription
        </NavLink>
      </li>
    </Menu>
  );
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

export default LeftMenu;
