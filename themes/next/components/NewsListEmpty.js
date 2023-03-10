
/**
 * 空白博客 列表
 * @returns {JSX.Element}
 * @constructor
 */
const NewsListEmpty = ({ currentSearch }) => {
  return <div className='text-center w-full'>
        <p className='text-gray-500 dark:text-gray-300'>没有找到文章 {(currentSearch && <div>{currentSearch}</div>)}</p>
  </div>
}
export default NewsListEmpty
