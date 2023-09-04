import React from 'react';

const TestPage = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center bg-black h-screen box-border'>
        <div className='bg-white w-[400px] h-[210px] border rounded-md shadow-md p-4'>
          <div className='flex justify-between'>
            <h3 className='font-bold'>서울성소병원</h3>
            <button>X</button>
          </div>

          <div className='text-sm text-gray-700 mb-2'>리뷰 35</div>
          <div className=''>
            <p className='text-sm'>부산 남구 수영로 305 스파크 4층</p>
            <p className='text-sm text-gray-500 mb-1'>(우)49285 (지번) 대연동 83 92</p>
            <p className='text-sm text-green-500'>010-9928-3204</p>
          </div>
        </div>
        <div className='bg-white border shadow-lg rounded-md px-1 font-bold'>푸른내과의원 <span className='text-sm text-gray-500'>내과</span></div>
      </div>
    </div>

  );
};

export default TestPage;
