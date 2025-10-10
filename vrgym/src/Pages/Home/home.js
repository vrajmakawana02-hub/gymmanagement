import React from "react"
import Login from "../../Components/Login/login"
import Singup from "../../Components/Signup/singup"

const Home = () => {
    return (
    <div className="w-full  h-[100vh]">
    <div className="border-2 border-slate-800 bg-slate-800 text-white p-5 font-semibold text-x1">
        Welcome To Gym Management System
    </div>
<div className='w-full bg-cover flex justify-center  h-[100%] bg-[url("https://wallpaperaccess.com/full/834258.jpg")]'>
      <div className='w-full lg:flex gap-32 '>

          <Login />
         <Singup/>
         

          </div>


      </div>
    </div>
    
    

   
    )
}

export default Home 