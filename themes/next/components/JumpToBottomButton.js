import React, { useEffect, useState } from 'react'
import smoothscroll from 'smoothscroll-polyfill'
import CONFIG_NEXT from '../config_next'

/**
 * 跳转到网页顶部
 * 当屏幕下滑500像素后会出现该控件
 * @param targetRef 关联高度的目标html标签
 * @param showPercent 是否显示百分比
 * @returns {JSX.Element}
 * @constructor
 */
const JumpToBottomButton = ({ showPercent = false }) => {
  if (!CONFIG_NEXT.WIDGET_TO_BOTTOM) {
    return <></>
  }

  const [show, switchShow] = useState(false)
  const [percent, changePercent] = useState(0)
  const scrollListener = () => {
    const targetRef = document.getElementById('wrapper')
    const clientHeight = targetRef?.clientHeight
    const scrollY = window.pageYOffset
    const fullHeight = clientHeight - window.outerHeight
    let per = parseFloat(((scrollY / fullHeight * 100)).toFixed(0))
    if (per > 100) per = 100
    const shouldShow = scrollY > 100 && per > 0
    if (shouldShow !== show) {
      switchShow(shouldShow)
    }
    changePercent(per)
  }

  function scrollToBottom () {
    const targetRef = document.getElementById('wrapper')
    window.scrollTo({ top: targetRef.clientHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    smoothscroll.polyfill()

    document.addEventListener('scroll', scrollListener)
    return () => document.removeEventListener('scroll', scrollListener)
  }, [show])

  return (<div className='flex space-x-1 transform hover:scale-105 duration-200 py-2 px-3' onClick={scrollToBottom} >
    <div className='dark:text-gray-200' >
      <i className='fas fa-arrow-down' />
    </div>
  </div>)
}

export default JumpToBottomButton
