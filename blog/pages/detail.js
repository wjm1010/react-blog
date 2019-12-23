import React from 'react'
import Head from 'next/head'
import { Row, Col, Breadcrumb, Icon, Affix } from 'antd'
import Header from '../components/header'
import Author from '../components/author'
import Advert from '../components/advert'
import Footer from '../components/footer'
import MarkNav from 'markdown-navbar'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'
import Config from '../config'

const detail = () => {
  let markdown = '# P01: react1\n' +
    '[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n' +
    '> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n' +
    '**这是加粗的文字**\n\n' +
    '*这是倾斜的文字*`\n\n' +
    '***这是斜体加粗的文字***\n\n' +
    '~~这是加删除线的文字~~ \n\n' +
    '\`console.log(111)\` \n\n' +
    '# p02: react2\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n' +
    '***\n\n\n' +
    '# p03: react3\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p04: react4\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p05: react5\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '# p06: react6\n' +
    '> aaaaaaaaa\n' +
    '>> bbbbbbbbb\n' +
    '>>> cccccccccc\n\n' +
    '``` var a=11; ```'

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
                小明视频资料
                </div>

              <div className="list-icon center">
                <span><Icon type="calendar" /> 2019-06-28</span>
                <span><Icon type="folder" /> 小明教学</span>
                <span><Icon type="fire" /> 5498人</span>
              </div>

              <div className="detailed-content" >
                <ReactMarkdown
                  source={markdown}
                  escapeHtml={false}
                />
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
              <MarkNav
                className="article-menu"
                source={markdown}

                ordered={false}
              />
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
        .detailed-content{
            padding: 1.3rem;
            font-size: 1rem;
        }
        code {
            display: block ;
             background-color:#f3f3f3;
             padding: .5rem !important;
             overflow-y: auto;
             font-weight: 300;
             font-family: Menlo, monospace;
             border-radius: .3rem;
        }
        
        .title-anchor{
            color:#888 !important;
            padding:4px !important;
            margin: 0rem !important;
            height: auto !important;
            line-height: 1.2rem !important;
            font-size: .9rem !important;
            border-bottom: 1px dashed #eee;
        }
        .active{
            color:rgb(30, 144, 255) !important;
        }
        .nav-title{
            text-align: center;
            color: #888;
            border-bottom: 1px solid rgb(30, 144, 255);
        
        }
          `
        }
      </style>
    </>
  )
}

detail.getInitialProps = async (context) => {
  console.log(context.query.id)
  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(`${Config.url}default/getArticleById/${id}`).then(
      (res) => {
        console.log(title)
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}

export default detail
