import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/auth.store";
import { useLoginForm } from "../hooks/useLoginForm";
import { useLogin } from "../hooks/useLogin";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useLoginForm();

  const loginMutation = useLogin();
  const navigate = useNavigate();

  const login = useAuthStore((state) => state.login);

  const [loginError, setLoginError] = useState("");

  const onSubmit = (data: {
    email: string;
    password: string;
  }) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        setLoginError("");

        login(response.user, response.token);

        navigate("/dashboard");
      },

      onError: (error: any) => {
        const message =
          error?.response?.data?.message ||
          "Invalid email or password.";

        setLoginError(message);
      },
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Login
        </h1>

        {loginError && (
          <div className="mb-4 rounded-md border border-red-300 bg-red-100 p-3 text-sm text-red-700">
            {loginError}
          </div>
        )}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register("email")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register("password")}
          />

          <Button
            type="submit"
            isLoading={loginMutation.isPending}
          >
            Login
          </Button>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:underline"
              >
                Create Account
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;