import { useState,useEffect } from "react";
import {useAuth} from '../context/auth';
import { Outlet } from "react-router-dom";
import axios from "axios";
import Require from "../components/Require/Require";
// import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
// import Spinner from "../components/Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("https://mern-project-server-oonq.onrender.com/api/auth/user-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <><Outlet /></>  : <><Require/></>;
  }