import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'

const Home = () => {
  return (
    <div className='relative flex flex-col items-center justify-start
      min-h-screen w-full bg-black overflow-hidden'>

     
      <div className='absolute inset-0 opacity-30'
        style={{
          backgroundImage:
            `linear-gradient(rgba(6, 182, 212, 0.12) 1px, transparent 1px),
             linear-gradient(90deg, rgba(6, 182, 212, 0.12) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}>
      </div>

    
      <div className='absolute inset-0'>
        <div className='absolute top-0 left-0 w-72 h-72 sm:w-[500px] sm:h-[500px]
          bg-cyan-500/20 rounded-full blur-3xl'></div>

        <div className='absolute top-1/3 right-0 w-80 h-80 sm:w-[600px] sm:h-[600px]
          bg-purple-500/20 rounded-full blur-3xl'></div>

        <div className='absolute bottom-0 left-1/3 w-64 h-64 sm:w-[400px] sm:h-[400px]
          bg-pink-500/20 rounded-full blur-3xl'></div>
      </div>

     
      <div className='absolute inset-0 bg-[url("/bg_img.png")] bg-cover bg-center opacity-10'></div>

     
      <div className='relative z-10 w-full'>
        <Navbar />
        <Header />
      </div>
    </div>
  )
}

export default Home
