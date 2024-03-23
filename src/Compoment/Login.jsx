import React from 'react'

export default function Login() {
  return (
    <div className='flex justify-center items-center'>
      <div className='flex-col bg-[#C5FF99] w-[320px] h-[500px] rounded-3xl mt-[100px] '>
        <h1 className='font-bold mt-10  text-center text-3xl'>Đăng nhập</h1>
        <div className='flex justify-center items-center mt-16'>
          <input className='rounded-3xl w-[250px] h-[50px] outline-none ' type="email" name=" " id=" " placeholder='Email' />
        </div>
        <div className='flex justify-center items-center mt-16'>
          <input className='rounded-3xl w-[250px] h-[50px] outline-none ' type="password" name=" " id=" " placeholder='Mật khẩu' />
        </div>
        <div className='flex justify-center items-center '>
          <button className='h-[50px] w-[150px] bg-[#44BA81] mt-16 outline-none rounded-3xl  text-white' >Xác nhận</button>
        </div>
      </div>
    </div>
  )
}
