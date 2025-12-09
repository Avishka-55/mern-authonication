import React, { useContext } from 'react'
import { AppContent } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const { userData } = useContext(AppContent)
  const navigate = useNavigate()

  return (
    <div className='relative flex flex-col items-center 
      pt-32 sm:pt-40 pb-16 sm:pb-24 px-4 text-center overflow-hidden'>

     
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-10 left-1/3 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl'></div>
        <div className='absolute top-20 right-1/3 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl'></div>
      </div>

      
      <h1 className='text-3xl sm:text-5xl font-extrabold 
        bg-gradient-to-r from-cyan-400 to-purple-400 text-transparent bg-clip-text 
        mb-3'>
        Hey {userData ? userData.name : 'User'} 
      </h1>

      
      <h2 className='text-3xl sm:text-6xl font-bold text-white mb-6 leading-tight'>
        Your Secure <span className='text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400'>MERN</span> Auth Hub
      </h2>

  
      <p className='max-w-lg sm:max-w-2xl text-gray-400 text-base sm:text-lg leading-relaxed mb-10'>
        Build confidently with login, signup, email verification, and password reset already set up.
        A clean and secure authentication system for real projects.
      </p>

     
      {!userData?.isAccountVerified &&
        <button 
          onClick={() => navigate('/login')}
          className='px-8 py-4 rounded-xl text-lg font-semibold text-white 
            bg-gradient-to-r from-cyan-500 to-purple-500
            shadow-lg hover:scale-105 transition-all'
        >
          Get Started →
        </button>
      }
    </div>
  )
}

export default Header
