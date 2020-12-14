
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import 'antd/dist/antd.css'
import '../styles/globals.css'
NProgress.configure({ showSpinner: false });

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      NProgress.start()
    })
    router.events.on("routeChangeComplete", () => {
      NProgress.done()
      // 修复dev环境路由跳转css不加载的问题
      if (process.env.NODE_ENV !== 'production') {
        const cssLink = document.querySelectorAll('link[href*="/_next/static/css/styles.chunk.css"]');
        cssLink[0].href = '/_next/static/css/styles.chunk.css?v=' + new Date().valueOf();
      }
    })
    router.events.on("routeChangeError", () => {
      NProgress.done()
    })
  }, [])
  return <Component {...pageProps} />
}

export default MyApp
