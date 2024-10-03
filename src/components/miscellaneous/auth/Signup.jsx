import { useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { postData } from "@/api/postData";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Zod schema for form validation
const signupSchema = z
  .object({
    fullname: z.string().min(1, "Full Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email format").min(1, "Email is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(20, "Password must be no more than 20 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(/[\W_]/, "Password must contain at least one special character"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    profile: z
      .any()
      .refine((files) => files?.length > 0, "Profile picture is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the error on confirmPassword field
  });

const Signup = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(signupSchema), // Using zodResolver for validation
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      profile: null,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;

  const signupMutation = useMutation((data) => postData("user/signup", data), {
    onSuccess: ({ data }) => {
      toast.success("Congratulations", {
        description: `Signed up as ${data?.fullname}`,
      });
      setUser(data);
      sessionStorage.setItem("user", JSON.stringify(data));
      if (data?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    },
    onError: (error) => {
      if (error.response.data.message) {
        toast.error("Signup Error", {
          description: error?.response?.data?.message.toUpperCase(),
          duration: 2000,
          action: {
            label: "Undo",
          },
        });
      }
    },
  });

  const onSubmit = async (data) => {
    const { password, confirmPassword, profile } = data;
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("profile", profile[0]);
    await signupMutation.mutateAsync(formData);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 text-white rounded-md shadow-xl shadow-black/10 bg-black/60 "
    >
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col px-10 py-1 mb-4 space-y-4 shadow-md bg-black/80 shadow-slate-500">
          <p className="text-3xl font-bold ">Signup</p>
          <p className="mb-5 font-semibold text-blue-300 cursor-pointer hover:underline">
            Already have an account? Login
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="fullname" type="text">
              Full Name
            </label>
            <Input
              className="text-white bg-transparent border border-yellow-500"
              placeholder="John Doe"
              {...register("fullname")}
            />
            {errors.fullname && (
              <p className="text-sm text-red-500">{errors.fullname.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="username" type="text">
              User Name
            </label>
            <Input
              className="text-white bg-transparent border border-yellow-500"
              placeholder="john_doe"
              {...register("username")}
            />
            {errors.username && (
              <p className="text-sm text-red-500">{errors.username.message}</p>
            )}
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold" htmlFor="email" type="email">
            Email
          </label>
          <Input
            className="text-white bg-transparent border border-yellow-500"
            placeholder="example@gmail.com"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold" htmlFor="profile">
            Profile Picture
          </label>
          <Input
            className="text-white bg-transparent border border-yellow-500 cursor-pointer"
            type="file"
            {...register("profile")}
          />
          {errors.profile && (
            <p className="text-sm text-red-500">{errors.profile.message}</p>
          )}
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <Input
              className="text-white bg-transparent border border-yellow-500"
              placeholder="Your Password"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <Input
              className="text-white bg-transparent border border-yellow-500"
              placeholder="Re-Type Password"
              type="password"
              {...register("confirmPassword")}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <Button type="submit" className="w-full">
          Sign up
        </Button>
      </div>
    </form>
  );
};

export default Signup;
