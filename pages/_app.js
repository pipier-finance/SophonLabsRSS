import BLOG from 'blog.config'
import 'animate.css'
import '@/styles/globals.css'
import { config } from '@fortawesome/fontawesome-svg-core'
import { GlobalContextProvider } from '@/lib/global'
import { ChakraProvider } from '@chakra-ui/react'

config.autoAddCss = false

const MyApp = ({ Component, pageProps }) => {
  return (
    <GlobalContextProvider>
      <ChakraProvider>
          {/* FontawesomeCDN */}
          <link rel="stylesheet" href={BLOG.FONT_AWESOME_PATH} referrerPolicy="no-referrer" />
        <Component {...pageProps} />
      </ChakraProvider>
    </GlobalContextProvider>
  )
}

export default MyApp
