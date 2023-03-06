import LayoutBase from './LayoutBase'
import Header from './components/Header'
import ArticleDetail from './components/ArticleDetail'
import CONFIG_NEXT from './config_next'

export const LayoutSlug = (props) => {
  if (!props) {
    return <LayoutBase
          {...props}
        />
  }

  return (
    <LayoutBase
      {...props}
      headerSlot={CONFIG_NEXT.HOME_BANNER && <Header {...props} />}
    >
      {<ArticleDetail {...props} />}
    </LayoutBase>
  )
}
