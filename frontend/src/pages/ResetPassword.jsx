import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const ResetPassword = () => {
  const navigate = useNavigate()
  const { backendUrl } = useContext(AppContent)

  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [isEmailSent, setIsEmailSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const inputRefs = React.useRef([])

  const onSubmitEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/send-reset-otp', { email })
      
      if (data.success) {
        toast.success(data.message)
        setIsEmailSent(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmitNewPassword = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data } = await axios.post(backendUrl + '/api/auth/reset-password', {
        email,
        otp,
        newPassword
      })

      if (data.success) {
        toast.success(data.message)
        navigate('/login')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='relative flex items-center justify-center min-h-screen bg-black overflow-hidden px-6 sm:px-0'>
      {/* Animated background */}
      <div className='absolute inset-0 opacity-20' style={{
        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.15) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      {/* Glowing orbs */}
      <div className='absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse'></div>
      <div className='absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>

      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer z-10 hover:scale-110 transition-transform' 
        alt="" 
      />

      <div className='relative bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full sm:w-96 border border-cyan-500/30'>
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl'></div>
        
        <div className='relative z-10'>
          {/* Icon */}
          <div className='flex items-center justify-center mb-6'>
            <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50'>
              <span className='text-3xl'>🔒</span>
            </div>
          </div>

          <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-2'>
            Reset Password
          </h2>
          
          <p className='text-center text-sm mb-8 text-gray-400'>
            {isEmailSent ? 'Enter the code and new password' : 'Enter your email to receive reset code'}
          </p>

          {/* Email Form */}
          {!isEmailSent ? (
            <form onSubmit={onSubmitEmail}>
              <div className='mb-6 group'>
                <label className='text-xs text-cyan-400 mb-1 block font-semibold'>EMAIL ADDRESS</label>
                <div className='flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700 group-hover:border-cyan-500/50 transition-all'>
                  <img src={assets.mail_icon} alt="" className='w-5 h-5 opacity-70' />
                  <input 
                    onChange={(e) => setEmail(e.target.value)} 
                    value={email} 
                    className='bg-transparent outline-none text-white w-full placeholder-gray-500' 
                    type='email'  
                    placeholder='you@example.com' 
                    required
                  />
                </div>
              </div>

              <button 
                disabled={isLoading}
                className='w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 relative overflow-hidden group'
              >
                <span className='relative z-10'>{isLoading ? 'Sending...' : 'Send Reset Code'}</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </button>
            </form>
          ) : (
            <form onSubmit={onSubmitNewPassword}>
              <div className='mb-4 group'>
                <label className='text-xs text-cyan-400 mb-1 block font-semibold'>RESET CODE</label>
                <div className='flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700 group-hover:border-cyan-500/50 transition-all'>
                  <span className='text-2xl'>🔑</span>
                  <input 
                    onChange={(e) => setOtp(e.target.value)} 
                    value={otp} 
                    className='bg-transparent outline-none text-white w-full placeholder-gray-500' 
                    type='text'  
                    placeholder='Enter 6-digit code' 
                    required
                  />
                </div>
              </div>

              <div className='mb-6 group'>
                <label className='text-xs text-cyan-400 mb-1 block font-semibold'>NEW PASSWORD</label>
                <div className='flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700 group-hover:border-cyan-500/50 transition-all'>
                  <img src={assets.lock_icon} alt="" className='w-5 h-5 opacity-70' />
                  <input 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    value={newPassword} 
                    className='bg-transparent outline-none text-white w-full placeholder-gray-500' 
                    type='password'  
                    placeholder='••••••••' 
                    required
                  />
                </div>
              </div>

              <button 
                disabled={isLoading}
                className='w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 relative overflow-hidden group'
              >
                <span className='relative z-10'>{isLoading ? 'Resetting...' : 'Reset Password'}</span>
                <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
              </button>
            </form>
          )}

          {/* Back to login */}
          <div className='mt-6 text-center'>
            <p className='text-gray-400 text-sm'>
              Remember your password?{' '}
              <span 
                onClick={() => navigate('/login')} 
                className='text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold transition-colors'
              >
                Login →
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword