import Image from 'next/image'
import { useGlobal } from '@/lib/global'
import BLOG from '@/blog.config';
import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatDateLocal } from '@/lib/formatDate'
import 'swiper/css'

/**
 * 侧边平铺
 * @param tags
 * @param currentTag
 * @param post
 * @param currentSearch
 * @returns {JSX.Element}
 * @constructor
 */
const SideAreaLeft = props => {
  const { posts,activeLists  } = props
  console.log(props, "sideEffect")
  const { locale } = useGlobal()
  const hotArticle = posts.sort((a,b) => b?.hot?.hotScore - a?.hot?.hotScore)
  const hotArticleList = hotArticle?.filter((item) => item?.hot?.isHot === false).slice(0, 6)
  // 0 首页 1 快讯 2 深度
  // 后期要改为1
  const newsList = posts.filter((item) => item?.type === '0').slice(0, 5)
  // 只保留当前还未开始的活动
  // const nextActiveList = activeLists?.filter((item) => item.etime * 1000 < new Date().getTime())
  return <aside id='left' className='hidden xl:block xl:w-80 md:mt-10'>
    <section className='hidden lg:block px-3 py-3 mb-3 bg-white border rounded-md border-sborder  dark:bg-hexo-black-gray'>
      <div className='flex items-center mt-3'>
        <h3 className='text-xl text-white rounded-md py-1 px-2 bg-gradient-to-tr from-sophon to-hot'>
        新闻快讯
        </h3>
      </div>
      <ul className='pl-1 pt-2 mt-3'>
        {newsList && newsList.map((item,index) => 
          <li className='flex flex-col border-l-2 pb-2 border-solid border-subTitle rounded-sm relative' key={item.id}>
            <div className="h-4 w-4 rounded-full border-4 border-white shadow-lg bg-sophon -left-2.5 absolute"></div>
            <a href={`${BLOG.SUB_PATH}/article/${item.id}`} target="_blank" className="text-base font-bold text-hot -mt-0.5 ml-4 leading-5.5">{item.title}</a>
            <p className='ml-4 mt-1 text-subTitle'>{formatDateLocal(item.publishedOn, 'HH:MM')}</p>
          </li>
        )}
      </ul>
      <a href='/news' className='block w-20 text-sm font-medium h-8 leading-8 bg-gray-200 text-hot mt-5 text-center rounded-full hover:bg-sophon hover:text-white'>更多资讯</a>
    </section>
    <section className='lg:sticky lg:top-20'>
      {/* 热门文章 */}
      <section className='hidden lg:block px-3 pt-3 pb-5 bg-white border rounded-md border-sborder  dark:bg-hexo-black-gray'>
        <div className='flex items-center mt-3'>
          <h3 className='text-xl text-white rounded-md py-1 px-2 bg-gradient-to-tr from-sophon to-hot'>
          热门文章
          </h3>
        </div>
        <div className='flex flex-col mt-3'>
          {hotArticleList && hotArticleList.map((item,index) => 
            <span className='flex' key={item.id}>
              <span className={['italic ', index <= 2 ? 'text-sophon font-medium' : 'text-gray-500'].join('')}>{index + 1}</span>
              <a href={`${BLOG.SUB_PATH}/article/${item.id}`} target="_blank" className="text-sm font-medium text-hot mb-2 pb-1 pl-4 leading-5.5">{item.title}</a>
            </span>
          )}
        </div>
      </section>
      {/* 最新活动 */}
      <section className='hidden lg:block mt-3 px-3 pt-3 pb-5 bg-white border rounded-md border-sborder  dark:bg-hexo-black-gray'>
          <div className='flex items-center mt-3 scale-75 translate-x-4 skew-y-3'>
            <div className='text-xl text-white rounded-md py-1 px-2 bg-gradient-to-tr from-sophon to-hot'>
            热门活动
            </div>
          </div>
          <div className='mt-3'>
            <Swiper
            > 
              {activeLists && activeLists.map((item,index) => (
                <SwiperSlide key={item.id}>
                    <Image src={item.media} width={358} height={156} className='object-cover rounded'/>
                    <div className='text-sm mt-2'>
                      <h3 className='mb-2'>
                        <a href={`${BLOG.SUB_PATH}/article/${item.site}`} target="_blank">{item.name}</a>
                      </h3>
                      <div className='mt-1 flex text-gray-500'>
                        <Image src="/address.svg" width={14} height={14} alt='address'/>
                        <span className='ml-1'>{item.address}</span>
                        <span className='ml-1'>{item.owner}</span>
                      </div>
                      <div className='flex mt-1 text-gray-500'>
                        <Image src="/date.svg" width={15} height={15} alt='date'/>
                        <p className='ml-1'>{formatDateLocal(item.stime * 1000, 'YYYY-M-DD HH:MM')}</p>
                      </div>
                    </div>
                </SwiperSlide> 
                )
              )}
            </Swiper>
        </div>
      </section>
    </section>
  </aside>
}
export default SideAreaLeft
