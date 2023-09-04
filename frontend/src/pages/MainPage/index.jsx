import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from '../../components/Main/Carousel';
import { Link } from 'react-router-dom';
import { useInterval } from '../../hooks/UseInterval';

const MainPage = () => {
  const [mainImages, setMainImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselImages, setCarouselImages] = useState([]);
  const [bgImageStyle, setBgImageStyle] = useState({});

  useInterval(() => setCurrentImageIndex((prevIndex) =>
    prevIndex === mainImages.length - 1 ? 0 : prevIndex + 1
  ), 5000);
  useEffect(() => {
    axios.get('http://localhost:7070/image/slider').then((response) =>
      setCarouselImages(prevImages => [...prevImages, ...response.data.images])
    );
    axios.get('http://localhost:7070/image/main').then((response) =>
      setMainImages(prevImages => [...prevImages, ...response.data.images])
    );
  }, []);
  useEffect(() => {
    if (mainImages.length > 0) {
      const currentImageUrl = `data:image/jpg;base64,${mainImages[currentImageIndex]}`;

      const updatedStyle = {
        ...bgImageStyle,
        backgroundImage: `url(${currentImageUrl})`,
        transition: 'background-image 1s ease'
      };

      setBgImageStyle(updatedStyle);
    }
  }, [mainImages, currentImageIndex]);

  return (
    <div className='h-full'>
      <div className='h-[520px] flex flex-col m-0 w-screen justify-center ' style={{ ...bgImageStyle, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
        <div className='h-[50%] flex flex-col justify-center w-10/12 mx-auto'>
          <h3 className='font-bold text-5xl my-2 text-lime-300 opacity-100'>오디웹을 사용하여</h3>
          <p className='font-bold text-6xl mb-6 text-white'>쉽고 빠르게 주변 산재병원을 알아보세요.</p>
          <button className='flex items-center justify-center w-[256px] bg-white rounded-3xl border-black border-2 text-xl font-bold hover:opacity-80 transition-all ease-in-out'>
            <Link to='/map' className='w-[256px] py-4'>
              주변 병원찾기
            </Link>
          </button>
        </div>
      </div>
      <div className='flex w-10/12 mx-auto'>
        <div className='w-[33%]'>
          <Carousel carouselList={carouselImages} />
        </div>

        <div>Empty carousel</div>
      </div>

    </div>
  );
};

export default MainPage;
