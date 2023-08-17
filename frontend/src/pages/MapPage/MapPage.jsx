import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Map from './Sections/Map';
// const { kakao } = window;

const MapPage = () => {
  const [center, setCenter] = useState(null);
  const [hospitalInfoArray, setHospitalInfoArray] = useState(null);

  useEffect(() => {
    fetchHospitalDatas();
    getCurrentCenter();
  }, []);

  function fetchHospitalDatas () {
    axios.get('http://localhost:7070/map').then(response => { setHospitalInfoArray(response.data); });
  }
  function getCurrentCenter () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  }
  function successCallback (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = { lat: latitude, lng: longitude };
    handleCenter(coords);
  }
  function errorCallback (error) {
    console.log('Error occurred while retrieving location.', error);
  }
  const handleCenter = (coords) => {
    setCenter(coords);
  };
  return (
    <div className='h-full'>
      <Map center={center} handleCenter={handleCenter} hospitalInfoArray={hospitalInfoArray}></Map>
    </div>
  );
};

export default MapPage;
