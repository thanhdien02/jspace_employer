import React from "react";

interface PropComponent {
  children?: any;
}
const TitleContent: React.FC<PropComponent> = ({children}) => {
  return (
    <h2 className="text-2xl font-bold mb-3 text-slate-800">
      {children}
    </h2>
  );
};

export default TitleContent;
