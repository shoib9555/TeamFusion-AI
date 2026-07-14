const bcrypt = require("bcryptjs");
const User = require("../models/User");

const registerUser = async (userData) => {
  const { firstName, lastName, email, password } = userData;

  // Check if email already exists
  const existingUser = await User.findOne({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });

  return user;
};

const jwt = require("jsonwebtoken");

const loginUser = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({
    where: { email },
  });

  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );

  return {
    token,
    user,
  };
};

module.exports = {
  registerUser,
  loginUser,
};