/* eslint-disable react/prop-types */
const Input = ({ label, type, value, onChange, autoComplete }) => {
  return (
    <div className="w-full">
      <label className="w-full">
        <span className="mb-[2px] inline-block w-full leading-none">
          {label}
        </span>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoComplete={autoComplete}
          className="w-full rounded-lg border border-black/5 bg-transparent p-1.5 text-base outline-none focus:border-black/50"
        />
      </label>
    </div>
  );
};

export default Input;
