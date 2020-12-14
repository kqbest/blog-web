import { Avatar, Divider } from 'antd'
import { GithubOutlined, QqOutlined, WechatOutlined } from '@ant-design/icons'
import '../styles/components/author.css'

const Author = () => (
  <div className="author-div">
    <div><Avatar size={100} src="/img/head.png" /></div>
    <div className="author-introduction">
      前端程序员
      <Divider>社交账号</Divider>
      <Avatar size={28} icon={<GithubOutlined />} className="account"  />
      <Avatar size={28} icon={<QqOutlined />}  className="account" />
      <Avatar size={28} icon={<WechatOutlined />}  className="account"  />
    </div>
  </div>
)
export default Author