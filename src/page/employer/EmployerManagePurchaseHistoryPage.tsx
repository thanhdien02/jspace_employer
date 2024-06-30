import React, { useEffect, useState } from "react";
import { debounce } from "ts-debounce";
import { purchasehistoryGetPurchaseHistory } from "../../store/purchase_history/purchase-history-slice";
import {
  Empty,
  Input,
  Pagination,
  Radio,
  RadioChangeEvent,
  Skeleton,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import Table from "../../components/table/Table";
import ContentManageHistoryProductPurchasePage from "../../components/content/ContentManageHistoryProductPurchasePage";
import HeaderTableManage from "../../components/header/HeaderTableManage";
import { dataHeaderManagePurchaseProduct } from "../../utils/dataFetch";
import HeaderContentManage from "../../components/header/HeaderContentManage";

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
  const [value, setValue] = useState(1);
  const onChange = (e: RadioChangeEvent) => {
    setValue(e.target.value);
  };

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
  return (
    <>
      <div className="m-10 mt-5">
        <HeaderContentManage title="Lịch sử mua hàng"></HeaderContentManage>
        <div className="mb-5 flex items-center gap-5">
          <Input
            placeholder="Nhập tên dịch vụ"
            size="large"
            onChange={handleSearchProductName}
            className="w-[20%]"
            allowClear
          />
          <Radio.Group
            className="font-medium"
            onChange={onChange}
            value={value}
          >
            <Radio className="select-none" value={1}>
              Giá tiền cao nhất
            </Radio>
            <Radio className="select-none" value={2}>
              Thời gian lâu nhất
            </Radio>
          </Radio.Group>
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
              className="inline-block"
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
