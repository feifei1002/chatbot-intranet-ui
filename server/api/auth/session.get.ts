export default defineEventHandler(async event => {
    let response;

    const authHeaderValue = getRequestHeader(event, "authorization");
    // throw error if no Authorization header is present
    if (typeof authHeaderValue === "undefined") {
        throw createError({
            statusCode: 403,
            statusMessage: "Need to pass valid Bearer-authorization header to access this endpoint",
        });
    }

    // send request to the backend
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
        // throw error since user failed to authenticate
        throw createError({ status: 401, message: "Invalid session, please login again" });
    } else {
        console.error("Server error while authenticating", response);
        throw createError({
            message: "Server error while authenticating",
        });
    }
});
