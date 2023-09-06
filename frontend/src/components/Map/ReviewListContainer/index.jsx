import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const ItemsPerPage = 5;

const ReviewListContainer = () => {
  const [reviewItems, setReviewItems] = useState([]);
  const [reviewsTotal, setReviewsTotal] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const selectedHospitalItem = useSelector((state) => state.hospital?.mapInstance.selectedHospitalItem);

  useEffect(() => {
    if (selectedHospitalItem) {
      const skip = (currentPage - 1) * ItemsPerPage;
      const limit = ItemsPerPage;
      axios.post('http://localhost:7070/review/reviewList', { hospitalName: selectedHospitalItem.요양기관명, skip, limit }).then((response) => {
        setReviewItems(response.data.reviewItems);
        setReviewsTotal(response.data.reviewsTotal);
        console.log(response.data);
      });
    }
  }, [selectedHospitalItem]);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <ul>
        {reviewItems.length > 0
          ? reviewItems.map((review, idx) => {
            const { content } = review;
            return (<li key={`${content}-${idx}`}>{content}</li>);
          })
          : <div>리뷰가 없습니다.</div>
        }

      </ul>
      <div>
        {/* 페이지 번호를 생성 */}
        {Array(Math.ceil(reviewsTotal / ItemsPerPage)).map((_, i) => {
          return <div key={i} className='bg-black' onClick={handlePageClick}>hello</div>;
        })}
      </div>
    </div>
  );
};

export default ReviewListContainer;
