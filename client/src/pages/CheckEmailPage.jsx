import React, { useState } from 'react'
import { Link, useNavigate } from "react-router";
import axios from 'axios'
import toast from 'react-hot-toast';
import {PiUserCircle} from "react-icons/pi"


const CheckEmailPage = () => {

  const [data, setData] = useState({
    email: "",
  })

  const navigate = useNavigate()

  
  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/email`

    try {
      const response = await axios.post(URL, data)
      toast.success(response?.data?.message)

      if (response.data.success) {
        setData({
          email: "",
        })

        navigate('/password',{
          state : response?.data?.data
        })
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }

  }

  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>

        <div className='w-fit mx-auto mb-2'>
          <PiUserCircle size={80}/>
        </div>

        <h3>Welcome to chat App!</h3>

        <form action="" className='grid gap-4 mt-3' onSubmit={handleSubmit}>


          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email : </label>
            <input type="email" id='email' name='email' value={data.email} onChange={handleOnChange} placeholder='Enter your email' className='bg-slate-100 px-2 py-1 focus:outline-primary' required autoFocus/>
          </div>


          <button className='bg-primary text-lg px-4 py-1 hover:bg-secoundary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Let's Go
          </button>

        </form>

        <p className='my-3 text-center'>New user ? <Link to={"/register"} className='text-primary hover:fint font-semibold'>Register</Link></p>


      </div>
    </div>
  )
}

export default CheckEmailPage
