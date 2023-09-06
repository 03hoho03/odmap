import React from 'react';
import { useDispatch } from 'react-redux';

const UserToolBar = ({ getCurrentCenter }) => {
  return (
    <div className='absolute z-10 left-[500px] top-2 bg-white border rounded-lg'>
      <button onClick={() => { getCurrentCenter(); }}>MyPlace</button>
      <button className='relative'>FILTERING

      </button>
    </div>
  );
};

export default UserToolBar;
