---
question: 什么是CSRF攻击？如何防护？
answer: CSRF（跨站请求伪造）是攻击者诱导已登录用户访问恶意链接，以用户身份执行非预期操作（如删除文章）。防护方法是使用CSRF令牌，表单提交时验证令牌是否匹配。
explanation: 服务器生成随机令牌存入Session，表单中加入隐藏字段传递该令牌，提交时验证。攻击者无法获取用户的Session中的令牌，因此无法构造有效请求。每次请求使用新令牌更安全。
module: 数据库操作
tags: ['PHP', '安全', 'CSRF', '令牌']
relatedLectures: ['lecture15']
draft: false
---
