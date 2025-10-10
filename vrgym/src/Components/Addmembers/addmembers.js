import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';

import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';




const Addmembers = () => {

    const [inputField, setInputFiled] = useState({ name: "", mobileNo: "", address: "", membership: "", profilePic: "https://tse1.mm.bing.net/th/id/OIP.TpqSE-tsrMBbQurUw2Su-AHaHk?rs=1&pid=ImgDetMain&o=7&rm=3", joiningDate: "" })
    const [imageLoader, setImageLoader] = useState(false)
    const [membershipList, setMembershipList] = useState([]);
    const [selectedOption, setSelectedOption] = useState("");
    const handleOnChange = (event, name) => {
        setInputFiled({ ...inputField, [name]: event.target.value })

    }
    console.log(inputField)
    const uplodeImage = async (event) => {
        setImageLoader(true)
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
            setInputFiled({ ...inputField, ['profilePic']: imageUrl })
            setImageLoader(false)
        } catch (error) {
            console.log(error)
            setImageLoader(false)
        }
    }

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((response) => {


            setMembershipList(response.data.membership)
            if (response.data.membership.length === 0) {
                return toast.error("No any Membership added yet", {
                    className: "text-lg"
                })
            } else {
                let a = response.data.membership[0]._id;
                setSelectedOption(a)
                setInputFiled({ ...inputField, membership: a })
            }



        }).catch(error => {
            console.log(error);
            toast.error("Something Wrong Happend")
        })
    }
    useEffect(() => {

        fetchMembership();
        console.log(inputField)


    }, []);

    const handleOnChangeSelect = (event) => {
        let value = event.target.value;
        setSelectedOption(value);
        setInputFiled({ ...inputField, membership: value })
    };

    const handleRegisterButton = async () => {
        if (!/^\d{10}$/.test(inputField.mobileNo)) {
            toast.error("Mobile number must be exactly 10 digits");
            return; // stop execution if invalid
        }
        try {
            const response = await axios.post(
                "http://localhost:4000/members/register-member",
                inputField,
                { withCredentials: true }
            );

            toast.success("Added Successfully");

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        } catch (error) {
            toast.error("Something went wrong");
            console.error(error);
        }
    }

    return (
        <div className="text-black ">
            <div className="grid gap-5 grid-cols-2 text-lg">
                <input value={inputField.name} onChange={(event) => { handleOnChange(event, "name") }} placeholder="Name of the Joinee" type="text" className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12" />
                <input value={inputField.mobileNo} onChange={(event) => { handleOnChange(event, "mobileNo") }} placeholder="Mobile Number" type="text" className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12" />
                <input value={inputField.address} onChange={(event) => { handleOnChange(event, "address") }} placeholder="Address" type="text" className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12" />
                <input value={inputField.joiningDate} onChange={(event) => { handleOnChange(event, "joiningDate") }} type="date" className="border-2 w-[90%] pl-3 pr-3 pt-2 pb-2 border-slate-400 rounded-md h-12" />

                <select value={selectedOption} onChange={handleOnChangeSelect} className="border-2 w-[90%] h-12 pt-2 pb-2 border-slate-400 rounded-md placeholder:text-gray">
                    {
                        membershipList.map((item, index) => {
                            return (
                                <option key={index} value={item._id}>{item.months}Months Membership</option>
                            )
                        })
                    }
                </select>

                <input type="file" onChange={(event) => uplodeImage(event)} />

                <div className="w-1/4">
                    <img src={inputField.profilePic} className="w-full h-full rounded-full" />
                    {
                        imageLoader && <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress color="secondary" />

                        </Stack>
                    }
                </div>
                <ToastContainer />


                <div onClick={() => handleRegisterButton()} className="p-3 border-2  w-28 text-lg h-14 text-center  bg-slate-900 text-white rounded-xl hover:bg-gradient-to-r from-green-500 via-black-500 to-sky-500 hover:text-white cursor-pointer">Register</div>
            </div>
        </div>
    )
}

export default Addmembers