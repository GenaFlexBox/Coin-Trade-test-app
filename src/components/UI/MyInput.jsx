const MyInput = ({ type, label, amount, change }) => {
  return (
    <div>
      <label
        htmlFor={type}
        className="block mb-2 text-sm font-bold text-gray-900"
      >
        {label}
      </label>
      <input
        min="0.0000000001"
        value={amount}
        onChange={(e) => change(e.target.value)}
        type={type}
        className="
          block
          w-full
          text-sm rounded-lg
          pr-10 pl-3 py-2
        bg-white border
        border-gray-300
        text-gray-900
          focus:outline-none
          focus:ring-1
        focus:ring-indigo-500
        focus:border-indigo-500"
      />
    </div>
  );
};

export default MyInput;
