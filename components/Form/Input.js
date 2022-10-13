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
        <span className="block mr-0.5 text-gray-500">{prefix}</span>
        <input name={name} className={`py-3 block h-full w-full text-[12px] appearance-none ring-0 focus:ring-0 bg-transparent  text-[#92949F] ${inputClass || ""}`} {...rest} />
      </div>

      <label
        htmlFor={name}
        className="absolute top-0 font-normal left-0 text-sm p-1 z-1 duration-300 origin-0"
        style={{ color: "rgba(0, 0, 0, 0.6)" }}
      >
        {children}
      </label>
    </div>
  );
}

export default Input;
