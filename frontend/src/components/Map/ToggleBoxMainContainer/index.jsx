import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filtered } from '../../../store/hospitalData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion, faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { optionArray, detailOptionArray } from './optionData';
import SearchInputContainer from '../SearchInputContainer';

const clickedClass = 'bg-black text-white';
const unClickedClass = 'bg-white text-black hover:text-blue-500';

const ToggleBoxMainContainer = () => {
  const [clickedOptions, setClickedOptions] = useState(optionArray.map(value => value.option));
  const [clickedDetailOptions, setClickedDetailOptions] = useState(detailOptionArray.map(value => value.option));
  const [clickedMoreBtn, setClickedMoreBtn] = useState(false);
  const [applyOption, setApplyOption] = useState(true);
  const [applyDetailOption, setApplyDetailOption] = useState(false);

  const dispatch = useDispatch();

  const fetchedHospitalData = useSelector((state) => state.hospital?.fetchedHospitalData);

  const onClickTotalBtn = () => {
    setClickedOptions(optionArray.map(value => value.option));
  };
  const onClickDetailTotalBtn = () => {
    setClickedDetailOptions(detailOptionArray.map(value => value.option));
  };

  const onHandleOption = (option) => {
    if (clickedOptions.includes(option)) {
      const filtered = clickedOptions.filter((element) => element !== option);
      setClickedOptions(filtered);
    } else {
      setClickedOptions((prev) => [...prev, option]);
    }
  };

  const onHandleDetailOption = (detailOption) => {
    if (clickedDetailOptions.includes(detailOption)) {
      const filtered = clickedDetailOptions.filter((element) => element !== detailOption);
      setClickedDetailOptions(filtered);
    } else {
      setClickedDetailOptions((prev) => [...prev, detailOption]);
    }
  };

  const onClickSearchSubmitBtn = () => {
    let filteredData;
    if (!applyOption && !applyDetailOption) {
      dispatch(filtered(fetchedHospitalData));
      return;
    }

    if (applyOption) {
      filteredData = fetchedHospitalData.filter((hospitalItem) => clickedOptions.includes(hospitalItem.종별코드명));
    }
    if (applyDetailOption) {
      filteredData = filteredData.filter((hospitalItem) => {
        const departments = hospitalItem['진료과목코드명'].split(', ');

        return clickedDetailOptions.some((detailOption) => departments.includes(detailOption));
      });
    }

    dispatch(filtered(filteredData));
  };

  const onClickOptionResetBtn = () => {
    setClickedOptions([]);
    setClickedDetailOptions([]);
  };

  const onClickMoreBtn = () => {
    setClickedMoreBtn((prev) => !prev);
  };

  return (
    <div className='select-none'>

      <div className='border-b-2'>
        <div className='flex items-center'>
          <h3 className='font-bold text-2xl my-2 pl-2 mr-2'>의료기관종류</h3>
          <FontAwesomeIcon icon={faCircleQuestion} className='text-lg hover:cursor-pointer'/>
        </div>

        <ul className='flex flex-wrap mb-4 font-bold'>
          <li className={`${clickedOptions.length === optionArray.length ? clickedClass : unClickedClass}  border rounded-3xl w-1/5 mx-2 my-1 text-[14px] text-center py-2 shadow-md hover:cursor-pointer transition-all`}
            onClick={onClickTotalBtn}
          >전체
          </li>
          {optionArray.map((value, idx) => {
            return (
              <li className={`${clickedOptions.includes(value.option)
                ? (clickedOptions.length === optionArray.length
                  ? unClickedClass
                  : clickedClass)
                : unClickedClass} border rounded-3xl w-1/5 mx-2 my-1 text-[14px] text-center py-2 shadow-md hover:cursor-pointer transition-all`} key={idx}
              onClick={() => onHandleOption(value.option)}
              >
                {value.option}
              </li>
            );
          })}
        </ul>
        <div>
          <div>
            <button className='text-sm flex items-center justify-center ml-4'
              onClick={onClickMoreBtn}
            >
              <span className='mr-1'>더 보기</span>
              {clickedMoreBtn ? <FontAwesomeIcon icon={faAngleUp}/> : <FontAwesomeIcon icon={faAngleDown} />}
            </button>
          </div>
          <ul className={`flex flex-wrap  mb-4 h-[320px] overflow-y-scroll ${clickedMoreBtn ? 'block' : 'hidden'}`}>
            <li className={`${clickedDetailOptions.length === detailOptionArray.length ? clickedClass : unClickedClass}  border rounded-3xl w-1/5 mx-2 my-1 text-[14px] text-center py-2 shadow-md hover:cursor-pointer transition-all`}
              onClick={onClickDetailTotalBtn}
            >전체
            </li>
            {detailOptionArray.map((value, idx) => {
              return (
                <li className={`${clickedDetailOptions.includes(value.option) ? (clickedDetailOptions.length === detailOptionArray.length ? unClickedClass : clickedClass) : unClickedClass} border rounded-3xl w-1/5 mx-2 my-1 text-[14px] text-center py-2 shadow-md hover:cursor-pointer transition-all flex justify-center items-center`} key={idx}
                  onClick={() => onHandleDetailOption(value.option)}
                >
                  {value.option}
                </li>
              );
            })}
          </ul>
        </div>
        <div className='mb-4 text-right flex items-center justify-between mx-4'>
          <div className='flex items-center'>
            <label className='mr-1 ' htmlFor='option' >필터적용</label>
            <input id='option' type='checkBox' onChange={(event) => setApplyOption((prev) => !prev)} checked={applyOption} />
          </div>
          <div className='flex items-center'>
            <label className='mr-1 ' htmlFor='detailOption'>세부필터적용</label>
            <input id='detailOption' type='checkBox' onChange={(event) => setApplyDetailOption((prev) => !prev)} checked={applyDetailOption}/>
          </div>
          <button className=''
            onClick={onClickOptionResetBtn}
          >
            초기화
          </button>
          <button className='border py-1 px-6 rounded-3xl hover:bg-black hover:text-white transition-all'
            onClick={onClickSearchSubmitBtn}
          >
          필터링
          </button>
        </div>
        <SearchInputContainer />
      </div>

    </div>
  );
};

export default ToggleBoxMainContainer;
