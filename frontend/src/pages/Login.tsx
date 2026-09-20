
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { login as loginApi } from "../services/auth.api";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

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
    setLoading(true);

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
        err.response?.data?.message || "Login failed"
      );
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md overflow-hidden rounded-lg bg-white shadow"
      >
        <div className="bg-slate-800 px-6 py-4">
          <span className="text-xl font-bold text-white">
            VPLAK
          </span>
        </div>

        <div className="bg-gradient-to-r from-teal-700 via-teal-600 to-teal-700 px-6 py-6">
          <h1 className="text-center text-2xl font-bold text-white">
            ADMIN LOGIN
          </h1>
        </div>

        <div className="p-6">
          <label
            htmlFor="email"
            className="mb-2 block font-bold text-gray-700"
          >
            Email
          </label>

          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email..."
            value={data.email}
            onChange={handleChange}
            className="mb-5 w-full rounded border border-gray-300 p-3 focus:border-teal-600 focus:outline-none"
          />

          <label
            htmlFor="password"
            className="mb-2 block font-bold text-gray-700"
          >
            Password
          </label>

          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password..."
            value={data.password}
            onChange={handleChange}
            className="mb-6 w-full rounded border border-gray-300 p-3 focus:border-teal-600 focus:outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-green-600 p-3 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>

          <p className="mt-5 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-blue-600 underline"
            >
              Register
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
