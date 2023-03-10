import BLOG from '@/blog.config'
import { getRssList } from '@/lib/notion/getRssList'
import { getAcitveLists } from '@/lib/notion/getAcitveLists'
import * as ThemeMap from '@/themes'
import { useGlobal } from '@/lib/global'
import { formatDateLocal } from '@/lib/formatDate'

const Depth = props => {
  const { theme } = useGlobal()
  const ThemeComponents = ThemeMap[theme]
  return <ThemeComponents.LayoutDepth {...props} />
}

export async function getStaticProps() {
  const currentData = formatDateLocal(Date.now(), 'YYYYMD')
  const props = await getRssList(currentData)
  const activeLists = await getAcitveLists('activeLists')
  // rss - channel - item - description
  props.siteInfo = {
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    pageCover: BLOG.AVATAR,
    logo: BLOG.LOGO
  }
  props.activeLists = activeLists
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

  return {
    props: {
      meta,
      ...props
    },
    revalidate: BLOG.NEXT_REVALIDATE_SECOND
  }
}

export default Depth
