function Input({ name, className, inputClass, prefix, children, errorClass, ...rest }) {
  return (
    <div className={`outline outline-none relative w-full focus:outline-none ${className || ""}`}>
      <div
        className={`flex items-center px-4 rounded ${errorClass}`}
        style={{
          border: !errorClass && "1px solid rgba(0, 0, 0, 0.12)",
          color: "rgba(0, 0, 0, 0.6)",
        }}
      >
        <span className="block mr-0.5 self-center font-Roboto-Regular text-[#2C2F45] text-qx">{prefix}</span>
        <input name={name} className={`py-3 block h-full w-full text-mx font-Roboto-Semibold appearance-none ring-0 focus:ring-0 bg-transparent  text-[#2C2F45]  ${inputClass || ""}`} {...rest} />
      </div>
      <label
        htmlFor={name}
        className="absolute top-0 font-normal left-0 text-sm p-1 z-1 duration-300 origin-0 bg-white"
        style={{ color: "rgba(0, 0, 0, 0.6)" }}
      >
        {children}
      </label>
    </div>
  );
}

export default Input;
