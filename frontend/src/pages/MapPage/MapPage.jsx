import React, { useEffect, useState } from 'react';
import { Map, MarkerClusterer } from 'react-kakao-maps-sdk';
import ToggleBox from './Sections/ToggleBox';
import axios from 'axios';
import Marker from './MapSource/Marker';
const { kakao } = window;

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const [hospitalInfoArray, setHospitalInfoArray] = useState(null);

  useEffect(() => {
    fetchHospitalDatas();
    getCurrentCenter();
    console.log(kakao.maps.MapTypeId);
  }, []);

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
      <ToggleBox />
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}
        level={4}
        mapTypeId={1}
      >
        <MarkerClusterer averageCenter={true} minLevel={6}>
          {hospitalInfoArray
            ? hospitalInfoArray.map((hospitalInfo) => <Marker key={hospitalInfo.암호화요양기호} hospitalInfo={hospitalInfo}></Marker>
            )
            : null}
        </MarkerClusterer>
      </Map>
    </div>
  );
};

export default MapPage;
