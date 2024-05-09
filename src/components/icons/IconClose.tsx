import React from "react";

interface PropComponent {
  className?: string;
  actionCloseLogin?: any;
}
const IconClose: React.FC<PropComponent> = ({
  className,
  actionCloseLogin,
}) => {
  return (
    <span
      className={`${className}`}
      onClick={() => (actionCloseLogin ? actionCloseLogin(false) : {})}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 `}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18 18 6M6 6l12 12"
        />
      </svg>
    </span>
  );
};

export default IconClose;
