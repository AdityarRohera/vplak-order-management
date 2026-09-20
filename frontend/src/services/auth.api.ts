
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

// Register
export const register = async (data: {name: string;email: string;phone: string;password: string; state : string}) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/register`,
      data,
      {headers : {"Content-Type" :  "application/json"}}
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

// Login
export const login = async (data: {
  email: string;
  password: string;
}) => {
  try {
    const res = await axios.post(
      `${BASE_URL}/auth/login`,
      data,
      {headers : {"Content-Type" :  "application/json"}}
    );

    return res.data;
  } catch (err) {
    throw err;
  }
};

