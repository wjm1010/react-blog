import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Input, Card, Icon, Button, Spin, message } from 'antd'
import axios from 'axios'
import Api from '../config/api'

const Login = (props) => {
	const [userName, setUserName] = useState('')
	const [passWord, setPassWord] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const checkLogin = () => {
		if (!userName) {
			message.error('用户名不能为空')
			return false
		} else if (!passWord) {
			message.error('密码不能为空')
			return false
		}
		setIsLoading(true)
		let dataProps = {
			'userName': userName,
			'passWord': passWord
		}
		axios({
			method: 'post',
			url: Api.checkLogin,
			data: dataProps,
			withCredentials: true
		}).then(res => {
			if (res.data.data === '登录成功') {
				localStorage.setItem('openId', res.data.openId)
				props.history.push('/index')
			} else {
				message.error('用户名密码错误')
			}
		}).finally(() => {
			setIsLoading(false)
		})
	}
	return (
		<div className="login-div">
			<Spin tip="loading..." spinning={isLoading}>
				<Card title="后台发布系统" bordered={true} style={{ width: 400 }}>
					<Input id="userName" size="large" placeholder="enter your userName"
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setUserName(e.target.value) }} /><br /><br />
					<Input.Password id="passWord" size="large" placeholder="enter your passWord"
						prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setPassWord(e.target.value) }}
					/><br /><br />
					<Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
				</Card>
			</Spin>
			<style jsx="true">
				{
					`
					.login-div{
						width: 400px;
						position: absolute;
						top: 50%;
						height: 270px;
						left: 50%;
						margin-left: -200px;
						margin-top: -135px
					}
					body{
						background-color: #f0f0f0;
					}
					`
				}
			</style>
		</div>
	)
}

export default Login