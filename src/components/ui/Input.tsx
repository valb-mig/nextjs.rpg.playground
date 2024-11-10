import { tv } from "tailwind-variants";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "file";
  value?: string;
  placeholder?: string;
  errors?: any;
  style?: "primary" | "secondary";
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Input = ({ label, name, placeholder, onChange, type, value, errors, style, children }: InputProps) => {

  const variants = tv({
    variants: {
      containerStyle: {
        primary: "bg-shade-4 border border-shade-3 text-white rounded-full p-2 *:placeholder-shade-3",
        secondary: "bg-transparent backdrop-blur-lg border border-shade-3 text-white rounded-full p-2 *:placeholder-shade-3"
      },
    },
    defaultVariants: {
      containerStyle: "primary"
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

      <div className={`flex items-center h-10 focus-within:ring-2 focus-within:ring-primary ${variants({containerStyle: style})}`}>
        <span className="text-shade-2 pl-1">
          { children }
        </span>

        <input
          className="bg-transparent w-full h-8 p-2 outline-none"
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
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
