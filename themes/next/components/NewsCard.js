import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Card from './Card'
import { formatDateLocal } from '@/lib/formatDate'

const NewsCard = ({ post, showSummary }) => {
  const { locale } = useGlobal()
  console.log(post,"postss")
  return (
    <div className="ml-2 relative border-l border-solid border-subTitle  border-transparent">
      <div className='flex justify-between h-7'>
        <div className='flex items-center text-gray-500 text-opacity-40'>
          <i className=' block h-3 w-3 rounded-lg bg-sophon -ml-1.5 -mt-4'></i>
          <span className='ml-2 -mt-4'>{formatDateLocal(post.publishedOn, 'HH:MM')}</span>
        </div>
      </div>
      <div className="ml-4 pb-7 flex flex-col flex-wrap dark:text-gray-500 text-gray-400 text-xs">
        <div className='flex w-full justify-between'>
            <div className="flex-1 text-xl lg:text-2xl leading-sophon-size mr-3">
              <Link href={`${BLOG.SUB_PATH}/article/${post.id}`} passHref>
                <div className='text-xl leading-7 font-bold text-black cursor-pointer hover:underline hover:decoration-2'>{post.title}</div>
              </Link>
              {post?.description && (
                <div className="text-sm leading-6 text-subTitle mt-3 line-clamp-2 overflow-hidden overflow-ellipsis break-all" dangerouslySetInnerHTML={{__html: post.description}}>
                </div>
              )}
            </div>
        </div>
      </div>
    </div>
  )
}

export default NewsCard
