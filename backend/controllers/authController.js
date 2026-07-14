const { signupSchema, loginSchema } = require("../validations/authValidation");
const { registerUser, loginUser } = require("../services/authService");

const signup = async (req, res) => {
  try {
    // Validate request body
    const { error } = signupSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    // Register user
    const user = await registerUser(req.body);

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const login = async (req, res) => {
  try {
    // Validate request
    const { error } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { token, user } = await loginUser(req.body);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    return res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};
const getProfile = async (req, res) => {
  return res.status(200).json({
    success: true,
    message: "Profile fetched successfully",
    user: req.user,
  });
};

module.exports = {
  signup,
  login,
  getProfile,
};
