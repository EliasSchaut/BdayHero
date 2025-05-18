import { oauth } from "~/server/utils/oauth";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { github_client_secret } = config;
  const { github_client_id } = config.public;
  const { code } = getQuery(event);

  return await oauth({
    name: "github",
    endpoint_bearer: "https://github.com/login/oauth/access_token",
    endpoint_user: "https://api.github.com/user",
    client_id: github_client_id,
    client_secret: github_client_secret,
    code: code as string,
  });
});
