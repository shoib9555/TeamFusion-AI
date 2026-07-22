import { Link, useNavigate } from "react-router-dom";

import { useRegisterForm } from "../hooks/useRegisterForm";
import { useSignup } from "../hooks/useSignup";

import Button from "../../../components/ui/Button";
import Input from "../../../components/ui/Input";
import Card from "../../../components/ui/Card";

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useRegisterForm();

  const signupMutation = useSignup();
  const navigate = useNavigate();

  const onSubmit = (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    signupMutation.mutate(
      {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          alert("Account created successfully!");
          navigate("/login");
        },

        onError: (error) => {
          console.error("Signup Failed:", error);
        },
      }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <Card className="w-full max-w-md">
        <h1 className="mb-6 text-center text-2xl font-bold">
          Create Account
        </h1>


        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <Input
            label="First Name"
            type="text"
            placeholder="Enter your first name"
            error={errors.firstName?.message}
            {...register("firstName")}
          />

          <Input
            label="Last Name"
            type="text"
            placeholder="Enter your last name"
            error={errors.lastName?.message}
            {...register("lastName")}
          />

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

          <Input
            label="Confirm Password"
            type="password"
            placeholder="Confirm your password"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
          />

          <Button
            type="submit"
            isLoading={signupMutation.isPending}
          >
            Create Account
          </Button>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-blue-600 hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default RegisterPage;