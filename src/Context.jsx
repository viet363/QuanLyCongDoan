import React, { createContext, useState } from 'react'

export const context = createContext();
export default function Context({ Compoment }) {
    const [isStatus, setIsStatus] = useState({
        SideBar: true,
        Login: false,
        Loader: false
    });
    const [loai, setLoai] = useState("");
    const [thanhVien, setThanhVien] = useState({})

  return (
    <context.Provider value={[isStatus, setIsStatus, loai, setLoai, thanhVien, setThanhVien]}>
        {Compoment}
    </context.Provider>
  )
}