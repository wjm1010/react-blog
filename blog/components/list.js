import React, { useState } from 'react'
import { List, Avatar } from 'antd'
import axios from 'axios'

const list = () => {
  const { list, setList } = useState([])
  return (
    <div>
      <List
        header={<div>个人信息</div>}
        dataSource={list}
        size="large"
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href="">{item.title}</a>}
              description={item.description} />
            {item.content}
          </List.Item>
        )}>

      </List>
    </div>
  )
}

export default list