// import ForgottenPassword from '@/pages/login/ForgottenPassword';
import LoginPage from '@/pages/login/LoginPage';
import { Routes, Route } from 'react-router-dom';

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/forgotten-password" element={<ForgottenPassword />} /> */}
    </Routes>
  );
}

export default LoginRoutes;
