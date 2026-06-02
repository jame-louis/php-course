---
question: 删除操作为什么要用POST而不是GET？
answer: GET请求用于获取数据，应该是安全的、幂等的（多次执行结果相同）。删除是修改数据的操作，用GET可能被浏览器预加载、爬虫访问或被恶意链接触发。POST需要表单提交，更安全。
explanation: 搜索引擎爬虫会跟随链接，如果删除用GET（如delete.php?id=1），可能导致整站数据被爬删。POST需要构造表单才能提交，且应配合CSRF令牌，能有效防止意外删除。
module: 数据库操作
tags: ['PHP', '安全', 'HTTP', 'DELETE', 'POST']
relatedLectures: ['lecture15']
draft: false
---
