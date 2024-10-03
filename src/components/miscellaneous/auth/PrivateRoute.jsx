/* eslint-disable react/prop-types */
import { useGlobalContext } from "@/context/UserContext";
import { Navigate } from "react-router-dom";
const PrivateRoute = ({ children }) => {
  const { user } = useGlobalContext();

  return user ? children : <Navigate to={"/"} />;
};
export default PrivateRoute;
