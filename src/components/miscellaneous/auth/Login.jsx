/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { useGlobalContext } from "@/context/UserContext";
import Loading from "../loading/Loading";

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useGlobalContext();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { handleSubmit, register } = form;

  const loginMutation = useMutation((data) => postData("user/login", data), {
    onSuccess: ({ data }) => {
      setUser(data);

      if (data?.isAdmin) {
        navigate("/admin");
      } else {
        navigate("/client");
      }
      toast.success("Login Successfully", {
        description: `Logged in as ${data?.fullname}`,
      });
    },
    onError: (error) => {
      if (error?.response.data.message) {
        toast.error("Login Error", {
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
    await loginMutation.mutateAsync(data);
  };
  const { isLoading, isError } = loginMutation;

  return (
    <>
      <div className="flex flex-col p-4 space-y-2 text-white rounded-md bg-black/60 ">
        <div className="flex flex-col px-10 py-1 mb-5 space-y-4 shadow-md shadow-slate-500 bg-black/80">
          <p className="text-3xl font-bold ">Login</p>
          <p className="mb-5 font-semibold text-blue-300 cursor-pointer hover:underline">
            Don't have an account? Signup
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col flex-1 space-y-5"
        >
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="email" type="email">
              Email
            </label>
            <Input
              className="text-white bg-transparent border border-yellow-500"
              placeholder="exapmle@gmai.com"
              type="email"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col space-y-1">
            <label className="font-semibold" htmlFor="password">
              Password
            </label>
            <Input
              className="text-white bg-transparent border border-yellow-500"
              placeholder="Your Password - min 6 characters"
              type="password"
              {...register("password")}
            />
          </div>

          <div className="w-full my-3">
            <Button className="w-full">
              {isLoading ? "Processing..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
      {isLoading && !isError && <Loading />}
    </>
  );
};

export default Login;
