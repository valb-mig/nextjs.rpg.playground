import { tv } from "tailwind-variants";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "file";
  placeholder?: string;
  errors?: any;
  style?: "primary" | "secondary";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Input = ({ label, name, placeholder, onChange, type, errors, style, children }: InputProps) => {

  const variants = tv({
    variants: {
      style: {
        primary: "bg-shade-4 border border-shade-3 text-white rounded-full outline-1 outline-primary p-2",
        secondary: "bg-transparent border border-shade-4 text-white rounded-full outline-1 outline-primary p-2"
      },
    },
    defaultVariants: {
      style: "primary",
    },
  });

  return (
    <div className="flex flex-col w-full relative gap-2">

      {label && (
        <div className="absolute -top-4 left-7">
          <label
            htmlFor={name}
            className="text-foreground-3 text-xs px-1 rounded-full bg-shade-3 border border-shade-2"
          >
            {label}
          </label>
        </div>
      )}

      <div className={`flex items-center h-10 ${variants({style: style})}`}>
        <span className="text-shade-2 pl-1">
          { children }
        </span>

        <input
          className="bg-transparent w-full h-8 p-2 outline-none"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
        />
      </div>

      {errors && errors[name] && (
        <span className="text-red-500 text-sm text-center">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default Input;
