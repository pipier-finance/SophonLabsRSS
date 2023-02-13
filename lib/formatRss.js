// 解析不同格式的RSS内容，并返回统一格式的数据
export default function formatRss (source) {
  // PANEWS rss -> channel -> item
  // ChainFeeds feed -> entry
  const { rss, feed } = source
  const { channel } = rss
  const { entry } = feed
  const finalPost = channel?.item || entry
  const PanNewsPost = channel?.item.map(post => {
    const { title, description, pubDate, link } = post
    const cover = description.match(/<img src="([^"]*)"/)
    const summary = description.replace(/<[^>]+>/g, '')
    return {
      title,
      summary,
      date: pubDate,
      link,
      cover: cover ? cover[1] : ''
    }
  })
  const ChainFeedsPost = entry.map(post => {
    const { title, summary, updated, link, media } = post
    return {
      title,
      summary,
      date: updated,
      link,
      cover: media?.content?.[0]?.url
    }
  })
  
  return {
    title: channel.title,
    description: channel.description,
    posts
  }
}