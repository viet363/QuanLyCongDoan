import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ThemThanhVien() {
  const [isStatus, setIsStatus, loai] = useContext(context);
  const [thanhVien, setThanhvien] = useState({
    Ma: "",
    Ten: "",
    Loai: loai,
    Email: "",
    ChucVu: "",
    sdt: "",
    DiaChi: "",
  });

  const [chucVu, setChucVu] = useState({});
  const [option, setOption] = useState({
    ChucVu: false,
    DiaChi: false,
  });

  const ChangeThanhVien = (e) => {
    const { name, value } = e.target;
    setThanhvien({ ...thanhVien, [name]: value });
  };

  const isOption = (ChucVu, DiaChi) => {
    setOption({
      ChucVu: ChucVu,
      DiaChi: DiaChi,
    });
  };

  const setTitle = (value) => {
    switch (value) {
      case "DaoTao":
        return "Đào Tạo";
      case "CongTac":
        return "Công Tác";
      case "KHTC":
        return "Kế Hoạch - Tài Chính";
      case "KhaoThi":
        return "Khảo Thí";
      case "HCQT":
        return "Hành Chính - Quản Trị";
      case "DoanVien":
        return "Đoàn Viên";
      default:
        return "";
    }
  };

  const Title = setTitle(loai);

  const navigate = useNavigate();

  const HandleAdd = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/ThanhVien/ThemThanhVien", thanhVien)
      .then((rs) => {
        if (rs.data.Status === "Success") {
          navigate("/Home");
        } else {
          console.log(rs.data.Status);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsStatus({ ...isStatus, Loader: true });
    axios
      .get("http://localhost:9000/ThanhVien/ChucVu")
      .then((rs) => {
        setChucVu(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (chucVu && chucVu.length >= 1) {
      setIsStatus({ ...isStatus, Loader: false });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chucVu]);

  return (
    <div className="w-full flex flex-col">
      <div className="bg-green-100 py-2 px-6 mb-1">
        <p>Thêm Thành Viên Phòng {Title}</p>
      </div>
      <div>
        <form
          onSubmit={HandleAdd}
          className="flex flex-col bg-zinc-200 justify-center items-center p-10 gap-5"
        >
          <div>
            <input
              onChange={ChangeThanhVien}
              className="px-4 py-2 w-[400px] outline-none rounded-xl"
              type="text"
              name="Ma"
              value={thanhVien.Ma}
              pattern="[0-9]*"
              placeholder="Mã"
              maxLength={15}
            />
          </div>
          <div>
            <input
              onChange={ChangeThanhVien}
              className="px-4 py-2 w-[400px] outline-none rounded-xl"
              type="text"
              name="Ten"
              value={thanhVien.Ten}
              placeholder="Tên"
              minLength={5}
              maxLength={35}
              required
              pattern="[^0-9]*"
            />
          </div>
          <div>
            <input
              onChange={ChangeThanhVien}
              className="px-4 py-2 w-[400px] outline-none rounded-xl"
              type="text"
              name="sdt"
              value={thanhVien.sdt}
              placeholder="Số Điện Thoại"
              pattern="[0-9]*"
              maxLength={10}
              required
            />
          </div>
          <div>
            <input
              onChange={ChangeThanhVien}
              className="px-4 py-2 w-[400px] outline-none rounded-xl"
              type="text"
              name="DiaChi"
              value={thanhVien.DiaChi}
              placeholder="Địa Chỉ"
              required
            />
          </div>
          <div>
            <input
              onChange={ChangeThanhVien}
              className="px-4 py-2 w-[400px] outline-none rounded-xl"
              type="email"
              name="Email"
              value={thanhVien.Email}
              placeholder="Email"
              required
            />
          </div>
          <div className="relative">
            <input
              className="px-4 py-2 w-[400px] outline-none rounded-xl cursor-pointer"
              type="text"
              name="ChucVu"
              value={thanhVien.ChucVu}
              placeholder="Chức Vụ"
              required
              onClick={() => isOption(!option.ChucVu, false)}
            />
            {chucVu && chucVu.length >= 1 ? (
              <div
                className={
                  option.ChucVu
                    ? "absolute ml-3 py-2 gap-1 flex flex-col items-center w-full h-[230px] bg-slate-300 -translate-y-full translate-x-full overflow-auto duration-200 ease-linear rounded-2xl"
                    : "absolute ml-3 py-0 gap-1 flex flex-col items-center w-full h-0 bg-slate-300 -translate-y-full translate-x-full overflow-auto duration-200 ease-linear rounded-2xl"
                }
              >
                {chucVu.map((i) => (
                  <div>
                    <button
                      type="button"
                      name="ChucVu"
                      value={i.Loai}
                      onClick={ChangeThanhVien}
                      className="bg-white w-[380px] px-4 py-2 rounded-xl border-2 border-white duration-200 ease-linear hover:bg-zinc-500 hover:text-white"
                    >
                      {i.Loai}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <button className="px-4 py-2 border-2 border-zinc-400 bg-zinc-400 duration-200 ease-linear rounded-xl text-white hover:bg-white hover:text-zinc-500">
              Xác Nhận
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
