import React, { createContext, useContext, ReactNode } from "react";
import { UseFormRegister, FieldValues, FieldErrors } from "react-hook-form";

interface FormContextProps {
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FormContext = createContext<FormContextProps | null>(null);

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("useFormContext must be used within a FormProvider");
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  register,
  errors,
}) => {
  return (
    <FormContext.Provider value={{ register, errors }}>
      {children}
    </FormContext.Provider>
  );
};

export default FormProvider;
