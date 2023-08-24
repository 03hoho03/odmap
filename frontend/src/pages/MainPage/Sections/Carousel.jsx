import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

const Carousel = ({ carouselList }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [currList, setCurrList] = useState(null);

  const carouselRef = useRef(null);

  useEffect(() => {
    if (carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrList(newList);
    }
  }, [carouselList]);

  useEffect(() => {
    if (carouselRef.current !== null) {
      carouselRef.current.style.transform = `translateX(-${currIndex}00%)`;
    }
  }, [currIndex]);

  const moveToNthSlide = (index) => {
    setTimeout(() => {
      setCurrIndex(index);
      if (carouselRef.current !== null) {
        carouselRef.current.style.transition = '';
      }
    }, 500);
  };

  const handleSwipe = (direction) => {
    const newIndex = currIndex + direction;

    if (newIndex === carouselList.length + 1) {
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      moveToNthSlide(carouselList.length);
    }

    setCurrIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }
  };

  return (
    <div className='flex mx-auto my-8 w-6/12 items-center justify-items-center'>
      <div className='relative w-full overflow-hidden rounded-t-lg'>
        <button className='absolute bg-gray-200 top-[45%] rounded-md z-10 px-[8px] py-[6px] left-1 hover:cursor-pointer' onClick={() => handleSwipe(-1)}>
          <FontAwesomeIcon icon={faChevronLeft}/>
        </button>
        <button className='absolute bg-gray-200 top-[45%] rounded-md z-10 px-[8px] py-[6px] right-1 hover:cursor-pointer' onClick={() => handleSwipe(1)}>
          <FontAwesomeIcon icon={faChevronRight}/>
        </button>
        <ul className='flex w-full' ref={carouselRef}>
          {currList?.map((image, idx) => {
            const key = `${image}-${idx}`;

            return (
              <li key={key} className='flex flex-none items-center justify-center w-full h-[350px] pt-[10px] pb-[15px] overflow-hidden object-contain rounded-t-lg'>
                <img src={image} alt='carousel-img' className='min-w-full min-h-full flex-shrink-0' />
              </li>
            );
          })}
        </ul>
        <div className='bg-gray-900 py-2'>
          <ul className='flex items-center justify-center'>
            {currList?.map((value, idx) => {
              return (
                <div className='bg-white w-4 h-4 rounded-full m-2 hover:bg-black hover:cursor-pointer' key={idx}></div>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
