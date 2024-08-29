import { getUserCookies } from "@/utils/cookies";

type CookieData = {
    uuid: string;
    name: string;
};

const validateCookies = async <T>(
    callback: (cookies: CookieData) => Promise<ResponseObject<T>>
): Promise<ResponseObject<T>> => {

    const cookies = await getUserCookies();

    if (!cookies) {
        return {
            status: "error",
            message: "Invalid cookies"
        };
    }

    try {
        return await callback(cookies);
    } catch (error: any) {
        return {
            status: "error",
            message: error.message || "Something went wrong"
        };
    }
}

export default validateCookies;