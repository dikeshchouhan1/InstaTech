import React from 'react'
import LeftHome from '../componets/LeftHome'
import RightHome from '../componets/RightHome'
import Feed from '../componets/Feed'

const Home = () => {
  return (
    <div className='w-full flex justify-center items-center '>
        <LeftHome/>
        <Feed/>
        <RightHome/>
    </div>
  )
}

export default Home