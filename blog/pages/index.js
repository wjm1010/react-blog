import React from 'react'
import Head from 'next/head'
import { Row, Col } from 'antd'
import Header from '../components/header'
import List from '../components/list'
import Author from '../components/author'
import Advert from '../components/advert'
import Footer from '../components/footer'
const Home = () => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={15} lg={17} xl={19}>
          <List />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={8} lg={6} xl={4}>
          <Author />
          <Advert />

        </Col>
      </Row>
      <Footer />
    </div>
  )
}

export default Home
