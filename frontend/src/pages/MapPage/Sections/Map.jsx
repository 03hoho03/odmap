import React, { useEffect, useRef } from 'react';
const { kakao } = window;

const Map = ({ center, hospitalInfoArray, toggled, onHandleToggle }) => {
  const mapRef = useRef(null);
  const clusterRef = useRef(null);

  function handleMarkerClick () {
    console.log(toggled);
    onHandleToggle();
  }

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
        kakao.maps.event.addListener(marker, 'click', () => handleMarkerClick());
        return marker;
      });
      clusterRef.current.addMarkers(markers);
    }
  }, [hospitalInfoArray]);

  return (
    <div className='w-screen'>
      <div id='map' style={{ width: '100%', height: '100%' }}>
      </div>
    </div>
  );
};

export default Map;
