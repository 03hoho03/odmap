import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MainPage = () => {
  const [imageData, setImageData] = useState(null);
  const fetchImageData = () => axios.get('http://localhost:7070/image');
  useEffect(() => {
    fetchImageData().then((response) => { setImageData(response.data); }).catch((error) => { console.log(error); });
  }, []);

  return (
    <div className='h-full w-10/12 mx-auto'>
      {imageData && <img className='object-cover h-full w-full m-auto' src={`data:image/jpg;base64,${imageData}`} alt='Image'/>}
    </div>
  );
};

export default MainPage;
