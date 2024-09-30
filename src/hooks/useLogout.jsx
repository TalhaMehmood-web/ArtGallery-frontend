import { useGlobalContext } from "@/context/UserContext";
import { useMutation } from "react-query";
import { postData } from "@/api/postData";
import { routeStorage } from "@/utils/routeStorage";

const useLogout = () => {
  const { setUser, setRoute } = useGlobalContext();

  const logoutMutation = useMutation(() => postData("user/logout", null), {
    onSuccess: ({ data }) => {
      if (data) {
        setUser(null); // Clear the user from global context
        setRoute("/"); // Reset the route to home
        routeStorage.saveRoute("/"); // Save the route in localStorage
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
