/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const GlobalContext = createContext();

const useGlobalContext = () => {
  return useContext(GlobalContext);
};

const GlobalContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from session storage if available
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [isWildCard, setIsWildCard] = useState(false);

  const [selectedPicture, setSelectedPicture] = useState(null);
  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isWildCard,
        setIsWildCard,

        selectedPicture,
        setSelectedPicture,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobalContext, GlobalContextProvider };
