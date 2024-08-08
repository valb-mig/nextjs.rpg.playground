import { useFormContext } from "@ui/Form/config/context";
import React from "react";
import { FieldError } from "react-hook-form";
import { tv } from "tailwind-variants";

interface InputProps {
  label?: string;
  name: string;
  style?: "primary" | "secondary";
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  autofocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Textarea = ({
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
        primary: "bg-shade-4 border border-shade-3 text-white rounded-xl p-2 *:placeholder-shade-3",
        secondary: "bg-transparent border border-shade-3 text-white rounded-xl p-2 *:placeholder-shade-3"
      },
    },
    defaultVariants: {
      containerStyle: "primary"
    },
  });

  const { register, errors } = useFormContext();

  return (
    <div className="flex flex-col w-full relative gap-2">

      { label && (
        <div className="absolute -top-4 left-7">
          <label
            htmlFor={name}
            className="text-foreground-3 text-xs px-1 rounded-full bg-shade-3 border border-shade-2"
          >
            {label}
          </label>
        </div>
      )}

      <textarea
        {...register(name)}
        className={`flex items-center h-10 outline-none focus-within:ring-2 focus-within:ring-primary ${variants({containerStyle: style})}`}
        name={name}
        value={value}
        placeholder={placeholder}
        autoFocus={autofocus}
      />

      {errors && (errors[name] as FieldError)?.message && (
        <span className="text-red-500 text-sm text-center">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default Textarea;
