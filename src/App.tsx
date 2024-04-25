import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import EmployerDashboardPage from "./page/employer/EmployerDashboardPage";
import HomePage from "./page/common/HomePage";
import EmployerCheckWorkRequiredBeforePostJobPage from "./page/employer/EmployerCheckWorkRequiredBeforePostJobPage";
import EmployerUpdateInformationCompanyPage from "./page/employer/EmployerUpdateInformationCompanyPage";
import EmployerUpdateInformationAccountPage from "./page/employer/EmployerUpdateInformationAccountPage";

const LayoutEmployerManagement = lazy(
  () => import("./layout/LayoutEmployerManagement")
);
const PageNotFound = lazy(() => import("./page/common/PageNotFound"));
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
            <Route path="/home" element={<HomePage></HomePage>}></Route>
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
              path="/manage/update-information-account"
              element={
                <EmployerUpdateInformationAccountPage></EmployerUpdateInformationAccountPage>
              }
            ></Route>
            <Route
              path="/manage/update-information-company"
              element={
                <EmployerUpdateInformationCompanyPage></EmployerUpdateInformationCompanyPage>
              }
            ></Route>
            <Route
              path="/manage/check-work-required"
              element={
                <EmployerCheckWorkRequiredBeforePostJobPage></EmployerCheckWorkRequiredBeforePostJobPage>
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
