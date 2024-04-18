import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context.jsx";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [isStatus, setIsStatus, , setLoai, , setThanhVien] =
    useContext(context);
  const [phongDaoTao, setPhongDaoTao] = useState([]);
  const [phongCongTac, setPhongCongTac] = useState([]);
  const [phongHCQT, setPhongHCQT] = useState([]);
  const [phongKhaoThi, setPhongKhaoThi] = useState([]);
  const [phongKHTC, setPhongKHTC] = useState([]);
  const [doanVien, setDoanVien] = useState([]);
  const [deleteTV, setDeleteTV] = useState({
    Status: false,
    Loai: "",
    Ma: "",
    Ten: "",
  });

  useEffect(() => {
    setIsStatus({ ...isStatus, SideBar: true });
    axios
      .get("http://localhost:9000/ThanhVien/PhongDaoTao")
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setPhongDaoTao(rs.data);
          axios
            .get("http://localhost:9000/ThanhVien/PhongCongTac")
            .then((rs) => {
              if (rs.data.Status !== "Not Found") {
                setPhongCongTac(rs.data);
                axios
                  .get("http://localhost:9000/ThanhVien/PhongHCQT")
                  .then((rs) => {
                    if (rs.data.Status !== "Not Found") {
                      setPhongHCQT(rs.data);
                      axios
                        .get("http://localhost:9000/ThanhVien/PhongKhaoThi")
                        .then((rs) => {
                          if (rs.data.Status !== "Not Found") {
                            setPhongKhaoThi(rs.data);
                            axios
                              .get("http://localhost:9000/ThanhVien/PhongKHTC")
                              .then((rs) => {
                                if (rs.data.Status !== "Not Found") {
                                  setPhongKHTC(rs.data);
                                  axios
                                    .get(
                                      "http://localhost:9000/ThanhVien/DoanVien"
                                    )
                                    .then((rs) => {
                                      if (rs.data.Status !== "Not Found") {
                                        setDoanVien(rs.data);
                                      }
                                    })
                                    .catch((err) => {
                                      console.log(err);
                                    });
                                }
                              })
                              .catch((err) => {
                                console.log(err);
                              });
                          }
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const navigate = useNavigate();

  const goToAdd = (value) => {
    setLoai(value);
    navigate("/ThemThanhVien");
  };

  const OpenDelete = (Status, Loai, Ma, Ten) => {
    setDeleteTV({ Status: Status, Loai: Loai, Ma: Ma, Ten: Ten });
  };

  const HandleDelete = () => {
    axios
      .post("http://localhost:9000/ThanhVien/XoaThanhVien", deleteTV)
      .then((rs) => {
        if (rs.data.Status === "Success") {
          OpenDelete(false, "", "", "");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetInfor = (Ma, Loai) => {
    axios
      .post("http://localhost:9000/ThanhVien/ThongTinThanhVien", {
        Ma: Ma,
        Loai: Loai,
      })
      .then((rs) => {
        if (rs.data.Status !== "Fauld") {
          setThanhVien(rs.data);
          setLoai(rs.data.Loai);
          navigate("/EditThanhVien");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {deleteTV.Status ? (
        <div className="fixed flex justify-center items-center bg-[rgba(255,255,255,0.4)] w-full h-full top-0">
          <div className="flex flex-col justify-center items-center w-[500px] bg-white border-[3px] border-zinc-300 rounded-2xl pb-2">
            <div className="flex w-full items-center justify-between px-5 py-2 bg-gray-200 rounded-t-xl">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    className="w-[35px] fill-amber-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-384c13.3 0 24 10.7 24 24V264c0 13.3-10.7 24-24 24s-24-10.7-24-24V152c0-13.3 10.7-24 24-24zM224 352a32 32 0 1 1 64 0 32 32 0 1 1 -64 0z" />
                  </svg>
                </div>
                <div className="text-amber-500">
                  <p>Warning</p>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => OpenDelete(false, "", "", "")}
                  className="bg-gray-200 rounded-full duration-200 ease-linear hover:fill-red-500 hover:bg-white"
                >
                  <svg
                    className="w-[35px] h-[35px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="text-center py-5">
              <p>
                Bạn có chắc muốn xóa thành viên <br /> <b>{deleteTV.Ten}</b>
              </p>
            </div>
            <div>
              <button
                onClick={() => HandleDelete()}
                className="px-5 py-2 bg-red-400 border-2 border-red-400 rounded-xl text-white duration-200 ease-linear hover:bg-white hover:text-red-400 "
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="w-full flex flex-col items-center">
        <div className="w-[95%] mt-5 flex flex-col border-2 border-zinc-400 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 rounded-t-2xl bg-green-200 py-2">
            <div>
              <h1>Phòng Đào Tạo</h1>
            </div>
            <div className="w-[40px] h-[40px]">
              <button
                type="button"
                onClick={() => goToAdd("DaoTao")}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                <div>
                  <svg
                    className="w-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {phongDaoTao && phongDaoTao.length !== 0 ? (
            phongDaoTao.map((i) => (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>{i.Ten}</p>
                </div>
                <div>
                  <p>Chức Vụ - {i.ChucVu}</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => GetInfor(i.Ma, i.Loai)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => OpenDelete(true, i.Loai, i.Ma, i.Ten)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="#ff3030"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
              <div>
                <p>Trống</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-[95%] mt-5 flex flex-col border-2 border-zinc-400 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2">
            <div>
              <h1>Phòng Công Tác</h1>
            </div>
            <div className="w-[40px] h-[40px]">
              <button
                type="button"
                onClick={() => goToAdd("CongTac")}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                <div>
                  <svg
                    className="w-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {phongCongTac && phongCongTac.length !== 0 ? (
            phongCongTac.map((i) => (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>{i.Ten}</p>
                </div>
                <div>
                  <p>Chức Vụ - {i.ChucVu}</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-[40px] h-[40px]">
                    <button className="w-[40px] h-[40px] flex justify-center items-center">
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => OpenDelete(true, i.Loai, i.Ma, i.Ten)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="#ff3030"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
              <div>
                <p>Trống</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-[95%] mt-5 flex flex-col border-2 border-zinc-400 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2">
            <div>
              <h1>Phòng Hành Chính - Quản Trị</h1>
            </div>
            <div className="w-[40px] h-[40px]">
              <button
                type="button"
                onClick={() => goToAdd("HCQT")}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                <div>
                  <svg
                    className="w-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {phongHCQT && phongHCQT.length !== 0 ? (
            phongHCQT.map((i) => (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>{i.Ten}</p>
                </div>
                <div>
                  <p>Chức Vụ - {i.ChucVu}</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-[40px] h-[40px]">
                    <button className="w-[40px] h-[40px] flex justify-center items-center">
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => OpenDelete(true, i.Loai, i.Ma, i.Ten)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="#ff3030"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
              <div>
                <p>Trống</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-[95%] mt-5 flex flex-col border-2 border-zinc-400 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2">
            <div>
              <h1>Phòng Khảo Thí</h1>
            </div>
            <div className="w-[40px] h-[40px]">
              <button
                type="button"
                onClick={() => goToAdd("KhaoThi")}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                <div>
                  <svg
                    className="w-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {phongKhaoThi && phongKhaoThi.length !== 0 ? (
            phongKhaoThi.map((i) => (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>{i.Ten}</p>
                </div>
                <div>
                  <p>Chức Vụ - {i.ChucVu}</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-[40px] h-[40px]">
                    <button className="w-[40px] h-[40px] flex justify-center items-center">
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => OpenDelete(true, i.Loai, i.Ma, i.Ten)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="#ff3030"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
              <div>
                <p>Trống</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-[95%] mt-5 flex flex-col border-2 border-zinc-400 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2">
            <div>
              <h1>Phòng Kế Hoạch - Tài Chính</h1>
            </div>
            <div className="w-[40px] h-[40px]">
              <button
                type="button"
                onClick={() => goToAdd("KHTC")}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                <div>
                  <svg
                    className="w-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {phongKHTC && phongKHTC.length !== 0 ? (
            phongKHTC.map((i) => (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>{i.Ten}</p>
                </div>
                <div>
                  <p>Chức Vụ - {i.ChucVu}</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-[40px] h-[40px]">
                    <button className="w-[40px] h-[40px] flex justify-center items-center">
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => OpenDelete(true, i.Loai, i.Ma, i.Ten)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="#ff3030"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
              <div>
                <p>Trống</p>
              </div>
            </div>
          )}
        </div>
        <div className="w-[95%] mt-5 flex flex-col border-2 border-zinc-400 rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2">
            <div>
              <h1>Đoàn Viên</h1>
            </div>
            <div className="w-[40px] h-[40px]">
              <button
                type="button"
                onClick={() => goToAdd("DoanVien")}
                className="w-[40px] h-[40px] flex justify-center items-center"
              >
                <div>
                  <svg
                    className="w-[25px]"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                  >
                    <path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          {doanVien && doanVien.length !== 0 ? (
            doanVien.map((i) => (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>{i.Ten}</p>
                </div>
                <div>
                  <p>Chức Vụ - {i.ChucVu}</p>
                </div>
                <div className="flex gap-5">
                  <div className="w-[40px] h-[40px]">
                    <button className="w-[40px] h-[40px] flex justify-center items-center">
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160V416c0 53 43 96 96 96H352c53 0 96-43 96-96V320c0-17.7-14.3-32-32-32s-32 14.3-32 32v96c0 17.7-14.3 32-32 32H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H96z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                  <div className="w-[40px] h-[40px]">
                    <button
                      onClick={() => OpenDelete(true, i.Loai, i.Ma, i.Ten)}
                      className="w-[40px] h-[40px] flex justify-center items-center"
                    >
                      <div>
                        <svg
                          className="w-[25px]"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 448 512"
                          fill="#ff3030"
                        >
                          <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                        </svg>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
              <div>
                <p>Trống</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}