// create new conversation for a given authenticated user
export const createConversation = async () => {
    const config = useRuntimeConfig();
    const { token } = useAuth();
    try {
        // Post request to create new conversation for authenticated user
        const conv_id: any = await $fetch(`${config.public.apiURL}/conversations/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token.value!!,
            },
        });
        return conv_id.conversation_id;
    } catch (error) {
        // Handle errors here
        console.error("Error fetching conversation message: ", error);
    }
};
