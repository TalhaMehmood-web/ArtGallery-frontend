/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { fetchData } from "@/api/fetchData";
import { useQuery } from "react-query";
import { useEffect } from "react";
const GlobalContext = createContext();

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = sessionStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Error parsing sessionStorage user:", error);
      return null;
    }
  });
  const logoutSession = JSON.parse(localStorage.getItem("loggedOut"));
  const { data, isLoading: loadingUser } = useQuery(
    "user",
    () => fetchData("user"),
    {
      enabled: user === null && (!logoutSession?.isLoggedOut || true),
    }
  );
  useEffect(() => {
    if (data) {
      setUser(data);
      sessionStorage.setItem("user", JSON.stringify(data));
    }
  }, [data]);
  const [isWildCard, setIsWildCard] = useState(false);

  const [selectedPicture, setSelectedPicture] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isWildCard,
        setIsWildCard,
        loadingUser,
        selectedPicture,
        setSelectedPicture,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobalContext, GlobalContextProvider };
