import React, { useEffect, useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Link } from 'react-router-dom';
import MemberCard from "../../Components/Memberscard/membercard";
import {getMonthlyJoined,threeDayExpire,fourToSevenDaysExpire,expired,inactiveMembers} from './data';

const GeneralUser = () => {

    const [header, setHeader] = useState("");
    const [data,setData] = useState([]);

    useEffect(() => {
        const func = sessionStorage.getItem('func');
        functionCall(func)
    }, [])

    const functionCall = async (func) => {

        switch (func) {

            case "monthlyJoined":

                setHeader("Monthly Joined Members")
                var datas = await getMonthlyJoined();
                setData(datas.members)
                break;


            case "threeDayExpire":

                setHeader("Three Day Expire Members")
                var datas = await threeDayExpire();
                setData(datas.members)
                break;

            case "fourToSevenDaysExpire":

                setHeader("Membership Details")
                 var datas = await fourToSevenDaysExpire();
                setData(datas.members)
                break;

            case "expired":

                setHeader("Expired Members")
                 var datas = await expired();
                setData(datas.members)
                break;

            case "inactiveMembers":

                setHeader("Inactive Members")
                 var datas = await inactiveMembers();
                setData(datas.members)
                break;
        }

    }
    return (
        <div className="text-back p-5 w-3/4 flex-col">

            <div className="border-2 bg-slate-900 flex justify-between w-full text-white rounded-lg p-3">

                <Link to={'/dashboard'} className="border-2 pl-3 pr-3 pt-1 pb-1 rounded-2xl cursor-pointer hover:bg-gradient-to-r from-green-500 via-black-500 to-sky-500 hover:text-black">
                    <ArrowBackIcon /> Back To Dashboard
                </Link>

            </div>

            <div className="mt-5 text-xl text-slate-900">
                {header}
            </div>

            <div className="mt-5 p-5 bg-slate-100 rounded-lg grid gap-2 grid-cols-3 overflow-x auto h-[80%]">

                {
                    data.map((item,index)=>{
                        return(
                            <MemberCard item={item}/>
                    )
                    })
                }

            </div>

        </div>
    )
}

export default GeneralUser