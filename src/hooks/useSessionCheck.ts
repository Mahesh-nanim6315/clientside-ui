import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearUser, setUser } from "../store/userSlice";

export const useSessionCheck = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/is-auth", {
          withCredentials: true,
        });

        if (res.data?.authenticated) {
          dispatch(setUser(res.data.user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      }
    };

    checkSession();
  }, [dispatch]);
};
