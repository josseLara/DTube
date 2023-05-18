import Navbar from './Navbar/Navbar';
import Footer from './Footer/Footer';
import styled from 'styled-components';

function Layout(props) {
  return (
    <div>
      <Navbar />

      <ContentContainer>{props.children}</ContentContainer>

      <Footer />
    </div>
  );
}

const ContentContainer = styled.main`
  width: 97%;
  height: auto;
  margin: 75px auto;
`;

export default Layout;
