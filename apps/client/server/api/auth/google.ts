import { sign } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { google_client_secret } = config;
  const { frontend_url, google_client_id } = config.public;
  const { code } = getQuery(event);

  const barrier_response: any = await $fetch(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        ContentType: "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        client_id: google_client_id,
        client_secret: google_client_secret,
        redirect_uri: `${frontend_url}/guests/google`,
        grant_type: "authorization_code",
        code,
      }),
    },
  );
  const { access_token } = barrier_response;

  const user_response: any = await $fetch(
    "https://www.googleapis.com/oauth2/v2/userinfo",
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + access_token,
      },
    },
  );

  const jwt_token = sign({ username: user_response.email });
  return { jwt_token, google: user_response };
});
