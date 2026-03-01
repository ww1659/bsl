// import ForgottenPassword from '@/pages/login/ForgottenPassword';
import { Route,Routes } from 'react-router-dom';

import LoginPage from '@/pages/login/LoginPage';

function LoginRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      {/* <Route path="/forgotten-password" element={<ForgottenPassword />} /> */}
    </Routes>
  );
}

export default LoginRoutes;
