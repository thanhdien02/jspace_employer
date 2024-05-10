import React from "react";

interface PropComponent {
  children?: any;
  className?: string;
}
const TitleContent: React.FC<PropComponent> = ({ children, className }) => {
  return (
    <h2 className={`text-2xl font-bold mb-3 text-slate-800 ${className}`}>
      {children}
    </h2>
  );
};

export default TitleContent;
