import axios from "axios";
import { useAuth } from "../store/authStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL + "/api";
export const nextServer = axios.create({
  baseURL,
  withCredentials: true,
});

nextServer.interceptors.request.use((config) => {
  if (typeof document === "undefined") return config;
  const accessToken = useAuth.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});
