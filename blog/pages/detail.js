import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Icon, Affix } from 'antd'

import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/advert'
import Footer from '../components/footer'
import Api from '../config/api'

import axios from 'axios'
import marked from 'marked'
import hljs from "highlight.js"
import 'highlight.js/styles/monokai-sublime.css'

const detail = (props) => {
  const info = props
  const renderer = new marked.Renderer()
  marked.setOptions({
    renderer: renderer,
    gfm: true, // 允许 Git Hub标准的markdown.
    pedantic: false, // 尽可能地兼容 markdown.pl的晦涩部分。不纠正原始模型任何的不良行为和错误。
    sanitize: false, // 对输出进行过滤（清理），将忽略任何已经输入的html代码（标签）
    tables: true, // 允许支持表格语法。该选项要求 gfm 为true。
    breaks: false, // 允许回车换行。该选项要求 gfm 为true。
    smartLists: true, // 使用比原生markdown更时髦的列表。 旧的列表将可能被作为pedantic的处理内容过滤掉.
    smartypants: false, // 使用更为时髦的标点，比如在引用语法中加入破折号。
    highlight: function (code) { // 高亮
      return hljs.highlightAuto(code).value
    }
  })
  let html = marked(props.content)

  return (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">
                Ant Design
              </div>

              <div className="list-icon center">
                <span><Icon type="calendar" />{info.addTime}</span>
                <span><Icon type="folder" />{info.typeName}</span>
                <span><Icon type="fire" />{info.view_count}</span>
              </div>

              <div className="detailed-content"
                dangerouslySetInnerHTML={{ __html: html }}>
              </div>

            </div>

          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <ul>
                <li>111111111</li>
                <li>222222222</li>
                <li>333333333</li>
                <li>444444444</li>
              </ul>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
      <style jsx>
        {
          `
          .bread-div{
            padding: .5rem;
            border-bottom:1px solid #eee;
            background-color: #e1f0ff;
          }
          .detailed-title{
            font-size: 1.8rem;
            text-align: center;
            padding: 1rem;
          }
          .center{
            text-align: center;
          }
          .list-icon span{
            margin-right: 20px
          }
          .detailed-content{
            padding: 1.3rem;
            font-size: 14px;
            line-height: 30px
          }
          `
        }
      </style>
    </>
  )
}

detail.getInitialProps = async (context) => {
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(`${Api.getArticleById}/${id}`).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default detail
