import Link from 'next/link'
import React from 'react'

const Logo = props => {
  const { siteInfo } = props
  const Logo = `url("${siteInfo?.logo}")`
  return <Link href='/' passHref>
    <div className='cursor-pointer dark:bg-gray-800 font-bold'>
      <div className='flex items-center px-3'>
        <div className='font-serif text-xl text-white w-8 h-8 bg-contain bg-center bg-no-repeat overflow-hidden ' style={{ backgroundImage: Logo }}>
        </div>
        <div className='text-sm text-labs-black font-light ml-2'>SophoNews</div>
      </div>
    </div>
  </Link>
}
export default Logo