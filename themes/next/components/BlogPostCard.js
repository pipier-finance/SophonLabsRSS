import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import Card from './Card'
import TagItemMini from './TagItemMini'
import CONFIG_NEXT from '../config_next'
import NotionPage from '@/components/NotionPage'
import NotionIcon from '@/components/NotionIcon'
import {formatDateLocal} from '@/lib/formatDate'

const BlogPostCard = ({ post, showSummary }) => {
  const { locale } = useGlobal()
  const showPreview = CONFIG_NEXT.POST_LIST_PREVIEW && post.blockMap
  return (
    <Card className="w-full animate__animated animate__fadeIn">
      <div
        key={post.sign}
        className="px-4 pt-3 lg:p-0 flex flex-col-reverse justify-between duration-300"
      >
            <div className="flex flex-col flex-wrap dark:text-gray-500 text-gray-400 text-xs leading-6 pb-4 border-b">
              <div className='text-gray-600 flex items-center justify-start'>
                  {post.category && (
                  <>
                    <div className="cursor-pointer font-light text-sm">
                      {/* <i className="mr-3 fas fa-globe" /> */}
                      <span>{post.category}</span>
                    </div>
                    <span className='mx-0.5'>·</span>
                  </>
                )}
                <div className="font-light cursor-pointer text-sm leading-4">
                  {formatDateLocal(post.pubDate, 'MM-DD HH:mm')}
                </div>
              </div>
              <Link href={`${BLOG.SUB_PATH}/article/${post.id}`} passHref>
                <div className='flex flex-col w-full my-0 my-auto'>
                  <div className='mt-2 flex justify-between lg:mr-4'>
                    <a
                      className={`cursor-pointer text-xl lg:text-2xl leading-tight text-black font-bold mr-3`}
                    >
                      {post.title}
                    </a>
                    <NotionIcon icon={post?.image} />
                  </div>
                  {showPreview && post?.blockMap && (
                    <div className="text-justify text-sm text-gray-500 mt-3 line-clamp-3 overflow-hidden overflow-ellipsis" dangerouslySetInnerHTML={{__html: post.blockMap}}>
                    </div>
                  )}
                </div>
              </Link>
          </div>
        {CONFIG_NEXT.POST_LIST_COVER && post?.image && (
          <Link href={`${post.link}`} passHref>
            <div className="h-72 w-full relative duration-200 cursor-pointer transform overflow-hidden">
              <Image
                className="hover:scale-105 transform duration-500"
                src={post?.image}
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
