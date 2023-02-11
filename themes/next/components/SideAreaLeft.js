import Image from 'next/image'
import Toc from './Toc'
import { useGlobal } from '@/lib/global'
import React from 'react'
import Tabs from '@/components/Tabs'
import Card from './Card'
import CONFIG_NEXT from '../config_next'

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
  const { post, slot, postCount } = props
  const { locale } = useGlobal()
  const showToc = post && post.toc && post.toc.length > 1
  return <aside id='left' className='hidden lg:block flex-col w-80 ml-4 md:mt-10'>

    <section className='lg:sticky lg:top-20'>
      {/* 菜单 */}
      <section className='hidden lg:block p-4 bg-white border rounded-md dark:bg-hexo-black-gray'>
        <div className='flex items-center'>
          <span className='text-xl'>热点文章/资讯</span>
          <div className=''>
            {/* todo
              给过滤出来的数据里面添加一个字段，用来标记是否是热点文章
            */}
          </div>
        </div>
      </section>
    </section>
    <div className='sticky top-4 hidden'>
      <Card>
        <Tabs>
          {showToc && (
            <div key={locale.COMMON.TABLE_OF_CONTENTS} className='dark:text-gray-400 text-black bg-white dark:bg-hexo-black-gray duration-200'>
              <Toc toc={post.toc} />
            </div>
          )}
        </Tabs>
      </Card>

      {slot && <div className='flex justify-center'>
        {slot}
      </div>}
    </div>

  </aside>
}
export default SideAreaLeft
