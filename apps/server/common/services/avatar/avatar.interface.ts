export interface Avatar {
  get_avatar_href(email: string): Promise<string | null>;

  upload_avatar(file: any, email: string): Promise<string | null>;

  delete_avatar(email: string): Promise<string | null>;
}
