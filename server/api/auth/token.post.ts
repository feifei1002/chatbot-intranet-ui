import { URLSearchParams } from "url";
import z from "zod";

export default eventHandler(async (event) => {
  const result = z.object({ username: z.string().min(1), password: z.string() }).safeParse(await readBody(event));

  if (!result.success) {
    return createError({ statusCode: 403, statusMessage: 'Unauthorized, try again' })
  }

  const {username, password} = result.data;

try{
  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  const config = useRuntimeConfig()

  const response = await fetch(`${config.public.apiURL}/token`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: params,
  });

  if (response.ok){
    const {access_token} = await response.json();
  return{
    token: access_token,
  }
  } else {
    throw new Error("Error while authenticating")
  } } catch (error: any){
    throw createError(error.message);
  }
});
