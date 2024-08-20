import axios from "axios";

type payloadType = {};
// login user
export const loginUser = (data: any) => {
  return axios.post("/api/login", data);
};

// signup user
export const signUpUser = (data: any) => {
  return axios.post("/api/signup", data);
};
