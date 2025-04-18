import React from 'react'

const SpinLoader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-yellow-400"></div>
  </div>
  )
}

export default SpinLoader