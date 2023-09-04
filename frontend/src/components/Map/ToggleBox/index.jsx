import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleChevronLeft, faCircleChevronRight, faComments, faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import ToggleBoxMainContainer from '../ToggleBoxMainContainer/index';
import { toggled } from '../../../store/hospitalData';

const selectedMenuItemClasses = 'bg-black text-white';
const ToggleBox = () => {
  const [menuSelected, setMenuSelected] = useState(0);

  const dispatch = useDispatch();

  const isToggle = useSelector((state) => state.hospital?.mapInstance.toggled);

  const onClickMenu = (number) => {
    setMenuSelected(number);
    dispatch(toggled(true));
  };
  const onHandlePanel = () => {
    dispatch(toggled(!isToggle));
  };

  return (
    <div className='relative'>
      <div className='flex absolute z-10 bg-white h-full box-border w-[64px] border-r-[1px] justify-center'>
        <ul className='w-full select-none tracking-tighter leading font-nanum'>
          <li className='flex flex-col w-full items-center justify-center h-[64px] hover:cursor-pointer hover:bg-slate-300' onClick={() => onHandlePanel()}>
            {!isToggle ? <FontAwesomeIcon icon={faCircleChevronRight} className='text-[20px] mb-1'/> : <FontAwesomeIcon icon={faCircleChevronLeft} className='text-[20px] mb-1'/>}
            <p className='text-[12px]'>패널 열기</p>
          </li>
          <li className={`flex flex-col w-full items-center justify-center h-[64px] hover:cursor-pointer ${menuSelected === 0 ? selectedMenuItemClasses : 'hover:bg-slate-300'}`}
            onClick={() => onClickMenu(0)}
          >
            <FontAwesomeIcon icon={faMapLocationDot} className='text-[20px] mb-1'/>
            <p className='text-[12px]'>오디맵</p>
          </li>
          <li className={`flex flex-col w-full items-center justify-center h-[64px] hover:cursor-pointer ${menuSelected === 1 ? selectedMenuItemClasses : 'hover:bg-slate-300'}`}
            onClick={() => onClickMenu(1)}
          >
            <FontAwesomeIcon icon={faComments} className='text-[20px] mb-1'/>
            <p className='text-[12px]'>리뷰 작성</p>
          </li>
        </ul>
      </div>
      <div className='flex absolute top-0 left-16 z-10 h-full'>
        <div className={`w-96 h-full bg-white ${isToggle ? 'block' : 'hidden'} border border-l-0 border-t-0`}>
          <ToggleBoxMainContainer />
        </div>
        <div className='relative'>
          <div className='absolute left-0 top-[50%] translate-y-[-50%] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 border border-l-0 z-10 py-[20px] rounded-r-lg w-[28px] text-center shadow hover:cursor-pointer' onClick={() => onHandlePanel()}>
            {!isToggle
              ? <FontAwesomeIcon icon={faCircleChevronRight} className='text-[20px] text-blue-500'/>
              : <FontAwesomeIcon icon={faCircleChevronLeft} className='text-[20px] text-blue-500'/>}
          </div>
        </div>
      </div>

    </div>
  );
};

export default ToggleBox;
