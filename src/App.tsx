import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLoginPage from "./page/AdminLoginPage";
import AdminDashBoard from "./page/AdminDashBoard";
import PageNotFound from "./page/PageNotFound";
import AdminManageUser from "./page/AdminManageUser";
import AdminCreateSubAdmin from "./page/AdminCreateSubAdmin";
import LayoutEmployerManagement from "./layout/LayoutEmployerManagement";
import EmployerHomePage from "./page/EmployerHomePage";

function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={<LayoutEmployerManagement></LayoutEmployerManagement>}
          >
            {/* <Route path="/" element={<AdminDashBoard></AdminDashBoard>}></Route>
            <Route
              path="/admin/user"
              element={<AdminManageUser></AdminManageUser>}
            ></Route>
            <Route
              path="/admin/add-subadmin"
              element={<AdminCreateSubAdmin></AdminCreateSubAdmin>}
            ></Route> */}
          </Route>
          <Route
            path="/login"
            element={<AdminLoginPage></AdminLoginPage>}
          ></Route>
          <Route
            path="/home"
            element={<EmployerHomePage></EmployerHomePage>}
          ></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
