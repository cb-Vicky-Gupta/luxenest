import SpinLoader from '@/components/SpinLoader';
import React from 'react'

const Loading = () => {
  return (
    <div className='min-w-screen bg-opacity-40 bg-slate-400 flex justify-center items-center'><SpinLoader/></div>
  )
}

export default Loading;