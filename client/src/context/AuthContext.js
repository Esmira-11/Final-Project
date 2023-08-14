// import { createContext, useState, useEffect } from "react";
// // import { CircularIndeterminate } from "../components/CircularIndeterminate";
// import axios from "axios";

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
  
//   const [user, setUser] = useState(null);
//   const [loggedIn, setLoggedIn] = useState(false);
//   const [loading, setLoading] = useState(true);
 
//   const token = JSON.parse(localStorage.getItem("authToken"));
  
//    useEffect(() => {
//         setLoading(true)
//         getData()
//     }, [token]);
//    const getData=()=>{
//     axios
//     .post("http://localhost:5000/api/auth/token", {
//       token,
//     })
//     .then((response) => {
//       setLoggedIn(true);
//       setUser(response.data.user)
//       setLoading(false)
//     })
//     .catch(() => {
//       setLoggedIn(false);
//       setUser(null)
//       if (localStorage.getItem("authToken")!=null) {
//         localStorage.removeItem("authToken");
//       }
//       setLoading(false)
//     });
//   }
//   const handlerLogInOut = (status, redirect, token = null) => {
//     setLoggedIn(status);
//     if (status) {
//       localStorage.setItem("authToken", JSON.stringify(token));
//     } else {
//       localStorage.removeItem("authToken");
//     }
//     redirect();
//   };

//   const values = {
//     handlerLogInOut,
//     loggedIn,
//     user,
//     loading
//   };
//   if (loading) {
//     return(
//     //   <CircularIndeterminate/>
//     <>
//     </>
//     )
//   }

//   return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
// };