import $api from '../api'
import Head from 'next/head'
import { Row, Col, Breadcrumb } from 'antd'
import Header from '../components/Header'
import ArticleList from '../components/articleList'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import '../styles/pages/index.css'

const List = (props) => {
  return (
    <>
      <Head>
        <title>博客列表</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={18}>
          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>{props.data[0].typeName}</Breadcrumb.Item>
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

export async function getServerSideProps (content) {
  const id = content.query.id
  const data = await $api.common.getListById({ data: { id } })
  return { props: { data: data.data } }
}

export default List