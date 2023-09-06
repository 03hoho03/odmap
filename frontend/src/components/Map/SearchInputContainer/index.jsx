import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReviewAdmitContainer from '../ReviewAdmitContainer/index';
import { findPosition, selected } from '../../../store/hospitalData';
import ReviewListContainer from '../ReviewListContainer';

const SearchInputContainer = () => {
  const [searchInput, setSearchInput] = useState('');
  const [searchedList, setSearchedList] = useState([]);

  const dispatch = useDispatch();

  const fetchedHospitalData = useSelector((state) => state.hospital?.fetchedHospitalData);
  const selectedHospitalItem = useSelector((state) => state.hospital?.mapInstance?.selectedHospitalItem);

  useEffect(() => {
    if (searchInput.length === 0) {
      setSearchedList([]);
    }
    if (searchInput.length > 0) {
      const filtered = fetchedHospitalData.filter((hospitalItem) => hospitalItem['요양기관명'].includes(searchInput));
      setSearchedList(filtered);
    }
  }, [searchInput]);

  const onClickHospitalItem = (hospitalItem) => {
    const latitude = hospitalItem['좌표(Y)'];
    const longitude = hospitalItem['좌표(X)'];
    const coords = { lat: latitude, lng: longitude };
    dispatch(selected(hospitalItem));
    dispatch(findPosition(coords));
  };
  return (
    <div>
      <div className='flex justify-between p-2 border rounded-3xl mx-2 px-3 bg-green-500 shadow-md mb-3'>
        <input placeholder='검색어를 입력하세요.' className='border w-72 ml-2 my-1 px-1'
          value={searchInput} onChange={(event) => setSearchInput(event.target.value)}
        />
        <button className='text-sm'>
          <FontAwesomeIcon icon={faMagnifyingGlass} />
            검색
        </button>
      </div>
      <div>
        <div className={`${searchedList.length > 0 ? 'block' : 'hidden'}`}>
          <ul className='max-h-[144px] overflow-y-scroll border-b-2 px-2'>
            {searchedList.length > 0 && searchedList.map((item, idx) => {
              return (
                <li key={idx} className='border-b hover:cursor-pointer hover:bg-slate-200'
                  onClick={() => onClickHospitalItem(item)}
                >
                  {item['요양기관명']}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {selectedHospitalItem && (
        <div>
          <div className='px-4 py-4 border-solid border-b-2'>
            <div className='flex items-center'>
              <h3 className='text-xl items-center mr-2 font-bold'>{selectedHospitalItem.요양기관명}</h3>
              <span className='text-xs text-gray-500'>{selectedHospitalItem.종별코드명}</span>
            </div>
            <div>
              <div>{selectedHospitalItem.주소}</div>
              <div>우편번호 : {selectedHospitalItem.우편번호}</div>
              <div>연락처 : {selectedHospitalItem.전화번호}</div>
            </div>
          </div>
          <ReviewAdmitContainer />
          <ReviewListContainer />
          {/* <ReviewContainer clickedSearchedItem={selectedHospitalItem} /> */}
        </div>
      )
      }
    </div>

  );
};

export default SearchInputContainer;
