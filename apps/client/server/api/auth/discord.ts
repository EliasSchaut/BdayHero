import { sign } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { discord_client_secret } = config;
  const { frontend_url, discord_client_id } = config.public;
  const { code } = getQuery(event);

  const barrier_response: any = await $fetch(
    "https://discord.com/api/oauth2/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        ContentType: "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: discord_client_id,
        client_secret: discord_client_secret,
        redirect_uri: `${frontend_url}/guests/discord`,
        grant_type: "authorization_code",
        code: code as string,
      }),
    },
  );
  const { access_token } = barrier_response;

  const user_response: any = await $fetch("https://discord.com/api/users/@me", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
    },
  });

  const jwt_token = sign({ username: user_response.email });
  return { jwt_token, discord: user_response };
});
