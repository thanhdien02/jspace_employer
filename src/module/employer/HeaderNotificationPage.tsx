import { Divider, Skeleton } from "antd";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { notificationGetNotification } from "../../store/notification/notification-slice";
import CardNotificationAtHeaderPage from "../../components/cards/CardNotificationAtHeaderPage";

const HeaderNotificationPage: React.FC = () => {
  const { user } = useSelector((state: any) => state.auth);
  const { notifications, loadingNotification } = useSelector(
    (state: any) => state.notification
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(notificationGetNotification({ userId: user?.id }));
  }, [user?.id]);
  return (
    <div className="absolute top-[155%]  bg-white shadow-md min-w-[300px] min-h-[200px] z-20 right-0">
      <div className="p-4">
        <h3 className="font-semibold">Thông báo</h3>
      </div>
      <Divider className="my-1"></Divider>
      {loadingNotification ? (
        <div className="py-2 px-4">
          <Skeleton />
        </div>
      ) : notifications?.length <= 0 ? (
        <div className="px-4 text-gray-500 mt-5">Không có thông báo</div>
      ) : (
        <div className="py-2 flex flex-col gap-2 max-h-[350px] overflow-auto">
          {notifications?.length > 0 &&
            notifications?.map((item: any) => (
              <CardNotificationAtHeaderPage
                key={item?.notification?.id}
                item={item}
                classname="border-b border-solid border-gray-200"
              ></CardNotificationAtHeaderPage>
            ))}
        </div>
      )}
    </div>
  );
};

export default HeaderNotificationPage;
