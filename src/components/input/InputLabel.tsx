import React from "react";
interface PropComponent {
  className?: string;
  label?: string;
  htmlFor?: string;
  placeholder?: string;
  name?: string;
  classInput?: string;
  type?: "text" | "button" | "password" | "email";
}
const InputLabel: React.FC<PropComponent> = ({
  className,
  label,
  placeholder,
  htmlFor,
  name,
  classInput,
  type,
}) => {
  return (
    <div className={`${className}`}>
      <label htmlFor={htmlFor} className="text-base font-medium">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={htmlFor}
        onChange={() => {}}
        className={`px-4 py-2 mt-2 rounded outline-none border border-solid border-slate-200 w-full ${classInput}`}
      />
    </div>
  );
};

export default InputLabel;
