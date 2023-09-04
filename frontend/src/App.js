import './App.css';
import React, { useEffect } from 'react';
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';
import { Outlet, Route, Routes, useLocation } from 'react-router-dom';
import MainPage from './pages/MainPage/index';
import MapPage from './pages/MapPage/index';
import LoginPage from './pages/LoginPage/index';
import RegisterPage from './pages/RegisterPage/index';
import ProfilePage from './pages/ProfilePage/index';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from './store/thunkFunction/userThunkFunction';
import ProtectedRoutes from './components/ProtectedRoutes';
import NotAuthRoutes from './components/NotAuthRoutes';
import TestPage from './pages/TestPage';

function Layout ({ showFooter = true, map = false }) {
  return (
    <div className='flex flex-col h-screen font-barun items-center'>
      <Navbar />
      <main className={'mb-auto mx-auto flex-1 w-full'}>
        <Outlet />
      </main>
      {showFooter && <Footer />}
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
      </Route>
      <Route path='/map' element={<Layout showFooter={false} map={true} />}>
        <Route index element={<MapPage />}/>
      </Route>
      <Route path='/test'>
        <Route index element={<TestPage />} />
      </Route>
    </Routes>
  );
}

export default App;
