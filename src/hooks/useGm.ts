"use client";

import { createUserAndRoom } from '@/helpers/userHelper';

type FormData = {
    name: string,
    token: string,
    room: string
};

const useGm = () => {
    
    const createRoom = async (formData: FormData) => {

        // TODO: Hash token
        let user = await createUserAndRoom('gm', formData);
        console.log(user);
    }

    return { createRoom };
}

export default useGm;