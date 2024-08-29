import { useFormContext } from "@ui/Form/config/context";
import React from "react";
import { FieldError } from "react-hook-form";
import { tv } from "tailwind-variants";

interface InputProps {
  name: string;
  type?: "text" | "password" | "email" | "number" | "file";
  style?: "primary" | "secondary";
  placeholder?: string;
  bonus?: string;
  value?: any;
  autofocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
}

const Status = ({
  type,
  name,
  style,
  value,
  placeholder,
  autofocus,
  bonus
}: InputProps) => {
  
  const variants = tv({
    variants: {
      containerStyle: {
        primary: "bg-shade-4 border border-shade-3 text-white *:placeholder-shade-3",
        secondary: "bg-transparent border border-shade-3 text-white *:placeholder-shade-3"
      },
    },
    defaultVariants: {
      containerStyle: "primary"
    },
  });

  const { register, errors } = useFormContext();

  return (
    <div className="flex flex-col w-full relative gap-2">

      <div className={`flex justify-center items-center relative w-fit rounded-full bg-shade-4 ${variants({containerStyle: style})} focus-within:ring-2 focus-within:ring-primary`}>

        <input
          {...register(name)}
          className="p-2 size-24 rounded-lg text-center text-3xl bg-transparent outline-none"
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoFocus={autofocus}
        />

        { bonus && (
          <span className="absolute -bottom-4 text-xl p-1 px-2 bg-shade-3 border border-shade-2 rounded-full pointer-events-none">
            { bonus }
          </span>
        )}
        
      </div>  

      {errors && (errors[name] as FieldError)?.message && (
        <span className="text-red-500 text-sm text-center">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default Status;
