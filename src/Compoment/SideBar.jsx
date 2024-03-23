import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
    const [isOption, setIsOption] = useState(false)
  return (
    <div className="w-full flex justify-between items-center bg-green-400 py-3 px-6">
      <div>
        <p>Quản Lý Công Đoàn</p>
      </div>
      <div className="flex gap-[30px] justify-center items-center">
        <div className="relative ">
          <button onClick={() => setIsOption(!isOption)} className="w-[150px]">Chức Năng</button>
          <div className={isOption ? "absolute flex flex-col gap-2 p-[5px] justify-center items-center bg-slate-400 rounded-xl w-full duration-200 ease h-[110px] overflow-hidden" : "absolute flex flex-col gap-2 p-0 justify-center items-center bg-slate-400 rounded-xl w-full h-0 duration-200 ease overflow-hidden"}>
            <div>
                <Link className="py-2 text-center inline-block w-[140px] duration-200 ease-linear hover:bg-white rounded-xl" to="/main_window/HoatDong">Hoạt Động</Link>
            </div>
            <div>
                <Link className="py-2 text-center inline-block w-[140px] duration-200 ease-linear hover:bg-white rounded-xl" to="/main_window/Quy">Quỹ</Link>
            </div>
        </div>
        </div>
        
        <div className="h-[30px]">
          <button>
            <svg className="w-[30px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M399 384.2C376.9 345.8 335.4 320 288 320H224c-47.4 0-88.9 25.8-111 64.2c35.2 39.2 86.2 63.8 143 63.8s107.8-24.7 143-63.8zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256zm256 16a72 72 0 1 0 0-144 72 72 0 1 0 0 144z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
