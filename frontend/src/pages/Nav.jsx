import React from 'react'
import { MdHomeFilled } from "react-icons/md";
import { IoMdSearch } from "react-icons/io";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import dp from '../assets/dp.jpg'
const Nav = () => {
  return (
    <div  className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
        <div><MdHomeFilled  className='text-white w-[25px] h-[25px]'/></div>
        <div><IoMdSearch  className='text-white w-[25px] h-[25px]'/></div>
        <div><FaPlusSquare  className='text-white w-[25px] h-[25px]' /></div>
        <div><MdOutlineOndemandVideo  className='text-white w-[25px] h-[28px]'/></div>
        
                 <div className='w-[40px] h-[40px] border-2 border-black rounded-full cursor-pointer overflow-hidden'>
                      <img
                        src={ dp}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                   

        
    </div>
  )
}

export default Nav