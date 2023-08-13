import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../../store/thunkFunction';

const routes = [
  { to: '/map', name: '지도', auth: null },
  { to: '/login', name: '로그인', auth: false },
  { to: 'register', name: '회원가입', auth: false },
  { to: '', name: '프로필', auth: true },
  { to: '', name: '로그아웃', auth: true }
];

const NavItem = () => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const userId = useSelector((state) => state.user?.userData.id);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleLogout () {
    dispatch(logoutUser()).then(() => navigate('/'));
  }
  return (
    <ul
      className='text-md justify-center w-full flex gap-4'
    >
      {
        routes.map(({ to, name, auth }) => {
          if (auth === null) {
            return (
              <li
                key={name}
                className='py-2 text-center border-b-4 cursor-pointer'
              >
                <Link to={to}>{name}</Link>
              </li>
            );
          }
          if (isAuth !== auth) return null;
          if (name === '로그아웃') {
            return (
              <li
                key={name}
                className='py-2 text-center border-b-4 cursor-pointer'
              >
                <Link onClick={handleLogout}>{name}</Link>
              </li>
            );
          } else if (name === '프로필') {
            return (
              <li
                key={name}
                className='py-2 text-center border-b-4 cursor-pointer'
              >
                <Link to={`/profile/${userId}`}>{name}</Link>
              </li>
            );
          } else {
            return (
              <li
                key={name}
                className='py-2 text-center border-b-4 cursor-pointer'
              >
                <Link to={to}>{name}</Link>
              </li>
            );
          }
        })
      }
    </ul>

  );
};

export default NavItem;
