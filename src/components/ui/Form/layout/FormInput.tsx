import { useFormContext } from "@ui/Form/config/context";
import React from "react";
import { FieldError } from "react-hook-form";
import { tv } from "tailwind-variants";

interface InputProps {
  label?: string;
  name: string;
  type?: "text" | "password" | "email" | "number" | "file" | "radio" | "options";
  style?: "primary" | "secondary" | "default";
  placeholder?: string;
  value?: any;
  disabled?: boolean;
  autofocus?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  options?: { key: string, label: string }[];
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
  style,
  options
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
    <div className="flex w-full relative gap-2">

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

      { type != "options" ? (

        <div className={`flex items-center h-10 focus-within:ring-2 focus-within:ring-primary w-full ${variants({containerStyle: style})}`}>

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

      ): options && 
        Object.values(options).map((value, index) => (
          <div key={index} className="flex w-full">
            <label
              htmlFor={value.key}
              className="text-center block w-full cursor-pointer rounded-full text-shade-3 p-2 border border-shade-3 hover:border-primary  has-[:checked]:border-primary has-[:checked]:bg-primary has-[:checked]:text-white"              
              tabIndex={0}
            >
              <input 
                {...register(name)}
                className="sr-only" 
                id={value.key} 
                type="radio" 
                tabIndex={-1} 
                name={name} 
                value={value.key}
              />
              <span className="text-lg font-medium">{value.label}</span>
            </label>
          </div>
        ))
      }

      {errors && (errors[name] as FieldError)?.message && (
        <span className="text-red-500 text-sm text-center">
          {(errors[name] as FieldError).message}
        </span>
      )}
    </div>
  );
};

export default Input;
