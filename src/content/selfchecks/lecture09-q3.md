---
question: 文件上传表单必须设置什么属性？
answer: 必须设置enctype="multipart/form-data"，这是告诉浏览器以二进制格式发送文件数据。
explanation: 如果缺少enctype，浏览器会以默认的application/x-www-form-urlencoded格式发送，文件数据会丢失。同时method必须是POST，input类型必须是file。这是文件上传的三要素。
module: 表单与会话
tags: ['PHP', '文件上传', 'HTML', '表单']
relatedLectures: ['lecture09']
draft: false
---
