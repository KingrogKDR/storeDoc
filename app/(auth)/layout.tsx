import Image from 'next/image'
import React from 'react'

const AuthLayout = ({ children } : { children : React.ReactNode}) => {
  return (
    <div className="h-screen center px-10 mt-3">
        <div>
            <div id="logo" className='flex items-center justify-center'>
                <Image 
                    src="/assets/logo.svg" 
                    alt="logo" 
                    width={200} 
                    height={100}
                    
                />
            </div>
            {children}
        </div>
    </div>
  ) 
}

export default AuthLayout