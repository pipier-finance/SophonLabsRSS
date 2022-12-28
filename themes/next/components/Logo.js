import Link from 'next/link'
import React from 'react'

const Logo = props => {
  const { siteInfo, className } = props
  const Logo = `url("${siteInfo?.logo}")`
  return <Link href='/' passHref>
    <div className={'flex justify-center items-center cursor-pointer dark:bg-gray-800 font-bold ' + className}>
      <div className='font-serif text-xl text-white w-8 h-8 bg-contain bg-center bg-no-repeat overflow-hidden' style={{ backgroundImage: Logo }}></div>
      <div className='text-sm text-gray-300 font-light text-center ml-2'> {siteInfo?.description}</div>
    </div>
  </Link>
}
export default Logo
