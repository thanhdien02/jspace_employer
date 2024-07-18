import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { candidateGetInformationCandidate } from "../../store/candidate/candidate-slice";
import { Skeleton } from "antd";

const CandidateInformationPage: React.FC = () => {
  const { informationCandidate, loadingCandidate } = useSelector(
    (state: any) => state.candidate
  );
  const { candidateId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (candidateId) {
      dispatch(
        candidateGetInformationCandidate({
          candidate_id: candidateId,
        })
      );
    }
  }, []);
  return (
    <div className="bg-gray-200/70 min-h-screen pt-20">
      <div className="w-[900px] max-w-full mx-auto bg-white shadow-md">
        {loadingCandidate ? (
          <div className="min-h-[400px] w-full p-5">
            <Skeleton />
          </div>
        ) : (
          <>
            {/* <div className="relative h-[270px]">
              <img
                src="https://th.bing.com/th/id/OIP.pR4iQUJJ0ubb2AXQKCINsAHaFA?w=296&h=200&c=7&o=5&dpr=1.1&pid=1.7"
                alt=""
                className="w-full h-[270px] object-cover"
              />

              <img
                src="https://th.bing.com/th/id/OIP.pR4iQUJJ0ubb2AXQKCINsAHaFA?w=296&h=200&c=7&o=5&dpr=1.1&pid=1.7"
                alt=""
                className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2 w-[150px] h-[150px] object-cover bg-white rounded-full"
              />
            </div> */}
            <div className="px-10 py-10">
              {/* <h2 className="text-center font-medium text-2xl">
                Nguyen Thanh Dien
              </h2>
              <div className="mt-10 flex gap-8 justify-center">
                <a
                  className="px-6 py-3 rounded text-white bg-primary font-medium cursor-pointer"
                  href="#"
                  target="_blank"
                >
                  Xem CV
                </a>
                <div className="px-6 py-3 rounded text-white bg-primary font-medium cursor-pointer">
                  Tải CV
                </div>
              </div> */}
              <div className="flex gap-10">
                <div className="">
                  <h4 className="font-bold">Cấp bậc</h4>
                  <p className="mt-3">
                    {informationCandidate?.rank?.language?.vi}
                  </p>
                </div>
                <div className="">
                  <h4 className="font-bold">Kinh nghiệm</h4>
                  <p className="mt-3">
                    {informationCandidate?.experience?.language?.vi}
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-bold">Kỹ năng</h4>
                <div className="mt-3 flex gap-3">
                  {informationCandidate?.skills?.map(
                    (item: any, index: number) => (
                      <div className="px-2 p-1 bg-gray-200" key={index}>
                        {item?.name}
                      </div>
                    )
                  )}
                </div>
              </div>
              <div className="mt-5">
                <h4 className="font-bold">Học vấn</h4>
                {informationCandidate?.educationInfo && (
                  <div className="mt-3">
                    <div className="flex">
                      <span className="w-[20%]">Trường: </span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.educationInfo?.schoolName}
                      </span>
                    </div>
                    <p className="flex">
                      <span className="w-[20%]">Ngành học:</span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.educationInfo?.major}
                      </span>
                    </p>
                    <p className="flex">
                      <span className="w-[20%]">Thời gian từ:</span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.educationInfo?.startMonth}/
                        {informationCandidate?.educationInfo?.startYear} -{" "}
                        {informationCandidate?.educationInfo?.endMonth}/
                        {informationCandidate?.educationInfo?.endYear}
                      </span>
                    </p>
                    <p className="flex">
                      <span className="w-[20%]">Mô tả thông tin:</span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.educationInfo?.description}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h4 className="font-bold">Kinh nghiệm</h4>
                {informationCandidate?.experienceInfo && (
                  <div className="mt-3">
                    <div className="flex">
                      <span className="w-[20%]">Công ty: </span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.experienceInfo?.companyName}
                      </span>
                    </div>
                    <p className="flex">
                      <span className="w-[20%]">Vị trí:</span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.experienceInfo?.position}
                      </span>
                    </p>
                    <p className="flex">
                      <span className="w-[20%]">Thời gian từ:</span>
                      <span className="w-[70%] font-medium">
                        {informationCandidate?.experienceInfo?.startMonth}/
                        {informationCandidate?.experienceInfo?.startYear} -{" "}
                        {informationCandidate?.experienceInfo?.endMonth}/
                        {informationCandidate?.experienceInfo?.endYear}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <h4 className="font-bold">Mức lương mong muốn</h4>
                <p className="mt-3">
                  Từ{" "}
                  {informationCandidate?.minSalary?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}{" "}
                  -{" "}
                  {informationCandidate?.maxSalary?.toLocaleString("vi", {
                    style: "currency",
                    currency: "VND",
                  })}
                </p>
              </div>
              <div className="mt-5">
                <h4 className="font-bold">Địa chỉ hiện tại</h4>
                <p className="mt-3">
                  {informationCandidate?.detailAddress} {""}
                  {informationCandidate?.location?.province}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CandidateInformationPage;
