import React, { useState, useEffect, useRef } from "react";

import MenuIcon from '@mui/icons-material/Menu';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AlarmIcon from '@mui/icons-material/Alarm';
import Groups2Icon from '@mui/icons-material/Groups2';
import ReportIcon from '@mui/icons-material/Report';
import ErrorIcon from '@mui/icons-material/Error';
import { Link } from "react-router-dom";
const Dashboard = () => {
    const [accordinaDashboard, setAccordianDashnoard] = useState(false);
    const ref = useRef();

    useEffect(()=>{
        const checkIfClickedOutside = e =>{
            if(accordinaDashboard && ref.current && !ref.current.contains(e.target)){
                setAccordianDashnoard(false);
            }
        }

        document.addEventListener("mousedown",checkIfClickedOutside)
        return ()=>{
            document.removeEventListener("mousedown",checkIfClickedOutside)
        }
    },[accordinaDashboard])


    const handleOnClickMenu = (value)=>{
        sessionStorage.setItem('func',value);
    }
    return (
        <div className="w-3/4 text-black p-5 relative">
            <div className="w-full bg-slate-900 text-white rounded-lg flex p-3 justify-between items-center">
                <MenuIcon sx={{ cursor: "pointer" }} onClick={() => { setAccordianDashnoard(prev => !prev) }} />

                <img className="w-8 h-8 rounded-3xl border-2" src="https://wallpapercave.com/wp/wp5339178.jpg" alt="image" />

            </div>

            {
                accordinaDashboard && <div ref={ref}className="absolute p-3 bg-slate-900 text-white rounded-xl text-lg font-extralight">

                    <div>Hi Welcome to our Gym Management System.</div>
                    <p>Feel free to ask any querries</p>
                </div>
            }

            <div className="mt-5 pt-3 bg-slate-100 bg-opacity-50 grid gap-5 grid-cols-3 w-full pb-5 overflow-x auto h-[80%]">

                {/*hhhhh*/}
                <Link to={'/member'} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-black-500 to-sky-500"></div>

                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <PeopleAltIcon sx={{ fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Joined Members</p>
                    </div>
                </Link>

                {/*hhhhh*/}
                <Link to='/specific/monthly' onClick={()=>handleOnClickMenu("monthlyJoined")}   className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-black-500 to-sky-500"></div>

                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <TrendingUpIcon sx={{ color: "green", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Monthly Joined</p>
                    </div>
                </Link>

                {/*hhhhh*/}
                <Link to='/specific/expire-with-in-3-days' onClick={()=>handleOnClickMenu("threeDayExpire")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-black-500 to-sky-500"></div>

                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <AlarmIcon sx={{ color: "red", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Expiring Within 3 Days</p>
                    </div>
                </Link>


                {/*hhhhh*/}
                <Link to='/specific/membership details' onClick={()=>handleOnClickMenu("membershipDetails")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-black-500 to-sky-500"></div>

                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <Groups2Icon sx={{ fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Expiring Within 4-7 Days</p>
                    </div>
                </Link>


                {/*hhhhh*/}
                <Link to='/specific/expired' onClick={()=>handleOnClickMenu("expired")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-black-500 to-sky-500"></div>

                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <ReportIcon sx={{ color: "red", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Expired</p>
                    </div>
                </Link>


                {/*hhhhh*/}
                <Link to='/specific/inactive members' onClick={()=>handleOnClickMenu("inactiveMembers")} className="w-full h-fit border-2 bg-white rounded-lg cursor-pointer">
                    <div className="h-3 rounded-t-lg bg-gradient-to-r from-green-500 via-black-500 to-sky-500"></div>

                    <div className="py-7 px-5 flex-col justify-center items-center w-full text-center rounded-b-lg hover:bg-slate-900 hover:text-white">
                        <ErrorIcon sx={{ color: "red", fontSize: "50px" }} />
                        <p className="text-xl my-3 font-semibold font-mono">Inactive Members</p>
                    </div>
                </Link>





            </div>

            <div className="md:bottom-4 p-4 w-3/4 mb:mb-0 absolute bg-black text-white mt-20 rounded-xl text-xl">
                Contact Developer for any Technical Error at +9106166474
            </div>
        </div>
    )
}

export default Dashboard