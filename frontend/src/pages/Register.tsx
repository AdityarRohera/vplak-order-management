
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { register } from "../services/auth.api";

const fields = [
  { name: "name", label: "Name", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "phone", label: "Phone", type: "text" },
  { name: "password", label: "Password", type: "password" },
  { name: "state", label: "State", type: "text" },
];

const Register = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    state: "",
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
      await register(data);

      alert("Registration successful");
      navigate("/login");
    } catch (err: any) {
      alert(
        err.response?.data?.message ||
          "Registration failed"
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
            CREATE ACCOUNT
          </h1>
        </div>

        <div className="p-6">
          {fields.map((field) => (
            <div key={field.name}>
              <label
                htmlFor={field.name}
                className="mb-2 block font-bold text-gray-700"
              >
                {field.label}
              </label>

              <input
                id={field.name}
                name={field.name}
                type={field.type}
                placeholder={`Enter ${field.label.toLowerCase()}...`}
                value={data[field.name as keyof typeof data]}
                onChange={handleChange}
                className="mb-5 w-full rounded border border-gray-300 p-3 focus:border-teal-600 focus:outline-none"
              />
            </div>
          ))}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded bg-green-600 p-3 font-bold text-white hover:bg-green-700 disabled:bg-gray-400"
          >
            {loading ? "CREATING..." : "REGISTER"}
          </button>

          <p className="mt-5 text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 underline"
            >
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
