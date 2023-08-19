import React from 'react';

const Carousel = ({ carouselList }) => {
  return (
    <div className='flex relative w-full items-center justify-items-center'>
      <div className='relative w-full py-[10%] overflow-hidden'>
        <button className='absolute bg-gray-400 top-[45%] rounded-md z-1 px-[8px] py-[6px] left-0'>
          buttonLeft
        </button>
        <button className='absolute bg-gray-400 top-[45%] rounded-md z-1 px-[8px] py-[6px] right-0'>
          buttonRight
        </button>
        <ul className=''>
          {carouselList?.map((image, idx) => {
            const key = `${image}-${idx}`;

            return (
              <li key={key}>
                <img src={image} alt='carousel-img' />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Carousel;
