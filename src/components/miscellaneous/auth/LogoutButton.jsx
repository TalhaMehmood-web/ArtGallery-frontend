/* eslint-disable react/prop-types */
import { postData } from "@/api/postData";
import { Button } from "@/components/ui/button";
import { useGlobalContext } from "@/context/UserContext";
import { useMutation } from "react-query";
import Loading from "../loading/Loading";
import { routeStorage } from "@/utils/routeStorage";

const LogoutButton = ({ logoutOutText = false }) => {
  const { setUser, setRoute } = useGlobalContext();
  const logoutMutation = useMutation(() => postData("user/logout", null), {
    onSuccess: ({ data }) => {
      if (data) {
        setUser(null);
        setRoute("/");
        routeStorage.saveRoute("/");
      }
    },
  });

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };
  const { isLoading } = logoutMutation;
  return (
    <>
      <div>
        {logoutOutText ? (
          <p
            onClick={handleLogout}
            className="text-xl italic font-semibold text-white transition-all duration-200 cursor-pointer hover:text-yellow-300"
          >
            Logout
          </p>
        ) : (
          <Button onClick={handleLogout}>Logout</Button>
        )}
      </div>
      {isLoading && (
        <div className="absolute top-0 right-0 w-full min-h-screen ">
          <Loading />
        </div>
      )}
    </>
  );
};

export default LogoutButton;
