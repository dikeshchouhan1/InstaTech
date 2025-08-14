import { Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import ForgotPassword from './pages/ForgotPassword';
import { useSelector } from 'react-redux';
import Home from './pages/Home';
import useGetCurrentUser from './Hooks/getCurrentUser';
import useSuggestedUser from './Hooks/getSuggestUser';
import Profile from './pages/Profile';

export const serverUrl = 'http://localhost:5000';

function App() {
  useGetCurrentUser();
  useSuggestedUser();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to="/signin" />}
      />
      <Route
        path="/signup"
        element={!userData ? <SignUp /> : <Navigate to="/" />}
      />
      <Route
        path="/signin"
        element={!userData ? <SignIn /> : <Navigate to="/" />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to="/" />}
      />
      <Route
        path="/profile/:userName"
        element={userData ? <Profile /> : <Navigate to="/signin" />}
      />
    </Routes>
  );
}

export default App;
