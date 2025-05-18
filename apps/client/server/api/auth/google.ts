import { oauth } from "~/server/utils/oauth";

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();
  const { google_client_secret } = config;
  const { google_client_id } = config.public;
  const { code } = getQuery(event);

  return await oauth({
    name: "google",
    endpoint_bearer: "https://oauth2.googleapis.com/token",
    endpoint_user: "https://www.googleapis.com/oauth2/v2/userinfo",
    client_id: google_client_id,
    client_secret: google_client_secret,
    code: code as string,
  });
});
