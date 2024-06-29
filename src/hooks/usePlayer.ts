"use client";

import { createUserAndRoom } from '@/helpers/userHelper';

type FormData = {
    name: string,
    token: string,
    room: string
};

const usePlayer = () => {
    
    const joinRoom = async (formData: FormData) => {

        // TODO: Hash token
        let user = await createUserAndRoom('player', formData);
        
    }

    return { joinRoom };
}

export default usePlayer;