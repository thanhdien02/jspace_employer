import { lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import EmployerDashboardPage from "./page/employer/EmployerDashboardPage";
import EmployerUpdateInformationPage from "./page/employer/EmployerUpdateInformationPage";

const LayoutEmployerManagement = lazy(
  () => import("./layout/LayoutEmployerManagement")
);
const PageNotFound = lazy(() => import("./page/common/PageNotFound"));
const EmployerHomePage = lazy(() => import("./page/common/EmployerHomePage"));
const LayoutEmployerHomePage = lazy(
  () => import("./layout/LayoutEmployerHomePage")
);
function App() {
  return (
    <>
      <Suspense>
        <Routes>
          <Route
            path="/"
            element={<LayoutEmployerHomePage></LayoutEmployerHomePage>}
          >
            <Route
              path="/home"
              element={<EmployerHomePage></EmployerHomePage>}
            ></Route>
          </Route>

          <Route
            path="/manage"
            element={<LayoutEmployerManagement></LayoutEmployerManagement>}
          >
            <Route
              path="/manage/dashboard"
              element={<EmployerDashboardPage></EmployerDashboardPage>}
            ></Route>
            <Route
              path="/manage/update"
              element={
                <EmployerUpdateInformationPage></EmployerUpdateInformationPage>
              }
            ></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
