import Link from 'next/link'
import { List } from 'antd'
import { CalendarOutlined, FolderOutlined, FireOutlined } from '@ant-design/icons';
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'
import Tocify from '../components/tocify.tsx'
import '../styles/pages/list.css'

const ArticleList = (props) => {
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

  return (
    <List
      itemLayout="vertical"
      dataSource={props.data}
      renderItem={item => (
        <List.Item>
          <div className="list-title">
            <Link href={`/detailed?id=${item.id}`}>
              <a>{item.title}</a>
            </Link>
          </div>
          <div className="list-icon">
            <span><CalendarOutlined /> {item.createTime}</span>
            <span><FolderOutlined /> {item.typeName}</span>
            <span><FireOutlined /> {item.viewCount}人</span>
          </div>
          <div className="list-context" dangerouslySetInnerHTML={{__html: marked(item.introduce)}}></div>  
        </List.Item>
      )}
    />
  )
}

export default ArticleList