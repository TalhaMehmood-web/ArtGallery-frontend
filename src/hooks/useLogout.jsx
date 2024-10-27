import { useGlobalContext } from "@/context/UserContext";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
const useLogout = () => {
  const { setUser } = useGlobalContext();
  const navigate = useNavigate();
  const logoutMutation = useMutation(() => postData("user/logout", {}), {
    onSuccess: ({ data }) => {
      if (data) {
        localStorage.setItem(
          "loggedOut",
          JSON.stringify({ isLoggedOut: true })
        );
        setUser(null);
        sessionStorage.removeItem("user");
        navigate("/");
      }
    },
  });

  const handleLogout = () => {
    toast.promise(logoutMutation.mutateAsync(), {
      loading: "Logging you out ...",
      success: ({ data }) => data?.message || "Logged out",
      error: (err) => err?.response?.data?.message || "Failed to log you out",
    });
  };

  const { isLoading } = logoutMutation;

  return { handleLogout, isLoading };
};

export default useLogout;
