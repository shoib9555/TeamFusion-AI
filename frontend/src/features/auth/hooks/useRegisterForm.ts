import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  registerSchema,
  type RegisterSchema,
} from "../schema/register.schema";

export const useRegisterForm = () => {
  return useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),

    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    mode: "onBlur",
  });
};