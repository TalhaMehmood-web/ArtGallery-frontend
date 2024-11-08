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
import Loading from "../loading/Loading";
import PasswordEye from "./PasswordEye";

// Zod schema for form validation
const signupSchema = z
  .object({
    fullname: z.string().min(1, "Full Name is required"),
    username: z.string().min(1, "Username is required"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.string().min(1,"Phone number is required"),
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
      phone:"",
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
      localStorage.setItem("loggedOut", JSON.stringify({ isLoggedOut: false }));
      if (data?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/");
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
    formData.append("phone", data.phone);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("profile", profile[0]);
    await signupMutation.mutateAsync(formData);
  };

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="p-4 text-white rounded-md shadow-xl shadow-black/10 bg-black/60 "
      >
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col py-1 mb-4 space-y-4 bg-black/20">
            <p className="text-3xl font-bold ">Signup</p>
   
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="fullname">
                Full Name
              </label>
              <Input
                id="fullname"
                name="fullname"
                type="text"
                className="text-white bg-transparent border border-yellow-500"
                placeholder="John Doe"
                {...register("fullname")}
                autoComplete="name" // Add autoComplete
              />
              {errors.fullname && (
                <p className="text-sm text-red-500">
                  {errors.fullname.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1">
              <label className="font-semibold" htmlFor="username">
                User Name
              </label>
              <Input
                id="username"
                name="username"
                type="text"
                className="text-white bg-transparent border border-yellow-500"
                placeholder="john_doe"
                {...register("username")}
                autoComplete="username" // Add autoComplete
              />
              {errors.username && (
                <p className="text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="email">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              className="text-white bg-transparent border border-yellow-500"
              placeholder="example@gmail.com"
              {...register("email")}
              autoComplete="email" // Add autoComplete
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="phone">
            Phone Number
            </label>
            <Input
              id="phone"
              name="phone"
              type="phone"
              className="text-white bg-transparent border border-yellow-500"
              placeholder="0-000-000-000"
              {...register("phone")}
              autoComplete="phone" // Add autoComplete
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="profile">
              Profile Picture
            </label>
            <Input
              id="profile"
              name="profile"
              className="text-white bg-transparent border border-yellow-500 cursor-pointer"
              type="file"
              accept="image/*"
              {...register("profile")}

              // Profile picture doesn't need autoComplete
            />
            {errors.profile && (
              <p className="text-sm text-red-500">{errors.profile.message}</p>
            )}
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            <PasswordEye
              label={"Password"}
              id={"password"}
              placeholder={"Your password"}
              errors={errors?.password}
              register={register}
            />
            <PasswordEye
              label={"Confirm Password"}
              id={"confirmPassword"}
              placeholder={"Retype-Password"}
              errors={errors?.confirmPassword}
              register={register}
            />
          </div>
        </div>
        <div className="mt-6">
          <Button type="submit" className="w-full">
            {signupMutation.isLoading ? "Processing " : "Sign Up"}
          </Button>
        </div>
      </form>
      {signupMutation?.isLoading && (
        <div className="absolute top-0 right-0 w-full min-h-screen">
          <Loading />
        </div>
      )}
    </>
  );
};

export default Signup;
