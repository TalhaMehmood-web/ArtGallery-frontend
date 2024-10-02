/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isWildCard, setIsWildCard] = useState(false);
  const [route, setRoute] = useState("/"); // Get route from localStorage
  const [selectedPicture, setSelectedPicture] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isWildCard,
        setIsWildCard,
        route,
        setRoute,
        selectedPicture,
        setSelectedPicture,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobalContext, GlobalContextProvider };
