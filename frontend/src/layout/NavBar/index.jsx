import React, { useEffect, useState } from 'react';
import NavItem from '../../components/NavBar/NavItem';
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
    <nav className='bg-white text-black border-b-2 w-full'>
      <div className='p-3 w-10/12 mx-auto'>
        <div className='flex items-center justify-between'>
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
