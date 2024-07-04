interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  errors?: any;
  register?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Input = ({ label, name, placeholder, onChange, errors, register, children }: InputProps) => {

  return (
    <div className="flex flex-col w-full">

      {label && (
        <label
          htmlFor={name}
          className="text-white text-sm bg-shade-4 p-1 rounded-t"
        >
          {label}
        </label>
      )}

      <div className="bg-shade-4 border border-shade-3 outline-none text-white rounded-full">
        <span >
          { children }
        </span>

        {onChange ? (
          <input
            className="bg-transparent w-full h-8 p-2"
            name={name}
            onChange={onChange}
            placeholder={placeholder}
          />
        ) : (
          <input
            {...(register ? register(name) : {})}
            className="bg-transparent h-8 p-2"
            name={name}
            placeholder={placeholder}
          />
        )}
      </div>

      {errors && errors[name] && (
        <span className="text-red-500 text-sm">{errors[name].message}</span>
      )}
    </div>
  );
};

export default Input;
