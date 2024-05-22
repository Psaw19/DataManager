export type DataVariant = "credentials" | "notes";
export type HttpMethod = "GET" | "PUT" | "POST" | "DELETE";

export interface AxiosResponseData {
  message: string;
  success: boolean;
}

export interface User {
  _id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
}
