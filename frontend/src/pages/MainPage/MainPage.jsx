import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Carousel from './Sections/Carousel';

const MainPage = () => {
  const [image, setImage] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:7070/image/slider').then((response) =>
      setImage(prevImages => [...prevImages, ...response.data.images])
    );
  }, []);

  return (
    <div className='h-full w-10/12 mx-auto'>
      <Carousel carouselList={image} />
    </div>
  );
};

export default MainPage;
