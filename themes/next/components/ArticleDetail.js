import BLOG from '@/blog.config'
import Comment from '@/components/Comment'
import RecommendPosts from './RecommendPosts'
import { formatDateLocal } from '@/lib/formatDate'
import { useGlobal } from '@/lib/global'
import { useRouter } from 'next/router'
import ArticleCopyright from './ArticleCopyright'
import CONFIG_NEXT from '../config_next'

/**
 *
 * @param {*} param0
 * @returns
 */
export default function ArticleDetail(props) {
  const { post, recommendPosts, prev, next, showArticleInfo } = props
  const url = BLOG.LINK + useRouter().asPath
  const { locale } = useGlobal()
  const date = formatDateLocal(post.publishedOn, 'MM-DD HH:mm')

  return (<div id="container" className="overflow-x-auto flex-grow mx-auto w-screen md:w-full ">
        <div className="px-5 md:px-10 dark:border-gray-700 bg-white dark:bg-hexo-black-gray decoration-0"
        >
            {showArticleInfo && <header>
                {/* 头图 */}
                {CONFIG_NEXT.POST_HEADER_IMAGE_VISIBLE && post?.type && !post?.type !== 'Page' && post?.page_cover && (
                    <div className="w-full relative md:flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={post.title} src={post?.page_cover} className='object-center w-full' />
                    </div>
                )}

                {/* title */}
                <div className="font-bold text-2xl text-black dark:text-white">
                    {post.title}
                </div>
                
                {/* meta */}
                <section className="mt-2 text-gray-400 dark:text-gray-400 font-light">
                    <div className='flex items-center text-sm leading-5'>
                        {post.producer && <>
                            <div className="mr-2">
                                <i className="mr-1 fa-solid fa-newspaper"/> {post.producer}
                            </div>
                        </>}
                        <div className="flex items-center">
                            <i className='far fa-pipe' />
                            <span>{date}</span>
                        </div>
                    </div>
                </section>
            </header>}
            {showArticleInfo && <>
                {/* 推荐文章 */}
                <RecommendPosts currentPost={post} recommendPosts={recommendPosts} />

                <section className="flex justify-between">
                {/* 分类 */}
                </section>
            </>}
            {showArticleInfo && post?.description && (
                <div className="text-base text-black mt-1 leading-7 break-words" dangerouslySetInnerHTML={{__html: post.description}}>
                </div>
            )}
        </div>
    </div>)
}
