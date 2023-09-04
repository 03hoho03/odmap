import axios from 'axios';
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../utils/axios';
import { useSelector } from 'react-redux';

const ReviewContainer = ({ hospitalInfo }) => {
  const [reviewTextarea, setReviewTextarea] = useState('');
  const [reviewList, setReviewList] = useState([]);
  const userData = useSelector((state) => state.user?.userData);
  useEffect(() => {
    if (hospitalInfo) {
      axios.post('http://localhost:7070/review/reviewList', { hospitalName: hospitalInfo.요양기관명 }).then((response) => {
        setReviewList(response.data.reviewList);
      });
    }
  }, [hospitalInfo]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const body = {
        hospitalName: hospitalInfo.요양기관명,
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
        <ul>
          {reviewList.length > 0
            ? reviewList.map((review, idx) => {
              const { content } = review;
              return (<li key={`${content}-${idx}`}>{content}</li>);
            })
            : <div>리뷰가 없습니다.</div>}
        </ul>
      </div>
    </div>
  );
};

export default ReviewContainer;
