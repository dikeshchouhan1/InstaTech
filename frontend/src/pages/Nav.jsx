import React from 'react';
import { MdHomeFilled } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import dp from '../assets/dp.jpg';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';

const Nav = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  // Hide Nav if user data is not yet loaded
  if (!userData) return null;

  const handleProfileClick = () => {
    navigate(`/profile/${userData.userName}`);
  };

  return (
    <div className="w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]">
      
      <MdHomeFilled
        className="text-white w-[25px] h-[25px] cursor-pointer"
        onClick={() => navigate("/")}
      />
      <IoMdSearch className="text-white w-[25px] h-[25px] cursor-pointer" />
      <FaPlusSquare className="text-white w-[25px] h-[25px] cursor-pointer" />
      <MdOutlineOndemandVideo className="text-white w-[25px] h-[28px] cursor-pointer" />
      
      <div
        className="w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden"
        onClick={handleProfileClick}
      >
        <img
          src={userData?.profileImage || dp}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Nav;
