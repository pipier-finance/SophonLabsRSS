import request from '@/lib/request'
import { analysisRss } from '@/lib/rss'
import { getDataFromCache, setDataToCache } from '@/lib/cache/cache_manager'
import BLOG from '@/blog.config'
import { delay } from '@/lib/utils'

export async function getRssList() {
  const cacheKey = 'page_block_' + '123'
  let pageBlock = null
  // let pageBlock = await getDataFromCache(cacheKey)
  // if (pageBlock) {
  //   console.log('[命中缓存]:', cacheKey)
  //   return analysisRss(pageBlock)
  // }

  const start = new Date().getTime()
  pageBlock = await getPageWithRetry(2)
  const end = new Date().getTime()
  console.log('[API耗时]', `${end - start}ms`)

  if (pageBlock) {
    // await setDataToCache(cacheKey, {pageBlock})
    return analysisRss(pageBlock)
  }
  return pageBlock
}


/**
 * 调用接口，失败会重
 * @param {*} rss address
 * @param {*} retryAttempts
 */
export async function getPageWithRetry(retryAttempts = 3) {
  if (retryAttempts && retryAttempts > 0) {
    console.log('[请求API]', retryAttempts < 3 ? `剩余重试次数:${retryAttempts}` : '')
    try {
      const pageData = await request.get()
      console.info('[响应成功]:', pageData.data)
      return pageData.data
    } catch (e) {
      console.warn('[响应异常]:', e)
      await delay(1000)
      const cacheKey = 'page_block_' + '123'
      // const pageBlock = await getDataFromCache(cacheKey)
      // if (pageBlock) {
      //   console.log('[重试缓存]', `id:123`)
      //   return pageBlock
      // }
      return await getPageWithRetry(retryAttempts - 1)
    }
  } else {
    console.error('[请求失败]:')
    return null
  }
}