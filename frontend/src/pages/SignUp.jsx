import React, { useState } from 'react';
import axios from 'axios';
import { serverUrl } from '../App';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, userName, email, password },
        { withCredentials: true }
      );

      console.log("Signup successful:", result.data);

      // Reset form fields
      setName('');
      setUserName('');
      setEmail('');
      setPassword('');

      navigate('/signin'); // Redirect after successful signup
    } catch (err) {
      const serverError = err.response?.data;
      setError(serverError?.errors || serverError?.message || "Something went wrong.");
      console.error("Signup error:", serverError || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-b from-black to-gray-900 flex items-center justify-center p-4'>
      <div className='w-full max-w-[600px] bg-white rounded-2xl flex flex-col lg:flex-row overflow-hidden border-2 border-[#1a1f23] shadow-xl'>
        <form
          onSubmit={handleSubmit}
          className='w-full lg:w-[50%] flex flex-col items-center p-6 gap-6 bg-white'
        >
          <div className='text-xl font-semibold mt-4 flex gap-2 items-center'>
            <span>Sign Up to</span>
            <img src='' alt='Logo' className='w-[60px]' />
          </div>

          {/* Error Message Section */}
          {error && (
            <div className="w-full bg-red-50 border border-red-400 text-red-700 rounded-xl p-3">
              <ul className="list-disc list-inside space-y-1">
                {Array.isArray(error) ? (
                  error.map((errMsg, idx) => (
                    <li key={idx} className="text-sm">{errMsg}</li>
                  ))
                ) : (
                  <li className="text-sm">{error}</li>
                )}
              </ul>
            </div>
          )}

          <input
            type='text'
            name='name'
            placeholder='Enter Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full border border-black bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500'
            required
          />

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
            type='email'
            name='email'
            placeholder='Enter Your Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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

          <button
            type='submit'
            disabled={loading}
            className={`bg-black text-white py-3 px-6 rounded-xl w-full flex justify-center items-center font-semibold transition-all duration-300 ${
              loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            {loading ? <ClipLoader size={20} color='white' /> : "Sign Up"}
          </button>

          <p className='text-sm'>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/signin')}
              className='border-b-2 border-black cursor-pointer'
            >
              Sign In
            </span>
          </p>
        </form>

        <div className='hidden lg:flex w-[50%] bg-black text-white flex-col justify-center items-center p-6'>
          <h2 className='text-2xl font-bold'>Welcome!</h2>
          <p className='text-center'>Join us and enjoy the experience.</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
