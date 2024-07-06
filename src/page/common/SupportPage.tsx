import React from "react";
import bg from "../../assets/Background.svg";
import InputLabel from "../../components/input/InputLabel";
import ButtonLoading from "../../components/button/ButtonLoading";
import { BsTelephone } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
const SupportPage: React.FC = () => {
  return (
    <>
      <section className="">
        <div className="w-full relative h-[400px]">
          <img src={bg} alt="" className="w-full object-contain h-full" />
          <div className="absolute w-primary max-w-full mx-auto h-full inset-0">
            <div className="absolute top-1/2 -translate-y-1/2 left-0">
              <h1 className="font-bold text-[42px] max-w-[350px]">
                Liên hệ với chúng tôi
              </h1>
            </div>
            <form className="absolute -bottom-1/2 right-0 w-[700px] h-[490px] bg-white rounded-lg shadow p-7">
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-2xl ">
                  Để lại thông tin cho chúng tôi.
                </h3>
                <p className="text-base">
                  Bạn có thể hỏi bất cứ câu hỏi gì, hoặc phản hồi về trải nghiệm
                  bạn bạn khi sử dụng trang tuyển dụng của chúng tôi.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-5">
                <InputLabel
                  label="Họ và tên"
                  placeholder="Nhập họ và tên"
                  htmlFor="fullname"
                  name="fullname"
                  type="text"
                ></InputLabel>
                <InputLabel
                  label="Email"
                  placeholder="join@gmail.com"
                  htmlFor="email"
                  name="email"
                  type="email"
                ></InputLabel>
              </div>
              <div className="mt-5">
                <label htmlFor="description" className="text-base font-medium">
                  Mô tả
                </label>
                <textarea
                  onChange={() => {}}
                  name=""
                  id="description"
                  className="w-full mt-2 min-h-[130px] outline-none border border-solid border-slate-200 rounded"
                ></textarea>
              </div>
              <ButtonLoading
                loading={false}
                title="Gửi"
                className="mt-3"
                classButton="text-lg min-w-[120px] !py-1"
              ></ButtonLoading>
            </form>
          </div>
        </div>
        <div className="w-primary max-w-full mx-auto min-h-[300px] mt-16">
          <div className="">
            <h3 className="text-2xl font-bold">Thông tin liên hệ</h3>
            <div className="flex flex-col">
              <div className="flex gap-5 items-center mt-10">
                <BsTelephone className="text-3xl text-primary" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium">Điện thoại</h3>
                  <p>(+84) - (28) - 38352020</p>
                </div>
              </div>
              <div className="flex gap-5 items-center mt-10">
                <CiMail className="text-3xl text-primary" />
                <div className="flex flex-col gap-1">
                  <h3 className="font-medium">Email</h3>
                  <p>jspaceapp27@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SupportPage;
