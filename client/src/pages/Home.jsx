import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { logout, setOnlineUser, setSocketConnection, setUser } from '../redux/userSlice'
import Sidebar from '../component/Sidebar'
import logo from "../assets/logo.png"
import io from 'socket.io-client'

const Home = () => {

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  // console.log("user",user)



  const fetchUserDetails = async () => {
    try {

      const URL = `${import.meta.env.VITE_REACT_APP_BACKEND_URL}/api/user-details`

      const response = await axios({
        url: URL,
        withCredentials: true
      })

      dispatch(setUser(response.data.data))

      if (response.data.data.logout) {
        dispatch(logout())
        navigate("/email")
      }


    } catch (error) {
      console.log("error", error)
    }
  }

  useEffect(() => {
    fetchUserDetails()
  }, [])

  // socket connections
  useEffect(() => {
    const socketConnection = io(import.meta.env.VITE_REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem('token')
      }
    })


    socketConnection.on('onlineUser', (data) => {
      dispatch(setOnlineUser(data))
    })

    dispatch(setSocketConnection(socketConnection))

    return () => {
      socketConnection.disconnect()
    }
  }, [])

  const basePath = location.pathname === '/'

  return (
    <div className='grid  lg:grid-cols-[300px_1fr] h-screen max-w-screen'>
      <section className={`bg-white ${!basePath && "hidden"} lg:block`} >
        <Sidebar />
      </section>

      {/* message component */}
      <section className={`${basePath && "hidden"}`}>

        <Outlet />

      </section>

      <div className={`justify-center items-center flex-col gap-2 hidden ${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img src={logo} alt="logo" width={200} />
        </div>

        <p className='text-lg  mt-2 text-slate-500'>Select user to send message</p>

        {
          !user?.token && (

            <Link to={"/email"} className='bg-primary py-2 px-3 rounded text-slate-200 hover:bg-teal-600'>
              Login
            </Link>
            
          )
        }
      </div>
    </div>
  )
}

export default Home
