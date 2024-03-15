import z from "zod";

export default defineEventHandler(async event => {
    const result = z.object({ username: z.string().min(1), password: z.string() }).safeParse(await readBody(event));

    // request failed zod schema validation
    if (!result.success) {
        return createError({ status: 403, message: "Unauthorized, try again" });
    }

    const { username, password } = result.data;

    let response;

    // send request to the backend
    try {
        const config = useRuntimeConfig();

        response = await fetch(`${config.public.apiURL}/token`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });
    } catch (error: any) {
        throw createError({ message: error.message });
    }

    if (response.ok) {
        return await response.json();
    } else if (response.status === 401) {
        // throw error since user failed to authenticate
        throw createError({ status: 401, message: "Invalid credentials, try again" });
    } else {
        console.error("Server error while authenticating", response);
        throw createError({
            message: "Server error while authenticating",
        });
    }
});
