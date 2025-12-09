import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Navbar = () => {
  const navigate = useNavigate()
  const { userData, backendUrl, setUserData, setIsLoggedin } = useContext(AppContent)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/send-verify-otp')
      if (data.success) {
        navigate('/email-verify')
        toast.success(data.message)
      } else toast.error(data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/logout')
      if (data.success) {
        setIsLoggedin(false)
        setUserData(false)
        navigate('/')
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <nav className='w-full fixed top-0 left-0 z-50 
      bg-gray-900/80 backdrop-blur-xl border-b border-cyan-500/20
      px-4 sm:px-10 py-3 flex justify-between items-center'>

     
      <div 
  className='cursor-pointer text-2xl md:text-3xl font-extrabold tracking-wider 
             bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent
             hover:scale-105 transition-transform duration-300'
  onClick={() => navigate('/')}
>
  AUTH
</div>


     
      {userData ? (
        <div className='relative' ref={menuRef}>
          <div
            onClick={() => setMenuOpen(!menuOpen)}
            className='w-10 h-10 sm:w-11 sm:h-11 flex justify-center items-center
            rounded-full cursor-pointer font-bold text-lg text-white
            bg-gradient-to-br from-cyan-500 to-purple-500
            shadow-lg shadow-cyan-500/50 hover:scale-110 transition-all'
          >
            {userData.name[0].toUpperCase()}
          </div>

         
          {menuOpen && (
            <div className='absolute right-0 mt-3 w-48 sm:w-56
              bg-gray-900/95 rounded-xl border border-cyan-500/30 shadow-lg p-2'>
              
              <div className='px-3 py-2 border-b border-gray-800'>
                <p className='text-white font-semibold text-sm truncate'>{userData.name}</p>
                <p className='text-gray-400 text-xs truncate'>{userData.email}</p>
              </div>

              <ul className='mt-1'>
                {!userData.isAccountVerified && (
                  <li className='text-cyan-400 text-sm p-2 hover:bg-cyan-500/10 rounded cursor-pointer'
                      onClick={sendVerificationOtp}>Verify Email</li>
                )}
                <li className='text-red-400 text-sm p-2 hover:bg-red-500/10 rounded cursor-pointer'
                    onClick={logout}>Logout</li>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <button 
          onClick={() => navigate('/login')}
          className='px-5 py-2 rounded-full font-semibold text-white
            bg-gradient-to-r from-cyan-500 to-purple-500 text-sm
            shadow-md hover:scale-105 transition-all'
        >
          Login
        </button>
      )}
    </nav>
  )
}

export default Navbar
