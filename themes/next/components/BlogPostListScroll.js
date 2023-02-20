import BLOG from '@/blog.config'
import BlogPostCard from './BlogPostCard'
import BlogPostListEmpty from './BlogPostListEmpty'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import CONFIG_NEXT from '../config_next'

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
  const [page, updatePage] = useState(1)
  const postsToShow = getPostByPage(page, posts, postsPerPage)

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
    console.log('useEffect')
    window.addEventListener('scroll', scrollTrigger)
    return () => {
      window.removeEventListener('scroll', scrollTrigger)
    }
  }, [page])

  const targetRef = useRef(null)
  if (!postsToShow || postsToShow.length === 0) {
    return <BlogPostListEmpty currentSearch={currentSearch} />
  } else {
    return <div ref={targetRef} className="lg:mr-6">
      {/* 文章列表 */}
      <div id='container' className='flex flex-wrap space-y-1 lg:space-y-4'>
        {postsToShow.map(post => (
          <BlogPostCard key={post.id} post={post} showSummary={showSummary} />
        ))}
      </div>
    </div>
  }
}

/**
 * 获取从第1页到指定页码的文章
 * @param page 第几页
 * @param totalPosts 所有文章
 * @param postsPerPage 每页文章数量
 * @returns {*}
 */
const getPostByPage = (page, totalPosts, postsPerPage) => {
  console.log('getPostByPage', page, totalPosts, postsPerPage)
  return totalPosts.slice(
    0,
    postsPerPage * page
  )
}
export default BlogPostListScroll
