import { useFormContext } from "@ui/Form/config/context";
import React from "react";
import { FieldError } from "react-hook-form";
import { tv } from "tailwind-variants";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "file" | "radio";
  style?: "primary" | "secondary" | "default";
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  autofocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Input = ({
  type,
  label,
  name,
  value,
  disabled,
  children,
  placeholder,
  autofocus,
  style
}: InputProps) => {
  
  const variants = tv({
    variants: {
      containerStyle: {
        primary: "bg-shade-4 border border-shade-3 text-white rounded-full p-2 *:placeholder-shade-3",
        secondary: "bg-transparent border border-shade-3 text-white rounded-full p-2 *:placeholder-shade-3",
        default: ""
      },
    },
    defaultVariants: {
      containerStyle: "primary"
    },
  });

  const { register, errors } = useFormContext();

  return (
    <div className="flex flex-col w-full relative gap-2">

      { label && style != "default" && (
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
          {...register(name)}
          className="bg-transparent w-full h-8 p-2 outline-none"
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoFocus={autofocus}
        />
      </div>

      {errors && (errors[name] as FieldError)?.message && (
        <span className="text-red-500 text-sm text-center">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default Input;
