import React, { useEffect, useRef } from 'react';
import ToggleBox from '../ToggleBox/index';
import { useSelector, useDispatch } from 'react-redux';
import { findPosition, selected, toggled } from '../../../store/hospitalData';
import UserToolBar from '../UserToolBar';
const { kakao } = window;

const Map = ({ getCurrentCenter }) => {
  const dispatch = useDispatch();

  const filteredHospitalData = useSelector((state) => state.hospital?.filteredHospitalData);
  const position = useSelector((state) => state.hospital?.position);
  const selectedHospitalItem = useSelector((state) => state.hospital?.mapInstance.selectedHospitalItem);

  const mapRef = useRef(null);
  const clusterRef = useRef(null);
  const customOverlayRef = useRef(null);
  const clickedCustomOverlayRef = useRef(null);

  // 지도생성
  useEffect(() => {
    let mapOptionCenter;
    if (position) {
      mapOptionCenter = position;
    } else {
      mapOptionCenter = { lat: 33.450701, lng: 126.570667 };
    }
    const container = document.getElementById('map');
    const mapOption = {
      center: new kakao.maps.LatLng(mapOptionCenter.lat, mapOptionCenter.lng),
      level: 3
    };
    mapRef.current = new kakao.maps.Map(container, mapOption);
  }, []);
  // 좌표변경시 좌표이동
  useEffect(() => {
    if (position) {
      const moveLatLng = new kakao.maps.LatLng(position.lat, position.lng);
      mapRef.current.panTo(moveLatLng);
    }
  }, [position]);
  // 클러스터 생성
  useEffect(() => {
    if (!clusterRef.current) {
      clusterRef.current = new kakao.maps.MarkerClusterer({
        map: mapRef.current,
        averageCenter: true,
        minLevel: 5
      });
    }
    if (filteredHospitalData) {
      if (clusterRef.current) {
        clusterRef.current.clear();
      }
      const markers = filteredHospitalData.map(hospitalInfo => {
        const marker = new kakao.maps.Marker({
          position: new kakao.maps.LatLng(hospitalInfo['좌표(Y)'], hospitalInfo['좌표(X)']),
          title: hospitalInfo.요양기관명
        });
        kakao.maps.event.addListener(marker, 'click', () => onHandleClickMarker(hospitalInfo));
        kakao.maps.event.addListener(marker, 'mouseover', () => onHandleMouseOverMarker(hospitalInfo));
        kakao.maps.event.addListener(marker, 'mouseout', () => onHandleMouseOutMarker(hospitalInfo));
        return marker;
      });
      clusterRef.current.addMarkers(markers);
    }
  }, [filteredHospitalData]);

  useEffect(() => {
    if (selectedHospitalItem) {
      const latitude = selectedHospitalItem['좌표(Y)'];
      const longitude = selectedHospitalItem['좌표(X)'];
      const coords = { lat: latitude, lng: longitude };
      dispatch(findPosition(coords));
      dispatch(toggled(true));
      onCreateClickedCustomOverlay(selectedHospitalItem);
    }
  }, [selectedHospitalItem]);

  const onHandleClickMarker = (hospitalInfo) => {
    dispatch(selected(hospitalInfo));
  };

  const onCreateClickedCustomOverlay = (hospitalInfo) => {
    if (clickedCustomOverlayRef.current) {
      clickedCustomOverlayRef.current.setMap(null);
    }

    const content = document.createElement('div');
    content.setAttribute('class', 'bg-white w-[400px] h-[210px] border rounded-md shadow-md p-4');
    const header = document.createElement('div');
    header.setAttribute('class', 'flex justify-between');
    const headerName = document.createElement('h3');
    headerName.setAttribute('class', 'font-bold');
    headerName.innerText = `${hospitalInfo.요양기관명}`;
    const headerCloseBtn = document.createElement('button');
    headerCloseBtn.innerText = 'X';
    headerCloseBtn.addEventListener('click', () => {
      closeCustomOverlay();
      dispatch(selected(null));
    });
    const reviewContainer = document.createElement('div');
    reviewContainer.setAttribute('class', 'text-sm text-gray-700 mb-2');
    reviewContainer.innerText = '리뷰 35';
    const mainContainer = document.createElement('div');
    mainContainer.setAttribute('class', 'text-sm');
    const address = document.createElement('p');
    address.setAttribute('class', 'break-words');
    address.innerText = `${hospitalInfo.주소}`;
    const addressNumber = document.createElement('p');
    addressNumber.setAttribute('class', 'text-gray-500 mb-1');
    addressNumber.innerText = `(우)${hospitalInfo.우편번호}`;
    const callNumber = document.createElement('p');
    callNumber.setAttribute('class', 'text-green-500');
    callNumber.innerText = `${hospitalInfo.전화번호}`;

    mainContainer.appendChild(address);
    mainContainer.appendChild(addressNumber);
    mainContainer.appendChild(callNumber);

    header.appendChild(headerName);
    header.appendChild(headerCloseBtn);
    content.appendChild(header);
    content.appendChild(reviewContainer);
    content.appendChild(mainContainer);

    const position = new kakao.maps.LatLng(hospitalInfo['좌표(Y)'], hospitalInfo['좌표(X)']);

    clickedCustomOverlayRef.current = new kakao.maps.CustomOverlay({
      position,
      content,
      clickable: true,
      yAnchor: 1.2
    });

    clickedCustomOverlayRef.current.setMap(mapRef.current);
  };

  const closeCustomOverlay = () => {
    clickedCustomOverlayRef.current.setMap(null);
  };

  const onCreateMouseoverCustomOverlay = (hospitalInfo) => {
    const content = `
    <div class='bg-white border shadow-lg rounded-md px-1 py-1 font-bold text-md'>${hospitalInfo.요양기관명} <span class='text-sm text-gray-500'>${hospitalInfo.종별코드명}</span></div>
    `;
    const customOverlayPosition = new kakao.maps.LatLng(hospitalInfo['좌표(Y)'], hospitalInfo['좌표(X)']);
    customOverlayRef.current = new kakao.maps.CustomOverlay({
      position: customOverlayPosition,
      content,
      yAnchor: 2.4
    });
    customOverlayRef.current.setMap(mapRef.current);
  };

  const onHandleMouseOverMarker = (hospitalInfo) => {
    onCreateMouseoverCustomOverlay(hospitalInfo);
  };

  const onHandleMouseOutMarker = () => {
    customOverlayRef.current.setMap(null);
  };

  return (
    <div className='flex w-full h-full'>
      <ToggleBox />
      <div id='map' className='w-full relative'>
        <UserToolBar getCurrentCenter={getCurrentCenter} />
      </div>

    </div>
  );
};

export default Map;
