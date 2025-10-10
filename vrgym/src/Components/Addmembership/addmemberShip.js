import React, { useState, useEffect } from "react";
import axios from "axios";
import {toast,ToastContainer} from 'react-toastify';

const Addmembership = ({handleClose}) => {

    const [inputFiled, setInputFiled] = useState({ months: "", price: "" });
    const [membership, setMembership] = useState([]);
    const handleOnChange = (event, name) => {
        setInputFiled({ ...inputFiled, [name]: event.target.value })
    }

    const fetchMembership = async () => {
        await axios.get('http://localhost:4000/plans/get-membership', { withCredentials: true }).then((response) => {
            console.log(response)
            setMembership(response.data.membership)
            toast.success(response.data.membership.length+"Membership Fetched")
        }).catch(error => {
            console.log(error);
            toast.error("Something Wrong Happend")
        })
    }

    useEffect(() => {
        fetchMembership()



    }, []);

    const handleAddmembership = async()=>{
        await axios.post('http://localhost:4000/plans/add-membership',inputFiled,{withCredentials:true}).then((response=>{
            toast.success(response.data.message)
            handleClose();
        })).catch(error => {
            console.log(error);
             toast.error("Something Wrong Happend")
        })
    }

    return (
        <div className="text-back">
            <div className="flex flex-wrap gap-5 items-center justify-center">
                {
                    membership.map((item, index) => {
                        return (
                            <div className="text-lg bg-slate-900 text-white border-2 pl-2 pr-2 flex-col gap-3 justify-between pt-1 pb-1 rounded-xl font-semibold hover:bg-gradient-to-r from-green-500 via-black-500 to-sky-500 hover:text-white cursor-pointer">
                                <div>{item.months} Month Membership</div>
                                <div>Rs {item.price}</div>
                            </div>
                        );


                    })
                }




            </div>
            <hr className="mt-10 mb-10" />
            <div className="flex gap-10 mb-10">
                <input value={inputFiled.months} onChange={(event) => handleOnChange(event, "months")} className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2" type="number" placeholder="Add No. of Month" />

                <input value={inputFiled.price} onChange={(event) => handleOnChange(event, "price")} className="border-2 rounded-lg text-lg w-1/3 h-1/2 p-2" type="number" placeholder="Add Price" />

                <div onClick={()=>{handleAddmembership()}} className="text-lg border-2 p-1 w-auto mt-0 rounded-xl cursor-pointer hover:bg-gradient-to-r from-green-500 via-black-500 to-sky-500 hover:text-white cursor-pointer ">Add +</div>

            </div>
<ToastContainer/>
        </div>
    )
}

export default Addmembership