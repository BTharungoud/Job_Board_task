import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [usermail, setUsermail] = useState("");
  const [userprofiledata, setUserProfileData] = useState([]);
  const [isAuthDrawerOpen, setIsAuthDrawerOpen] = useState(false);
  const toast = useToast();

  useEffect(() => {
    const mail = sessionStorage.email;
    if (mail != usermail) setUsermail(mail);
    const fetchData = async () => {
      try {
        console.log(usermail);
        const profilefetch = await fetch(
          `https://job-board-server-eo10.onrender.com/profile?email=${usermail}`
        );
        const profiledata = await profilefetch.json();
        setUserProfileData(profiledata);
        console.log(profiledata);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchData();
  }, [usermail]);

  const values = {
    isLogin,
    setIsLogin,
    usermail,
    setUsermail,
    userprofiledata,
    isAuthDrawerOpen,
    setIsAuthDrawerOpen,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
