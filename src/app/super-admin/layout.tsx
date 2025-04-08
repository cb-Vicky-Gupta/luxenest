import SuperHeader from '@/components/shared/superHeader'
import React from 'react'

const SuperLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
      <SuperHeader/>
        {children}
    </div>
  )
}

export default SuperLayout