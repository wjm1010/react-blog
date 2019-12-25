import React, { useState, useEffect } from 'react'
import marked from 'marked'
import '../static/css/addArticle.css'
import { Row, Col, Input, Select, Button, DatePicker, message } from 'antd'
import axios from 'axios'
import Api from '../config/api'

const { Option } = Select
const { TextArea } = Input

const AddArticle = (props) => {
	const [articleId, setArticleId] = useState(0)  // 文章的ID，如果是0说明是新增加，如果不是0，说明是修改
	const [articleTitle, setArticleTitle] = useState('')   // 文章标题
	const [articleContent, setArticleContent] = useState('')  // markdown的编辑内容
	const [markdownContent, setMarkdownContent] = useState('预览内容') // html内容
	const [introducemd, setIntroducemd] = useState()            // 简介的markdown内容
	const [introducehtml, setIntroducehtml] = useState('等待编辑') // 简介的html内容
	const [showDate, setShowDate] = useState()   // 发布日期
	const [updateDate, setUpdateDate] = useState() // 修改日志的日期
	const [typeInfo, setTypeInfo] = useState([]) // 文章类别信息
	const [selectedType, setSelectType] = useState('请选择类别') // 选择的文章类别
	marked.setOptions({
		renderer: new marked.Renderer(),
		gfm: true,
		pedantic: false,
		sanitize: false,
		tables: true,
		breaks: false,
		smartLists: true,
		smartypants: false
	})
	const changeContent = (e) => {
		setArticleContent(e.target.value)
		let html = marked(e.target.value)
		setMarkdownContent(html)
	}
	const changeIntroduce = (e) => {
		setIntroducemd(e.target.value)
		let html = marked(e.target.value)
		setIntroducehtml(html)
	}
	//从中台得到文章类别信息
	const getTypeInfo = () => {
		axios({
			method: 'get',
			url: Api.getTypeInfo,
			withCredentials: true
		}).then(res => {
			if (res.data.data === "没有登录") {
				localStorage.removeItem('openId')
				props.history.push('/')
			} else {
				setTypeInfo(res.data.data)
			}
		})
	}
	useEffect(() => {
		getTypeInfo()
	}, [])
	// 发布文章
	const saveArticle = () => {
		if (!articleTitle) {
			message.error('请输入文章标题')
			return false
		} else if (selectedType === '请选择类别') {
			message.error('请选择文章类别')
			return false
		} else if (!articleContent) {
			message.error('请选择文章简介')
			return false
		} else if (!introducemd) {
			message.error('请输入文章内容')
			return false
		} else if (!showDate) {
			message.error('请选择发布日期')
			return false
		}
		let dataProps = {}   //传递到接口的参数
		dataProps.type_id = selectedType
		dataProps.title = articleTitle
		dataProps.article_content = articleContent
		dataProps.content = introducemd
		let datetext = showDate.replace('-', '/') //把字符串转换成时间戳
		dataProps.addTime = (new Date(datetext).getTime()) / 1000

		if (articleId === 0) {
			dataProps.view_count = Math.ceil(Math.random() * 100) + 1000
			axios({
				method: 'post',
				url: Api.addArticle,
				data: dataProps,
				withCredentials: true
			}).then(res => {
				setArticleId(res.data.insertId)
				if (res.data.isScuccess) {
					message.success('文章保存成功')
				} else {
					message.error('文章保存失败')
				}
			})
		} else {
			dataProps.id = articleId
			axios({
				method: 'post',
				url: Api.updateArticle,
				data: dataProps,
				withCredentials: true
			}).then(res => {
				if (res.data.isScuccess) {
					message.success('文章保存成功')
				} else {
					message.error('保存失败');
				}
			})
		}
	}
	return (
		<div>
			<Row gutter={5}>
				<Col span={18}>
					<Row gutter={10} >
						<Col span={20}>
							<Input
								value={articleTitle}
								placeholder="文章标题"
								onChange={e => { setArticleTitle(e.target.value) }}
								size="large" />
						</Col>
						<Col span={4}>
							&nbsp;
              <Select defaultValue={selectedType} size="large" onChange={(val) => setSelectType(val)}>
								{
									typeInfo.map((item, index) => {
										return (<Option value={item.Id} key={index}>{item.typeName}</Option>)
									})
								}
							</Select>
						</Col>
					</Row>
					<br />
					<Row gutter={10} >
						<Col span={12}>
							<TextArea
								className="markdown-content"
								rows={35}
								value={introducemd}
								onChange={changeIntroduce}
								onPressEnter={changeIntroduce}
								placeholder="文章内容"
							/>
						</Col>
						<Col span={12}>
							<div className="show-html" dangerouslySetInnerHTML={{ __html: introducehtml }}></div>
						</Col>
					</Row>
				</Col>

				<Col span={6}>
					<Row>
						<Col span={24}>
							<Button size="large">暂存文章</Button>&nbsp;
              <Button type="primary" size="large" onClick={saveArticle}>发布文章</Button>
							<br />
						</Col>
					</Row>
					<Col span={24}>
						<br />
						<TextArea
							rows={4}
							value={articleContent}
							onChange={changeContent}
							onPressEnter={changeContent}
							placeholder="文章简介"
						/><br /><br />
						<div
							className="introduce-html"
							dangerouslySetInnerHTML={{ __html: '文章简介：' + markdownContent }} >
						</div>
					</Col><br />
					<Col span={12}>
						<div className="date-select">
							<DatePicker
								placeholder="发布日期"
								size="large"
								onChange={(date, dateString) => setShowDate(dateString)}
							/>
						</div>
					</Col>
				</Col>

			</Row>
		</div>
	)
}

export default AddArticle