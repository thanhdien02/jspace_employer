import React from "react";
import IconClose from "../../components/icons/IconClose";
import { Avatar, message, Spin, Upload, UploadProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  employerDeleteAvatarEmployer,
  employerUpdateAvatarEmployer,
} from "../../store/employer/employer-slice";
interface PropComponent {
  className?: string;
  onClick?: any;
}
const EmployerChangeAccountAvatarPage: React.FC<PropComponent> = ({
  className,
  onClick,
}) => {
  const { user } = useSelector((state: any) => state.auth);
  const { loadingEmployer } = useSelector((state: any) => state.employer);
  const dispatch = useDispatch();
  const propsAvatar: UploadProps = {
    beforeUpload: (file) => {
      const isPNG = file.type === "image/png" || "image/jpg";
      if (!isPNG) {
        message.error(`${file.name} is not a png file`);
      }
      return isPNG || Upload.LIST_IGNORE;
    },
    onChange: (info: any) => {
      dispatch(
        employerUpdateAvatarEmployer({
          file: info.file,
          employer_id: user?.id,
        })
      );
    },
    customRequest: () => {},
  };
  const handleDeleteAvatar = () => {
    dispatch(
      employerDeleteAvatarEmployer({
        employer_id: user?.id,
        avatar_id: user?.pictureId,
      })
    );
  };
  return (
    <>
      <div
        className={`flex fixed inset-0 z-40 ${className}
       `}
      >
        <div
          className={`m-auto absolute inset-0 bg-gray-400/50`}
          onClick={() => {
            onClick(false);
          }}
        ></div>

        <div className="relative m-auto px-5 min-h-[300px] bg-white z-10 md:min-w-[400px] shadow-md border-solid border border-slate-500/30">
          <IconClose
            actionCloseLogin={onClick ? onClick : () => {}}
            className="absolute top-2 right-2 hover:bg-slate-200 rounded-sm cursor-pointer"
          ></IconClose>
          <div className="p-5 flex mt-5">
            {loadingEmployer ? (
              <div className="w-[140px] h-[140px] mx-auto rounded-full flex bg-gray-200">
                <Spin className="m-auto" />
              </div>
            ) : user?.picture ? (
              <img
                src={user?.picture}
                alt=""
                className="mx-auto w-[140px] h-[140px] rounded-full cursor-pointer object-cover"
              />
            ) : (
              <Avatar className="mx-auto" size={140} icon={<UserOutlined />} />
            )}
          </div>
          <div className="mt-5 flex gap-5 justify-center font-medium">
            <button
              className="px-6 py-2 rounded-md text-white bg-red-500"
              type="button"
              onClick={handleDeleteAvatar}
            >
              Xóa ảnh
            </button>
            <Upload {...propsAvatar} className="relative inline-block">
              <button
                className="px-6 py-2 rounded-md text-white bg-primary"
                type="button"
              >
                Đổi ảnh
              </button>
            </Upload>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerChangeAccountAvatarPage;
