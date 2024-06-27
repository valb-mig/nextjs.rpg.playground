"use client";

import { createUserAndRoom } from '@/helpers/createHelper';

type FormData = {
    name: string,
    token: string,
    room: string
};

const useCreate = () => {
    
    const createRoom = async (formData: FormData) => {

        // TODO: Hash token
        let user = await createUserAndRoom(formData);
    }

    return { createRoom };
}

export default useCreate;