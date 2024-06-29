import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import EmployerDashboardPage from "./page/employer/EmployerDashboardPage";
import HomePage from "./page/common/HomePage";
import EmployerCheckWorkRequiredBeforePostJobPage from "./page/employer/EmployerCheckWorkRequiredBeforePostJobPage";
import EmployerUpdateInformationCompanyPage from "./page/employer/EmployerUpdateInformationCompanyPage";
import EmployerUpdateInformationAccountPage from "./page/employer/EmployerUpdateInformationAccountPage";
import EmployerListCompanyForAccountSelectPage from "./page/employer/EmployerListCompanyForAccountSelectPage";
import EmployerChangePasswordPage from "./page/employer/EmployerChangePasswordPage";
import EmployerInformationCompanyPage from "./page/employer/EmployerInformationCompanyPage";
import EmployerPostJobPage from "./page/employer/EmployerPostJobPage";
import EmployerManageJobPage from "./page/employer/EmployerManageJobPage";
import RegisterPage from "./page/common/RegisterPage";
import ProductPage from "./page/common/ProductPage";
import EmployerManageShoppingCartPage from "./page/employer/EmployerManageShoppingCartPage";
import EmployerListProductPage from "./page/employer/EmployerListProductPage";
import EmployerManageProductBuyedPage from "./page/employer/EmployerManageProductBuyedPage";
import EmployerManagePurchaseHistoryPage from "./page/employer/EmployerManagePurchaseHistoryPage";
import EmployerFindCandidatePage from "./page/employer/EmployerFindCandidatePage";
import EmployerManageCandidateFollowedCompanyPage from "./page/employer/EmployerManageCandidateFollowedCompanyPage";

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
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route
              path="/products"
              element={<ProductPage></ProductPage>}
            ></Route>
            <Route
              path="/support"
              element={<ProductPage></ProductPage>}
            ></Route>
          </Route>

          <Route
            path="/manage"
            element={<LayoutEmployerManagement></LayoutEmployerManagement>}
          >
            <Route
              path="/manage"
              element={<EmployerDashboardPage></EmployerDashboardPage>}
            ></Route>
            <Route
              path="/manage/update-information-account"
              element={
                <EmployerUpdateInformationAccountPage></EmployerUpdateInformationAccountPage>
              }
            ></Route>
            <Route
              path="/manage/update-information-company/:companyId"
              element={
                <EmployerUpdateInformationCompanyPage></EmployerUpdateInformationCompanyPage>
              }
            ></Route>
            <Route
              path="/manage/update-information-company/update"
              element={
                <EmployerUpdateInformationCompanyPage></EmployerUpdateInformationCompanyPage>
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
            <Route
              path="/manage/list-company"
              element={
                <EmployerListCompanyForAccountSelectPage></EmployerListCompanyForAccountSelectPage>
              }
            ></Route>
            <Route
              path="/manage/change-password"
              element={
                <EmployerChangePasswordPage></EmployerChangePasswordPage>
              }
            ></Route>
            <Route
              path="/manage/jobs"
              element={<EmployerManageJobPage></EmployerManageJobPage>}
            ></Route>
            <Route
              path="/manage/post-job"
              element={<EmployerPostJobPage></EmployerPostJobPage>}
            ></Route>
            <Route
              path="/manage/information-company"
              element={
                <EmployerInformationCompanyPage></EmployerInformationCompanyPage>
              }
            ></Route>
            <Route
              path="/manage/shopping-cart"
              element={
                <EmployerManageShoppingCartPage></EmployerManageShoppingCartPage>
              }
            ></Route>
            <Route
              path="/manage/list-products"
              element={<EmployerListProductPage></EmployerListProductPage>}
            ></Route>
            <Route
              path="/manage/products-buyed"
              element={
                <EmployerManageProductBuyedPage></EmployerManageProductBuyedPage>
              }
            ></Route>
            <Route
              path="/manage/purchase-history"
              element={
                <EmployerManagePurchaseHistoryPage></EmployerManagePurchaseHistoryPage>
              }
            ></Route>
            <Route
              path="/manage/candidates"
              element={<EmployerFindCandidatePage></EmployerFindCandidatePage>}
            ></Route>
            <Route
              path="/manage/candidates-followed"
              element={
                <EmployerManageCandidateFollowedCompanyPage></EmployerManageCandidateFollowedCompanyPage>
              }
            ></Route>
          </Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
          <Route
            path="/register/:registerMail"
            element={<RegisterPage></RegisterPage>}
          ></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
