import React from "react";
interface PropComponent {
  value: string;
  onChange: any;
  className?: string;
  placeholder?: string;
}
const InputNumber: React.FC<PropComponent> = ({
  value,
  onChange,
  className,
  placeholder,
}) => {
  const handleChange = (e: any) => {
    const { value } = e.target;
    if (/^\d*$/.test(value)) {
      // Chỉ cho phép số (0-9)
      onChange(value);
    }
  };
  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      className={`h-full focus:border-solid focus:border-stone-400/70 transition-all outline-none pl-12 pr-4 py-3 border border-stone-200 border-solid w-full rounded-md ${className}`}
    />
  );
};

export default InputNumber;
