import Image from 'next/image'
import React from 'react'

const Logo = () => {
  return (
    <Image src={'./logo.svg'} width={100} height={100} alt='logo da empresa'/>
  )
}

export default Logo