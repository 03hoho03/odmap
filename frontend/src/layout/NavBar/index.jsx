import React from 'react';
import NavItem from './Sections/NavItem';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gray-900 text-white'>
      <div className='w-full'>
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-29'>
          <div className='flex items-center text-2xl h-14'>
            <Link to='/'>LOGO</Link>
          </div>

          <div>
            <NavItem />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
