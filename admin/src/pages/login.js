import React, { useState } from 'react'
import 'antd/dist/antd.css'
import { Input, Card, Icon, Button, Spin } from 'antd'

const Login = () => {
	const [userName, setUserName] = useState('')
	const [passWord, setPassWord] = useState('')
	const [isLoading, setIsLoading] = useState(false)
	const checkLogin = () => {
		setIsLoading(true)
		setTimeout(()=>{
			setIsLoading(false)
		},1000)
	}
	return (
		<div className="login-div">
			<Spin tip="loading..." spinning={isLoading}>
				<Card title="后台发布系统" bordered={true} style={{ width: 400 }}>
					<Input id="userName" size="large" placeholder="enter your userName"
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setUserName(e.target.value) }} /><br /><br />
					<Input id="passWord" size="large" placeholder="enter your passWord"
						prefix={<Icon type="key" style={{ color: 'rgba(0,0,0,.25)' }} />}
						onChange={(e) => { setPassWord(e.target.value) }}
					/><br /><br />
					<Button type="primary" size="large" block onClick={checkLogin} > Login in </Button>
				</Card>
			</Spin>
			<style jsx>
				{
					`
					.login-div{
						margin: 150px auto;
						width: 400px;
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