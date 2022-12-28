import request from '@/lib/request'
import { analysisRss } from '@/lib/rss'
import { delay } from '@/lib/utils'

export async function getRssList() {
  let pageBlock = null
  const start = new Date().getTime()
  pageBlock = await getPageWithRetry(2)
  const end = new Date().getTime()
  console.log('[API耗时]', `${end - start}ms`)
  if (pageBlock) {
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
      return await getPageWithRetry(retryAttempts - 1)
    }
  } else {
    console.error('[请求失败]:')
    return null
  }
}
