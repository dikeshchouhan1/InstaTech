import React from 'react'
import { FaRegHeart } from 'react-icons/fa'
import logo from '../assets/logo.png'
import StoryDp from './StoryDp'
import Nav from '../pages/Nav'

const Feed = () => {
  return (
    <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>

      {/* Mobile top bar */}
      <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden'>
        <img src={logo} alt="" className='w-[80px]' />
        <FaRegHeart className='text-white w-[25px] h-[25px] cursor-pointer' />
      </div>
{/* Story Section (responsive) */}
<div className='flex w-full overflow-auto gap-[10px] items-center px-[20px] lg:p-[20px]'>
  <StoryDp userName={"fjsfdfhsdhfsfhdshfjh"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
  <StoryDp userName={"fjsf"} />
</div>



<div className='w-full min-h-[100vh] flex flex-col  items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]' >
<Nav/>
</div>
    </div>
  )
}

export default Feed
