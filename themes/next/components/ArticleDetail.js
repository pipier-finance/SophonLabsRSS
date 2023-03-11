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
  const { title, description,recommendPosts,author, publishedOn, showArticleInfo, link,imageUrl, tags } = props
  const { locale } = useGlobal()
  const date = formatDateLocal(publishedOn, 'HH:mm')

  return (<div id="container" className="m-3">
        <div className="dark:border-gray-700 bg-white dark:bg-hexo-black-gray decoration-0"
        >
            {showArticleInfo && <header>
                {/* meta */}
                <div className='flex items-center justify-start'>
                    {author && (
                    <>
                    <Image src={author.logo} width={24} height={24} className="rounded-full border border-solid border-gray-400" />
                    <div className="font-light text-xs leading-6 ml-2">
                        <span className='mr-2 text-author font-normal'>{author.name}</span>
                        <span className=''>{date}</span> 
                    </div>
                    </>
                )}
                </div>
                {/* title */}
                <div className="mt-6 font-bold text-2xl text-black dark:text-white">
                    {title}
                </div>
                {/* SophoNews share */}
            </header>}
           
            {showArticleInfo && description && (
                <div className=''>
                    <div className="text-lg text-article-st mt-6 leading-8 break-words" dangerouslySetInnerHTML={{__html: description}}>
                    </div>
                    <div className='mt-12 text-xs leading-5.5 font-extralight flex space-x-2'>
                      {tags && tags.map(item=> ( <div className='px-2 h-5.5 rounded-full cursor-pointer bg-sophon text-white hover: hover:bg-opacity-90' key={item}>{item}</div>))}
                    </div>
                </div>
            )}
            {showArticleInfo && <>
                {/* 推荐文章 */}
                <RecommendPosts currentPost={props} recommendPosts={recommendPosts} />
                <section className="flex justify-between">
                {/* 分类 */}
                </section>
            </>}
        </div>
    </div>)
}
