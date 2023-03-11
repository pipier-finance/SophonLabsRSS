import { useGlobal } from '@/lib/global'
import throttle from 'lodash.throttle'
import Link from 'next/link'
import { useCallback, useEffect, useRef, useState } from 'react'
import CategoryGroup from './CategoryGroup'
import Collapse from './Collapse'
import MenuButtonGroup from './MenuButtonGroup'
import Logo from './Logo'
import SearchDrawer from './SearchDrawer'
import TagGroups from './TagGroups'
import CONFIG_NEXT from '../config_next'
import { useRouter } from 'next/router'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Input,
  useToast,
  Box
} from '@chakra-ui/react'

let windowTop = 0

/**
 * 顶部导航
 * @param {*} param0
 * @returns
 */

const MenuList = [{id: 1, name: '首页', url: '/'}, {id: 2, name: '快讯', url: '/news'}, {id: 3, name: '深度', url: '/depth'}]
// const MenuList = [{id: 1, name: '首页', url: '/'}, {id: 2, name: '快讯', url: '/news'}, {id: 3, name: '深度', url: '/depth'}, {id: 4, name: '专题', url: '/topic'}]

const TopNav = (props) => {
  const router = useRouter()
  const btnRef = useRef()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()
  const hanleComming = () => {
    toast({
      description: '敬请期待',
      status: 'success',
      position:'top',
      duration: 3000,
      render: () => (
        <div className='p-2 text-white bg-gradient-to-tr from-sophon to-hot rounded-md'>
          <span className='ml-4'>敬请期待</span>
        </div>
      )
    })
  }

  return (<div id='top-nav' className='z-40 sticky block top-0 border-b' >
    {/* 导航栏 */}
    <div id='sticky-nav' className={`${CONFIG_NEXT.NAV_TYPE !== 'normal' ? 'fixed' : ''} xl:relative xl:max-w-7xl xl:m-auto w-full top-0 transform duration-500`}>
      <div className='flex justify-between items-center bg-white dark:bg-gray-800 h-14'>
        {/* Logo 标题 */}
        <div className='flex'>
          <Logo {...props}/>
        </div>
        <div className='hidden flex-1 xl:flex space-x-16 ml-14 text-sm'>
          {MenuList&& MenuList.map((item, index) => <a key={item.id} href={item.url} className={['text-nav text-base font-light ', router.pathname === item.url ? 'font-semibold text-nav-dark': ''].join('')}>
            {item.name}
          </a>)}
        </div>
        <div className='hidden xl:block'>
          <button type='button' onClick={hanleComming} className='flex justify-center items-center rounded-md out h-9 w-28 text-sm px-3 bg-gradient-to-tr from-sophon to-hot text-white shadow-sm'>Connect</button>
        </div>
        {/* 右侧导航 */}
        <div className='xl:hidden pr-4'>
          <div onClick={onOpen} className='cursor-pointer text-black' ref={btnRef}>
          { !isOpen && <i className='fas fa-bars text-lg'/> }
          </div>
        </div>
      </div>
    </div>
    <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader />
          <DrawerBody>
            <div className='flex flex-col justify-center text-sm text-labs-black font-semibold divide-y-sophon border-subTitle'>
              {MenuList&& MenuList.map((item, index) => <a key={item.id} href={item.url} className='h-10 leading-10' >
                {item.name}
              </a>)}
              <div className='pt-4'>
                <button type='button' onClick={hanleComming} className='flex justify-center items-center rounded-md out h-9 w-32 text-sm px-3 bg-gradient-to-tr from-sophon to-hot text-white shadow-sm'>
                  <span className=' italic font-medium'>Connect</span>
                </button>
              </div>
            </div>
          </DrawerBody>
          <DrawerFooter>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
  </div>)
}

export default TopNav
