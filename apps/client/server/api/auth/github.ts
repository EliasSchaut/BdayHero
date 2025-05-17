import { sign } from "~/server/utils/jwt";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { github_client_secret } = config;
  const { frontend_url, github_client_id } = config.public;
  const { code } = getQuery(event);

  const barrier_response: any = await $fetch(
    "https://github.com/login/oauth/access_token",
    {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        client_id: github_client_id,
        client_secret: github_client_secret,
        redirect_uri: `${frontend_url}/guests/github`,
        code,
      }),
    },
  );

  const { access_token } = barrier_response;

  const user_response: any = await $fetch("https://api.github.com/user", {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + access_token,
    },
  });

  const jwt_token = sign({ username: user_response.email });
  return { jwt_token, github: user_response };
});
