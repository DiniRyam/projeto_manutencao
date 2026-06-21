import axios from "axios";

export const api = axios.create({

  // agora aponta diretamente pro backend na nuvem
  baseURL: "https://projeto-manutencao-l7hy4nxg6-ryhades-4506s-projects.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});