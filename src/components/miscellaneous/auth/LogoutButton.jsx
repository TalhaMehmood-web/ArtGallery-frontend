/* eslint-disable react/prop-types */
import { Button } from "@/components/ui/button";
import Loading from "@/components/miscellaneous/loading/Loading";
import useLogout from "@/hooks/useLogout"; // Import the reusable logout hook

const LogoutButton = ({ logoutOutText = false }) => {
  const { handleLogout, isLoading } = useLogout(); // Use the custom hook

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
        <div className="absolute top-0 right-0 w-full min-h-screen">
          <Loading />
        </div>
      )}
    </>
  );
};

export default LogoutButton;
