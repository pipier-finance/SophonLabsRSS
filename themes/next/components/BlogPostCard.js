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
        className="p-4 flex flex-col-reverse justify-between duration-300"
      >
            <div className="flex flex-col mb-4 flex-wrap dark:text-gray-500 text-gray-400 text-xs leading-6">
              <div>
                  {post.category && (
                  <>
                    <Link href={`/category/${post.category}`} passHref>
                      <a className="cursor-pointer font-light text-sm">
                        <i className="mr-3 fas fa-folder" />
                        {post.category}
                      </a>
                    </Link>
                    <span> · </span>
                  </>
                )}
                <Link
                  href={`/archive#${post?.pubDate}`}
                  passHref
                >
                  <a className="font-light cursor-pointer text-sm leading-4 mr-3">
                    {formatDateLocal(post.pubDate, 'MM-DD HH:mm')}
                  </a>
                </Link>
              </div>
              <div className='flex flex-col'>
                <div className='flex justify-between lg:mt-4 lg:mr-4'>
                  <Link href={`${post.link}`} passHref>
                    <a
                      className={`cursor-pointer text-2xl leading-tight text-black font-bold mr-3`}
                    >
                  {post.title}
                    </a>
                  </Link>
                  <NotionIcon icon={post?.image} />
                </div>
                {showPreview && post?.blockMap && (
                  <div className="overflow-ellipsis text-justify text-sm text-gray-500 mt-3 break-words" dangerouslySetInnerHTML={{__html: post.blockMap}}/>
                )}
              </div>
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
