---
question: 什么是"记住我"功能？如何实现？
answer: "记住我"功能让用户关闭浏览器后仍保持登录状态。实现方式是：用户勾选"记住我"时，设置持久Cookie（如7天有效期）；不勾选时，设置会话Cookie（浏览器关闭即删除）。
explanation: 实现时使用条件判断设置不同的过期时间：$expire = $remember ? time() + 7*24*3600 : 0，然后setcookie("user", $username, $expire)。0表示会话Cookie，正值表示持久Cookie。
module: 表单与会话
tags: ['PHP', 'Cookie', '记住我', '登录']
relatedLectures: ['lecture10']
draft: false
---
