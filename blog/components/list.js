import React, { useState } from 'react'
import { List, Avatar } from 'antd'
import axios from 'axios'

const list = () => {
  const [list, setList] = useState(
    [
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: 'Ant Design Title 2',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: 'Ant Design Title 3',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: 'Ant Design Title 3',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: 'Ant Design Title 3',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: 'Ant Design Title 3',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      },
      {
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        title: 'Ant Design Title 3',
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.'
      }
    ]
  )
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

// list.getInitialProps = async ()=>{
//   const promise = new Promise((resolve)=>{
//     axios('http://127.0.0.1:7001/default/getArticleList').then(
//       (res)=>{
//         //console.log('远程获取数据结果:',res.data.data)
//         resolve(res.data)
//       }
//     )
//   })

//   return await promise
// }


export default list