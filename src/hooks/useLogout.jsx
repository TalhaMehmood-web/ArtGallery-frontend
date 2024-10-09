import { useGlobalContext } from "@/context/UserContext";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { useNavigate } from "react-router-dom";

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

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  const { isLoading } = logoutMutation;

  return { handleLogout, isLoading };
};

export default useLogout;
