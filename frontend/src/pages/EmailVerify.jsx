import React, { useContext, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const EmailVerify = () => {
  const navigate = useNavigate()
  const { backendUrl, isLoggedin, userData, getUserData } = useContext(AppContent)
  
  const inputRefs = useRef([])
  const [otp, setOtp] = React.useState(['', '', '', '', '', ''])

  const handleInput = (e, index) => {
    const value = e.target.value
    if (isNaN(value)) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)

    // Auto focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6)
    const newOtp = pastedData.split('')
    setOtp([...newOtp, ...Array(6 - newOtp.length).fill('')])
    
    if (pastedData.length === 6) {
      inputRefs.current[5].focus()
    }
  }

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const otpString = otp.join('')
      
      axios.defaults.withCredentials = true
      const { data } = await axios.post(backendUrl + '/api/auth/verify-account', { otp: otpString })

      if (data.success) {
        toast.success(data.message)
        getUserData()
        navigate('/')
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    isLoggedin && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedin, userData])

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

      <div className='relative bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full sm:w-[480px] border border-cyan-500/30'>
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl'></div>
        
        <div className='relative z-10'>
          {/* Icon */}
          <div className='flex items-center justify-center mb-6'>
            <div className='w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50'>
              <span className='text-3xl'>📧</span>
            </div>
          </div>

          <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-2'>
            Verify Your Email
          </h2>
          
          <p className='text-center text-sm mb-8 text-gray-400'>
            Enter the 6-digit code sent to your email
          </p>

          <form onSubmit={onSubmitHandler}>
            {/* OTP Input */}
            <div className='flex gap-3 justify-center mb-8' onPaste={handlePaste}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type='text'
                  maxLength='1'
                  value={digit}
                  onChange={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className='w-12 h-14 sm:w-14 sm:h-16 bg-gray-800/50 border border-gray-700 rounded-lg text-white text-2xl text-center font-bold outline-none focus:border-cyan-500 focus:shadow-lg focus:shadow-cyan-500/30 transition-all'
                  required
                />
              ))}
            </div>

            <button 
              type='submit'
              className='w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold hover:shadow-lg hover:shadow-cyan-500/50 transition-all relative overflow-hidden group'
            >
              <span className='relative z-10'>Verify Email</span>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </button>
          </form>

          {/* Resend code */}
          <div className='mt-6 text-center'>
            <p className='text-gray-400 text-sm'>
              Didn't receive the code?{' '}
              <span className='text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold transition-colors'>
                Resend →
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailVerify