import BLOG from '@/blog.config'
import { getRssList } from '@/lib/notion/getRssList'
import * as ThemeMap from '@/themes'
import { useGlobal } from '@/lib/global'
import { formatDateLocal } from '@/lib/formatDate'

const Index = props => {
  const { theme } = useGlobal()
  const ThemeComponents = ThemeMap[theme]
  return <ThemeComponents.LayoutIndex {...props} />
}

export async function getStaticProps() {
  const props = await getRssList(formatDateLocal(Date.now() , 'YYYYMD'))
  // rss - channel - item - description
  console.log(props,'getStaticProps')
  props.siteInfo = {
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    pageCover: BLOG.AVATAR,
    logo: BLOG.LOGO
  }
  const { siteInfo } = props
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

  // 处理id
  for (const i in props.posts) {
    const post = props.posts[i]
    post.pid = +i + 1
  }

  // 预览文章内容
  if (BLOG.POST_LIST_PREVIEW === 'true') {
    for (const i in props.posts) {
      const post = props.posts[i]
      post.blockMap = post.description
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
