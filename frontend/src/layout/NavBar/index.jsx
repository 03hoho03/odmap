import React, { useEffect, useState } from 'react';
import NavItem from './Sections/NavItem';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [logoImage, setLogoImage] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:7070/image/logo').then((response) => {
      setLogoImage(response.data);
    });
  }, []);
  return (
    <nav className='bg-white text-black'>
      <div className='w-full p-3'>
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-29'>
          <div className='flex items-center text-2xl h-14'>
            <Link to='/' className=''>
              {logoImage && <img className='h-[128px]' src={`data:image /png;base64,${logoImage}`} alt='logo' />}
            </Link>
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
