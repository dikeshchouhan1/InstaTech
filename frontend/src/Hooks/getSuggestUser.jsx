import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { setSuggestedUsers } from '../redux/userSlice';

const useSuggestedUser = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const suggestedUsers = useSelector((state) => state.user.suggestedUsers);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await axios.get(`${serverUrl}/api/user/suggested`, {
          withCredentials: true,
        });
        console.log("Suggested API data:", result.data);
        dispatch(setSuggestedUsers(result.data));
      } catch (err) {
        setError(err.response?.data || err.message);
        console.error("Error fetching suggested users:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchSuggestedUsers();
    }
  }, [userData, dispatch]);

  return { suggestedUsers, loading, error };
};

export default useSuggestedUser;
