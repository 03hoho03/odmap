import React, { useState } from 'react';
import { CustomOverlayMap, MapMarker } from 'react-kakao-maps-sdk';

const Marker = ({ hospitalInfo }) => {
  const [isClicked, setIsClicked] = useState(false);
  function handleClickMarker () {
    setIsClicked(!isClicked);
    console.log(isClicked);
  }
  return (
    <>
      <MapMarker
        key={hospitalInfo.암호화요양기호}
        position={{ lat: hospitalInfo['좌표(Y)'], lng: hospitalInfo['좌표(X)'] }}
        clickable={true}
        title={hospitalInfo.요양기관명}
        onClick={handleClickMarker}
      />
      {isClicked &&
        // <CustomOverlayMap position={{ lat: hospitalInfo['좌표(Y)'], lng: hospitalInfo['좌표(X)'] }}>{'hi'}</CustomOverlayMap>
        <CustomOverlayMap
          position={{ lat: hospitalInfo['좌표(Y)'], lng: hospitalInfo['좌표(X)'] }}
          yAnchor={4}
          zIndex={100}
        >
          <div className='bg-white'>hello</div>
        </CustomOverlayMap>
      }

    </>

  );
};

export default Marker;
