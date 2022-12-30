import InfoCard from './InfoCard'
import MenuButtonGroup from './MenuButtonGroup'
import SearchInput from './SearchInput'
import Toc from './Toc'
import { useGlobal } from '@/lib/global'
import React from 'react'
import Tabs from '@/components/Tabs'
import Logo from './Logo'
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

    <section className='w-80 lg:sticky lg:top-20'>
      {/* 菜单 */}
      <section className='hidden lg:block mb-5 pb-4 bg-white border rounded-md dark:bg-hexo-black-gray duration-200'>
        <Logo {...props} className='h-32' />
        {/* <div className='pt-2 px-2 font-sans'>
          <MenuButtonGroup allowCollapse={true} {...props} />
        </div> */}
        {/* {CONFIG_NEXT.MENU_SEARCH && <div className='px-2 pt-2 font-sans'>
          <SearchInput {...props} />
        </div>} */}
      </section>
    </section>

    <div className='sticky top-4 hidden'>
      <Card>
        <Tabs>
          {showToc && (
            <div key={locale.COMMON.TABLE_OF_CONTENTS} className='dark:text-gray-400 text-gray-600 bg-white dark:bg-hexo-black-gray duration-200'>
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
