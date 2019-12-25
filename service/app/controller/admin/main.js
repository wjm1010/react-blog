'use strict';

const Controller = require('egg').Controller

class MainController extends Controller {

	// 登录
	async checkLogin() {
		let userName = this.ctx.request.body.userName
		let passWord = this.ctx.request.body.passWord

		const sql = "SELECT userName FROM admin_user WHERE userName = '" + userName +
			"' AND passWord = '" + passWord + "'"
		const res = await this.app.mysql.query(sql)
		if (res.length > 0) {
			//登录成功,进行session缓存
			let openId = new Date().getTime()
			this.ctx.session.openId = { 'openId': openId }
			this.ctx.body = { 'data': '登录成功', 'openId': openId }
		} else {
			this.ctx.body = { data: '登录失败' }
		}
	}

	//后台文章分类信息
	async getTypeInfo() {
		const results = await this.app.mysql.select('type')
		this.ctx.body = { data: results }
	}

	//添加文章
	async addArticle() {
		let tmpArticle = this.ctx.request.body
		const result = await this.app.mysql.insert('article', tmpArticle)
		const insertSuccess = result.affectedRows === 1
		const insertId = result.insertId
		this.ctx.body = {
			isScuccess: insertSuccess,
			insertId: insertId
		}
	}

	//修改文章
	async updateArticle() {
		let tmpArticle = this.ctx.request.body
		const result = await this.app.mysql.update('article', tmpArticle);
		const updateSuccess = result.affectedRows === 1
		this.ctx.body = {
			isScuccess: updateSuccess
		}
	}
}

module.exports = MainController