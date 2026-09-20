
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login as loginApi } from "../services/auth.api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      const res = await loginApi(data);

      // Context handles localStorage + state
      login(res.data.token, res.data.user.role);

      // Redirect based on role
      if (res.data.user.role === "admin") {
            navigate("/orders");
      } else {
            navigate("/");
      }
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Login failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow"
      >
        <h1 className="mb-6 text-2xl font-bold">
          Login
        </h1>

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-green-600 p-3 text-white"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
