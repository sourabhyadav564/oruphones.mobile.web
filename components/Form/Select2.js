import Select from "react-select";
import { BiSearch } from "react-icons/bi";

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
        <div className={`outline px-1 relative w-full focus:outline-none focus:ring-0 rounded border ${className || " border-gray-1f "}`}>
            <Select name={name} styles={customStyles} {...rest} instanceId={labelName || name} />
            {/* <label
        htmlFor={labelName || name}
        className="absolute top-0 left-0 text-sm bg-white p-1 z-1 duration-300 origin-0"
        style={{ color: "rgba(0, 0, 0, 0.6)" }}
      >
        {labelName}
      </label> */}
            <div className=" ">
                <div className="absolute right-2 top-0 bg-white w-36 selection: bottom-0 flex items-center">
                    <BiSearch className="text-primary  absolute right-1  bg-white  " size={24} />
                </div>
            </div>
        </div>
    );
}

export default MySelect;