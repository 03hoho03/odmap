import React, { useEffect, useState } from 'react';
import Map from '../../components/Map/Map/index';
import { useDispatch, useSelector } from 'react-redux';
import { fetchHospital } from '../../store/thunkFunction/hospitalThunkFunction';
import { filtered, findPosition } from '../../store/hospitalData';

const MapPage = () => {
  const dispatch = useDispatch();

  const fetchedHospitalData = useSelector((state) => state.hospital?.fetchedHospitalData);

  useEffect(() => {
    if (fetchedHospitalData.length === 0) {
      dispatch(fetchHospital());
    }
    getCurrentCenter();
  }, []);

  useEffect(() => {
    dispatch(filtered(fetchedHospitalData));
  }, [fetchedHospitalData]);

  const getCurrentCenter = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };
  function successCallback (position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coords = { lat: latitude, lng: longitude };
    dispatch(findPosition(coords));
  }
  function errorCallback (error) {
    console.log('Error occurred while retrieving location.', error);
  }
  return (
    <div className='h-full'>
      <Map />
    </div>
  );
};

export default MapPage;
