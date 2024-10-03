/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

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
