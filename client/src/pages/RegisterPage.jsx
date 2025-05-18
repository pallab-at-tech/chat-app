import React, { useState } from 'react'
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router";
import uploadFile from '../helpers/uploadFile';
import axios from 'axios'
import toast from 'react-hot-toast';

const RegisterPage = () => {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: ""
  })

  const handleOnChange = (e) => {
    const { name, value } = e.target

    setData((preve) => {
      return {
        ...preve,
        [name]: value
      }
    })
  }

  const [uploadPhoto, setUploadPhoto] = useState("")
  const navigate = useNavigate()

  const handleUploadPhoto = async (e) => {

    const file = e.target.files[0]
    if (!file) return;

    const uploadPhoto = await uploadFile(file)
    setUploadPhoto(file)

    setData((prev) => ({
      ...prev,
      profile_pic: uploadPhoto?.url
    }));

  }

  const handleClearUploadPhoto = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setUploadPhoto(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    e.stopPropagation()

    const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/register`

    try {
      const response = await axios.post(URL, data)
      toast.success(response?.data?.message)

      if (response.data.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: ""
        })

        navigate('/email')
      }
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }


    // console.log("data : ", data)
  }



  return (
    <div className='mt-5'>
      <div className='bg-white w-full max-w-md  rounded overflow-hidden p-4 mx-auto'>
        <h3>Welcome to chat App!</h3>

        <form action="" className='grid gap-4 mt-5' onSubmit={handleSubmit}>

          <div className='flex flex-col gap-1'>
            <label htmlFor="name">Name : </label>
            <input type="text" id='name' name='name' value={data.name} onChange={handleOnChange} placeholder='Enter your name' className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="email">Email : </label>
            <input type="email" id='email' name='email' value={data.email} onChange={handleOnChange} placeholder='Enter your email' className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="password">Password : </label>
            <input type="password" id='password' name='password' value={data.password} onChange={handleOnChange} placeholder='Enter your password' className='bg-slate-100 px-2 py-1 focus:outline-primary' required />
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="profile_pic">Photo :

              <div className='h-14 bg-slate-200 flex items-center justify-center border rounded  hover:border-primary cursor-pointer'>
                <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                  {
                    uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                  }
                </p>

                {
                  uploadPhoto?.name && (
                    <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                      <IoClose />
                    </button>
                  )
                }


              </div>
            </label>

            <input type="file" id='profile_pic' name='profile_pic' onChange={handleUploadPhoto} className='bg-slate-100 px-2 py-1 focus:outline-primary hidden' />
          </div>

          <button className='bg-primary text-lg px-4 py-1 hover:bg-secoundary rounded mt-2 font-bold text-white leading-relaxed tracking-wide'>
            Register
          </button>

        </form>

        <p className='my-3 text-center'>Already have account ? <Link to={"/email"} className='text-primary hover:fint font-semibold'>Login</Link></p>


      </div>
    </div>
  )
}

export default RegisterPage
