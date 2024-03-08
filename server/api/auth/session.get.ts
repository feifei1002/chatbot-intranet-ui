export default defineEventHandler(async event => {
    let response;

    const authHeaderValue = getRequestHeader(event, "authorization");
    if (typeof authHeaderValue === "undefined") {
        throw createError({
            statusCode: 403,
            statusMessage: "Need to pass valid Bearer-authorization header to access this endpoint",
        });
    }

    try {
        const config = useRuntimeConfig();

        response = await fetch(`${config.public.apiURL}/session`, {
            headers: {
                Authorization: authHeaderValue,
            },
        });
    } catch (error: any) {
        throw createError({ message: error.message });
    }

    if (response.ok) {
        return await response.json();
    } else if (response.status === 401) {
        throw createError({ status: 401, message: "Invalid credentials, try again" });
    } else {
        console.error("Server error while authenticating", response);
        throw createError({
            message: "Server error while authenticating",
        });
    }
});
