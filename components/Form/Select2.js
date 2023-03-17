import Select from "react-select";
import Search from "@/assets/search.svg";
import Image from "next/image";

const customStyles = {
  control: (base) => ({
    ...base,
    height: 38,
    minHeight: 38,
    outline: "none",
    border: "0px",
    borderRadius: "0",
    color: "rgba(0, 0, 0, 0.6)",
    boxShadow: "0 !important",
    "&:hover": {
      border: "0px",
      borderRadius: "0",
    },
  }),
};

function MySelect({ name, labelName, className, ...rest }) {
  return (
    <div
      className={`outline px-1 relative w-full focus:outline-none focus:ring-0 rounded border ${
        className || " border-gray-1f "
      }`}
    >
      <Select
        name={name}
        styles={customStyles}
        {...rest}
        instanceId={labelName || name}
        placeholder={"Search"}
      />
      <div className=" ">
        <div className="absolute right-2 top-0 bg-white w-36 selection: bottom-0 flex items-center">
          <Image
            src={Search}
            width={24}
            height={24}
            className="text-primary  absolute right-1  bg-white  "
          />
        </div>
      </div>
    </div>
  );
}

export default MySelect;
