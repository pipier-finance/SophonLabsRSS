import React from 'react'
import BLOG from '@/blog.config'
import DarkModeButton from '@/components/DarkModeButton'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTwitter,
  faDiscord,
  faTelegram
} from "@fortawesome/free-brands-svg-icons";

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
      className='dark:bg-gray-800 text-sm p-6 bg-sophon dark:text-gray-400'
    >
      {/* <DarkModeButton/> */}
      <div className='flex items-center'>
        <Image src="/whitelogo.png" width={40} height={40} alt="SophonLabs" />
        <h1 className='text-white ml-2'>{title}</h1>
      </div>
      <div className='text-white'>
        <div className='w-1/2 mt-3 align-top'>
          <p className='text-xs'>专注全球区块链资讯，提供有价值的Web3信息。</p>
        </div>
        <div className='w-1/2 mt-3 align-top'>
          <p className='text-xs'>联系我们</p>
          <ul className='text-xs'>
            <li>
              <a href='mailto:news@sophonlabs.io'>news@sophonlabs.io</a>
            </li>
          </ul>
        </div>
      </div>
      <div className='flex items-center mt-3'>
        <a href='' name="twitter" title='twitter'>
          <FontAwesomeIcon icon={faTwitter}  color="#fff"/>
        </a>
        <a href='' name="discord" title='discord' className='mx-2'>
          <FontAwesomeIcon icon={faDiscord}  color="#fff"/>
        </a>
        <a href='' name="telegram" title='telegram'>
          <FontAwesomeIcon icon={faTelegram}  color="#fff"/>
        </a>
      </div>
      <div className='mt-3'>
        <span className='text-xs font-serif  text-white dark:text-gray-300 '> © SophonLabs, Ltd. All rights reserved</span>
      </div>
      <div className=''>

      </div>
    </footer>
  )
}

export default Footer
