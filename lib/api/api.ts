import axios from "axios";
import { useAuth } from "../store/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  if (typeof document === "undefined") return config;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
  const accessToken = match?.split("=")[1];

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
