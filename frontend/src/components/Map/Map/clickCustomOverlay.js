// function createClikedCustomOverlay (hospitalInfo) {
//   const container = document.createElement('div');
//   container.setAttribute('class', 'bg-white w-[400px] h-[210px] border rounded-md shadow-md p-4');
//   const header = document.createElement('div');
//   header.setAttribute('class', 'flex justify-between');
//   const headerName = document.createElement('h3');
//   headerName.setAttribute('class', 'font-bold');
//   const headerCloseBtn = document.createElement('button');
//   headerCloseBtn.addEventListener('click', () => {
//     closeCustomOverlay();
//     dispatchEvent(selected(null));
//   });
// }

// const contentInner = `
//   <div class='bg-white w-[400px] h-[210px] border rounded-md shadow-md p-4'>
//     <div class='flex justify-between'>
//       <h3 class='font-bold'>${hospitalInfo.요양기관명}</h3>
//       <button id="close_btn">X</button>
//     </div>
//     <div class='text-sm text-gray-700 mb-2'>리뷰 35</div>
//     <div class=''>
//       <p class='text-sm'>${hospitalInfo.주소}</p>
//       <p class='text-sm text-gray-500 mb-1'>(우)${hospitalInfo.우편번호}</p>
//       <p class='text-sm text-green-500'>${hospitalInfo.전화번호}</p>
//       <p><a href={hospitalInfo.병원홈페이지}>${hospitalInfo.병원홈페이지}</a></p>
//     </div>
//   </div>
// `;
