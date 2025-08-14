import React from 'react'
import { useSelector } from 'react-redux'
import dp from '../assets/dp.jpg'
import { useNavigate } from 'react-router-dom'

function OtherUser({ user }) {
  const { userData } = useSelector((state) => state.user);
    const navigator = useNavigate();
  return (
    <div className='w-full h-[80px] flex items-center justify-between border-b-2 border-gray-800 px-[20px]'>
      
      {/* User Info */}
      <div className='flex items-center gap-[10px]'>
        <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigator(`/profile/${user.userName }`)}>
          <img
            src={user.profileImage || dp}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className='text-[18px] text-white font-semibold'>{user.userName}</div>
          <div className='text-[15px] text-gray-400 font-semibold'>{user.name}</div>
        </div>
      </div>

      {/* Follow Button (always right side) */}
      <button className='px-[10px] w-[100px] py-[5px] h-[40px] bg-white rounded-2xl text-black font-semibold'>
        Follow
      </button>
    </div>
  )
}

export default OtherUser
