import BLOG from '@/blog.config'
import React from 'react'
import BlogCard from './BlogCard'
import BlogPostListEmpty from './BlogListEmpty'
import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
/**
 * 文章列表分页表格
 * @param page 当前页
 * @param posts 所有文章
 * @param tags 所有标签
 * @returns {JSX.Element}
 * @constructor
 */
const BlogListScroll = props => {
  const { posts = [] } = props
  const [colCount, changeCol] = React.useState(1)
  const { locale } = useGlobal()

  function updateCol() {
    if (window.outerWidth > 1200) {
      changeCol(3)
    } else if (window.outerWidth > 900) {
      changeCol(2)
    } else {
      changeCol(1)
    }
  }
  const targetRef = React.useRef(null)

  const [page, updatePage] = React.useState(1)

  let hasMore = false
  const postsToShow = posts
    ? Object.assign(posts).slice(0, BLOG.POSTS_PER_PAGE * page)
    : []

  if (posts) {
    const totalCount = posts.length
    hasMore = page * BLOG.POSTS_PER_PAGE < totalCount
  }
  const handleGetMore = () => {
    if (!hasMore) return
    updatePage(page + 1)
  }

  // 监听滚动自动分页加载
  const scrollTrigger = React.useCallback(throttle(() => {
    const scrollS = window.scrollY + window.outerHeight
    const clientHeight = targetRef ? (targetRef.current ? (targetRef.current.clientHeight) : 0) : 0
    if (scrollS > clientHeight + 100) {
      handleGetMore()
    }
  }, 500))

  React.useEffect(() => {
    updateCol()
    window.addEventListener('scroll', scrollTrigger)

    window.addEventListener('resize', updateCol)
    return () => {
      window.removeEventListener('resize', updateCol)
      window.removeEventListener('scroll', scrollTrigger)
    }
  })

  if (!posts || posts.length === 0) {
    return <BlogPostListEmpty />
  } else {
    return (
      <div id="container" ref={targetRef} >
        {/* 文章列表 */}
        <div style={{ columnCount: colCount }}>
          {postsToShow?.map(post => (
            <div key={post.id} className='justify-center flex' style={{ breakInside: 'avoid' }}>
              <BlogCard key={post.id} post={post} />
            </div>
          ))}
        </div>

        <div
              onClick={handleGetMore}
              className="w-full my-4 py-4 text-center cursor-pointer "
          >
              {' '}
              {hasMore ? locale.COMMON.MORE : locale.COMMON.NO_MORE}{' '}
          </div>
      </div>
    )
  }
}

export default BlogListScroll
