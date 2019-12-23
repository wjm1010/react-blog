'use strict'

const Controller = require('egg').Controller

class HomeController extends Controller {
	async index() {
		this.ctx.body = 'api'
	}

	async getArticleList() {
		let sql = 'SELECT article.id as id,' +
			'article.title as title,' +
			"FROM_UNIXTIME(article.addTime,'%Y-%m-%d %H:%i:%s') as addTime," +
			'article.view_count as view_count ,' +
			'article.avatar as avatar ,' +
			'article.article_content as article_content,' +
			'article.content as content,' +
			'.type.typeName as typeName ' +
			'FROM article LEFT JOIN type ON article.type_id = type.Id'

		const results = await this.app.mysql.query(sql)

		this.ctx.body = {
			data: results
		}
	}
}

module.exports = HomeController