import React, { useEffect, useRef, useState } from 'react';
import ToggleBox from './ToggleBox';
const { kakao } = window;

const Map = ({ center, hospitalInfoArray }) => {
  const [toggled, setToggled] = useState(false);
  const [hospitalInfo, setHospitalInfo] = useState({});
  const mapRef = useRef(null);
  const clusterRef = useRef(null);

  useEffect(() => {
    const container = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(33.45, 126.57),
      level: 3
    };
    mapRef.current = new kakao.maps.Map(container, mapOption);
  }, []);
  useEffect(() => {
    if (center) {
      const moveLatLng = new kakao.maps.LatLng(center.lat, center.lng);
      mapRef.current.panTo(moveLatLng);
    }
  }, [center]);
  useEffect(() => {
    if (!clusterRef.current) {
      clusterRef.current = new kakao.maps.MarkerClusterer({
        map: mapRef.current,
        averageCenter: true,
        minLevel: 5
      });
    }

    if (hospitalInfoArray) {
      const markers = hospitalInfoArray.map(hospitalInfo => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(hospitalInfo['좌표(Y)'], hospitalInfo['좌표(X)']),
          title: hospitalInfo.요양기관명
        });
        kakao.maps.event.addListener(marker, 'click', () => onHandleClickMarker(hospitalInfo));
        return marker;
      });
      clusterRef.current.addMarkers(markers);
    }
  }, [hospitalInfoArray]);

  function onHandleClickMarker (hospitalInfo) {
    setToggled(true);
    setHospitalInfo(hospitalInfo);
    console.log(hospitalInfo);
  }

  function onHandleToggle () {
    setToggled(!toggled);
  }

  return (
    <div className='w-screen flex h-full'>
      <ToggleBox toggled={toggled} onHandleToggle={onHandleToggle} hospitalInfo={hospitalInfo} />
      <div id='map' style={{ width: '100%', height: '100%' }}>
      </div>
    </div>
  );
};

export default Map;
