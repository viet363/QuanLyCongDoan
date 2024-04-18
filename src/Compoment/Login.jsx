import React, { useContext, useEffect, useState } from "react";
import { context } from "../Context.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [isStatus, setIsStatus] = useContext(context);
  const account = {
    Name: "Admin",
    Password: "Admin",
  };
  const [user, setUser] = useState({
    Name: "",
    Password: "",
  });

  const [wrongInput, setWrongInput] = useState({
    Name: false,
    Password: false,
  });

  const ChangeUser = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const navigate = useNavigate();

  const HandleLogin = (e) => {
    e.preventDefault();
    if (user.Name === account.Name) {
      if (user.Password === account.Password) {
        navigate("/Home");
      } else {
        setWrongInput({ ...wrongInput, Name: false, Password: true });
      }
    } else {
      setWrongInput({ ...wrongInput, Name: true });
    }
  };

  useEffect(() => {
    setIsStatus({ ...isStatus, SideBar: false });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed w-full h-full">
      <div className="absolute top-0 flex justify-center items-center w-full h-full">
        <div>
          <form
            onSubmit={HandleLogin}
            className="flex flex-col justify-center items-center bg-green-400 py-10 px-5 gap-5 rounded-3xl"
          >
            <div>
              <h1 className="font-bold text-[30px]">Đăng Nhập</h1>
            </div>
            <div>
              <input
                value={user.Name}
                onChange={ChangeUser}
                name="Name"
                type="text"
                className={
                  wrongInput.Name
                    ? "px-4 py-2 rounded-3xl outline-none border-2 border-red-500"
                    : "px-4 py-2 rounded-3xl outline-none border-2 border-white"
                }
                placeholder="Tên..."
              ></input>
            </div>
            <div>
              <input
                value={user.Password}
                onChange={ChangeUser}
                name="Password"
                type="password"
                className={
                  wrongInput.Password
                    ? "px-4 py-2 rounded-3xl outline-none border-2 border-red-500"
                    : "px-4 py-2 rounded-3xl outline-none border-2 border-white"
                }
                placeholder="Mật khẩu..."
              ></input>
            </div>
            <div>
              <button
                type="submit"
                className="py-2 px-4 bg-green-300 rounded-3xl duration-200 ease-linear border-2 border-green-300 hover:bg-white hover:text-green-700 hover:border-green-700"
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