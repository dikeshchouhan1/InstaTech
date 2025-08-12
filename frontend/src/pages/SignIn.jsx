import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
const SignIn = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
 const despatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signin`,
        { userName, password },
        { withCredentials: true }
      );

      despatch(setUserData(result.data));
      setUserName('');
      setPassword('');
      // navigate('/dashboard'); // or any protected route
    } catch (err) {
      console.error("Signin error:", err.response?.data || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-[600px] bg-white rounded-2xl flex flex-col lg:flex-row overflow-hidden border-2 border-[#1a1f23] shadow-xl'>
        <form
          onSubmit={handleSubmit}
          className='w-full lg:w-[50%] flex flex-col items-center p-6 gap-4 bg-white justify-center'
        >
          <div className='text-xl font-semibold mt-4 flex gap-2 items-center'>
            <span>Sign In to</span>
            <img src='' alt='Logo' className='w-[60px]' />
          </div>

          <input
            type='text'
            name='userName'
            placeholder='Enter Your Username'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className='w-full border border-black bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500'
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Enter Your Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full border border-black bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500'
            required
          />

          {/* Forgot Password Link */}
          <div className='w-full text-right'>
            <span
              onClick={() => navigate('/forgot-password')}
              className='text-sm text-black-600 hover:underline cursor-pointer'
            >
              Forgot Password?
            </span>
          </div>

          <button
            type='submit'
            disabled={loading}
            className={`bg-black text-white py-3 px-6 rounded-xl w-full flex justify-center items-center font-semibold transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Sign In"}
          </button>

          <p className='text-sm'>
            Don’t have an account?{' '}
            <span
              onClick={() => navigate('/signup')}
              className='border-b-2 border-black cursor-pointer'
            >
              Sign Up
            </span>
          </p>
        </form>

        <div className='hidden lg:flex w-[50%] bg-black text-white flex-col justify-center items-center p-6'>
          <h2 className='text-2xl font-bold'>Welcome Back!</h2>
          <p className='text-center'>Sign in to continue your journey.</p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
