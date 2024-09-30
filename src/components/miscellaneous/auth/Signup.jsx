import { useMutation } from "react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { postData } from "@/api/postData";
import { toast } from "sonner";
import { useGlobalContext } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const { setUser, user, setRoute } = useGlobalContext();

  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, register } = form;

  const signupMutation = useMutation((data) => postData("user/signup", data), {
    onSuccess: ({ data }) => {
      setUser(data);
      if (user?.isAdmin) {
        navigate("/admin");
        setRoute("/admin");
      } else {
        navigate("/client");
        setRoute("/admin");
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
    await signupMutation.mutateAsync(data);
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 text-white rounded-md shadow-xl shadow-black/10 bg-black/60 "
    >
      <div className="flex flex-col space-y-2">
        <div className="flex flex-col px-10 py-1 mb-4 space-y-4 shadow-md bg-black/80 shadow-slate-500">
          <p className="text-3xl font-bold ">Signup</p>
          <p className="mb-5 font-semibold text-blue-300 cursor-pointer hover:underline">
            Already have an account? Login
          </p>
        </div>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold" htmlFor="fullname" type="text">
            Full Name
          </label>
          <Input
            className="text-white bg-transparent border border-yellow-500"
            placeholder="John Doe"
            {...register("fullname")}
          />
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
        </div>
        <div className="flex flex-col space-y-1">
          <label className="font-semibold" htmlFor="email" type="email">
            Email
          </label>
          <Input
            className="text-white bg-transparent border border-yellow-500"
            placeholder="exapmle@gmai.com"
            {...register("email")}
          />
        </div>
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
