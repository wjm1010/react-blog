import React from 'react'
import { List, Avatar } from 'antd'
import Link from 'next/link'

const list = (list) => {
  const listItem = list.content
  return (
    <div>
      <List
        style={{ padding: '0 20px' }}
        itemLayout="vertical"
        header={<div>个人信息</div>}
        dataSource={listItem}
        size="large"
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={
                <Link href={{ pathname: '/detail', query: { id: item.id } }}>
                  <a>{item.title}</a>
                </Link>
              } />
            <div>{item.article_content}</div>
            <div className='addTime'>{item.addTime}</div>
          </List.Item>
        )}>
      </List>
      <style jsx>
        {
          `
          .addTime{
            color: #a79f9f;
            text-align: right
          }
          `
        }
      </style>
    </div>
  )
}

export default list