import { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  const fetchUser = useCallback(async () => {
    try {
      const { data } = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      dispatch(setUserData(data));
    } catch (err) {
      console.error(
        "Error fetching current user:",
        err.response?.data || err.message
      );
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
};

export default useGetCurrentUser;
