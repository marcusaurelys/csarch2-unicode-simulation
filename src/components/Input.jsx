function Input({
  label,
  type,
  placeholder = "enter text",
  value,
  onChange,
  disabled,
  invalid
}) {
  return (
    <div className="mb-4">
      {label && (
        <label className={invalid ? "block text-red-400 text-sm font-bold" : "block text-black text-sm font-bold dark:text-white "}>
          {label}
        </label>
      )}

      {type == "textarea" ? (
        <textarea
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:focus:border-white focus:border-black dark:text-white dark:bg-black dark:border-white h-10 overflow-hidden resize-none"
          }
          disabled={disabled}
        />
      ) : (
        <>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={
            "w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none dark:text-white dark:bg-black dark:border-white h-10 overflow-hidden resize-none focus:ring-2" + (invalid ? ' ring-red-400 border-red-400 dark:border-red-400 text-red-400 dark:text-red-400' : ' focus:ring-black dark:focus:ring-white dark:focus:border-white focus:border-black ')}

          disabled={disabled}
        />
        </>
      )}
    </div>
  );
}

export default Input;
