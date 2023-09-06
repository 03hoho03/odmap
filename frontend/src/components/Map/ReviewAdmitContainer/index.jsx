import React, { useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { useSelector } from 'react-redux';

const ReviewAdmitContainer = () => {
  const [reviewTextarea, setReviewTextarea] = useState('');

  const userData = useSelector((state) => state.user?.userData);
  const selectedHospitalItem = useSelector((state) => state.hospital?.mapInstance.selectedHospitalItem);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        hospitalName: selectedHospitalItem.요양기관명,
        writerName: userData.name,
        writerId: userData.id,
        content: reviewTextarea,
        data: new Date()
      };
      await axiosInstance.post('/review/register', body);
      console.log('success');
    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event) => {
    setReviewTextarea(event.target.value);
  };
  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <textarea className='border resize-none' onChange={handleChange} value={reviewTextarea} ></textarea>
          <button type='submit'>리뷰 쓰기</button>
        </form>
      </div>
    </div>
  );
};

export default ReviewAdmitContainer;
