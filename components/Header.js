import { useState, useEffect } from 'react'
import Link from 'next/link'
import Router from 'next/router'
import $api from '../api'
import { Affix, Row, Col, Menu } from 'antd'
import { HomeOutlined, YoutubeOutlined, SmileOutlined } from '@ant-design/icons'
import '../styles/components/header.css'

const Header = () => {
  const [typeList, setTypeList] = useState([])

  useEffect(() => {
    $api.common.getTypeInfo({ setName: setTypeList })
  }, [])

  const handClick = async (e) => {
    let path = ''
    if (e.key === '0') {
      path = '/'
    } else {
      path = '/list?id=' + e.key
    }
    Router.push(path)
  }

  return (
    <Affix offsetTop={0}>
      <div className="header">
        <div className="header-center">
          <Row  type="flex" justify="center">
            <Col xs={24} sm={24} md={13}>
              <Link href="/">
                <a><span className="header-logo">个人博客</span></a>
              </Link>
              <span className="header-txt">前端开发</span>
            </Col>
            <Col className="memu-div" xs={0} sm={0} md={11}>
              <Menu mode="horizontal">
                <Menu.Item key="0" icon={<HomeOutlined />} onClick={handClick}>
                  博客首页
                </Menu.Item>
                {
                  typeList.map(item => {
                    const iconArr = [null, <YoutubeOutlined />, <SmileOutlined />]
                    return (
                      <Menu.Item key={item.id} icon={iconArr[item.id]} onClick={handClick}>
                        {item.typeName}
                      </Menu.Item>
                    )
                  })
                }
              </Menu>
            </Col>
          </Row>
        </div>
      </div>
    </Affix>
  )
}

export default Header