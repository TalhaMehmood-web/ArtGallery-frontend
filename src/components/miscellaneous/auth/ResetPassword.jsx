import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import PasswordEye from "./PasswordEye";
import { useForm } from "react-hook-form";
import { postData } from "@/api/postData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useMutation } from "react-query";
import { Loader2 } from "lucide-react";
// Define Zod schema for validation
const resetPasswordSchema = z
  .object({
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
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"], // Set the error on confirmPassword field
  });
const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = form;
  const resetPasswordMutation = useMutation(
    (data) => postData(`user/reset-password/${token}`, data),
    {
      onSuccess: ({ data }) => {
        if (data?.message) {
          navigate("/auth");
        }
      },
    }
  );
  const onSubmit = (data) => {
    toast.promise(resetPasswordMutation.mutateAsync(data), {
      loading: "Sending Request...",
      success: "Token  Verified , Redirecting to Login",
      error: (err) =>
        err?.response?.data?.message || "Failed to verify your Token",
    });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-white bg-black/90 ">
      <div className="container flex flex-col max-w-xl gap-4 p-4 mx-auto bg-black rounded-md">
        <div className="p-2 text-lg font-semibold text-center uppercase bg-yellow-500 rounded-md">
          <p>Reset Password</p>
        </div>
        <div className="text-sm text-slate-400">
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Enter your New Password</li>
            <li>Confirm your new password</li>
            <li>Click on submit when you are done.</li>
          </ul>
        </div>
        <form
          className="flex flex-col space-y-5"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <PasswordEye
            label={"New Password"}
            id={"password"}
            placeholder={"New password"}
            errors={errors?.password}
            register={register}
            className="space-y-3"
          />
          <PasswordEye
            label={"Confirm New Password"}
            id={"confirmPassword"}
            placeholder={"Retype-Password"}
            errors={errors?.confirmPassword}
            register={register}
            className="space-y-3"
          />
          <Button type="submit">
            {resetPasswordMutation?.isLoading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {resetPasswordMutation?.isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
