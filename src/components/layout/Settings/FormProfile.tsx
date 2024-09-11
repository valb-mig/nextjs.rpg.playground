import { useState } from "react";

import { useGlobalContext } from "@/context/GlobalContext";
import useSettings from "@hooks/useSettings";

import { z } from "zod";
import { Check, Mail, User } from "lucide-react";

import Button from "@ui/Button";
import Form from "@ui/Form";
import { toast } from "sonner";

const ZodSchema = z.object({
  username: z.string(),
  email: z.string(),
});

const FormProfile = () => {

  const { updateProfile } = useSettings();

  const { userData, setUserData} = useGlobalContext();
  const [ loading, setloading ] = useState(false);

  const onFormSubmit = async (data: {
    username?: string,
    email?: string
  }) => {
    setloading(true);

    if(userData)
    {
      let response = await updateProfile(data);
   
      if(response.message)
      {
        toast[response.status](response.message);
      }
  
      if(response.status === "success" && response.data)
      {
        let user = response.data;
  
        setUserData({
          ...userData,
          ...user
        });
      }

      setloading(false);
    }
  }

  return (
    <Form.Body
      onSubmit={onFormSubmit}
      schema={ZodSchema}
      style="w-full p-4 gap-4"
    >
      <Form.Input label="Username" name="username" type="text" autofocus placeholder={userData?.username}>
        <User/>
      </Form.Input>

      <Form.Input label="Email" name="email" type="email" placeholder={userData?.email}>
        <Mail />
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

export default FormProfile;