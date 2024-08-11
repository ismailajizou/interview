import Axios from "axios";

const api = Axios.create({
  baseURL: import.meta.env.VITE_API_URL as string,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  },
});

export default api;