import React from 'react'
import BLOG from '@/blog.config'
import DarkModeButton from '@/components/DarkModeButton'
import Image from 'next/image'

const Footer = ({ title }) => {
  const d = new Date()
  const currentYear = d.getFullYear()
  const copyrightDate = (function() {
    if (Number.isInteger(BLOG.SINCE) && BLOG.SINCE < currentYear) {
      return BLOG.SINCE + '-' + currentYear
    }
    return currentYear
  })()

  return (
    <footer
      className='dark:bg-gray-800 text-sm p-6 bg-white dark:text-gray-400'
    >
      {/* <DarkModeButton/> */}
      <div className=''>
        <Image src="/logo.png" width={92} height={80} alt="SophonLabs" />
      </div>
      <span>
        <h1>{title}</h1>
        <span className='text-xs font-serif  text-gray-500 dark:text-gray-300 '> © 2022 SophonLabs, Inc.</span>
      </span>
    </footer>
  )
}

export default Footer
