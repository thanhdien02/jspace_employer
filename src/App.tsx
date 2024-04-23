import { Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import PageNotFound from "./page/PageNotFound";
import LayoutEmployerManagement from "./layout/LayoutEmployerManagement";
import EmployerHomePage from "./page/EmployerHomePage";
import LayoutEmployerHomePage from "./layout/LayoutEmployerHomePage";

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
          ></Route>
          <Route path="*" element={<PageNotFound></PageNotFound>}></Route>
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
