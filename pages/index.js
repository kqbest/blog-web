import $api from '../api'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import Header from '../components/Header'
import ArticleList from '../components/articleList'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../styles/pages/index.css'

const Home = (props) => {
  return (
    <>
      <Head>
        <title>博客首页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>
          <ArticleList data={props.data} />
        </Col>
        <Col xs={0} sm={0} md={6}>
          <div className="comm-box">
            <Author />
            <Advert />
          </div>
        </Col>
      </Row>
      <Footer />
    </>
  )
}

export async function getServerSideProps () {
  const data = await $api.common.getArticleList() || {}
  return { props: { data: data.data } }
}

export default Home