import React, { useEffect } from "react";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { authFetchMe } from "../store/auth/auth-slice";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

const AdminDashBoard: React.FC = () => {
  const { accessToken, message } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Load information user
  useEffect(() => {
    if (accessToken == "") {
      const token = getToken();
      if (token?.accessToken == "null") {
        navigate("/login");
      } else if (message == "unauthenticated") {
        navigate("/login");
      }
      dispatch(authFetchMe());
    }
  }, [message, accessToken]);

  return (
    <>
      <div className="example">
        <Spin />
      </div>
    </>
  );
};

export default AdminDashBoard;
