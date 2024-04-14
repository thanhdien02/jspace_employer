import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
interface MyComponentProps {
  title: string;
  className?: string;
  classButton?: string;
  loading: boolean;
}

const Input: React.FC<MyComponentProps> = ({
  className,
  title,
  loading = false,
  classButton = "",
}) => {
  return (
    <div className={`flex ${className}`}>
      <button
        type="submit"
        className={`text-white min-w-[170px] min-h-[50px] text-base bg-primary px-5 py-3 rounded-md ml-auto font-semibold  transition-all ${
          loading ? "hover:opacity-100 :" : "hover:opacity-80"
        } ${classButton}`}
        disabled={loading}
      >
        {loading ? (
          <Spin
            indicator={<LoadingOutlined style={{ color: "white" }} spin />}
          />
        ) : (
          title
        )}
      </button>
    </div>
  );
};

export default Input;
