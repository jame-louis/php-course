---
question: 什么是HTTP无状态特性？为什么需要会话技术？
answer: HTTP无状态指服务器不会保存客户端的请求历史，每次请求都是独立的。会话技术（Cookie/Session）用于在多次请求之间保持用户状态，如登录状态、购物车内容等。
explanation: 无状态是HTTP协议的设计特点，简化服务器设计但不利于保持用户状态。Cookie通过在客户端存储标识，Session通过在服务器存储数据，配合Cookie中的Session ID，实现了状态保持。
module: 表单与会话
tags: ['PHP', 'HTTP', 'Cookie', 'Session', '无状态']
relatedLectures: ['lecture10']
draft: false
---
