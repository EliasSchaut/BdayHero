import { sign } from "~/server/utils/jwt";

export async function oauth(credentials: {
  name: string;
  endpoint_bearer: string;
  endpoint_user: string;
  client_id: string;
  client_secret: string;
  code: string;
}): Promise<{ jwt_token: string; user: any }> {
  const bearer_token = await get_oauth_bearer({
    name: credentials.name,
    endpoint: credentials.endpoint_bearer,
    client_id: credentials.client_id,
    client_secret: credentials.client_secret,
    code: credentials.code as string,
  });

  const user = await get_oauth_user({
    endpoint: credentials.endpoint_user,
    bearer_token: bearer_token,
  });

  const jwt_token = sign({ username: user.email });
  return { jwt_token, user };
}

async function get_oauth_user(credentials: {
  endpoint: string;
  bearer_token: string;
}): Promise<any> {
  return await $fetch(credentials.endpoint, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.bearer_token,
    },
  });
}

async function get_oauth_bearer(credentials: {
  name: string;
  endpoint: string;
  client_id: string;
  client_secret: string;
  code: string;
}): Promise<string> {
  const config = useRuntimeConfig();
  const { frontend_url } = config.public;
  const { access_token } = (await $fetch(credentials.endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      ContentType: "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      redirect_uri: `${frontend_url}/guests/${credentials.name}`,
      grant_type: "authorization_code",
      code: credentials.code,
    }),
  })) as unknown as any;
  return access_token;
}
