---
question: Cookie和Session的主要区别是什么？
answer: Cookie存储在客户端浏览器，容量小（约4KB），安全性较低；Session存储在服务器端，容量较大，安全性较高，但依赖Cookie存储Session ID。
explanation: Cookie适合存储非敏感信息如用户偏好；Session适合存储敏感信息如用户ID、登录状态。Session数据不在网络中传输，更安全，但会占用服务器内存资源。
module: 表单与会话
tags: ['PHP', 'Cookie', 'Session', '对比']
relatedLectures: ['lecture10']
draft: false
---
