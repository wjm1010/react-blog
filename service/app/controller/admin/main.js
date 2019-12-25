'use strict';

const Controller = require('egg').Controller

class MainController extends Controller {
	async index() {
		this.ctx.body = 'api'
	}
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

}

module.exports = MainController