import axios from "axios";
import React, { useState } from "react";
import { ClipLoader } from "react-spinners";
import { serverUrl } from "../App";

const ForgotPassword = () => {
  const [step, setStep] = useState(1);
  const [inputClicked, setInputClicked] = useState({});
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleStep1 = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(2);
    } catch (err) {
      const serverError = err.response?.data;
      setError(serverError?.errors || serverError?.message || "Something went wrong.");
      console.log(serverError || err.message);
    }
    setLoading(false);
  };

  const handleStep2 = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email, otp },
        { withCredentials: true }
      );
      console.log(result.data);
      setStep(3);
    } catch (err) {
      const serverError = err.response?.data;
      setError(serverError?.errors || serverError?.message || "Invalid OTP");
      console.log(serverError || err.message);
    }
    setLoading(false);
  };

  const handleStep3 = async () => {
    setError("");
    if (!newPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        { email, password: newPassword },
        { withCredentials: true }
      );
      console.log(result.data);
    } catch (err) {
      const serverError = err.response?.data;
      setError(serverError?.errors || serverError?.message || "Something went wrong.");
      console.log(serverError || err.message);
    } finally {
      setLoading(false);
    }
  };

  // Reusable Error Component
  const ErrorBox = () =>
    error && (
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
    );

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center px-4">
      {step === 1 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStep1();
          }}
          className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
        >
          <h2 className="text-[28px] font-bold text-center">Forgot Password</h2>
          <ErrorBox />
          <input
            type="email"
            placeholder="Enter Your Email"
            value={email}
            onFocus={() => setInputClicked({ ...inputClicked, email: true })}
            onBlur={() => setInputClicked({ ...inputClicked, email: false })}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full border ${
              inputClicked.email ? "border-blue-600" : "border-black"
            } rounded-xl p-3`}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 px-6 rounded-xl w-full"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Send OTP"}
          </button>
        </form>
      )}

      {step === 2 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStep2();
          }}
          className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
        >
          <h2 className="text-[28px] font-bold text-center">Enter OTP</h2>
          <ErrorBox />
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onFocus={() => setInputClicked({ ...inputClicked, otp: true })}
            onBlur={() => setInputClicked({ ...inputClicked, otp: false })}
            onChange={(e) => setOtp(e.target.value)}
            className={`w-full border ${
              inputClicked.otp ? "border-blue-600" : "border-black"
            } rounded-xl p-3`}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 px-6 rounded-xl w-full"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Verify OTP"}
          </button>
        </form>
      )}

      {step === 3 && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleStep3();
          }}
          className="w-full max-w-[500px] bg-white rounded-2xl shadow-2xl p-8 flex flex-col gap-6"
        >
          <h2 className="text-[28px] font-bold text-center">Reset Password</h2>
          <ErrorBox />
          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onFocus={() =>
              setInputClicked({ ...inputClicked, newPassword: true })
            }
            onBlur={() =>
              setInputClicked({ ...inputClicked, newPassword: false })
            }
            onChange={(e) => setNewPassword(e.target.value)}
            className={`w-full border ${
              inputClicked.newPassword ? "border-blue-600" : "border-black"
            } rounded-xl p-3`}
            required
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onFocus={() =>
              setInputClicked({ ...inputClicked, confirmPassword: true })
            }
            onBlur={() =>
              setInputClicked({ ...inputClicked, confirmPassword: false })
            }
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full border ${
              inputClicked.confirmPassword ? "border-blue-600" : "border-black"
            } rounded-xl p-3`}
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-3 px-6 rounded-xl w-full"
          >
            {loading ? <ClipLoader size={20} color="white" /> : "Reset Password"}
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
