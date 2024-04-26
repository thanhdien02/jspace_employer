import React, { useEffect } from "react";
import { Input } from "antd";
import CardCompanyForAccountSelect from "../../components/cards/CardCompanyForAccountSelect";
import { debounce } from "ts-debounce";
import IconAdd from "../../components/icons/IconAdd";
import { useNavigate } from "react-router-dom";
const { Search } = Input;

const EmployerListCompanyForAccountSelectPage: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSearchCompany = debounce((value: any) => {
    console.log("Input value:", value);
    // Gọi hàm khác tại đây nếu cần
  }, 500);
  return (
    <>
      <div className="my-10 mx-40">
        <header>
          <h2 className="font-bold text-xl my-3">Danh sách công ty</h2>
        </header>
        <div className="border border-solid shadow-md min-w-[300px] min-h-[400px] max-h-[600px] rounded-md overflow-auto">
          <div className="flex gap-5 !py-10 !px-20">
            <Search
              placeholder="Nhập tên công ty"
              enterButton="Search"
              size="large"
              onSearch={(e) => console.log(e)}
              onInput={(e: any) => {
                handleSearchCompany(e?.target?.value);
              }}
              loading={false}
              allowClear
            />
            <div>
              <button
                onClick={() => navigate("/manage/update-information-company")}
                className="flex gap-1 items-centerfont-semibold bg-gray-200 rounded-lg px-3 py-2 border border-gray-300 border-solid min-w-[150px]"
              >
                <IconAdd></IconAdd>
                <span>Tạo mới công ty</span>
              </button>
            </div>
          </div>

          <div className="grid gap-5 grid-cols-2 p-5 pt-0">
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
            <CardCompanyForAccountSelect></CardCompanyForAccountSelect>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerListCompanyForAccountSelectPage;
