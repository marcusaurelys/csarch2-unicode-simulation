function Input({label, type="text", placeholder="enter text", value, onChange, disabled}){
    
    
    return (
            <div className="mb-4">
            {label && <label className="block text-gray-700 text-sm font-bold dark:text-white">{label}</label>}
              <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white dark:focus:border-white focus:border-black dark:text-white dark:bg-black dark:border-white"
                disabled={disabled}
              />
            </div>
    );
}


export default Input