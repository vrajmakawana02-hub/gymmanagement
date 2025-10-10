import React, { useState } from "react";
import './singUp.css';
import Modal from "../Modal/modal";
import ForgotPassword from "../Forgot Password/forgotPassword";
import axios from "axios";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import { ToastContainer, toast } from 'react-toastify';
const Singup = () => {

    const [forgotPassword, setForgotPassword] = useState(false);
    const [inputField, setInputFiled] = useState({ gymName: "", email: "", userName: "", password: "", profilePic: "https://wallpapercave.com/wp/wp2639574.jpg" })
    const [loderImage, setLoaderImage] = useState(false);

    const handleClose = () => {
        setForgotPassword(prev => !prev);
    }

    const handleOnchange = (event, name) => {
        setInputFiled({ ...inputField, [name]: event.target.value })
    }



    const uplodeImage = async (event) => {

        setLoaderImage(true)
        console.log("image uploding")
        const files = event.target.files;
        const data = new FormData();
        data.append('file', files[0]);

        //dbua3oxoe
        data.append('upload_preset', 'gym-management');

        try {
            const response = await axios.post("https://api.cloudinary.com/v1_1/dbua3oxoe/image/upload", data);
            console.log(response)
            const imageUrl = response.data.url;
            setLoaderImage(false)
            setInputFiled({ ...inputField, ['profilePic']: imageUrl })
        } catch (error) {
            console.log(error)
            setLoaderImage(false)
        }
    }

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
        return regex.test(email);
    };

    const handleRegister = async () => {



        // 1. Check required fields
        if (!inputField.email || !inputField.gymName || !inputField.userName || !inputField.password) {
            toast.error("All fields are required");
            return;
        }

        // 2. Check email format
        if (!validateEmail(inputField.email)) {
            toast.error("Invalid email format");
            return;
        }

        try {
            const response = await axios.post("http://localhost:4000/auth/register", inputField);
            const successMsg = response.data.message;
            toast.success(successMsg);

            setTimeout(() => {
                window.location.reload();
            }, 2000);

        } catch (error) {
            const errorMessage = error.response?.data?.error || "Something went wrong";
            console.error("Register error:", errorMessage);
            toast.error(errorMessage);
        }
    };



    return (
        <div className='customSingup w-1/3  p-10 mt-20 ml-20 bg-gray-50 bg-opacity-50 h-[450px] overflow-y-auto'>
            <div className='font-sans text-white text-center text-3xl'>Resgister Your Gym</div>
            <input type='text' value={inputField.email} onChange={(event) => { handleOnchange(event, "email") }} className='w-full my-10 p-2 rounded-lg' placeholder='Enter Email' />
            <input type='text' value={inputField.gymName} onChange={(event) => { handleOnchange(event, "gymName") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Gym Name' />
            <input type='text' value={inputField.userName} onChange={(event) => { handleOnchange(event, "userName") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Username' />
            <input type='password' value={inputField.password} onChange={(event) => { handleOnchange(event, "password") }} className='w-full mb-10 p-2 rounded-lg' placeholder='Enter Password' />

            <input type="file" onChange={(event) => { uplodeImage(event) }} className='w-full mb-10 p-2 rounded-lg' />

            {
                loderImage && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                    <LinearProgress color="secondary" />

                </Stack>
            }



            <img src={inputField.profilePic} className="mb-10 h-[200px] w-[250px]" />

            <div className="p-2 w-[80%] border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer" onClick={() => handleRegister()}>Register</div>
            <div className="p-2 w-[80%] mt-5 border-2 bg-slate-800 mx-auto rounded-lg text-white text-center text-lg hover:bg-white hover:text-black font-semibold cursor-pointer" onClick={() => handleClose()}>Forgot Password</div>
            {forgotPassword && <Modal header="Forgot Password" handleClose={handleClose} content={<ForgotPassword />} />}
            <ToastContainer />
        </div>

    )
}

export default Singup