import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import dp from '../assets/dp.jpg';
import { IoMdArrowRoundBack } from "react-icons/io"; 
import axios from 'axios';
import { serverUrl } from '../App';
import { setProfileData, setUserData } from '../redux/userSlice';
import { ClipLoader } from 'react-spinners';

const EditProfile = () => {
  const { userName: paramUserName } = useParams();
  const { userData } = useSelector(state => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const imageInput = useRef();
  const [frontendImage, setFrontEndImage] = useState(dp);
  const [backendImage, setBackendImage] = useState(null);
  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [profession, setProfession] = useState('');
  const [gender, setGender] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch profile to edit
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const usernameToFetch = paramUserName || userData?.userName;
        if (!usernameToFetch) return navigate("/login");

        const res = await axios.get(`${serverUrl}/api/user/getProfile/${usernameToFetch}`, { withCredentials: true });
        const profile = res.data.user || res.data; // ensure correct object
        setFrontEndImage(profile.profileImage || dp); // must match backend key
        setName(profile.name || '');
        setUserName(profile.userName || '');
        setBio(profile.bio || '');
        setProfession(profile.profession || '');
        setGender(profile.gender || '');
      } catch (err) {
        console.error("Error fetching profile:", err.response?.data || err.message);
        alert(err.response?.data?.message || "Failed to fetch profile");
        navigate("/");
      }
    };
    fetchProfile();
  }, [paramUserName, userData?.userName, navigate]);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setBackendImage(file);
      setFrontEndImage(URL.createObjectURL(file));
    }
  };

  const handleEditProfile = async () => {
    if (!name || !userName) return alert("Name and Username are required!");
    setLoading(true);
    try {
      const formData = new FormData();
      if (backendImage) formData.append('profileImage', backendImage); // must match backend
      formData.append('name', name);
      formData.append('userName', userName);
      formData.append('bio', bio);
      formData.append('profession', profession);
      formData.append('gender', gender);

      const result = await axios.post(
        `${serverUrl}/api/user/editProfile`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" }
        }
      );

      const updatedUser = result.data.user || result.data;

      // Update Redux store
      if (updatedUser._id === userData?._id) {
        dispatch(setProfileData(updatedUser));
        dispatch(setUserData(updatedUser));
        

      }

      setFrontEndImage(updatedUser.profileImage || dp); // update preview
      setLoading(false);
      navigate(`/profile/${updatedUser.userName}`);
    } catch (err) {
      console.error("Error updating profile:", err.response?.data || err.message);
      alert(err.response?.data?.message || "Failed to update profile");
      setLoading(false);
    }
  };

  return (
    <div className='w-full min-h-[100vh] bg-black flex flex-col items-center gap-5 p-4'>
      {/* Header */}
      <div className='w-full h-[80px] flex items-center gap-4 px-4'>
        <IoMdArrowRoundBack
          onClick={() => navigate(`/profile/${paramUserName || userData?.userName}`)}
          className='text-white cursor-pointer w-6 h-6'
        />
        <h1 className='text-white text-xl font-semibold'>Edit Profile</h1>
      </div>

      {/* Profile Picture */}
      <div 
        className='w-[80px] h-[80px] md:w-[100px] md:h-[100px] border-2 border-black rounded-full cursor-pointer overflow-hidden'
        onClick={() => imageInput.current.click()}
      >
        <input 
          type='file' 
          accept='image/*' 
          ref={imageInput} 
          hidden 
          onChange={handleImage} 
        />
        <img
          src={frontendImage}
          alt="Profile"
          className='w-full h-full object-cover'
        />
      </div>

      <div 
        className='text-blue-500 text-center text-lg cursor-pointer'
        onClick={() => imageInput.current.click()}
      >
        Change Your Profile Picture
      </div>

      {/* Inputs */}
      {['Name', 'Username', 'Bio', 'Profession', 'Gender'].map((field, idx) => {
        const stateMap = {0: [name, setName], 1: [userName, setUserName], 2: [bio, setBio], 3: [profession, setProfession], 4: [gender, setGender]};
        const [value, setter] = stateMap[idx];
        return (
          <input
            key={idx}
            type='text'
            className='w-[90%] max-w-[600px] h-[60px] bg-[#0a1010] border-2 border-gray-700 text-white font-semibold rounded-2xl px-5 outline-none'
            placeholder={`Enter Your ${field}`}
            onChange={(e) => setter(e.target.value)}
            value={value}
          />
        );
      })}

      {/* Save Button */}
      <button
        className='w-[60%] max-w-[400px] h-[50px] bg-white text-black font-semibold rounded-2xl cursor-pointer hover:bg-gray-200 transition flex justify-center items-center'
        onClick={handleEditProfile}
        disabled={loading}
      >
        {loading ? <ClipLoader size={30} color='black' /> : "Save Profile"}
      </button>
    </div>
  );
};

export default EditProfile;
