import React, { useEffect } from "react";
import IconClose from "../../components/icons/IconClose";

interface PropComponent {
  className?: string;
  onClick?: any;
  updateCheck?: boolean;
}

const EmployerUpdateJobPage: React.FC<PropComponent> = ({
  className,
  onClick,
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const body = document.body;
    if (body) {
      body.style.overflow = "hidden";
      return () => {
        body.style.overflow = "visible";
      };
    }
  }, []);
  return (
    <>
      <div className={`fixed z-20 flex inset-0 bg-gray-600/80 ${className}`}>
        <div className="relative m-auto w-[70%] h-[80%] p-5 bg-white rounded-sm">
          <span
            className="absolute right-3 top-3 cursor-pointer"
            onClick={() => onClick(false)}
          >
            <IconClose className=""></IconClose>
          </span>
          <h1>Xin chao</h1>
        </div>
      </div>
    </>
  );
};

export default EmployerUpdateJobPage;
