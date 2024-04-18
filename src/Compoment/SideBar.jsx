import React from "react";
import { Link } from "react-router-dom";

export default function SideBar() {
  return (
    <div className="w-full flex justify-between items-center bg-green-400 py-3 px-6">
      <div>
        <Link to="/Home">Quản Lý Công Đoàn</Link>
      </div>
      <div className="flex gap-10 justify-center items-center pl-10">
        <div>
          <Link className="px-5 py-2 bg-emerald-400 text-zinc-600 rounded-xl border-2 border-emerald-400 duration-200 ease-linear hover:border-white hover:text-white" to="/Home">Danh Sách Thành Viên</Link>
        </div>
        <div>
          <Link className="px-5 py-2 bg-emerald-400 text-zinc-600 rounded-xl border-2 border-emerald-400 duration-200 ease-linear hover:border-white hover:text-white" to="/Quy">Quỹ</Link>
        </div>
      </div>
    </div>
  );
}