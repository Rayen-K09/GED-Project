import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", // ton backend
});

export const loginRequest = (mail, password) => {
  return API.post("/auth/login", { mail, password });
};