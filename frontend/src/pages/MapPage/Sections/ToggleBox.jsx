import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ToggleBox = ({ toggled, onHandleToggle }) => {
  return (
    <div className='flex'>
      <div className={`bg-white-900 h-full text-black ${toggled ? 'w-96' : 'w-0'}`}>MainContent</div>
      <div className='w-0 relative'>
        <div
          className='absolute text-black z-50 py-4 px-[4px] left-0 top-1/2 translate-y-1/2 bg-white hover:cursor-pointer'
          onClick={() => { onHandleToggle(); console.log(toggled); }}
        >
          {toggled ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
        </div>
      </div>
    </div>
  );
};

export default ToggleBox;
