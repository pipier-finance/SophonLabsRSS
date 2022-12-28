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

const BlogPostCard = ({ post, showSummary }) => {
  const { locale } = useGlobal()
  const showPreview = CONFIG_NEXT.POST_LIST_PREVIEW && post.blockMap
  return (
    <Card className="w-full animate__animated animate__fadeIn">
      <div
        key={post.sign}
        className="flex flex-col-reverse justify-between duration-300"
      >
        <div className="lg:p-8 p-4 flex flex-col w-full lg:pl-0">
          <Link href={`${post.link}`} passHref>
            <a
              className={`cursor-pointer hover:underline text-2xl leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400`}
            >
            <NotionIcon icon={post.image} />{post.title}
            </a>
          </Link>
          <div
            className={`flex mt-2 items-center ${showPreview ? 'justify-center' : 'justify-start'
              } flex-wrap dark:text-gray-500 text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 `}
          >
            <div>
              {post.category && (
                <>
                  <Link href={`/category/${post.category}`} passHref>
                    <a className="cursor-pointer font-light text-sm hover:underline transform">
                      <i className="mr-1 fas fa-folder" />
                      {post.category}
                    </a>
                  </Link>
                  <span className="mx-2">|</span>
                </>
              )}
              <Link
                href={`/archive#${post?.pubDate}`}
                passHref
              >
                <a className="font-light hover:underline cursor-pointer text-sm leading-4 mr-3">
                  {post.pubDate}
                </a>
              </Link>
            </div>
          </div>

          {/* {(!showPreview || showSummary) && !post.results && (
            <p className="mt-4 mb-24 text-gray-700 dark:text-gray-300 text-sm font-light leading-7">
              {post.summary}
            </p>
          )} */}

          {/* 搜索结果 */}
          {/* {post.results && (
            <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm font-light leading-7">
              {post.results.map(r => (
                <span key={r}>{r}</span>
              ))}
            </p>
          )} */}

          {showPreview && post?.blockMap && (
            <div className="overflow-ellipsis" dangerouslySetInnerHTML={{__html: post.blockMap}}/>
            // <div className="overflow-ellipsis truncate">
            //   {post?.blockMap}
            // </div>
          )}
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
