import server from '../request/server'

const common = {
    getArticleList: { type: 'get', url: 'getArticleList' },  // 获取文章列表
    getArticleById: { type: 'get', url: 'getArticleById' }, // 根据id获取文章内容
    getTypeInfo: { type: 'get', url: 'getTypeInfo' }, // 获取文章类型
    getListById: { type: 'get', url: 'getListById' } // 根据类别ID获得文章列表
}

server.addRequest('common', common)
export default server