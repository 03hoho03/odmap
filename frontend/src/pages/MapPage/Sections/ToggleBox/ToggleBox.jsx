import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

const ToggleBox = ({ toggled, onHandleToggle, hospitalInfo }) => {
  const [hospitalItem, setHospitalItem] = useState(false);

  return (
    <div className='flex'>
      <div className={`bg-white-900 h-full text-black ${toggled ? 'w-96' : 'w-0'}`}>
        {hospitalItem && (
          <div className='px-4 py-4 border-solid border-2'>
            <div className='flex items-center'>
              <h3 className='text-xl items-center mr-2 font-bold'>{hospitalInfo.요양기관명}</h3>
              <span className='text-xs text-gray-500'>{hospitalInfo.종별코드명}</span>
            </div>
            <div>
              <div>{hospitalInfo.주소}</div>
              <div>우편번호:{hospitalInfo.우편번호}</div>
              <div>연락처{hospitalInfo.전화번호}</div>
            </div>
          </div>
        )
        }
      </div>
      {/* Toggle 기능을 위한 버튼 레이아웃 */}
      <div className='w-0 relative'>
        <div
          className='absolute border-2 text-black z-50 py-4 px-[4px] left-0 top-1/2 translate-y-1/2 bg-white hover:cursor-pointer'
          onClick={() => onHandleToggle()}
        >
          {toggled ? <FontAwesomeIcon icon={faAngleLeft} /> : <FontAwesomeIcon icon={faAngleRight} />}
        </div>
      </div>
    </div>
  );
};

export default ToggleBox;
