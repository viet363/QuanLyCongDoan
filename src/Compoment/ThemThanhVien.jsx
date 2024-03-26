import React from 'react'

export default function ThemThanhVien() {
  return (
    <div>
    <div class='w-full h-[60px] flex justify-between items-center bg-[#DCFFEC] py-3 px-6'>
      <div>
        <p>Thêm Thành Viên</p>
      </div>
    </div>
    <div className='flex flex-col items-center justify-center w-full h-[1000px] bg-[#EEEEEE]'>
      <div className="flex flex-col items-start">
        <input className='w-[940px] h-[80px] outline-none bg-[#ffffff] mt-7 rounded-3xl' type="text" placeholder='Mã' />
        <input className='w-[940px] h-[80px] outline-none bg-[#ffffff] mt-7 rounded-3xl' type="text" placeholder='Tên' />
        <input className='w-[940px] h-[80px] outline-none bg-[#ffffff] mt-7 rounded-3xl' type="number" placeholder='Số điện thoại' />
        <input className='w-[940px] h-[80px] outline-none bg-[#ffffff] mt-7 rounded-3xl' type="text" placeholder='Địa chỉ' />
        <input className='w-[940px] h-[80px] outline-none bg-[#ffffff] mt-7 rounded-3xl' type="email" placeholder='Email' />
        <input className='w-[940px] h-[80px] outline-none bg-[#ffffff] mt-7 rounded-3xl' type="text" placeholder='Chức vụ' />
      </div>
      <div class=' flex w-[223px] h-[80px] bg-[#515151] mt-7 rounded-3xl justify-center items-center '>
        <button class='text-white'>Xác Nhận</button>
      </div>
    </div>
  </div>
  )
}
