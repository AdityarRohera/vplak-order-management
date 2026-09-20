

import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";
import { User } from "../models/User";

export const registerUser = async (name: string,email: string,phone: string,password: string,state?: string) => {

  const existingUser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (existingUser) {
    throw new Error("User with this email or phone already exists");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.create({name,email,phone,state,passwordHash,role: "customer"});

  return {
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      state: user.state,
      role: user.role,
    },
  };
};

export const loginUser = async (
  email: string,
  password: string
) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      state: user.state,
      role: user.role,
    },
  };
};