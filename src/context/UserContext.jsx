/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import { routeStorage } from "@/utils/routeStorage"; // Import routeStorage

const GlobalContext = createContext();

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isWildCard, setIsWildCard] = useState(false);
  const [route, setRoute] = useState(routeStorage.getRoute() || "/"); // Get route from localStorage

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isWildCard,
        setIsWildCard,
        route,
        setRoute,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobalContext, GlobalContextProvider };
