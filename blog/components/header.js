import React, { useState, useEffect } from 'react'
import '../static/style/components/header.css'
import { Row, Col, Menu, Icon } from 'antd'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import Api from '../config/api'

const header = () => {
  const [navArray, setNavArray] = useState([])
  useEffect(()=>{
    const fetchData = async ()=>{
      const result= await axios(Api.getTypeInfo).then(res=>{
        setNavArray(res.data.data)
        return res.data.data
      })
      setNavArray(result)
    }
    fetchData()
  },[])
  const handleClick = (e)=>{
    if(e.key=='0'){
      Router.push('/index')
    }else{
      Router.push('/list?id='+e.key)
    }
  }
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={10} xl={10}>
          <span className="header-logo">hello</span>
          <span className="header-text">Ant Design</span>
        </Col>
        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal" onClick={handleClick}>
          <Menu.Item key='0'>
            <Icon type="home" />
            首页
          </Menu.Item>
            {
              navArray.map((item)=>{
                return(
                  <Menu.Item key={item.Id}>
                    <Icon type={item.icon} />
                    {item.typeName}
                  </Menu.Item>
                )
              }) 
            }
          </Menu>
        </Col>
      </Row>
    </div>
  )
}
export default header