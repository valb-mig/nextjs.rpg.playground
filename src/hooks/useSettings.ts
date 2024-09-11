"use client";

import { updateUserData } from "@services/userService";
import validateCookies from "@/utils/validateCookies";

const useSettings = () => {

    const updateProfile = async (profileForm: { username?: string, email?: string }): Promise<ResponseObject<UserData>> => {

        return validateCookies<UserData>(async (cookies) => {

            let updateObj = {};

            if(profileForm.username) {
              updateObj = {
                ...updateObj,
                username: profileForm.username
              };
            }
        
            if(profileForm.email) {
              updateObj = {
                ...updateObj,
                email: profileForm.email
              };
            }

            if(!updateObj || Object.keys(updateObj).length === 0)
            {
                throw new Error(); 
            }

            const updatedUser = await updateUserData(cookies.uuid, updateObj);

            if(updatedUser) {

                return {
                    status: "success",
                    message: "User updated",
                    data: updatedUser
                }
            }

            throw new Error("Something went wrong");
        });
    };

    return { updateProfile };
}

export default useSettings;