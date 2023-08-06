import React, { useEffect, useState } from 'react'
import { Map } from 'react-kakao-maps-sdk'
import ToggleBox from './Sections/ToggleBox'

const MapPage = () => {
  const [center, setCenter] = useState({ lat: 0, lng: 0 })
  // const [toggled, setToggled] = useState(false)
  useEffect(() => {
    getCurrentCenter()
  }, [])

  function getCurrentCenter () {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(successCallback, errorCallback)
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }
  function successCallback (position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude
    setCenter({ lat: latitude, lng: longitude })
  }
  function errorCallback (error) {
    console.log('Error occurred while retrieving location.', error)
  }
  return (
    <div className='h-full flex'>
      <ToggleBox />
      <Map
        center={center}
        style={{ width: '100%', height: '100%' }}>
      </Map>
    </div>
  )
}

export default MapPage
