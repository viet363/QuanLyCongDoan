import React, { useState } from "react";
import Login from "./Compoment/Login.jsx";
import SideBar from "./Compoment/SideBar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Compoment/Home.jsx";
import HoatDong from "./Compoment/HoatDong.jsx";
import Quy from "./Compoment/Quy.jsx";

export default function PageMain() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <div>
      <div className="fixed w-full top-0">
        <SideBar />
      </div>
      <div className="mt-[55px]">
        <Routes>
          {isLogin ? <Login /> : <></>}
          <Route path="/main_window" element={<Home />} />
          <Route path="/main_window/HoatDong" element={<HoatDong />} />
          <Route path="/main_window/Quy" element={<Quy />} />
        </Routes>
      </div>
    </div>
  );
}
