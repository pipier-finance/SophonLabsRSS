const Card = ({ children, headerSlot, className }) => {
  return <div className={className}>
    <>{headerSlot}</>
    <section className="bg-white border-b dark:bg-hexo-black-gray duration-200">
        {children}
    </section>
  </div>
}
export default Card
