import React from 'react'

export default function HoatDong() {
  return (
    <div >
      <div class='w-full h-[60px] flex justify-between items-center bg-[#DCFFEC] py-3 px-6'>
        <div>
          <p>Sự Kiện</p>
        </div>
      </div>
      <div className='flex w-[1350px] h-[100px] ml-9 bg-[#DCDCDC] justify-between items-center  mt-7 rounded-t-3xl'>
        <div className='flex w-full items-center justify-between'>
          <div className="flex items-center">
            <p className="ml-4">*Tên sự kiện</p>
            <p className="ml-[775px]">Tổng Chi Phí:</p>
          </div>
          <button className='mr-7'>
            <img src="./icon/trash-solid.svg" alt="Xóa" />
          </button>
        </div>
      </div>
      <div className='flex w-[1350px] h-[100px] ml-9 bg-[#EEEEEE] justify-between items-center border-b-4 border-black'>
        <div className='flex w-full items-center justify-between'>
          <div className="flex items-center">
            <p className="ml-4">*Nội Dung</p>
            <p className="ml-[800px]">Số tiền:</p>
          </div>
          <button className='mr-7'>
            <img src="./icon/trash-solid.svg" alt="Xóa" />
          </button>
        </div>
      </div>
      <div className='flex w-[1350px] h-[100px] ml-9 bg-[#EEEEEE] justify-center items-center border-b-4 border-black  '>
        <button>
          <img src="./icon/plus-solid.svg" alt="Tăng" />
        </button>
      </div>
      <div className='flex w-[1350px] h-[80px] ml-9 bg-[#DCDCDC] justify-center items-center  mt-7 rounded-3xl'>
        <button>
          <img src="./icon/plus-solid.svg" alt="Tăng" />
        </button>
      </div>
    </div>
  )
}
