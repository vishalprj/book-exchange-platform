import axios from "axios";

// login user
export const loginUser = (data: any) => {
  return axios.post("/api/users/login", data);
};

// signup user
export const signUpUser = (data: any) => {
  return axios.post("/api/users/signup", data);
};
