import React, { useEffect, useState } from 'react';
import ToggleBox from './Sections/ToggleBox';
import axios from 'axios';
import Map from './Sections/Map';
// const { kakao } = window;

const MapPage = () => {
  const [center, setCenter] = useState(null);
  const [hospitalInfoArray, setHospitalInfoArray] = useState(null);
  const [toggled, setToggled] = useState(false);

  useEffect(() => {
    fetchHospitalDatas();
    getCurrentCenter();
  }, []);

  function onHandleToggle () {
    setToggled(!toggled);
  }

  function fetchHospitalDatas () {
    axios.get('http://localhost:7070/map').then(response => { setHospitalInfoArray(response.data); console.log(response.data); });
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
    setCenter({ lat: latitude, lng: longitude });
  }
  function errorCallback (error) {
    console.log('Error occurred while retrieving location.', error);
  }
  return (
    <div className='h-full flex'>
      <ToggleBox toggled={toggled} onHandleToggle={onHandleToggle} />
      <Map center={center} hospitalInfoArray={hospitalInfoArray} toggled={toggled} onHandleToggle={onHandleToggle}></Map>
    </div>
  );
};

export default MapPage;
