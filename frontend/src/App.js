import './App.css';
import React, { useEffect } from 'react';
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import MapPage from './pages/MapPage/MapPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from './store/thunkFunction';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotAuthRoutes from './components/NotAuthRoutes';
import ProfilePage from './pages/ProfilePage/ProfilePage';

function Layout () {
  return (
    <div>
      <Navbar />
      <main className='mb-auto w-full mx-auto h-screen'>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

function App () {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation();

  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path='profile/:userId' element={<ProfilePage />} />
        </Route>

        <Route element={<NotAuthRoutes isAuth={isAuth} />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
        </Route>
        <Route path='/map' element={<MapPage />} />
      </Route>
    </Routes>
  );
}

export default App;
