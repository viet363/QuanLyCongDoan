import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function EditThanhVien() {
  const [isStatus, setIsStatus, loai, , thanhVien, setThanhVien] = useContext(context);
  const ChangeTV = (e) => {
    const { name, value } = e.target;
    setThanhVien({ ...thanhVien, [name]: value });
  };
  const [chucVu, setChucVu] = useState({});
  const [option, setOption] = useState({
    ChucVu: false,
    DiaChi: false,
  });

  const isOption = (ChucVu, DiaChi) => {
    setOption({
      ChucVu: ChucVu,
      DiaChi: DiaChi,
    });
  };

  const navigate = useNavigate();

  const HandleUpdate = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:9000/ThanhVien/ChinhSuaThanhVien", thanhVien)
      .then((rs) => {
        if (rs.data.Status === "Success") {
          navigate("/Home");
        }
      })
      .catch((err) => {
        console.log(err);
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
        <p>
          Chỉnh Sửa Thành Viên Phòng {Title} - {thanhVien.Ten}
        </p>
      </div>
      <div className="flex justify-center items-center bg-zinc-200">
        <div>
          <form
            onSubmit={HandleUpdate}
            className="flex flex-col w-[700px] justify-center items-center p-10 gap-5"
          >
            <div className="flex w-full justify-center items-center bg-gray-500 pl-4 rounded-xl">
              <div className="text-white w-[300px] text-center">
                <p>Mã</p>
              </div>
              <div>
                <input
                  className="px-4 py-2 w-[400px] outline-none rounded-r-xl cursor-default bg-gray-300"
                  type="text"
                  value={thanhVien.Ma}
                  readOnly
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center bg-gray-500 pl-4 rounded-xl">
              <div className="text-white w-[300px] text-center">
                <p>Tên</p>
              </div>
              <div>
                <input
                  className="px-4 py-2 w-[400px] outline-none rounded-r-xl"
                  type="text"
                  value={thanhVien.Ten}
                  name="Ten"
                  onChange={ChangeTV}
                  minLength={5}
                  maxLength={35}
                  required
                  pattern="[^0-9]*"
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center bg-gray-500 pl-4 rounded-xl">
              <div className="text-white w-[300px] text-center">
                <p>Số Điện Thoại</p>
              </div>
              <div>
                <input
                  className="px-4 py-2 w-[400px] outline-none rounded-r-xl"
                  type="text"
                  value={thanhVien.SDT}
                  name="SDT"
                  onChange={ChangeTV}
                  pattern="[0-9]*"
                  maxLength={10}
                  required
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center bg-gray-500 pl-4 rounded-xl">
              <div className="text-white w-[300px] text-center">
                <p>Địa Chỉ</p>
              </div>
              <div>
                <input
                  className="px-4 py-2 w-[400px] outline-none rounded-r-xl"
                  type="text"
                  value={thanhVien.DiaChi}
                  name="DiaChi"
                  onChange={ChangeTV}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center bg-gray-500 pl-4 rounded-xl">
              <div className="text-white w-[300px] text-center">
                <p>Email</p>
              </div>
              <div>
                <input
                  className="px-4 py-2 w-[400px] outline-none rounded-r-xl"
                  type="email"
                  value={thanhVien.Email}
                  name="Email"
                  onChange={ChangeTV}
                />
              </div>
            </div>
            <div className="flex w-full justify-center items-center bg-gray-500 pl-4 rounded-xl">
              <div className="text-white w-[300px] text-center">
                <p>Chức Vụ</p>
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
                      onClick={ChangeTV}
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
            </div>
            <div>
              <button
                type="submit"
                className="px-4 py-2 border-2 border-zinc-400 bg-zinc-400 duration-200 ease-linear rounded-xl text-white hover:bg-white hover:text-zinc-500"
              >
                Xác Nhận
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}