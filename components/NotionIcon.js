/**
 * notion的图标icon
 * 可能是emoji 可能是 svg 也可能是 图片
 * @returns
 */
const NotionIcon = ({ icon }) => {
  if (!icon) {
    return <></>
  }

  if (icon.startsWith('http')) {
    //   return <Image src={icon} width={30} height={30}/>
    //   eslint-disable-next-line @next/next/no-img-element
    return <img src={icon} className='w-20 h-14 lg:w-32 lg:h-20 rounded-md transition-all cursor-pointer object-cover'/>
  }

  return <span className='mr-1'>{icon}</span>
}

export default NotionIcon
