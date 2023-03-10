import BLOG from '@/blog.config'
import NewsCard from './NewsCard'
import NewsListEmpty from './NewsListEmpty'
import throttle from 'lodash.throttle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useGlobal } from '@/lib/global'
import dayjs from 'dayjs'
import { formatDateLocal } from '@/lib/formatDate'

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
  const { locale } = useGlobal()
  // newsList 返回的数据结构 [{id:'', posts: []}]， 同一日期的文章放在一起
  function postsByDate(posts) {
    const dataByDate = {}
    const nestArray = []
    posts.forEach(item => {
      const { publishedOn, ...rest } = item;
      const postDate = dayjs(publishedOn).format('YYYY-MM-DD')
      if (!dataByDate[postDate]) {
        dataByDate[postDate] = [];
      }
      dataByDate[postDate].push({...rest, publishedOn});
    });
    Object.entries(dataByDate).forEach(([date, data]) => {
      nestArray.push({ id: date, posts: data });
    });

    const finalArray = nestArray.sort((a, b) => {
      return dayjs(b.id).valueOf() - dayjs(a.id).valueOf();
    })
    return finalArray
  }

  const [page, updatePage] = useState(1)
  const [postsList, updatePostsList] = useState(postsByDate(posts))
  // const postsToShow = getPostByPage(page, postsList, postsPerPage)
  console.log(postsList, "postsList")

 
  let hasMore = false
  if (posts && posts.length) {
    const totalCount = posts.length
    hasMore = page * postsPerPage < totalCount
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
  return <div ref={targetRef} id='container' className='flex flex-wrap rounded'>
      {postsList.map((post) => (
        <div className='px-2 flex flex-wrap'>
          <div className='text-article-st mb-4'>
            <span className='text-lg font-normal'>{formatDateLocal(post.id, 'M')}</span>
            <span className='text-lg font-normal px-1'>/</span>
            <span className='text-2xl font-bold'>{formatDateLocal(post.id, 'D')}</span>
          </div>
          {post.posts.map((item, index) => (
            <NewsCard key={item.id} post={item} showSummary={showSummary} />
          ))}
        </div>
      ))}
      {/* {!postsList || postsList.length === 0 && <NewsListEmpty currentSearch={currentSearch} />} */}
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
