import { oauth } from "~/server/utils/oauth";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { discord_client_secret } = config;
  const { discord_client_id } = config.public;
  const { code } = getQuery(event);

  return await oauth({
    name: "discord",
    endpoint_bearer: "https://discord.com/api/oauth2/token",
    endpoint_user: "https://discord.com/api/users/@me",
    client_id: discord_client_id,
    client_secret: discord_client_secret,
    code: code as string,
  });
});
