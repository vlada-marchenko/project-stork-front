import axios from "axios";
import { useAuth } from "../store/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  if (typeof document === "undefined") return config;

  console.log("all cookies:", document.cookie);

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken="));
  const accessToken = match?.split("=")[1];

  console.log("accessToken from cookie:", accessToken);

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
