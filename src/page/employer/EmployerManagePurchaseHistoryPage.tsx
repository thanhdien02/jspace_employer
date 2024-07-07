import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";
import { purchasehistoryGetPurchaseHistory } from "../../store/purchase_history/purchase-history-slice";
import { Empty, Pagination, Skeleton } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import ContentManageHistoryProductPurchasePage from "../../components/content/ContentManageHistoryProductPurchasePage";
import HeaderTableManage from "../../components/header/HeaderTableManage";
import { dataHeaderManagePurchaseProduct } from "../../utils/dataFetch";
import HeaderContentManage from "../../components/header/HeaderContentManage";
import InputSearch from "../../components/input/InputSearch";
import { SearchOutlined } from "@ant-design/icons";
import { exportToExcel } from "../../utils/function-common";
const EmployerManagePurchaseHistoryPage: React.FC = () => {
  const {
    purchasehistorys,
    loadingPurchaseHistory,
    paginationPurchaseHistory,
  } = useSelector((state: any) => state.purchasehistory);
  const { companyAuth, checkAuth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const [productName, setProductName] = useState("");
  const [page, setPage] = useState(1);
  const [size] = useState(10);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    if (companyAuth?.id) {
      dispatch(
        purchasehistoryGetPurchaseHistory({
          page: page,
          size: size,
          company_id: companyAuth?.id,
          productName: productName,
        })
      );
    }
  }, [companyAuth]);
  const handleSearchProductName = debounce((value: any) => {
    setPage(1);
    dispatch(
      purchasehistoryGetPurchaseHistory({
        page: 1,
        size: size,
        company_id: companyAuth?.id,
        productName: value?.target?.value,
      })
    );
    setProductName(value?.target?.value);
  }, 500);
  const handleChangePage = (e: any) => {
    setPage(e);
    dispatch(
      purchasehistoryGetPurchaseHistory({
        page: e,
        size: size,
        company_id: companyAuth?.id,
        productName: productName,
      })
    );
  };
  const handleExportExcel = () => {
    exportToExcel(
      purchasehistorys.map((item: any) => {
        return {
          "ID": item?.id,
          "TÊN SẢN PHẨM": item?.productName,
          "TÊN CÔNG TY": item?.company?.name,
          "GIÁ SẢN PHẨM": item?.productPrice?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          }),
          "NGÀY MUA": item?.purchasedDate,
          "SỐ LƯỢNG": item?.quantity,
          "TỔNG TIỀN": item?.totalPrice?.toLocaleString("vi", {
            style: "currency",
            currency: "VND",
          }),
          "PHƯƠNG THỨC THANH TOÁN": item?.paymentMethod,
        };
      }),
      "DanhSachLichSuMuaHang"
    );
  };
  return (
    <>
      <div className="m-10 mt-5">
        <HeaderContentManage title="Lịch sử mua hàng"></HeaderContentManage>
        <div className="mb-5 flex items-center justify-between gap-5">
          <div className="relative">
            <InputSearch
              placeholder="Nhập tên dịch vụ"
              onChange={handleSearchProductName}
              className="pr-10 w-[280px]"
            ></InputSearch>
            <SearchOutlined className="absolute top-1/2 -translate-y-1/2 right-2 text-lg text-gray-700" />
          </div>
          <button
            type="button"
            onClick={handleExportExcel}
            className="px-4 py-2 border border-solid border-slate-200 bg-white hover:opacity-80 transition-all"
          >
            Export
          </button>
        </div>
        <Table>
          <HeaderTableManage
            dataHeader={dataHeaderManagePurchaseProduct}
          ></HeaderTableManage>
          <tbody>
            {!checkAuth?.verifiedByCompany ? (
              <tr>
                <td className="p-5 text-center" colSpan={7}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            ) : loadingPurchaseHistory ? (
              <tr>
                <td className="p-5 text-center" colSpan={8}>
                  <Skeleton active />
                </td>
              </tr>
            ) : purchasehistorys?.length > 0 ? (
              purchasehistorys?.map((item: any) => (
                <ContentManageHistoryProductPurchasePage
                  key={item?.id}
                  item={item}
                  className="even:bg-gray-300/50"
                ></ContentManageHistoryProductPurchasePage>
              ))
            ) : (
              <tr>
                <td className="p-5 text-center" colSpan={7}>
                  <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                </td>
              </tr>
            )}
          </tbody>
        </Table>

        <div className="mt-4 flex justify-end">
          {purchasehistorys.length > 0 && (
            <Pagination
              total={paginationPurchaseHistory?.totalElements}
              onChange={handleChangePage}
              className="inline-block panigation"
              current={page}
              pageSize={paginationPurchaseHistory?.pageSize}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default EmployerManagePurchaseHistoryPage;
