import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useInterval } from '../../../hooks/UseInterval';

const Carousel = ({ carouselList }) => {
  const [currIndex, setCurrIndex] = useState(0);
  const [currList, setCurrList] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselRef = useRef(null);
  const timeoutRef = useRef(null);

  timeoutRef.current = useInterval(() => {
    handleSwipe(1);
  }, 5000);

  useEffect(() => {
    if (carouselList.length !== 0) {
      const startData = carouselList[0];
      const endData = carouselList[carouselList.length - 1];
      const newList = [endData, ...carouselList, startData];

      setCurrList(newList);
      setCurrIndex(1);
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
      };
    }, 500);
  };

  const handleSwipe = (direction) => {
    if (isAnimating) {
      return;
    }

    setIsAnimating(true);
    const newIndex = currIndex + direction;

    if (newIndex === carouselList.length + 1) {
      console.log('played slide function1');
      moveToNthSlide(1);
    } else if (newIndex === 0) {
      console.log('played slide function2');
      moveToNthSlide(carouselList.length);
    }
    setCurrIndex((prev) => prev + direction);
    if (carouselRef.current !== null) {
      carouselRef.current.style.transition = 'all 0.5s ease-in-out';
    }

    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  return (
    <div className='flex mx-auto my-8 w-6/12 items-center justify-items-center'>
      <div className='relative w-full overflow-hidden rounded-t-lg'>
        <button className='absolute bg-gray-200 top-[45%] rounded-md z-10 px-[8px] py-[6px] left-1 hover:cursor-pointer' onClick={() => handleSwipe(-1)}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button className='absolute bg-gray-200 top-[45%] rounded-md z-10 px-[8px] py-[6px] right-1 hover:cursor-pointer' onClick={() => handleSwipe(1)}>
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
        <ul className='flex w-full' ref={carouselRef}>
          {currList?.map((image, idx) => {
            const key = `${image}-${idx}`;

            return (
              <li key={key} className='flex flex-none items-center justify-center w-full h-[350px] pt-[10px] pb-[15px] overflow-hidden object-contain rounded-t-lg'>
                <img src={`data:image /jpg;base64,${image}`} alt='carousel-img' className='min-h-full min-w-full flex-shrink-0' />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
