import React, { ReactNode } from 'react';
import { BrowserRouter as Router, Routes, Route, RouterProvider, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/auth';
import './styles/index.css';

import Username from './components/pages/authenticate-user';
import ForgotPassword from './components/pages/forgot-password';
import PageNotFound from './components/pages/page-not-found';
import Profile from './components/pages/profile';
import Register from './components/pages/register';
import ResetPassword from './components/pages/reset-password';
import SignIn from './components/pages/sign-in';

interface ProtectRouteProps {
  route: string;
  children: ReactNode;
}

const ProtectRoute: React.FC<ProtectRouteProps> = ({ route, children }) => {
  if (route === 'Profile') {
    const token = localStorage.getItem('token');
    if (token) return <>{children}</>;
  } else {
    const username = useAuthStore.getState().auth.username;
    if (username) return <>{children}</>;
  }

  return <Navigate to='/' replace={true} />;
};

const App: React.FC = () => {
  return (
    <Router>
      <Toaster
        position='top-right'
        toastOptions={{
          error: {
            style: {
              background: '#ffcccc',
              color: '#fe0808',
            },
          },
          success: {
            style: {
              background: '#d8ffc5',
              color: '#1e5b00',
            },
          },
        }}
      />
      <Routes>
        <Route path='/' element={<Username />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/sign-in'
          element={
            <ProtectRoute route='recovery'>
              <SignIn />
            </ProtectRoute>
          }
        />
        <Route
          path='/recovery'
          element={
            <ProtectRoute route='recovery'>
              <ForgotPassword />
            </ProtectRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectRoute route='recovery'>
              <ResetPassword />
            </ProtectRoute>
          }
        />
        <Route path='/profile' element={<Profile />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
