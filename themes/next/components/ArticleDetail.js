import BLOG from '@/blog.config'
import Image from 'next/image'
import RecommendPosts from './RecommendPosts'
import { formatDateLocal } from '@/lib/formatDate'
import { useGlobal } from '@/lib/global'
/**
 *
 * @param {*} param0
 * @returns
 */
export default function ArticleDetail(props) {
  const { title, description,recommendPosts,author, publishedOn, showArticleInfo } = props
  const { locale } = useGlobal()
  const date = formatDateLocal(publishedOn, 'HH:mm')

  return (<div id="container" className="overflow-x-auto flex-grow mx-auto w-screen md:w-full ">
        <div className="dark:border-gray-700 bg-white dark:bg-hexo-black-gray decoration-0"
        >
            {showArticleInfo && <header>
                {/* title */}
                <div className="font-bold text-2xl text-black dark:text-white">
                    {title}
                </div>
                
                {/* meta */}
                <div className='flex items-center justify-start mt-3'>
                    {author && (
                    <>
                    <Image src={author.logo} width={24} height={24} className="rounded-full border border-solid border-gray-400" />
                    <div className="font-light text-xs leading-6 ml-3">
                        <span className='mr-1 text-author font-normal'>{author.name}</span>
                        <span className=''>{date}</span> 
                    </div>
                    </>
                )}
                </div>
            </header>}
            {showArticleInfo && <>
                {/* 推荐文章 */}
                <RecommendPosts currentPost={props} recommendPosts={recommendPosts} />

                <section className="flex justify-between">
                {/* 分类 */}
                </section>
            </>}
            {showArticleInfo && description && (
                <div className="text-base text-black mt-1 leading-7 break-words" dangerouslySetInnerHTML={{__html: description}}>
                </div>
            )}
        </div>
    </div>)
}
