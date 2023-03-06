import CommonHead from '@/components/CommonHead'
import Footer from './components/Footer'
import LoadingCover from './components/LoadingCover'
import SideAreaLeft from './components/SideAreaLeft'
import TopNav from './components/TopNav'
import { useGlobal } from '@/lib/global'
import PropTypes from 'prop-types'
import React from 'react'
import CONFIG_NEXT from './config_next'

/**
 * 基础布局 采用左右两侧布局，移动端使用顶部导航栏
 * @returns {JSX.Element}
 * @constructor
 */
const LayoutBase = (props) => {
  const { children, headerSlot, meta, sideBarSlot, siteInfo } = props
  const { onLoading } = useGlobal()
  const targetRef = React.useRef(null)

  return (<>
      <CommonHead meta={meta} />
      <TopNav slot={sideBarSlot} {...props}/>
      <>{headerSlot}</>
      <main id='wrapper' className='flex justify-between pb-12 max-w-7xl m-auto'>
          <section id='container-inner' className={`${CONFIG_NEXT.NAV_TYPE !== 'normal' ? 'mt-40' : ''} flex-grow xl:max-w-4xl xl:mt-10 xl:mr-12`} ref={targetRef}>
            {onLoading ? <LoadingCover/> : <> {children}</> }
          </section>
          <SideAreaLeft targetRef={targetRef} {...props}/>
      </main>
      <Footer title={siteInfo?.title}/>
      </>
  )
}

LayoutBase.propTypes = {
  children: PropTypes.node
}

export default LayoutBase
