import BLOG from '@/blog.config'
import { getGlobalNotionData } from '@/lib/notion/getNotionData'
import { getRssList } from '@/lib/notion/getRssList'
import * as ThemeMap from '@/themes'
import { useGlobal } from '@/lib/global'
const Index = props => {
  const { theme } = useGlobal()
  const ThemeComponents = ThemeMap[theme]
  return <ThemeComponents.LayoutIndex {...props} />
}

export async function getStaticProps() {
  const props = await getRssList()
  // rss - channel - item - description
  props.siteInfo = {
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    pageCover: BLOG.AVATAR,
  }
  console.log(props)
  const { siteInfo, rss } = props
  props.posts = rss.channel.item
  const meta = {
    title: `${siteInfo?.title} | ${siteInfo?.description}`,
    description: siteInfo?.description,
    image: siteInfo?.pageCover,
    slug: '',
    type: 'website'
  }
  // 处理分页
  if (BLOG.POST_LIST_STYLE === 'scroll') {
    // 滚动列表默认给前端返回所有数据
  } else if (BLOG.POST_LIST_STYLE === 'page') {
    props.posts = props.posts?.slice(0, BLOG.POSTS_PER_PAGE)
  }

  // 预览文章内容
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    for (const i in props.posts) {
      const post = props.posts[i]
      post.blockMap = post.description
      console.log(post.blockMap)
    }
  }

  return {
    props: {
      meta,
      ...props
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND
  }
}

export default Index
