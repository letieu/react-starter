import axios from "axios";

const register = (username, email, password) => {
  return axios.post("auth/register", {
    username,
    email,
    password,
  });
};

const login = async (username, password) => {
  const response = await axios.post("auth/login", {
    username,
    password,
  });

  return response;
};

const me = async () => {
  return await axios.post("auth/me");
};

export default {
  register,
  login,
  me,
};
