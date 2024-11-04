import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { type SubmitHandler, useFieldArray, useForm } from "react-hook-form";

import FormProvider from "@ui/Form/config/context";

interface FormProps {
  children: React.ReactNode;
  onSubmit: (data: any) => void;
  style?: string;
  schema: any;
}

const Body = ({ children, onSubmit, schema, style }: FormProps) => {
  type formSchema = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<formSchema>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<formSchema> = async (data) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={`flex flex-col gap-2 w-full h-full ${style ? style : ""}`}
    >
      <FormProvider register={register} errors={errors}>
        {children}
      </FormProvider>
    </form>
  );
};

export default Body;
