import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LeftMenu from './Sections/LeftMenu';
import RightMenu from './Sections/RightMenu';

function Navbar() {
  return (
    <Header>
      <Container>
        <LeftContainer>
          <Logo>
            <Link to="/">eunhye</Link>
          </Logo>
          <LeftMenu />
        </LeftContainer>
        <div>
          <RightMenu />
        </div>
      </Container>
    </Header>
  );
}

const Header = styled.nav`
  background-color: #fff;
  height: 56px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;
const Container = styled.div`
  width: 90%;
  padding: 0 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;
const LeftContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 2.5rem;
`;
const Logo = styled.h1`
  display: flex;
  align-items: center;

  a {
    color: #1c1c1e;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
  }
`;

export default Navbar;
