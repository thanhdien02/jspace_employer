import React from "react";
interface VNCurrencyInputProps {
  value: string;
  className?: string;
  onValueChange: (value: string) => void;
}
const VNCurrencyInput: React.FC<VNCurrencyInputProps> = ({
  value,
  onValueChange,
  className,
}) => {
  console.log("🚀 ~ value:", typeof value);
  const formatCurrency = (value: string): string => {
    if (!value || value === undefined) return "";
    // Loại bỏ các ký tự không phải số
    const numberString = value.replace(/\D/g, "");
    // Định dạng số thành chuỗi với dấu phân cách hàng nghìn
    return numberString.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const rawValue = e.target.value.replace(/\./g, ""); // Loại bỏ dấu chấm trước khi xử lý
    onValueChange(rawValue);
  };
  return (
    <>
      <input
        type="text"
        value={formatCurrency(value)}
        onChange={handleChange}
        placeholder="0 ₫"
        className={`focus:border-solid focus:border-stone-400/70 transition-all outline-none px-5 py-2 border border-stone-200 border-solid w-full rounded-md ${className}`}
      />
    </>
  );
};

export default VNCurrencyInput;
