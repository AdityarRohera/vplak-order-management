
import { useState } from "react";
import { register } from "../services/auth.api";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    state : ""
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
      const res = await register(data);

      console.log(res);
      alert("Registration successful");

      setData({
        name: "",
        email: "",
        phone: "",
        password: "",
        state : ""
      });
    } catch (err: any) {
      console.log(err);
      alert(
        err.response?.data?.message ||
          "Registration failed"
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md rounded-lg bg-white p-6 shadow-md"
      >
        <h1 className="mb-6 text-center text-2xl font-bold">
          Register
        </h1>

        <input
          name="name"
          type="text"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <input
          name="phone"
          type="text"
          placeholder="Phone"
          value={data.phone}
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
        
        <input
          name="state"
          type="text"
          placeholder="State"
          value={data.state}
          onChange={handleChange}
          className="mb-4 w-full rounded border p-3"
        />

        <button
          type="submit"
          className="w-full rounded bg-green-600 p-3 text-white hover:bg-green-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;

