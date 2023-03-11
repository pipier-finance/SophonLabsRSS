export async function analysisRss(data) {
  const newArr = []
  data?.sources.forEach(producer => {
    producer?.articles.forEach(article => {
      newArr.push({
        ...article,
        producer: producer.title,
        feedUrl: producer.feedUrl,
        siteUrl: producer.siteUrl
      })
    })
  })
  // 按时间排序
  newArr.sort((a, b) => {
    return new Date(b.publishedOn) - new Date(a.publishedOn)
  })
  return { posts: newArr }
}

export async function analysisActive(data) {
  const newArr = []
  data?.sources.forEach(producer => {
    newArr.push({
      ...producer
    })
  })
  return newArr
}
