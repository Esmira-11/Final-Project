import { useState,useEffect } from "react";
import {useAuth} from '../context/auth';
import { Outlet } from "react-router-dom";
import axios from "axios";
// import Spinner from "../components/Spinner";

export default function PrivateRoute() {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
  
    useEffect(() => {
      const authCheck = async () => {
        const res = await axios.get("http://localhost:5000/api/auth/user-auth");
        console.log(res)
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      };
      if (auth?.token) authCheck();
    }, [auth?.token]);
  
    return ok ? <><Outlet /></>  : <><h1>Loading...</h1></>;
  }