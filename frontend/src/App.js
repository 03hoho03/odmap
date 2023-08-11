import './App.css';
import React from 'react';
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import MapPage from './pages/MapPage/MapPage';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

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
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route path='/map' element={<MapPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Route>
    </Routes>
  );
}

export default App;
