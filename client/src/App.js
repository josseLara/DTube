import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auth from './hoc/auth';
import Layout from './components/Layout/Layout';
import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';
import VideoUploadPage from './components/views/VideoUploadPage/VideoUploadPage';
import VideoDetailPage from './components/views/VideoDetailPage/VideoDetailPage';
import SubscriptionPage from './components/views/SubscriptionPage/SubscriptionPage';

function App() {
/**
    * null: A page that anyone can access
    * true: A page that only logged in users can access
    * false: A page that cannot be accessed by logged in users
    */
  const AuthenticLandingPage = Auth(LandingPage, null);
  const AuthenticLoginPage = Auth(LoginPage, false);
  const AuthenticRegisterPage = Auth(RegisterPage, false);
  const AuthenticVideoUploadPage = Auth(VideoUploadPage, true);
  const AuthenticVideoDetailPage = Auth(VideoDetailPage, null);
  const AuthenticSubscriptionPage = Auth(SubscriptionPage, null);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<AuthenticLandingPage />} />
          <Route path="/login" element={<AuthenticLoginPage />} />
          <Route path="/register" element={<AuthenticRegisterPage />} />
          <Route path="/video/upload" element={<AuthenticVideoUploadPage />} />
          <Route
            path="/video/:videoId"
            element={<AuthenticVideoDetailPage />}
          />
          <Route path="/subscription" element={<AuthenticSubscriptionPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
