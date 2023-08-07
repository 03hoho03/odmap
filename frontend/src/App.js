import './App.css';
import React from 'react';
import Navbar from './layout/NavBar';
import Footer from './layout/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import MapPage from './pages/MapPage/MapPage';

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
      </Route>
    </Routes>
  );
}

export default App;
