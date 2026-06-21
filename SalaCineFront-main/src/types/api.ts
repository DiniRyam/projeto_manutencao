import axios from "axios";

export const api = axios.create({
  // Link oficial de produção da Vercel 
  baseURL: "https://projeto-manutencao.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});