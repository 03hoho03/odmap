import React from 'react';
import NavItem from './Sections/NavItem';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='bg-gray-900'>
      <div className='w-full flex justify-between py-3 px-3'>
        <div className='text-white'>
          <Link>
            <div>LOGO</div>
          </Link>
        </div>
        <div>
          <NavItem />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
