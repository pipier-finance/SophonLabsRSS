import LayoutBase from './LayoutBase'
import Header from './components/Header'
import LatestPostsGroup from './components/LatestPostsGroup'
import Card from './components/Card'
import BlogPostListScroll from './components/BlogPostListScroll'
import NewsListScroll from './components/NewsListScroll'
import BlogPostListPage from './components/BlogPostListPage'
import CONFIG_NEXT from './config_next'
import BLOG from '@/blog.config'

export const LayoutNews = (props) => {
  const { posts } = props
  // posts
  const rightAreaSlot = CONFIG_NEXT.RIGHT_LATEST_POSTS && <Card><LatestPostsGroup latestPosts={posts} /></Card>
  return <LayoutBase
    headerSlot={CONFIG_NEXT.HOME_BANNER && <Header {...props} />}
    sideBarSlot={<LatestPostsGroup posts={posts} />}
    rightAreaSlot={rightAreaSlot}
    {...props}
  >
    <NewsListScroll {...props} showSummary={true} />
  </LayoutBase>
}
