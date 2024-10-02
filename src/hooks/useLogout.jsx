import { useGlobalContext } from "@/context/UserContext";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";

const useLogout = () => {
  const { setUser } = useGlobalContext();

  const logoutMutation = useMutation(() => postData("user/logout", null), {
    onSuccess: ({ data }) => {
      if (data) {
        setUser(null);
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
