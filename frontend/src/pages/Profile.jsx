import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch, useSelector } from 'react-redux';
import { setProfileData, setUserData } from '../redux/userSlice';
import { IoMdArrowRoundBack } from "react-icons/io";
import dp from '../assets/dp.jpg';
import Nav from './Nav';

const Profile = () => {
  const { userName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profileData, userData } = useSelector((state) => state.user);

  const mainImageStyle =
    "w-[80px] h-[80px] xs:w-[90px] xs:h-[90px] sm:w-[110px] sm:h-[110px] md:w-[130px] md:h-[130px] lg:w-[140px] lg:h-[140px] border-4 border-white rounded-full cursor-pointer overflow-hidden flex-shrink-0 shadow-lg transition-transform duration-300 hover:scale-105";

  const overlapImageStyle =
    "w-[36px] h-[36px] xs:w-[42px] xs:h-[42px] sm:w-[50px] sm:h-[50px] rounded-full border-2 border-white overflow-hidden transition-transform duration-300 hover:scale-110";

  const handleLogOut = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/signout`, { withCredentials: true });
      dispatch(setUserData(null));
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.response?.data || err.message);
    }
  };

  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${serverUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      );
      dispatch(setProfileData(result.data));
    } catch (err) {
      console.error('Error fetching profile:', err.response?.data || err.message);
    }
  };

  useEffect(() => {
    handleProfile();
  }, [userName]);

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      
      {/* Header */}
      <div className="w-full h-[60px] sm:h-[70px] flex justify-between items-center px-4 border-b border-gray-800">
        <IoMdArrowRoundBack
          className="w-[24px] h-[24px] cursor-pointer hover:text-gray-400 transition"
          onClick={() => navigate("/")}
        />
        <div className="font-bold text-lg sm:text-xl">{profileData?.userName}</div>
        <div
          className="font-semibold cursor-pointer text-red-400 hover:text-red-500 text-sm"
          onClick={handleLogOut}
        >
          Log Out
        </div>
      </div>

      {/* Profile Info */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 lg:gap-12 pt-6 px-4 justify-center">
        <div className={mainImageStyle}>
          <img
            src={profileData?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center sm:text-left max-w-xs">
          <div className="font-bold text-xl sm:text-2xl">{profileData?.name}</div>
          <div className="text-gray-400 text-sm">{profileData?.profession || "New User"}</div>
          <div className="text-gray-300 text-sm mt-1">{profileData?.bio}</div>
        </div>
      </div>

      {/* Stats - Centered */}
      <div className="flex flex-nowrap justify-center items-center gap-8 sm:gap-12 px-4 pt-8 overflow-x-auto scrollbar-hide">
        
        {/* Posts */}
        <div className="text-center flex-shrink-0">
          <div className="text-2xl sm:text-3xl font-bold">{profileData?.posts?.length || 0}</div>
          <div className="text-gray-400 text-xs">Posts</div>
        </div>

        {/* Followers */}
        <div className="text-center flex-shrink-0">
          <div className="flex justify-center">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className={`${overlapImageStyle} ${idx > 0 ? '-ml-4' : ''}`}
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="Follower"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-gray-400 text-xs mt-2">Followers</div>
        </div>

        {/* Following */}
        <div className="text-center flex-shrink-0">
          <div className="flex justify-center">
            {[1, 2, 3].map((_, idx) => (
              <div
                key={idx}
                className={`${overlapImageStyle} ${idx > 0 ? '-ml-4' : ''}`}
              >
                <img
                  src={profileData?.profileImage || dp}
                  alt="Following"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          <div className="text-gray-400 text-xs mt-2">Following</div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full flex flex-col xs:flex-row justify-center items-center gap-3 xs:gap-5 mt-6 px-4">
        {profileData?._id === userData?._id && (
          <button className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold shadow-lg hover:opacity-90 transition">
            Edit Profile
          </button>
        )}
        {profileData?._id !== userData?._id && (
          <>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold shadow-lg hover:opacity-90 transition">
              Follow
            </button>
            <button className="px-6 py-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold shadow-lg hover:opacity-90 transition">
              Message
            </button>
          </>
        )}
      </div>

      {/* Bottom Content */}
      <div className="w-full min-h-[100vh] flex justify-center mt-5">
        <div className="w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white text-black relative gap-[20px] pt-[20px]">
          <Nav />
        </div>
      </div>
    </div>
  );
};

export default Profile;
