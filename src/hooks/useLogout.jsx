import { useGlobalContext } from "@/context/UserContext";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";

const useLogout = () => {
  const { setUser } = useGlobalContext();

  const logoutMutation = useMutation(() => postData("user/logout", {}), {
    onSuccess: ({ data }) => {
      if (data) {
        setUser(null);
        sessionStorage.removeItem("user");
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
