import React from 'react';
import { FaRegHeart } from "react-icons/fa";
import dp from '../assets/dp.jpg';
import logo from '../assets/logo.png';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
import OtherUser from './OtherUser';
const LeftHome = () => {
    const dispatch = useDispatch();
  const { userData,suggestedUsers } = useSelector((state) => state.user);
  const handleLogOut=async ()=>{
    try{
      const result = await axios.get(`${serverUrl}/api/auth/signout`, {withCredentials: true});
      dispatch(setUserData(null)); // Clear user data in Redux store
    }
    catch(err){
        console.error("Logout error:", err.response?.data || err.message);
    }

}

  return (
    <div className='w-[25%] hidden lg:block  min-h-[100vh] bg-black border-r-2 border-gray-900'>

      {/* Top Section */}
      <div className='flex items-center justify-between p-[20px]'>
        {/* Logo */}
        <img src={logo} alt="logo" className='w-[80px] ' />
        
        {/* Heart Icon */}
        <FaRegHeart className='text-white w-[25px] h-[25px] cursor-pointer' />
      </div>

      {/* Bottom Section - Profile */}
      <div className='flex items-center  w-full justify-between gap-[10px] p-[20px] border-b-2 border-gray-900 py-[10px] '>
        <div className='flex items-center gap-[10px] px-[20px]'>

        <div className='w-[70px] h-[70px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
          <img
            src={userData?.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
            <div className='text-[18px] text-white font-semibold'>{userData.userName}</div>
            <div className='text-[15px] text-gray-400 font-semibold'>{userData.name}</div>
        </div>
      </div>
      <div className='text-blue-500 font-semibold cursor-pointer' onClick={handleLogOut}>Log Out</div>
        </div>


        <div className='w-full flex flex-col gap-[20px] p-[20px]'>
            <h1 className='text-[white] text-[19px]'>Suggested Users</h1>
             {suggestedUsers && suggestedUsers.slice(0,4).map((user,index)=>(
                <OtherUser key={index} user={user} />
             ))

             }
        </div>

    </div>
  );
};

export default LeftHome;
