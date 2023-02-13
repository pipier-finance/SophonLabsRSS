import BLOG from '@/blog.config'
import { useGlobal } from '@/lib/global'
import { getRssList } from '@/lib/notion/getRssList'
import * as ThemeMap from '@/themes'
import React from 'react'
import { useRouter } from 'next/router'
import { isBrowser } from '@/lib/utils'

/**
 * 根据notion的slug访问页面
 * @param {*} props
 * @returns
 */
const Slug = props => {
  const router = useRouter()
  const { theme, changeLoadingState } = useGlobal()
  const ThemeComponents = ThemeMap[theme]
  const { post, siteInfo } = props
  console.log(props, 'what youre props')
  if (!post) {
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
    title: `${post?.title} | ${siteInfo?.title}`,
    description: post?.description,
    type: 'article',
    slug: 'article/' + post?.slug,
    image: post?.page_cover,
    category: post?.category?.[0],
    tags: post?.tags
  }
  
  return (
    <ThemeComponents.LayoutSlug {...props} showArticleInfo={true} meta={meta} />
  )
}

export async function getStaticPaths() {
  const { posts } = await getRssList()
  const postLists = posts
  for (const i in postLists) {
    const post = postLists[i]
    post.slug = +i + 1
  }

  return {
    paths: postLists.map(row => ({ params: { slug: '' + row.slug } })),
    fallback: true
  }
}

export async function getStaticProps({ params: { slug } }) {
  const props = await getRssList()
  props.siteInfo = {
    title: BLOG.TITLE,
    description: BLOG.DESCRIPTION,
    pageCover: BLOG.AVATAR,
    logo: BLOG.LOGO
  }
  const { posts } = props
  const postLists = posts
  for (const i in postLists) {
    const post = postLists[i]
    post.slug = +i + 1
  }

  props.post = postLists.find(post => post.slug === +slug)
  const index = postLists.indexOf(props.post)
  props.prev = postLists.slice(index - 1, index)[0] ?? postLists.slice(-1)[0]
  props.next = postLists.slice(index + 1, index + 2)[0] ?? postLists[0]
  return {
    props,
    revalidate: 1
  }
}

export default Slug
