import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';

const ForgotPassword = () => {
  const [step, setStep] = useState(3); // Change to 1 to start full flow
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [loading, setLoading] = useState({
    email: false,
    otp: false,
    newPassword: false,
  });

  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center px-4'>
      {/* Step 1: Email */}
      {step === 1 && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className='w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-[#1a1f23] p-8 flex flex-col gap-6 items-center'
        >
          <h2 className='text-[28px] font-bold text-center text-black'>Forgot Password</h2>
          <input
            type='email'
            placeholder='Enter Your Email'
            value={email}
            onFocus={() => setInputClicked({ ...inputClicked, email: true })}
            onBlur={() => setInputClicked({ ...inputClicked, email: false })}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border ${
              inputClicked.email ? 'border-blue-600' : 'border-black'
            } bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500 transition-all duration-200`}
            required
          />
          <button
            type='submit'
            disabled={loading.email}
            className={`bg-black text-white py-3 px-6 rounded-xl w-full flex justify-center items-center font-semibold transition-all duration-300 ${
              loading.email ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            {loading.email ? <ClipLoader size={20} color='white' /> : 'Send OTP'}
          </button>
        </form>
      )}

      {/* Step 2: OTP Verification */}
      {step === 2 && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className='w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-[#1a1f23] p-8 flex flex-col gap-6 items-center'
        >
          <h2 className='text-[28px] font-bold text-center text-black'>Enter OTP</h2>
          <input
            type='text'
            placeholder='Enter OTP'
            value={otp}
            onFocus={() => setInputClicked({ ...inputClicked, otp: true })}
            onBlur={() => setInputClicked({ ...inputClicked, otp: false })}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full border ${
              inputClicked.otp ? 'border-blue-600' : 'border-black'
            } bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500 transition-all duration-200`}
            required
          />
          <button
            type='submit'
            disabled={loading.otp}
            className={`bg-black text-white py-3 px-6 rounded-xl w-full flex justify-center items-center font-semibold transition-all duration-300 ${
              loading.otp ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            {loading.otp ? <ClipLoader size={20} color='white' /> : 'Verify OTP'}
          </button>
        </form>
      )}

      {/* Step 3: Reset Password */}
      {step === 3 && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className='w-full max-w-[500px] bg-white rounded-2xl shadow-2xl border border-[#1a1f23] p-8 flex flex-col gap-6 items-center'
        >
          <h2 className='text-[28px] font-bold text-center text-black'>Reset Password</h2>

          <input
            type='password'
            placeholder='New Password'
            value={newPassword}
            onFocus={() => setInputClicked({ ...inputClicked, newPassword: true })}
            onBlur={() => setInputClicked({ ...inputClicked, newPassword: false })}
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full border ${
              inputClicked.newPassword ? 'border-blue-600' : 'border-black'
            } bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500 transition-all duration-200`}
            required
          />

          <input
            type='password'
            placeholder='Confirm New Password'
            value={confirmPassword}
            onFocus={() => setInputClicked({ ...inputClicked, confirmPassword: true })}
            onBlur={() => setInputClicked({ ...inputClicked, confirmPassword: false })}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border ${
              inputClicked.confirmPassword ? 'border-blue-600' : 'border-black'
            } bg-white text-black rounded-xl p-3 outline-none placeholder:text-gray-500 transition-all duration-200`}
            required
          />

          <button
            type='submit'
            disabled={loading.newPassword}
            className={`bg-black text-white py-3 px-6 rounded-xl w-full flex justify-center items-center font-semibold transition-all duration-300 ${
              loading.newPassword ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-800'
            }`}
          >
            {loading.newPassword ? <ClipLoader size={20} color='white' /> : 'Reset Password'}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
