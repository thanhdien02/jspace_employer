import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
export const API = "http://34.67.38.44:8081/jspace-service";
// export const API = "https://jspace-ac16c8492293.herokuapp.com/jspace-service";
