
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { useGlobalContext } from "@/context/UserContext";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordEye from "./PasswordEye";
import { Loader2 } from "lucide-react";
// Define Zod schema for validation
const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),

  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password must be no more than 20 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[\W_]/, "Password must contain at least one special character"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setUser, returnURL } = useGlobalContext();

  // Use useForm with zodResolver
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const loginMutation = useMutation((data) => postData("user/login", data), {
    onSuccess: ({ data }) => {
      setUser(data?.data);
      sessionStorage.setItem("user", JSON.stringify(data?.data));
      localStorage.setItem("loggedOut", JSON.stringify({ isLoggedOut: false }));
      if (data?.data?.isAdmin) {
        navigate("/admin");
      } else {
        navigate(returnURL);
      }
    },
  });

  const onSubmit = (data) => {
    toast.promise(loginMutation.mutateAsync(data), {
      loading: "Logging you in ...",
      success: ({ data }) => data?.message || "Login Successful",
      error: (err) => err?.response?.data?.message || "Login Failed! Try Again",
    });
  };

  const { isLoading } = loginMutation;

  return (
    <>
      <div className="flex flex-col p-4 space-y-2 text-white rounded-md bg-black/60 ">
        <div className="flex flex-col py-1 mb-5 space-y-4rounded-md bg-black/20 ">
          <p className="text-3xl font-bold ">Login</p>

        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col flex-1 space-y-5"
        >
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <Input
              autoComplete="email"
              id="email" // Add id attribute
              name="email"
              className="text-white bg-transparent border border-yellow-500"
              placeholder="example@gmail.com"
              type="email"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <PasswordEye
            label={"Password"}
            id={"password"}
            placeholder={"Your password"}
            errors={errors?.password}
            register={register}
          />

          <div className="w-full my-3">
            <Button className="w-full">
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading ? "Processing..." : "Login"}
            </Button>
          </div>
        </form>
        <div className="m-0 space-y-0 ">
          <Button
            type="button"
            onClick={() => navigate("/forget-password")}
            className="text-blue-500 bg-transparent border-none hover:text-blue-500 focus:text-blue-500 hover:bg-transparent hover:underline focus:bg-transparent"
            variant="ghost"
          >
            Forget Password? Click here
          </Button>
        </div>
      </div>
    </>
  );
};

export default Login;
