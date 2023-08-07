import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = () => {
  return (
    <div className='text-white'>
      <Link>로그인</Link>
      <Link>리뷰</Link>
      <Link>병원찾기</Link>
      <Link>ODTEST</Link>
    </div>
  );
};

export default NavItem;
