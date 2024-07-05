import { useFormContext } from "@ui/Form/config/context";
import React from "react";
import { FieldError } from "react-hook-form";

interface InputProps {
  label: string;
  name: string;
  type?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  children?: React.ReactNode;
  value?: any;
  disabled?: boolean;
  placeholder?: string;
  autofocus?: boolean;
}

const Input = ({
  type,
  label,
  name,
  value,
  disabled,
  children,
  placeholder,
  autofocus
}: InputProps) => {
  
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

      <div className={`flex items-center bg-shade-4 border border-shade-3 text-white rounded-full outline-1 outline-primary w-full p-2 ${disabled ? "bg-shade-3" : "bg-transparent"}`}>

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
