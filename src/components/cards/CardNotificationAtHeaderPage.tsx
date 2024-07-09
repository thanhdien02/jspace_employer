import { CheckOutlined } from "@ant-design/icons";
import { Popover } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { notificationUpdateReadNotification } from "../../store/notification/notification-slice";
import moment from "moment";
interface PropComponent {
  classname?: string;
  item?: any;
}
const CardNotificationAtHeaderPage: React.FC<PropComponent> = ({
  classname,
  item,
}) => {
  const { companyAuth } = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const handleUpdateReadNotification = () => {
    dispatch(
      notificationUpdateReadNotification({
        notificationId: item?.id,
        read: !item?.read,
        companyId: companyAuth?.id,
      })
    );
  };
  return (
    <>
      <div className={`py-1 px-4 pb-2 ${classname}`}>
        <h4 className="font-medium text-base">{item?.title}</h4>
        <p className="text-[15px] line-clamp-3">{item?.notification}</p>
        <div className="mt-1 flex justify-between items-center">
          <p className="text-sm font-medium ">
            {moment(item?.notificationTime).format("HH:mm:ss DD-MM-YYYY")}
          </p>
          <Popover content={<p>{!item?.read && "Đánh dấu đã đọc"}</p>}>
            <CheckOutlined
              className={`cursor-pointer ${item?.read && "text-primary"}`}
              onClick={handleUpdateReadNotification}
            />
          </Popover>
        </div>
      </div>
    </>
  );
};

export default CardNotificationAtHeaderPage;
