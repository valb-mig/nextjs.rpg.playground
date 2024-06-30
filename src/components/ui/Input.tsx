interface InputProps {
  label: string;
  name: string;
  errors?: any;
  register?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, name, onChange, errors, register }: InputProps) => {
  return (
    <div className="flex flex-col w-full">
      <div>
        <label
          htmlFor={name}
          className="text-white text-sm bg-neutral-700 p-1 rounded-t"
        >
          {label}
        </label>
      </div>

      {onChange ? (
        <input
          className="rounded-b rounded-e bg-neutral-800 border border-neutral-700 outline-none text-white p-2"
          name={name}
          onChange={onChange}
        />
      ) : (
        <input
          {...(register ? register(name) : {})}
          className="rounded-b rounded-e bg-neutral-800 border border-neutral-700 outline-none text-white p-2"
          name={name}
        />
      )}

      {errors && errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Input;
