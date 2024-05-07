import React from "react";
interface PropComponent {
  className?: string;
  classIcon?: string;
}
const IconClock: React.FC<PropComponent> = ({ className, classIcon }) => {
  return (
    <span className={`${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className={`w-6 h-6 ${classIcon}`}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    </span>
  );
};

export default IconClock;
