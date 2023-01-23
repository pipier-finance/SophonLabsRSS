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
  const date = formatDateLocal(post.pubDate, 'MM-DD HH:mm')

  return (<div id="container" className="overflow-x-auto flex-grow mx-auto w-screen md:w-full ">
        <div className="subpixel-antialiased pb-10 px-5 md:px-10  dark:border-gray-700 bg-white dark:bg-hexo-black-gray"
        >

            {showArticleInfo && <header className='animate__slideInDown animate__animated'>
                {/* 头图 */}
                {CONFIG_NEXT.POST_HEADER_IMAGE_VISIBLE && post?.type && !post?.type !== 'Page' && post?.page_cover && (
                    <div className="w-full relative md:flex-shrink-0 overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img alt={post.title} src={post?.page_cover} className='object-center w-full' />
                    </div>
                )}

                {/* title */}
                <div className="font-bold text-3xl text-black dark:text-white font-serif">
                    {post.title}
                </div>
                
                {/* meta */}
                <section className="mt-2 text-gray-400 dark:text-gray-400 font-light leading-7 text-sm">
                    <div className='flex'>
                        {post.category && <>
                            <div className="my-auto text-md mr-2">
                                <i className="mr-1 far fa-folder-open" /> {post.category}
                            </div>
                        </>}
                        <div className="pl-1 mr-2">
                            <i className='far fa-pipe mr-1' /> {date}
                        </div>
                    </div>
                </section>
            </header>}
            {showArticleInfo && <>
                {/* 版权声明 */}
                <ArticleCopyright author={BLOG.AUTHOR} url={url} />

                {/* 推荐文章 */}
                <RecommendPosts currentPost={post} recommendPosts={recommendPosts} />

                <section className="flex justify-between">
                {/* 分类 */}
                </section>
            </>}
            {showArticleInfo && post?.description && (
                <div className="text-justify text-sm text-gray-500 mt-3 leading-6" dangerouslySetInnerHTML={{__html: post.description}}>
                </div>
            )}

            {/* 评论互动 */}
            <div className="duration-200 w-full dark:border-gray-700 bg-white dark:bg-hexo-black-gray">
                <Comment frontMatter={post} />
            </div>
        </div>

    </div>)
}
