function TextArea({ name, className, children, ...rest }) {
  return (
    <div className={`outline outline-none relative w-full focus:outline-none ${className || ""}`}>
      <textarea
        name={name}
        id={name}
        className={`block p-4 h-full w-full rounded appearance-none ring-0 focus:ring-0 bg-transparent`}
        style={{ border: "1px solid rgba(0, 0, 0, 0.12)", color: "rgba(0, 0, 0, 0.6)" }}
        {...rest}
      />
      <label
        htmlFor={name}
        className="absolute top-0 font-normal left-0 text-sm bg-white p-1 z-1 duration-300 origin-0"
        style={{ color: "rgba(0, 0, 0, 0.6)" }}
      >
        {children}
      </label>
    </div>
  );
}

export default TextArea;
