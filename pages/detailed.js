import $api from '../api'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Affix } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons'
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../styles/pages/index.css'
import '../styles/pages/detailed.css'

const Detailed = (props) => {
  const info = props.data
  const tocify = new Tocify()
  const renderer = new marked.Renderer();
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };

  marked.setOptions({
    renderer: renderer, 
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(info.articleContent) 

  return (
    <>
      <Head>
        <title>博客详情页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item><a href={`/list?id=${info.typeId}`}>{info.typeName}</a></Breadcrumb.Item>
                <Breadcrumb.Item>{info.title}</Breadcrumb.Item>
              </Breadcrumb>
            </div>
            <div>
              <div className="detailed-title">{info.title}</div>
              <div className="list-icon center">
                <span><CalendarOutlined /> {info.createTime}</span>
                <span><FolderOutlined /> {info.typeName}</span>
                <span><FireOutlined /> {info.viewCount}人</span>
              </div>
              <div className="detailed-content" dangerouslySetInnerHTML={{__html:html}}></div>
            </div>
          </div>
        </Col>
        <Col xs={0} sm={0} md={6}>
          <div className="comm-box">
            <Author />
            <Advert />
            <Affix offsetTop={52}>
              <div className="detailed-nav">
                <div className="nav-title">文章目录</div>
                {tocify && tocify.render()}
              </div>
            </Affix>
          </div>
        </Col>
      </Row>
      <Footer/>
    </>
  )
}

export async function getServerSideProps (content) {
  const data = await $api.common.getArticleById({ data: { id: content.query.id } })
  return { props: { data: data.data[0] } }
}

export default Detailed