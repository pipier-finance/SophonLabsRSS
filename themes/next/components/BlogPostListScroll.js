import BLOG from '@/blog.config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import throttle from 'lodash.throttle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay } from "swiper";
import 'swiper/css'
import "swiper/css/navigation";
import Image from 'next/image'
import Link from 'next/link'
import {TagList} from '@/lib/tag'

/**
 * 博客列表滚动分页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogPostListScroll = (props) => {
  const { posts , showSummary, currentSearch} = props
  const postsPerPage = BLOG.POSTS_PER_PAGE
  const swiperRef = useRef();
  const [page, updatePage] = useState(1)
  const [tag, updateTag] = useState(0)
  const isBannerList = posts.filter(item => !item.isTop).slice(0,3)
  const [postsList, updatePostsList] = useState(posts)
  const postsToShow = getPostByPage(page, postsList, postsPerPage)

  let hasMore = false
  if (posts && posts.length) {
    const totalCount = posts.length
    hasMore = page * postsPerPage < totalCount
  }

  const handleChoiceTag = (tag) => {
    console.log(tag, postsList, "init")
    postsList = posts
    updateTag(tag.id)
    if (tag.id === 0) {
      updatePostsList(posts)
    } else {
      const tagedPosts = postsList.filter(item => item.tags.includes(tag.name))
      updatePostsList(tagedPosts)
    }
  }
  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // 监听滚动自动分页加载
  const scrollTrigger = useCallback(throttle(() => {
    const scrollS = window.scrollY + window.outerHeight
    const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
    console
    if (scrollS > clientHeight + 100) {
      handleGetMore()
    }
  }, 500))

  // 监听滚动
  useEffect(() => {
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [page])

  const targetRef = useRef(null)
  return <div ref={targetRef} id='container'  className='flex flex-col rounded'>
      <div className='relative w-screen h-56 xl:w-sophon-swiper xl:h-sophon-slice' >
        <Swiper 
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper
          }}
          modules={[Navigation]} 
          autoplay={{delay: 3000, disableOnInteraction: false}}  
          className='cursor-pointer  xl:max-w-4xl'
        >
          {isBannerList.map(item => (
            <SwiperSlide key={item.id}>
              <Link href={`/article/${item.id}`}>
                <div className=''>
                  <img src={item.imageUrl}  className='w-screen h-56 xl:w-sophon-swiper xl:h-sophon-slice object-cover'/>
                  <div className='absolute h-20 bottom-1.5 w-80 xl:w-full bg-gray-800 bg-opacity-20'>
                    <h3 className='text-white p-4 xl:text-xl font-bold'>{item.title}</h3>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className='absolute top-20 xl:top-32 w-full flex justify-between z-20 px-2 xl:px-4'>
          <button onClick={() => swiperRef.current?.slidePrev()}>
            <Image src="/left.svg" width={36} height={36} alt="left"/>
          </button>
          <button onClick={() => swiperRef.current?.slideNext()}>
            <Image src="/right.svg" width={36} height={36} alt="right"/>
          </button>
        </div>
      </div>
      {/* 标签过滤 */}
      <div className='hidden z-50 xl:flex flex-wrap bg-white justify-around my-6 text-sm overflow-x-scroll border py-10 px-4 border-opacity-8 rounded-md select-none'>
        {TagList && TagList.map(item => (<div onClick={() => handleChoiceTag(item)} className={['h-7 bg-gray-100 rounded-full flex items-center p-2 cursor-pointer ', item.id === tag ? 'bg-sophon text-white':'text-labs-black'].join('')}>
          <span className=''>{item.name}</span>
        </div>))}
      </div>
      <div className='xl:hidden sticky top-14 z-50 w-screen pl-4 pt-4 pb-4 border-t-1 bg-white gap-1 text-xs overflow-x-auto overflow-y-hidden  border-t select-none  scrollbar-hide'>
        <div className='whitespace-nowrap flex space-x-4'>
          {TagList && TagList.map(item => (<div onClick={() => handleChoiceTag(item)} className={['bg-gray-100 rounded-md p-2 cursor-pointer ', item.id === tag ? 'bg-sophon text-white':'text-labs-black'].join('')}>
            <span className='align-top h-6'>{item.name}</span>
          </div>))}
        </div>
      </div>
      {postsToShow.map(post => (
        <BlogPostCard key={post.id} post={post} showSummary={showSummary} />
      ))}
      {!postsToShow || postsToShow.length === 0 && <BlogPostListEmpty currentSearch={currentSearch} />}
  </div>
}

/**
 * 获取从第1页到指定页码的文章
 * @param page 第几页
 * @param totalPosts 所有文章
 * @param postsPerPage 每页文章数量
 * @returns {*}
 */
const getPostByPage = (page, totalPosts, postsPerPage) => {
  return totalPosts.slice(
    0,
    postsPerPage * page
  )
}
export default BlogPostListScroll
