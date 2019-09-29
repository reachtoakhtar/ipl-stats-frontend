/**
 * Created by Akhtar on 01/07/2019.
 */

import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.REACT_APP_API_URL

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (error.response && (error.response.status === 401 || error.response.status === 403))
    window.location = "/logout"

  if (!expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
