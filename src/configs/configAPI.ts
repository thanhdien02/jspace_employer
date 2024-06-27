import axios from "axios";

export default axios.create({
  baseURL: "https://jspace.space/jspace-service",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
// export const API = "http://35.197.133.113:8081/jspace-service";
export const API = "https://jspace.space/jspace-service";
