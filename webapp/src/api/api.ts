import axios, {AxiosHeaders} from "axios";

function getInstanceHeaders() {
  let headers: AxiosHeaders = new AxiosHeaders();
  headers.set("Accept", "application/json");
  headers.set("Content-Type", "application/json");

  if (localStorage.getItem("token"))
    headers.set(
        "Authorization",
        "Bearer " + localStorage.getItem("token")
    );
  return headers;
}

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";
axios.defaults.xsrfCookieName = "XSRF-TOKEN";
axios.defaults.xsrfHeaderName = "X-XSRF-TOKEN";
axios.defaults.withCredentials = true;
const api = axios.create({
  baseURL: BACKEND_URL,
  headers: getInstanceHeaders(),
  withCredentials: true
});

// used for a pagination type resource
export interface Pagination<T> {
  data: T[];
  meta: {
    total: number;
    per_page: number;
    current_page: number;
  }
}

// backend validation error
export interface ValidationError {
  message: string;
  errors: {
    string: string[]
  };
}

export default api;
