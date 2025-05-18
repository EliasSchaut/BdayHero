export default function generate_oauth_uri(options: {
  name: string;
  client_id: string;
  endpoint: string;
  scope: string;
}) {
  const { frontend_url } = useRuntimeConfig().public;
  const auth_uri = new URL(options.endpoint);
  auth_uri.searchParams.append("client_id", options.client_id);
  auth_uri.searchParams.append(
    "redirect_uri",
    `${frontend_url}/guests/${options.name}`,
  );
  auth_uri.searchParams.append("scope", options.scope);
  auth_uri.searchParams.append("response_type", "code");
  return auth_uri.toString();
}
