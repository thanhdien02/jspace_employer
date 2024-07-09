import React, { useEffect, useState } from "react";
import { Empty, Input, Pagination, Skeleton } from "antd";
import CardCompanyForAccountSelect from "../../components/cards/CardCompanyForAccountSelect";
import { debounce } from "ts-debounce";
import IconAdd from "../../components/icons/IconAdd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { companyGetCompany } from "../../store/company/company-slice";
const { Search } = Input;

const EmployerListCompanyForAccountSelectPage: React.FC = () => {
  const { company, loadingCompany, paginationCompany } = useSelector(
    (state: any) => state.company
  );
  const [companyname, setCompanyname] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const handleSearchCompany = debounce((value: any) => {
    dispatch(companyGetCompany({ companyname: value, size: size, page: 1 }));
    setPage(1);
    setCompanyname(value);
  }, 500);

  useEffect(() => {
    dispatch(companyGetCompany({ page: page, size: size }));
  }, []);
  const handleChangePage = (value: any) => {
    dispatch(
      companyGetCompany({ companyname: companyname, page: value, size: size })
    );
    setPage(value);
  };
  return (
    <>
      <div className="my-10 xl:mx-40 mx-10">
        <header>
          <h2 className="font-bold text-xl my-3">Danh sách công ty</h2>
        </header>
        <div className="border border-solid shadow-md min-w-[300px] min-h-[400px] max-h-[600px] rounded-md overflow-auto">
          <div className="flex gap-5 !py-10 !px-20">
            <Search
              placeholder="Nhập tên công ty"
              enterButton="Tìm kiếm"
              size="large"
              onSearch={(e) => console.log(e)}
              onInput={(e: any) => {
                handleSearchCompany(e?.target?.value);
              }}
              loading={loadingCompany}
              allowClear
            />
            <div>
              <button
                onClick={() => navigate("/manage/update-information-company")}
                className="flex gap-1 items-centerfont-semibold bg-gray-200 rounded-lg px-3 py-2 border border-gray-300 border-solid min-w-[150px]"
              >
                <IconAdd></IconAdd>
                <span className="">Tạo mới công ty</span>
              </button>
            </div>
          </div>
          {loadingCompany ? (
            <div className="p-5 pt-0">
              <Skeleton />
            </div>
          ) : company?.length > 0 ? (
            <>
              <div className="grid gap-5 grid-cols-2 p-5 pt-0 overflow-hidden">
                {company?.length > 0 &&
                  company?.map((item: any) => (
                    <CardCompanyForAccountSelect
                      key={item?.id}
                      logo={item?.logo}
                      companyName={item?.name}
                      address={item?.address}
                      website={item?.companyLink}
                      companySize={item?.companySize}
                      onClickFill={() =>
                        navigate(
                          `/manage/update-information-company/${item?.id}`
                        )
                      }
                    ></CardCompanyForAccountSelect>
                  ))}
              </div>
              <div className="flex">
                <Pagination
                  className="ml-auto pr-5 pb-5"
                  defaultCurrent={1}
                  onChange={handleChangePage}
                  total={paginationCompany?.totalElements}
                  current={page}
                  pageSize={paginationCompany?.pageSize}
                />
              </div>
            </>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerListCompanyForAccountSelectPage;
