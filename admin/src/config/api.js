let ipUrl = 'http://127.0.0.1:7002/admin/'

let Api = {
	checkLogin: ipUrl + 'checkLogin',  //  检查用户名密码是否正确
	getTypeInfo: ipUrl + 'getTypeInfo',  //  获得文章类别信息
	addArticle: ipUrl + 'addArticle',  //  添加文章
}
export default Api