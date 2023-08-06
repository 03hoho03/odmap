import React from 'react'
import { Map } from 'react-kakao-maps-sdk'

const MapPage = () => {
  return (
    <div className=''>
      <Map
        center={{ lat: 33.5563, lng: 126.79581 }}
        style={{ width: '100%', height: '360px' }}>
      </Map>
    </div>
  )
}

export default MapPage
