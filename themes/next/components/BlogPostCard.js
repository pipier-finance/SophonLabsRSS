import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Card from './Card'
import TagItemMini from './TagItemMini'
import CONFIG_NEXT from '../config_next'
import {formatDateLocal} from '@/lib/formatDate'

const BlogPostCard = ({ post, showSummary }) => {
  const { locale } = useGlobal()
  console.log(post,"postss")
  return (
    <Card className="">
      <div
        key={post.sign}
        className="px-4 pt-3 lg:p-0 flex flex-col-reverse justify-between duration-300"
      >
        <div className="flex flex-col flex-wrap dark:text-gray-500 text-gray-400 text-xs border-b pt-3 pb-5">
            <div className='flex flex-col xl:flex-row justify-between'>
                <div className="flex-1 text-xl lg:text-2xl leading-sophon-size mr-3">
                  <Link href={`${BLOG.SUB_PATH}/article/${post.id}`} passHref>
                    <div className='text-xl leading-7 font-bold text-black cursor-pointer'>{post.title}</div>
                  </Link>
                  <div className='flex items-center justify-start mt-3'>
                      {post.author && (
                      <>
                        <Image src={post.author.logo} width={24} height={24} className="rounded-full border border-solid border-gray-400" />
                        <div className="font-light text-xs leading-6 ml-2">
                          <span className='mr-2 text-author font-normal'>{post.author.name}</span>
                          <span className=''>{formatDateLocal(post.publishedOn, 'HH:mm')}</span> 
                        </div>
                      </>
                    )}
                  </div>
                    {post?.description && (
                      <div className="text-sm leading-6 text-subTitle mt-3 line-clamp-2 overflow-hidden overflow-ellipsis" dangerouslySetInnerHTML={{__html: post.description}}>
                      </div>
                    )}
                    {post?.tags.length > 0 ? <div className='mb-4 xl:mb-0 mt-3 text-xs leading-5.5 font-extralight flex space-x-2'>
                      {post.tags.map(item=> ( <div className='px-2 h-5.5 rounded-full cursor-pointer bg-sophon text-white hover: hover:bg-opacity-90' key={item}>{item}</div>))}
                    </div> : <div className='mt-4 xl:mt-0'></div>}
                </div>
                <div className='flex-grow-0'>
                  <img src={post.imageUrl} className='w-full h-56 xl:w-32 xl:h-20 rounded-md hover:transition-all object-cover flex-1 flex-shrink'/>
                </div>
            </div>
      </div>
      {CONFIG_NEXT.POST_LIST_COVER && post?.imageUrl && (
        <Link href={`${post.link}`} passHref>
          <div className="h-72 w-full relative duration-200 cursor-pointer transform overflow-hidden">
            <Image
              className="hover:scale-105 transform duration-500"
              src={post?.imageUrl}
              alt={post.title}
              layout="fill"
              objectFit="cover"
              loading="lazy"
            />
          </div>
        </Link>
      )}
    </div>
    </Card>
  )
}

export default BlogPostCard
