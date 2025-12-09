import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { AppContent } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const Login = () => {
  const navigate = useNavigate()
  const {backendUrl, setIsLoggedin, getUserData, setUserData} = useContext(AppContent)
  
  const [state, setState] = useState('Sign Up')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      axios.defaults.withCredentials = true;

      if (state === 'Sign Up') {
  const { data } = await axios.post(backendUrl + '/api/auth/register', {
    name,
    email,
    password
  });

  if (data.success) {
     // ← use the user returned from backend directly
    setIsLoggedin(true);
    setUserData(data.user);
    navigate('/');
  } else {
    toast.error(data.message);
  }
} else {
  const { data } = await axios.post(backendUrl + '/api/auth/login', {
    email,
    password
  });

  if (data.success) {
    setIsLoggedin(true);
    setUserData(data.user); // ← also set on login
    navigate('/');
  } else {
    toast.error(data.message);
  }
}

    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='relative flex items-center justify-center min-h-screen px-6 sm:px-0 bg-black overflow-hidden'>
      {/* Animated background grid */}
      <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10'></div>
      <div className='absolute inset-0' style={{
        backgroundImage: `linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      {/* Glowing orbs */}
      <div className='absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse'></div>
      <div className='absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse' style={{animationDelay: '1s'}}></div>
      
      <img 
        onClick={() => navigate('/')} 
        src={assets.logo} 
        className='absolute left-5 sm:left-20 top-5 w-28 sm:w-32 cursor-pointer z-10 hover:scale-110 transition-transform' 
        alt="" 
      />
      
      <div className='relative bg-gray-900/80 backdrop-blur-xl p-10 rounded-2xl shadow-2xl w-full sm:w-96 border border-cyan-500/30 hover:border-cyan-500/50 transition-all'>
        {/* Glow effect on card */}
        <div className='absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5 rounded-2xl'></div>
        
        <div className='relative z-10'>
          <div className='flex items-center justify-center mb-6'>
            <div className='w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-500 to-purple-500 flex items-center justify-center shadow-lg shadow-cyan-500/50'>
              <span className='text-2xl'>⚡</span>
            </div>
          </div>
          
          <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400 text-center mb-2'>
            {state === 'Sign Up' ? 'Join The Network' : 'Access Portal'}
          </h2>
          
          <p className='text-center text-sm mb-8 text-gray-400'>
            {state === 'Sign Up' ? 'Initialize your credentials' : 'Authenticate your identity'}
          </p>
          
          <form onSubmit={onSubmitHandler}>
            {state === 'Sign Up' && (
              <div className='mb-4 group'>
                <label className='text-xs text-cyan-400 mb-1 block font-semibold'>FULL NAME</label>
                <div className='flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700 group-hover:border-cyan-500/50 transition-all'>
                  <img src={assets.person_icon} alt="" className='w-5 h-5 opacity-70' />
                  <input 
                    onChange={e => setName(e.target.value)} 
                    value={name} 
                    className='bg-transparent outline-none text-white w-full placeholder-gray-500' 
                    type="text"  
                    placeholder='Enter your name' 
                    required
                  />
                </div>
              </div>
            )}
         
            <div className='mb-4 group'>
              <label className='text-xs text-cyan-400 mb-1 block font-semibold'>EMAIL</label>
              <div className='flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700 group-hover:border-cyan-500/50 transition-all'>
                <img src={assets.mail_icon} alt="" className='w-5 h-5 opacity-70' />
                <input 
                  onChange={e => setEmail(e.target.value)} 
                  value={email} 
                  className='bg-transparent outline-none text-white w-full placeholder-gray-500' 
                  type="email"  
                  placeholder='you@example.com' 
                  required
                />
              </div>
            </div>
            
            <div className='mb-4 group'>
              <label className='text-xs text-cyan-400 mb-1 block font-semibold'>PASSWORD</label>
              <div className='flex items-center gap-3 w-full px-5 py-3 rounded-lg bg-gray-800/50 border border-gray-700 group-hover:border-cyan-500/50 transition-all'>
                <img src={assets.lock_icon} alt="" className='w-5 h-5 opacity-70' />
                <input
                  onChange={e => setPassword(e.target.value)} 
                  value={password} 
                  className='bg-transparent outline-none text-white w-full placeholder-gray-500' 
                  type="password"  
                  placeholder='••••••••' 
                  required
                />
              </div>
            </div>

            {state === 'Login' && (
              <p 
                onClick={() => navigate('/reset-password')} 
                className='mb-6 text-cyan-400 hover:text-cyan-300 cursor-pointer text-sm text-right transition-colors'
              >
                Forgot Password?
              </p>
            )}

            <button 
              disabled={isLoading}
              className='w-full py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-bold cursor-pointer hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group'
            >
              <span className='relative z-10'>
                {isLoading ? 'Processing...' : state === 'Sign Up' ? 'Create Account' : 'Login'}
              </span>
              <div className='absolute inset-0 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity'></div>
            </button>
          </form>

          <div className='mt-6 text-center'>
            <div className='flex items-center gap-2 mb-4'>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent'></div>
              <span className='text-xs text-gray-500'>OR</span>
              <div className='flex-1 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent'></div>
            </div>
            
            {state === 'Sign Up' ? (
              <p className='text-gray-400 text-sm'>
                Already registered?{' '}
                <span 
                  onClick={() => setState('Login')} 
                  className='text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold transition-colors'
                >
                  Login here →
                </span>
              </p>
            ) : (
              <p className='text-gray-400 text-sm'>
                New to the platform?{' '}
                <span 
                  onClick={() => setState('Sign Up')} 
                  className='text-cyan-400 hover:text-cyan-300 cursor-pointer font-semibold transition-colors'
                >
                  Sign up →
                </span>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
