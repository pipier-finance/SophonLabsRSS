import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { getArticeDetail } from '@/lib/notion/getPostBlocks'
import { getRssList } from '@/lib/notion/getRssList'
import { formatDateLocal } from '@/lib/formatDate'
import * as ThemeMap from '@/themes'
import React from 'react'
import { useRouter } from 'next/router'
import { isBrowser } from '@/lib/utils'

/**
 * 根据id访问页面
 * @param {*} props
 * @returns
 */
const Slug = props => {
  const router = useRouter()
  const { theme, changeLoadingState } = useGlobal()
  const ThemeComponents = ThemeMap[theme]
  const { siteInfo } = props
  if (!props) {
    changeLoadingState(true)
    setTimeout(() => {
      if (isBrowser()) {
        const article = document.getElementById('container')
        if (!article) {
          router.push('/404').then(() => {
            // console.warn('找不到页面', router.asPath)
          })
        }
      }
    }, 10000)
    const meta = { title: `${props?.siteInfo?.title || BLOG.TITLE} | loading`, image: siteInfo?.pageCover }
    return <ThemeComponents.LayoutSlug {...props} showArticleInfo={true} meta={meta} />
  }

  changeLoadingState(false)

  const meta = {
    title: `${props?.title} | ${siteInfo?.title}`,
    description: props?.description,
    type: 'article',
    slug: 'article/' + props?.slug,
    image: props?.page_cover,
    category: props?.category?.[0],
    tags: props?.tags
  }
  return (
    <ThemeComponents.LayoutSlug {...props} showArticleInfo={true} meta={meta} />
  )
}

export async function getStaticPaths() {
  const currentData = formatDateLocal(Date.now(), 'YYYYMD')
  const { posts } = await getRssList(currentData)
  return {
    paths: posts.map(row => ({ params: { slug: '' + row.id } })),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const currentData = formatDateLocal(Date.now(), 'YYYYMD')
  const { posts } = await getRssList(currentData)
  const props = await getArticeDetail(slug)
  props.siteInfo = {
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    pageCover: BLOG.AVATAR,
    logo: BLOG.LOGO
  }
  props.posts = posts
  return {
    props,
    revalidate: 1
  }
}

export default Slug
