import { DatePicker } from "antd";
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const LayoutAuthentication: React.FC = () => {
  const boxRef = useRef(null);
  const [prevScrollPos, setPrevScrollPos] = useState(window.pageYOffset);
  const { RangePicker } = DatePicker;

  const handleScroll = useCallback(() => {
    const boxElement: any = boxRef.current;
    const currentScrollPos = window.pageYOffset; // get current scroll position

    if (currentScrollPos > prevScrollPos) {
      console.log("Scroll xuống");
      boxElement.style.opacity = "0";
    } else {
      console.log("Scroll lên");
      boxElement.style.opacity = "100";
      // elementBody.style.overflow = "hidden";
    }

    setPrevScrollPos(currentScrollPos);
  }, [prevScrollPos]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);
  const handleDateChange = (date: any, dateString: any) => {
    console.log("Ngày được chọn:", date);
    console.log("Ngày được chọn (dạng chuỗi):", dateString);
  };
  return (
    <Fragment>
      {/* <div className="fixed z-10 inset-0 bg-slate-800/30 flex overflow-hidden">
        <div className="m-auto bg-orange-400 max-w-[400px] p-5 min-h-[200px]">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione
          veniam similique sed, expedita nulla eaque, quam iste vel nesciunt
          quaerat vero ipsa unde minima, quas voluptates voluptas distinctio
          ipsam inventore.
        </div>
      </div> */}

      <div className="">
        {" "}
        <header
          ref={boxRef}
          className="fixed top-0 right-0 left-0 duration-300"
        >
          <ul className="flex bg-blue-100 py-4 px-14 gap-x-5">
            <li className="font-bold hover:text-white hover:delay-100 cursor-pointer text-lg">
              Home
            </li>
            <li className="font-bold hover:text-white hover:delay-100 cursor-pointer text-lg">
              App
            </li>
            <li className="font-bold hover:text-white hover:delay-100 cursor-pointer text-lg ml-auto">
              Contact
            </li>
            <li className="font-bold hover:text-white hover:delay-100 cursor-pointer text-lg">
              About
            </li>
          </ul>
        </header>
        <p className="mt-20">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
          architecto minus error voluptatibus, earum, eligendi facere doloremque
          unde inventore ducimus, eum magnam consequuntur dolorum voluptates qui
          perspiciatis animi obcaecati fugiat?
        </p>
        <div className="">
          <section className="p-10 mt-10 s">
            <div className="flex mt-5 ">
              {" "}
              <label htmlFor="" className="min-w-[150px]">
                Username:
              </label>
              <input
                type="text"
                className="grow border border-blue-100 rounded-sm outline-none text-red-500 p-2"
                placeholder="Please enter text..."
              />
            </div>
            <div className="flex mt-5 bg-red-300">
              {" "}
              <label htmlFor="" className="min-w-[150px]">
                Password:
              </label>
              <input
                type="text"
                className="grow border border-blue-100 rounded-sm outline-none text-red-500 p-2"
                placeholder="Please enter text..."
              />
            </div>
          </section>

          <section className="flex flex-wrap -mr-2">
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              1
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              2
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              3
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              4
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              5
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              6
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              7
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              8
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              9
            </div>
          </section>
          <section className="flex flex-wrap -mr-2">
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              1
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              2
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              3
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              4
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              5
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              6
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              7
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              8
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              9
            </div>
          </section>
          <section className="flex flex-wrap -mr-2">
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              1
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              2
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              3
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              4
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              5
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              6
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              7
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              8
            </div>
            <div className="w-[calc(33.33%_-_8px)] bg-blue-200 flex justify-center items-center text-center mr-2 mt-2 h-16">
              9
            </div>
          </section>
          <div className="flex w-10 h-10 rounded-full bg-blue-300">
            <p className="m-auto">2</p>
          </div>
          {/* Booktrap */}
          <div className="grid grid-cols-normal gap-5 px-5 mt-5">
            <div className="h-16 rounded-md bg-blue-400">item 1</div>
            <div className="h-16 rounded-md bg-blue-400">item 2</div>
            <div className="h-16 rounded-md bg-blue-400">item 3</div>
            <div className="h-16 rounded-md bg-blue-400">item 4</div>
            <div className="h-16 rounded-md bg-blue-400">item 5</div>
            <div className="h-16 rounded-md bg-blue-400">item 6</div>
            <div className="h-16 rounded-md bg-blue-400">item 7</div>
            <div className="h-16 rounded-md bg-blue-400">item 8</div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
            <div>
              <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  Tim
                </svg>
              </span>
            </div>
            <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
              Writes Upside-Down
            </h3>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              The Zero Gravity Pen can be used to write in any orientation,
              including upside-down. It even works in outer space.
            </p>
          </div>
        </div>
        <RangePicker onChange={handleDateChange} />
      </div>
    </Fragment>
  );
};

export default LayoutAuthentication;
