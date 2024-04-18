import React, { useContext } from "react";
import Login from "./Compoment/Login.jsx";
import SideBar from "./Compoment/SideBar.jsx";
import { Route, Routes } from "react-router-dom";
import Home from "./Compoment/Home.jsx";
import Quy from "./Compoment/Quy.jsx";
import { context } from "./Context.jsx";
import ThemThanhVien from "./Compoment/ThemThanhVien.jsx";
import EditThanhVien from "./Compoment/EditThanhVien.jsx"

export default function PageMain() {
  const [isStatus] = useContext(context);
  return (
    <div>
      {isStatus.SideBar ? (
        <div className="fixed w-full z-[5] top-0">
          <SideBar />
        </div>
      ) : (
        <></>
      )}
      {isStatus.Loader? <div className="fixed z-10 top-0 bg-white opacity-70 flex w-full h-full justify-center items-center"><div className="loader"></div>
        </div> : <></>}
      <div className={isStatus.SideBar ? "mt-[65px]" : ""}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Quy" element={<Quy />} />
          <Route path="/ThemThanhVien" element={<ThemThanhVien />} />
          <Route path="/EditThanhVien" element={<EditThanhVien />} />
        </Routes>
      </div>
    </div>
  );
}