import React from "react";

interface PropComponent {
  className?: string;
  id?: string;
  placeholder?: string;
  onChange?: any;
}
const InputSearch: React.FC<PropComponent> = ({
  placeholder,
  className,
  id,
  onChange,
}) => {
  return (
    <>
      <input
        type="text"
        id={id}
        placeholder={placeholder}
        className={` outline-none px-4 py-2 rounded border border-solid border-stone-200 ${className}`}
        onChange={onChange}
      />
    </>
  );
};

export default InputSearch;
