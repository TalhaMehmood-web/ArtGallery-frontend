/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";
import axiosInstance from "@/utils/AxiosConfig";
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
    } catch (_) {
      return null;
    }
  });
  const [isWildCard, setIsWildCard] = useState(false);

  const [selectedPicture, setSelectedPicture] = useState(null);
  const [loadingUser, setLoading] = useState(true);
  const [openPictureDrawer, setOpenPictureDrawer] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get("user");

        setUser(response.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

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
        openPictureDrawer,
        setOpenPictureDrawer,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { useGlobalContext, GlobalContextProvider };
