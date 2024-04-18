import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context";

export default function Quy() {
  const [isStatus, setIsStatus] = useContext(context);
  const [isYear, setIsYear] = useState({
    DaoTao: false,
    CongTac: false,
    HCQT: false,
    KhaoThi: false,
    KHTC: false,
  });
  const [isQuy, setIsQuy] = useState({
    DaoTao: false,
    CongTac: false,
    HCQT: false,
    KhaoThi: false,
    KHTC: false,
  });
  const [quyTaiPhong, setQuyTaiPhong] = useState({
    DaoTao: 0,
    CongTac: 0,
    HCQT: 0,
    KhaoThi: 0,
    KHTC: 0,
  });
  const [isHandle, setIsHandle] = useState({
    Message: "",
  });
  const [tongQuy, setTongQuy] = useState(0);
  const [phongDaoTao, setPhongDaoTao] = useState([]);
  const [phongCongTac, setPhongCongTac] = useState([]);
  const [phongHCQT, setPhongHCQT] = useState([]);
  const [phongKhaoThi, setPhongKhaoThi] = useState([]);
  const [phongKHTC, setPhongKHTC] = useState([]);
  const [editThanhVien, setEditThanhVien] = useState({
    _id: "",
    Ma: "",
    Ten: "",
    SoTien: 0,
    Loai: "",
    Nam: "",
    Quy: "",
    Phong: "",
    Open: false,
  });

  const [isWait, setIsWait] = useState({
    DaoTao: false,
    CongTac: false,
    HCQT: false,
    KhaoThi: false,
    KHTC: false,
  });
  const CurrentDay = new Date();

  const [inputDate, setInputDate] = useState({
    Ngay: "dd",
    Thang: "MM",
    Nam: "yyyy",
  });

  const [optionSelete, setOptionSelete] = useState({
    NamPDT: CurrentDay.getFullYear(),
    QuyPDT: 1,
    NamPCT: CurrentDay.getFullYear(),
    QuyPCT: 1,
    NamPHCQT: CurrentDay.getFullYear(),
    QuyPHCQT: 1,
    NamPKT: CurrentDay.getFullYear(),
    QuyPKT: 1,
    NamPKHTC: CurrentDay.getFullYear(),
    QuyPKHTC: 1,
  });

  const [wrongEdit, setWrongEdit] = useState({
    SoTien: false,
    Ngay: false,
  });

  const ChangeOptionSelete = (e) => {
    const { name, value } = e.target;
    setOptionSelete({ ...optionSelete, [name]: parseInt(value) });
  };

  const ChangeYearBar = (name, value) => {
    setIsYear({ ...isYear, [name]: value });
  };

  const ChangeQuyBar = (name, value) => {
    setIsQuy({ ...isQuy, [name]: value });
  };

  const ChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditThanhVien({ ...editThanhVien, [name]: value });
  };

  const Year = CurrentDay.getFullYear();

  const SetTongQuy = () => {
    axios
      .get("http://localhost:9000/Quy/TongQuy")
      .then((rs2) => {
        setTongQuy(rs2.data[0].TongTien);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setIsStatus({ ...isStatus, Loader: true });
    axios
      .get("http://localhost:9000/Quy/XuLyDuLieu")
      .then((rs1) => {
        SetTongQuy();
        setIsHandle({ Message: rs1.data.Status });
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isHandle.Message === "Success") {
      setIsStatus({ ...isStatus, Loader: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHandle.Message]);

  useEffect(() => {
    setIsWait({ ...isWait, DaoTao: true });
    axios
      .post("http://localhost:9000/Quy/PhongDaoTao", {
        Nam: optionSelete.NamPDT,
        Quy: optionSelete.QuyPDT,
      })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setPhongDaoTao(rs.data);
        } else {
          setPhongDaoTao([]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelete.NamPDT, optionSelete.QuyPDT]);

  useEffect(() => {
    if (phongDaoTao || phongDaoTao.length >= 1) {
      const Sum = phongDaoTao.reduce((CurrentValue, Value) => {
        return CurrentValue + Value.SoTien;
      }, 0);
      setQuyTaiPhong({ ...quyTaiPhong, DaoTao: Sum });
    } else {
      setQuyTaiPhong({ ...quyTaiPhong, DaoTao: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongDaoTao]);

  useEffect(() => {
    setIsWait({ ...isWait, CongTac: true });
    axios
      .post("http://localhost:9000/Quy/PhongCongTac", {
        Nam: optionSelete.NamPCT,
        Quy: optionSelete.QuyPCT,
      })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setPhongCongTac(rs.data);
        } else {
          setPhongCongTac([]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelete.NamPCT, optionSelete.QuyPCT]);

  useEffect(() => {
    if (phongCongTac || phongCongTac.length >= 1) {
      const Sum = phongCongTac.reduce((CurrentValue, Value) => {
        return CurrentValue + Value.SoTien;
      }, 0);
      setQuyTaiPhong({ ...quyTaiPhong, CongTac: Sum });
    } else {
      setQuyTaiPhong({ ...quyTaiPhong, CongTac: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongCongTac]);

  useEffect(() => {
    setIsWait({ ...isWait, HCQT: true });
    axios
      .post("http://localhost:9000/Quy/PhongHCQT", {
        Nam: optionSelete.NamPHCQT,
        Quy: optionSelete.QuyPHCQT,
      })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setPhongHCQT(rs.data);
        } else {
          setPhongHCQT([]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelete.NamPHCQT, optionSelete.QuyPHCQT]);

  useEffect(() => {
    if (phongHCQT || phongHCQT.length >= 1) {
      const Sum = phongHCQT.reduce((CurrentValue, Value) => {
        return CurrentValue + Value.SoTien;
      }, 0);
      setQuyTaiPhong({ ...quyTaiPhong, HCQT: Sum });
    } else {
      setQuyTaiPhong({ ...quyTaiPhong, HCQT: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongHCQT]);

  useEffect(() => {
    setIsWait({ ...isWait, KhaoThi: true });
    axios
      .post("http://localhost:9000/Quy/PhongKhaoThi", {
        Nam: optionSelete.NamPKT,
        Quy: optionSelete.QuyPKT,
      })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setPhongKhaoThi(rs.data);
        } else {
          setPhongKhaoThi([]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelete.NamPKT, optionSelete.QuyPKT]);

  useEffect(() => {
    if (phongKhaoThi || phongKhaoThi.length >= 1) {
      const Sum = phongKhaoThi.reduce((CurrentValue, Value) => {
        return CurrentValue + Value.SoTien;
      }, 0);
      setQuyTaiPhong({ ...quyTaiPhong, KhaoThi: Sum });
    } else {
      setQuyTaiPhong({ ...quyTaiPhong, KhaoThi: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongKhaoThi]);

  useEffect(() => {
    setIsWait({ ...isWait, KHTC: true });
    axios
      .post("http://localhost:9000/Quy/PhongKHTC", {
        Nam: optionSelete.NamPKHTC,
        Quy: optionSelete.QuyPKHTC,
      })
      .then((rs) => {
        if (rs.data.Status !== "Not Found") {
          setPhongKHTC(rs.data);
        } else {
          setPhongKHTC([]);
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [optionSelete.NamPKHTC, optionSelete.QuyPKHTC]);

  useEffect(() => {
    if (phongKHTC || phongKHTC.length >= 1) {
      const Sum = phongKHTC.reduce((CurrentValue, Value) => {
        return CurrentValue + Value.SoTien;
      }, 0);
      setQuyTaiPhong({ ...quyTaiPhong, KHTC: Sum });
    } else {
      setQuyTaiPhong({ ...quyTaiPhong, KHTC: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongKHTC]);

  useEffect(() => {
    setIsWait({ ...isWait, DaoTao: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongDaoTao]);

  useEffect(() => {
    setIsWait({ ...isWait, CongTac: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongCongTac]);

  useEffect(() => {
    setIsWait({ ...isWait, HCQT: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongHCQT]);

  useEffect(() => {
    setIsWait({ ...isWait, KhaoThi: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongKhaoThi]);

  useEffect(() => {
    setIsWait({ ...isWait, KHTC: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phongKHTC]);

  const OptionYear = ({ Loai }) => {
    const Element = [];
    for (let i = Year; i > Year - 4; i--) {
      Element.push(
        <div className="w-full">
          <button
            type="button"
            onClick={ChangeOptionSelete}
            name={Loai}
            value={i}
            className="duration-200 border-2 border-white bg-white ease-linear w-full rounded-xl hover:bg-zinc-400 hover:text-white"
          >
            {i}
          </button>
        </div>
      );
    }
    return <>{Element}</>;
  };

  const OptionQuy = ({ Name }) => {
    return (
      <>
        <div className="w-full">
          <button
            type="button"
            value={1}
            name={Name}
            onClick={ChangeOptionSelete}
            className="duration-200 border-2 border-white bg-white ease-linear w-full rounded-xl hover:bg-zinc-400 hover:text-white"
          >
            1
          </button>
        </div>
        <div className="w-full">
          <button
            type="button"
            value={2}
            name={Name}
            onClick={ChangeOptionSelete}
            className="duration-200 border-2 border-white bg-white ease-linear w-full rounded-xl hover:bg-zinc-400 hover:text-white"
          >
            2
          </button>
        </div>
        <div className="w-full">
          <button
            type="button"
            value={3}
            name={Name}
            onClick={ChangeOptionSelete}
            className="duration-200 border-2 border-white bg-white ease-linear w-full rounded-xl hover:bg-zinc-400 hover:text-white"
          >
            3
          </button>
        </div>
        <div className="w-full">
          <button
            type="button"
            value={4}
            name={Name}
            onClick={ChangeOptionSelete}
            className="duration-200 border-2 border-white bg-white ease-linear w-full rounded-xl hover:bg-zinc-400 hover:text-white"
          >
            4
          </button>
        </div>
      </>
    );
  };

  const ChangeInputDate = (e) => {
    const { name, value } = e.target;
    if (name === "Ngay") {
      if (value.length === 2) {
        document.getElementById("Thang").focus();
      }
    }
    if (name === "Thang") {
      if (value.length === 2) {
        document.getElementById("Nam").focus();
      }
    }
    setInputDate({ ...inputDate, [name]: value });
  };

  useEffect(() => {
    const Ngay = parseInt(inputDate.Ngay);
    const Thang = parseInt(inputDate.Thang);
    const Nam = parseInt(inputDate.Nam);
    if (isNaN(Ngay)) {
      setInputDate({ ...inputDate });
    } else {
      if (isNaN(Thang) || isNaN(Nam)) {
        if (Ngay > 30) {
          setInputDate({ ...inputDate, Ngay: "30" });
        } else {
          setInputDate({ ...inputDate, Ngay: Ngay.toString() });
        }
      } else {
        const DayOfMonth = new Date(Nam, Thang, 0);
        const NumberDay = DayOfMonth.getDate();
        if (Ngay > NumberDay) {
          setInputDate({ ...inputDate, Ngay: NumberDay });
        } else {
          setInputDate({ ...inputDate, Ngay: Ngay.toString() });
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputDate.Ngay, inputDate.Thang, inputDate.Nam]);

  useEffect(() => {
    const Thang = parseInt(inputDate.Thang);
    if (isNaN(Thang)) {
      setInputDate({ ...inputDate });
    } else {
      if (Thang > 12) {
        setInputDate({ ...inputDate, Thang: "12" });
      } else {
        setInputDate({ ...inputDate, Thang: Thang.toString() });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputDate.Thang]);

  useEffect(() => {
    const Nam = parseInt(inputDate.Nam);
    if (isNaN(Nam)) {
      setInputDate({ ...inputDate });
    } else {
      if (Nam > Year) {
        setInputDate({ ...inputDate, Nam: Year.toString() });
      } else {
        setInputDate({ ...inputDate, Nam: Nam.toString() });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputDate.Nam]);

  useEffect(() => {
    axios
      .post("http://localhost:9000/Quy/LaySoTienThanhVien", {
        Loai: editThanhVien.Loai,
        _id: editThanhVien._id,
      })
      .then((rs) => {
        if (editThanhVien.Loai === "DaoTao") {
          setEditThanhVien({
            ...editThanhVien,
            SoTien: rs.data.SoTien,
            Nam: optionSelete.NamPDT,
            Quy: optionSelete.QuyPDT,
          });
        } else if (editThanhVien.Loai === "CongTac") {
          setEditThanhVien({
            ...editThanhVien,
            SoTien: rs.data.SoTien,
            Nam: optionSelete.NamPCT,
            Quy: optionSelete.QuyPCT,
          });
        } else if (editThanhVien.Loai === "HCQT") {
          setEditThanhVien({
            ...editThanhVien,
            SoTien: rs.data.SoTien,
            Nam: optionSelete.NamPHCQT,
            Quy: optionSelete.QuyPHCQT,
          });
        } else if (editThanhVien.Loai === "KhaoThi") {
          setEditThanhVien({
            ...editThanhVien,
            SoTien: rs.data.SoTien,
            Nam: optionSelete.NamPKT,
            Quy: optionSelete.QuyPKT,
          });
        } else {
          setEditThanhVien({
            ...editThanhVien,
            SoTien: rs.data.SoTien,
            Nam: optionSelete.NamPKHTC,
            Quy: optionSelete.QuyPKHTC,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editThanhVien.Ma]);

  useEffect(() => {
    setIsStatus({ ...isStatus, Loader: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editThanhVien.SoTien]);

  const OnEdit = (Type, _id, Ma, Ten, Phong) => {
    setIsStatus({ ...isStatus, Loader: true });
    setEditThanhVien({
      ...editThanhVien,
      _id: _id,
      Ma: Ma,
      Ten: Ten,
      Loai: Type,
      Open: true,
      Phong: Phong,
    });
  };

  const CloseEdit = () => {
    if (editThanhVien.Loai === "DaoTao") {
      axios
        .post("http://localhost:9000/Quy/PhongDaoTao", {
          Nam: optionSelete.NamPDT,
          Quy: optionSelete.QuyPDT,
        })
        .then((rs) => {
          if (rs.data.Status !== "Not Found") {
            setPhongDaoTao(rs.data);
            SetTongQuy();
          } else {
            setPhongDaoTao([]);
          }
        });
    } else if (editThanhVien.Loai === "CongTac") {
      axios
        .post("http://localhost:9000/Quy/PhongCongTac", {
          Nam: optionSelete.NamPCT,
          Quy: optionSelete.QuyPCT,
        })
        .then((rs) => {
          if (rs.data.Status !== "Not Found") {
            setPhongCongTac(rs.data);
            SetTongQuy();
          } else {
            setPhongCongTac([]);
          }
        });
    } else if (editThanhVien.Loai === "HCQT") {
      axios
        .post("http://localhost:9000/Quy/PhongHCQT", {
          Nam: optionSelete.NamPHCQT,
          Quy: optionSelete.QuyPHCQT,
        })
        .then((rs) => {
          if (rs.data.Status !== "Not Found") {
            setPhongHCQT(rs.data);
            SetTongQuy();
          } else {
            setPhongHCQT([]);
          }
        });
    } else if (editThanhVien.Loai === "KhaoThi") {
      axios
        .post("http://localhost:9000/Quy/PhongKhaoThi", {
          Nam: optionSelete.NamPKT,
          Quy: optionSelete.QuyPKT,
        })
        .then((rs) => {
          if (rs.data.Status !== "Not Found") {
            setPhongKhaoThi(rs.data);
            SetTongQuy();
          } else {
            setPhongKhaoThi([]);
          }
        });
    } else {
      axios
        .post("http://localhost:9000/Quy/PhongKHTC", {
          Nam: optionSelete.NamPKHTC,
          Quy: optionSelete.QuyPKHTC,
        })
        .then((rs) => {
          if (rs.data.Status !== "Not Found") {
            setPhongKHTC(rs.data);
            SetTongQuy();
          } else {
            setPhongKHTC([]);
          }
        });
    }
    setEditThanhVien({
      _id: "",
      Ma: "",
      Ten: "",
      SoTien: 0,
      Loai: "",
      Nam: "",
      Quy: "",
      Phong: "",
      Open: false,
    });
  };

  const HandleEdit = () => {
    if (
      isNaN(parseInt(inputDate.Ngay)) ||
      isNaN(parseInt(inputDate.Thang)) ||
      isNaN(parseInt(inputDate.Nam))
    ) {
      if (editThanhVien.SoTien < 0) {
        setWrongEdit({ Ngay: true, SoTien: true });
      } else {
        setWrongEdit({ Ngay: true, SoTien: false });
      }
    } else {
      if (parseInt(inputDate.Nam) < Year - 30) {
        setInputDate({ ...inputDate, Year: (Year - 30).toString() });
      }
      axios
        .post("http://localhost:9000/Quy/ChinhSuaThanhVien", {
          ...editThanhVien,
          FullDay: `${inputDate.Ngay}/${inputDate.Thang}/${inputDate.Nam}`,
        })
        .then((rs) => {
          if (rs.data.Status === "Success") {
            setWrongEdit({ Ngay: false, SoTien: false });
            CloseEdit();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <>
      {editThanhVien.Open ? (
        <div className="fixed w-full h-full bg-[rgba(255,255,255,0.4)] flex justify-center items-center top-0 z-[7]">
          <div className="flex flex-col items-center justify-center w-[700px] bg-white rounded-xl border-2 border-zinc-400">
            <div className="flex w-full items-center justify-between px-5 py-2 bg-gray-200 rounded-t-xl">
              <div className="flex items-center gap-4">
                <div>
                  <svg
                    className="w-[35px] fill-black"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path d="M441 58.9L453.1 71c9.4 9.4 9.4 24.6 0 33.9L424 134.1 377.9 88 407 58.9c9.4-9.4 24.6-9.4 33.9 0zM209.8 256.2L344 121.9 390.1 168 255.8 302.2c-2.9 2.9-6.5 5-10.4 6.1l-58.5 16.7 16.7-58.5c1.1-3.9 3.2-7.5 6.1-10.4zM373.1 25L175.8 222.2c-8.7 8.7-15 19.4-18.3 31.1l-28.6 100c-2.4 8.4-.1 17.4 6.1 23.6s15.2 8.5 23.6 6.1l100-28.6c11.8-3.4 22.5-9.7 31.1-18.3L487 138.9c28.1-28.1 28.1-73.7 0-101.8L474.9 25C446.8-3.1 401.2-3.1 373.1 25zM88 64C39.4 64 0 103.4 0 152V424c0 48.6 39.4 88 88 88H360c48.6 0 88-39.4 88-88V312c0-13.3-10.7-24-24-24s-24 10.7-24 24V424c0 22.1-17.9 40-40 40H88c-22.1 0-40-17.9-40-40V152c0-22.1 17.9-40 40-40H200c13.3 0 24-10.7 24-24s-10.7-24-24-24H88z" />
                  </svg>
                </div>
                <div className="text-black font-bold">
                  <p>Chỉnh Sửa</p>
                </div>
              </div>
              <div className="flex">
                <button
                  onClick={() => {
                    CloseEdit();
                  }}
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
            <div className="flex">
              <div className="flex flex-col bg-slate-100 p-3 m-2 rounded-xl">
                <div className="text-center pt-1 pb-3 font-bold">
                  <p>{editThanhVien.Phong}</p>
                </div>
                <div className="w-full border-b-2 border-zinc-300">
                  <p>Tên: {editThanhVien.Ten}</p>
                </div>
                <div className="w-full border-b-2 border-zinc-300">
                  <p>Quý: {editThanhVien.Quy}</p>
                </div>
                <div className="w-full border-b-2 border-zinc-300">
                  <p>Năm: {editThanhVien.Nam}</p>
                </div>
              </div>
              <div className="flex flex-col items-center bg-slate-100 gap-5 p-3 m-2 rounded-xl">
                <div
                  className={
                    wrongEdit.SoTien
                      ? "flex items-center border-2 border-red-400 rounded-xl"
                      : "flex items-center"
                  }
                >
                  <div className="w-[130px] text-center bg-zinc-300 rounded-l-xl py-1">
                    <p>Số Tiền</p>
                  </div>
                  <div>
                    <input
                      className="w-[230px] outline-none px-3 py-1 rounded-r-xl"
                      min={0}
                      type="number"
                      value={editThanhVien.SoTien}
                      name="SoTien"
                      onChange={ChangeEdit}
                      placeholder="Số Tiền..."
                    ></input>
                  </div>
                </div>
                <div
                  className={
                    wrongEdit.Ngay
                      ? "flex items-center border-2 border-red-400 rounded-2xl overflow-hidden"
                      : "flex items-center"
                  }
                >
                  <div className="w-[130px] text-center bg-zinc-300 rounded-l-xl py-1">
                    <p>Ngày Đóng</p>
                  </div>
                  <div className="flex justify-stretch items-center bg-white py-1 rounded-r-xl">
                    <div>
                      <input
                        name="Ngay"
                        value={inputDate.Ngay}
                        onChange={ChangeInputDate}
                        type="text"
                        maxLength={2}
                        id="Ngay"
                        className="w-[40px] text-center outline-none"
                      ></input>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={"/"}
                        onClick={() => document.getElementById("Thang").focus()}
                        className="w-[20px] text-center outline-none"
                        readOnly
                      ></input>
                    </div>
                    <div>
                      <input
                        name="Thang"
                        value={inputDate.Thang}
                        onChange={ChangeInputDate}
                        type="text"
                        maxLength={2}
                        id="Thang"
                        className="w-[40px] text-center outline-none"
                      ></input>
                    </div>
                    <div>
                      <input
                        type="text"
                        value={"/"}
                        onClick={() => document.getElementById("Nam").focus()}
                        className="w-[20px] text-center outline-none"
                        readOnly
                      ></input>
                    </div>
                    <div>
                      <input
                        name="Nam"
                        value={inputDate.Nam}
                        onChange={ChangeInputDate}
                        type="text"
                        maxLength={4}
                        id="Nam"
                        className="w-[80px] text-center outline-none"
                      ></input>
                    </div>
                    <div>
                      <input
                        className="w-[30px]"
                        type="date"
                        onChange={(e) => {
                          const NTN = e.target.value.split("-");
                          setInputDate({
                            Ngay: NTN[2],
                            Thang: NTN[1],
                            Nam: NTN[0],
                          });
                        }}
                      ></input>
                    </div>
                  </div>
                </div>

                <div>
                  <button
                    onClick={() => HandleEdit()}
                    type="button"
                    className="px-5 py-2 bg-emerald-400 border-2 border-emerald-400 rounded-xl text-white duration-200 ease-linear hover:bg-white hover:text-emerald-400 "
                  >
                    Xác Nhận
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <div className="w-full flex flex-col items-center gap-10 pb-10">
        <div className="bg-green-100 py-2 px-6 mb-1 w-full">
          <p>Tổng Quỹ Hiện Tại: {tongQuy.toLocaleString("en-US")} VND</p>
        </div>
        <div className="w-[95%] flex flex-col border-2 border-zinc-400 rounded-2xl">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2 rounded-t-2xl">
            <div>
              <h1>Phòng Đào Tạo</h1>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="relative">
                <button
                  onClick={() => ChangeYearBar("DaoTao", !isYear.DaoTao)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Năm: {optionSelete.NamPDT}
                </button>
                <div
                  className={
                    isYear.DaoTao
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionYear Loai={"NamPDT"} />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => ChangeQuyBar("DaoTao", !isQuy.DaoTao)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Quý: {optionSelete.QuyPDT}
                </button>
                <div
                  className={
                    isQuy.DaoTao
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionQuy Name={"QuyPDT"} />
                </div>
              </div>
              <div className="bg-white px-6 py-1 rounded-xl w-[250px]">
                <p>Tổng: {quyTaiPhong.DaoTao.toLocaleString("en-US")} VND</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-center rounded-b-2xl">
            {phongDaoTao && phongDaoTao.length !== 0 ? (
              isWait.DaoTao ? (
                <>
                  <div className="Wait1 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait2 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait3 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                </>
              ) : (
                phongDaoTao.map((i) => (
                  <div className="flex justify-between w-full border-t-2 border-zinc-300 px-6 py-2 ">
                    <div>
                      <p>{i.Ten}</p>
                    </div>
                    <div>
                      <p>Đã Đóng: {i.SoTien.toLocaleString("en-US")} VND</p>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-[40px] h-[40px]">
                        <button
                          onClick={() =>
                            OnEdit(
                              "DaoTao",
                              i._id,
                              i.Ma,
                              i.Ten,
                              "Phòng Đào Tạo"
                            )
                          }
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
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>Trống</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[95%] flex flex-col border-2 border-zinc-400 rounded-2xl">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2 rounded-t-2xl">
            <div>
              <h1>Phòng Công Tác</h1>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="relative">
                <button
                  onClick={() => ChangeYearBar("CongTac", !isYear.CongTac)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Năm: {optionSelete.NamPCT}
                </button>
                <div
                  className={
                    isYear.CongTac
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionYear Loai={"NamPCT"} />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => ChangeQuyBar("CongTac", !isQuy.CongTac)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Quý: {optionSelete.QuyPCT}
                </button>
                <div
                  className={
                    isQuy.CongTac
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionQuy Name={"QuyPCT"} />
                </div>
              </div>
              <div className="bg-white px-6 py-1 rounded-xl w-[250px]">
                <p>Tổng: {quyTaiPhong.CongTac.toLocaleString("en-US")} VND</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-center rounded-b-2xl">
            {phongCongTac && phongCongTac.length !== 0 ? (
              isWait.CongTac ? (
                <>
                  <div className="Wait1 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait2 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait3 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                </>
              ) : (
                phongCongTac.map((i) => (
                  <div className="flex justify-between w-full border-t-2 border-zinc-300 px-6 py-2 ">
                    <div>
                      <p>{i.Ten}</p>
                    </div>
                    <div>
                      <p>Đã Đóng: {i.SoTien.toLocaleString("en-US")} VND</p>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-[40px] h-[40px]">
                        <button
                          onClick={() =>
                            OnEdit(
                              "CongTac",
                              i._id,
                              i.Ma,
                              i.Ten,
                              "Phòng Công Tác"
                            )
                          }
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
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>Trống</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[95%] flex flex-col border-2 border-zinc-400 rounded-2xl">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2 rounded-t-2xl">
            <div>
              <h1>Phòng Hành Chính - Quản Trị</h1>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="relative">
                <button
                  onClick={() => ChangeYearBar("HCQT", !isYear.HCQT)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Năm: {optionSelete.NamPHCQT}
                </button>
                <div
                  className={
                    isYear.HCQT
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionYear Loai={"NamPHCQT"} />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => ChangeQuyBar("HCQT", !isQuy.HCQT)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Quý: {optionSelete.QuyPHCQT}
                </button>
                <div
                  className={
                    isQuy.HCQT
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionQuy Name={"QuyPHCQT"} />
                </div>
              </div>
              <div className="bg-white px-6 py-1 rounded-xl w-[250px]">
                <p>Tổng: {quyTaiPhong.HCQT.toLocaleString("en-US")} VND</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-center rounded-b-2xl">
            {phongHCQT && phongHCQT.length !== 0 ? (
              isWait.HCQT ? (
                <>
                  <div className="Wait1 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait2 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait3 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                </>
              ) : (
                phongHCQT.map((i) => (
                  <div className="flex justify-between w-full border-t-2 border-zinc-300 px-6 py-2 ">
                    <div>
                      <p>{i.Ten}</p>
                    </div>
                    <div>
                      <p>Đã Đóng: {i.SoTien.toLocaleString("en-US")} VND</p>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-[40px] h-[40px]">
                        <button
                          onClick={() =>
                            OnEdit(
                              "HCQT",
                              i._id,
                              i.Ma,
                              i.Ten,
                              "Phòng Hàng Chính - Quản Trị"
                            )
                          }
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
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>Trống</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[95%] flex flex-col border-2 border-zinc-400 rounded-2xl">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2 rounded-t-2xl">
            <div>
              <h1>Phòng Khảo Thí</h1>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="relative">
                <button
                  onClick={() => ChangeYearBar("KhaoThi", !isYear.KhaoThi)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Năm: {optionSelete.NamPKT}
                </button>
                <div
                  className={
                    isYear.KhaoThi
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionYear Loai={"NamPKT"} />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => ChangeQuyBar("KhaoThi", !isQuy.KhaoThi)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Quý: {optionSelete.QuyPKT}
                </button>
                <div
                  className={
                    isQuy.KhaoThi
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionQuy Name={"QuyPKT"} />
                </div>
              </div>
              <div className="bg-white px-6 py-1 rounded-xl w-[250px]">
                <p>Tổng: {quyTaiPhong.KhaoThi.toLocaleString("en-US")} VND</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-center rounded-b-2xl">
            {phongKhaoThi && phongKhaoThi.length !== 0 ? (
              isWait.KhaoThi ? (
                <>
                  <div className="Wait1 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait2 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait3 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                </>
              ) : (
                phongKhaoThi.map((i) => (
                  <div className="flex justify-between w-full border-t-2 border-zinc-300 px-6 py-2 ">
                    <div>
                      <p>{i.Ten}</p>
                    </div>
                    <div>
                      <p>Đã Đóng: {i.SoTien.toLocaleString("en-US")} VND</p>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-[40px] h-[40px]">
                        <button
                          onClick={() =>
                            OnEdit(
                              "KhaoThi",
                              i._id,
                              i.Ma,
                              i.Ten,
                              "Phòng Khảo Thí"
                            )
                          }
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
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>Trống</p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="w-[95%] flex flex-col border-2 border-zinc-400 rounded-2xl">
          <div className="flex justify-between items-center px-6 bg-green-200 py-2 rounded-t-2xl">
            <div>
              <h1>Phòng Kế Hoạch - Tài Chính</h1>
            </div>
            <div className="flex gap-5 justify-between items-center">
              <div className="relative">
                <button
                  onClick={() => ChangeYearBar("KHTC", !isYear.KHTC)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Năm: {optionSelete.NamPKHTC}
                </button>
                <div
                  className={
                    isYear.KHTC
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionYear Loai={"NamPKHTC"} />
                </div>
              </div>
              <div className="relative">
                <button
                  onClick={() => ChangeQuyBar("KHTC", !isQuy.KHTC)}
                  className="bg-white px-6 py-1 rounded-xl border-white border-2 duration-200 ease-linear hover:border-zinc-400"
                >
                  Quý: {optionSelete.QuyPKHTC}
                </button>
                <div
                  className={
                    isQuy.KHTC
                      ? "absolute mt-1 rounded-xl overflow-auto p-1 bg-zinc-200 w-full h-[100px] flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                      : "absolute mt-1 rounded-xl overflow-hidden p-0 bg-zinc-200 w-full h-0 flex flex-col gap-2 justify-between items-center duration-200 ease-linear"
                  }
                >
                  <OptionQuy Name={"QuyPKHTC"} />
                </div>
              </div>
              <div className="bg-white px-6 py-1 rounded-xl w-[250px]">
                <p>Tổng: {quyTaiPhong.KHTC.toLocaleString("en-US")} VND</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full justify-between items-center rounded-b-2xl">
            {phongKHTC && phongKHTC.length !== 0 ? (
              isWait.KHTC ? (
                <>
                  <div className="Wait1 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait2 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                  <div className="Wait3 w-full border-t-2 border-zinc-400 px-6 py-6"></div>
                </>
              ) : (
                phongKHTC.map((i) => (
                  <div className="flex justify-between w-full border-t-2 border-zinc-300 px-6 py-2 ">
                    <div>
                      <p>{i.Ten}</p>
                    </div>
                    <div>
                      <p>Đã Đóng: {i.SoTien.toLocaleString("en-US")} VND</p>
                    </div>
                    <div className="flex gap-5">
                      <div className="w-[40px] h-[40px]">
                        <button
                          onClick={() =>
                            OnEdit(
                              "KHTC",
                              i._id,
                              i.Ma,
                              i.Ten,
                              "Phòng Kế Hoạch - Tài Chính"
                            )
                          }
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
                    </div>
                  </div>
                ))
              )
            ) : (
              <div className="flex w-full justify-between items-center px-6 py-2 border-t-2 border-zinc-300">
                <div>
                  <p>Trống</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}