import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from './Sections/Carousel';
import { Link } from 'react-router-dom';

const MainPage = () => {
  const [mainImage, setMainImage] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [bgImageStyle, setBgImageStyle] = useState({});
  useEffect(() => {
    axios.get('http://localhost:7070/image/slider').then((response) =>
      setCarouselImages(prevImages => [...prevImages, ...response.data.images])
    );
    axios.get('http://localhost:7070/image/main').then((response) => {
      setMainImage(prevImages => [...prevImages, ...response.data.images]);
    });
  }, []);
  useEffect(() => {
    if (mainImage.length > 0) {
      setBgImageStyle({
        backgroundImage: `url(data:image/jpg;base64,${mainImage[0]})`
      }
      );
    }
  }, [mainImage]);

  return (
    <div className='h-full mx-auto'>
      <div className='h-[520px] flex flex-col justify-center' style={{ ...bgImageStyle, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center' }}>
        <div className='h-[50%] flex flex-col justify-center ml-4'>
          <h3 className='font-bold text-5xl my-2 text-lime-300 opacity-100'>오디웹을 사용하여</h3>
          <p className='font-bold text-6xl mb-6'>쉽고 빠르게 주변 산재병원을 알아보세요.</p>

          <button className='flex items-center justify-center w-[256px] bg-white rounded-3xl border-black border-2 text-xl font-bold hover:opacity-80 transition-all ease-in-out'>
            <Link to='/map' className='w-[256px] py-4'>
              주변 병원찾기
            </Link>
          </button>
        </div>
      </div>
      <div className='flex'>
        <div className='w-[33%]'>
          <Carousel carouselList={carouselImages} />
        </div>

        <div>Empty carousel</div>
      </div>

    </div>
  );
};

export default MainPage;
