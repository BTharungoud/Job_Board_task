import { useToast } from "@chakra-ui/react";
import React, { createContext, useContext, useEffect, useState } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [usermail, setUsermail] = useState('');
  const [userprofiledata, setUserProfileData] = useState([])
  const toast = useToast();
  const values = {
    isLogin,
    setIsLogin,
    usermail,
    setUsermail,
    userprofiledata
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const profilefetch = await fetch(`https://job-board-server-eo10.onrender.com/?${usermail}`);
        const profiledata = await profilefetch.json();
        setUserProfileData(profiledata);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
  
    fetchData(); // Immediately invoke the async function
  
  }, [usermail]);
  
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
