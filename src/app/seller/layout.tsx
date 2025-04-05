import SellerHeader from '@/components/shared/sellerHeader'
import React from 'react'

const SellerLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <SellerHeader/>
        {children}
    </div>
  )
}

export default SellerLayout