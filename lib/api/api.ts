import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  if (typeof document === "undefined") return config;
  const cookies = document.cookie.split(";");
  const accessToken = cookies
    .find((row) => row.startsWith("accessToken="))
    ?.split("=")[1];
  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }
  return config;
});
