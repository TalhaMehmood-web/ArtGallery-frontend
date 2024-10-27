import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { postData } from "@/api/postData";
import { useMutation } from "react-query";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const forgetPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});

const ForgetPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const forgetPasswordMutation = useMutation(
    (data) => postData("user/forget-password", data),
    {
      onSuccess: ({ data }) => {
        if (data?.resetUrl?.trim()) {
          navigate(data?.resetUrl);
        }
      },
    }
  );

  const onSubmit = (data) => {
    toast.promise(forgetPasswordMutation.mutateAsync(data), {
      loading: "Sending Request...",
      success: "Email Verified, Redirecting to Reset Password",
      error: (err) =>
        err?.response?.data?.message || "Failed to verify your Email",
    });
  };

  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen text-white bg-black/90">
      <div className="container flex flex-col max-w-xl gap-4 p-4 mx-auto bg-black rounded-md">
        <div className="p-2 text-lg font-semibold text-center uppercase bg-yellow-500 rounded-md">
          <p>Forget Password</p>
        </div>
        <div className="text-sm text-slate-400">
          <ul className="flex flex-col gap-1 list-disc list-inside">
            <li>Enter your Email and click on the submit button.</li>
            <li>
              We will assign you a token and redirect you to Reset Password.
            </li>
          </ul>
        </div>
        <form
          className="flex flex-col space-y-3"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
        >
          <label className="font-semibold" htmlFor="email">
            Email
          </label>
          <Input
            autoComplete="email"
            id="email" // Ensure id attribute is set correctly
            name="email" // name attribute for the input
            className="text-white bg-transparent border border-yellow-500"
            placeholder="example@gmail.com"
            type="email"
            {...register("email")} // Register the input field
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
          <Button type="submit">
            {forgetPasswordMutation.isLoading && (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            )}
            {forgetPasswordMutation.isLoading ? "Submitting" : "Submit"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
