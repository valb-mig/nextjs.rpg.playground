import { useState } from "react";

import { Check, EyeIcon, EyeOffIcon, LockIcon } from "lucide-react";
import { z } from "zod";

import Button from "@ui/Button";
import Form from "@ui/Form";

const ZodSchema = z.object({
  password: z.string().min(1, "Password is required"),
  new_password: z.string().min(1, "New password is required"),
  conf_new_password: z.string().min(1, "Confirm the new password")
})
.refine((data) => data.new_password === data.conf_new_password, {
  message: "Passwords don't match"
});

const FormPassword = () => {

  const [ loading, setloading ] = useState(false);

  const [ showPassword, setShowPassword ] = useState({
    old: false,
    new: false
  });

  const onFormSubmit = (data: any) => {
    setloading(true);
    console.log(data);
  }

  return (
    <Form.Body
      onSubmit={onFormSubmit}
      schema={ZodSchema}
      style="w-full p-4 gap-4"
    >
      <Form.Input label="Password" name="password" type={showPassword.old ? "text" : "password"}>
        <span onClick={() => setShowPassword({...showPassword, old: !showPassword.old})} className="text-sm cursor-pointer hover:text-primary transition">
          {showPassword.old ? <EyeIcon /> : <EyeOffIcon />}
        </span>
      </Form.Input>

      <Form.Input label="New password" name="new_password" type={showPassword.new ? "text" : "password"}>
        <span onClick={() => setShowPassword({...showPassword, new: !showPassword.new})} className="text-sm cursor-pointer hover:text-primary transition">
          {showPassword.new ? <EyeIcon /> : <EyeOffIcon />}
        </span>
      </Form.Input>

      <Form.Input label="Confirm new password" name="conf_new_password" type="password">
        <LockIcon />
      </Form.Input>

      <div className="flex justify-end">
        <Button type="submit" role="success" loading={loading}>
          <Check />
          Submit
        </Button>
      </div>
    </Form.Body>
  )
}

export default FormPassword;