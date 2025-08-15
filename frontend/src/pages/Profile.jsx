import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData, setUserData } from '../redux/userSlice';
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.jpg';
import Nav from './Nav';

const Profile = () => {
  const { userName: paramUserName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mainImageStyle = "w-[130px] h-[130px] border-4 border-white rounded-full cursor-pointer overflow-hidden shadow-lg hover:scale-105 transition-transform";
  const overlapImageStyle = "w-[42px] h-[42px] rounded-full border-2 border-white overflow-hidden hover:scale-110 transition-transform";

  // Logout
  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  // Fetch profile
  const fetchProfile = async (username) => {
    if (!username) return;
    try {
      setLoading(true);
      setError(null);
      const res = await axios.get(`${serverUrl}/api/user/getProfile/${username}`, { withCredentials: true });
      dispatch(setProfileData(res.data));
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message);
      if (err.response?.status === 404) setError("User not found");
      else setError("Error fetching profile");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const usernameToFetch = paramUserName || userData?.userName;
    if (!usernameToFetch) return navigate("/login");
    fetchProfile(usernameToFetch);
  }, [paramUserName, userData?.userName, navigate]);

  if (loading) return <div className="flex justify-center items-center min-h-screen text-white">Loading profile...</div>;
  if (error) return <div className="flex justify-center items-center min-h-screen text-white">{error}</div>;

  const renderOverlapImages = (count = 3) => (
    Array.from({ length: count }).map((_, idx) => (
      <div key={idx} className={`${overlapImageStyle} ${idx > 0 ? '-ml-4' : ''}`}>
        <img src={profileData?.profileImage || dp} alt="User" className="w-full h-full object-cover" />
      </div>
    ))
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="w-full h-[60px] sm:h-[70px] flex justify-between items-center px-4 border-b border-gray-800">
        <IoMdArrowRoundBack className="w-6 h-6 cursor-pointer hover:text-gray-400 transition" onClick={() => navigate("/")} />
        <div className="font-bold text-lg sm:text-xl">{profileData?.userName || "Profile"}</div>
        <div className="font-semibold cursor-pointer text-red-400 hover:text-red-500 text-sm" onClick={handleLogOut}>Log Out</div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-6 px-4 justify-center">
        <div className={mainImageStyle}>
          <img src={profileData?.profileImage || dp} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="text-center sm:text-left max-w-xs">
          <div className="font-bold text-2xl">{profileData?.name || "Unknown"}</div>
          <div className="text-gray-400 text-sm">{profileData?.profession || "New User"}</div>
          <div className="text-gray-300 text-sm mt-1">{profileData?.bio || "No bio available"}</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-center items-center gap-12 px-4 pt-8 overflow-x-auto scrollbar-hide">
        <div className="text-center">
          <div className="text-3xl font-bold">{profileData?.posts?.length || 0}</div>
          <div className="text-gray-400 text-xs">Posts</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center">{renderOverlapImages()}</div>
          <div className="text-gray-400 text-xs mt-2">Followers</div>
        </div>
        <div className="text-center">
          <div className="flex justify-center">{renderOverlapImages()}</div>
          <div className="text-gray-400 text-xs mt-2">Following</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col xs:flex-row justify-center items-center gap-4 mt-6 px-4">
        {profileData?._id === userData?._id ? (
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-90 transition" onClick={() => navigate(`/editprofile/${profileData?.userName}`)}>Edit Profile</button>
        ) : (
          <>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:opacity-90 transition">Follow</button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition">Message</button>
          </>
        )}
      </div>

      {/* Bottom Content */}
      <div className="w-full min-h-[100vh] flex justify-center mt-5">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white text-black gap-5 pt-5">
          <Nav />
        </div>
      </div>

    </div>
  );
};

export default Profile;
