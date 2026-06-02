---
question: PDO和mysqli有什么区别？为什么推荐用PDO？
answer: PDO是PHP的数据对象扩展，支持多种数据库（MySQL、PostgreSQL、SQLite等），语法统一；mysqli只支持MySQL。PDO的预处理语句更完善，是跨数据库开发的推荐选择。
explanation: PDO提供更抽象的数据库访问层，切换数据库时只需改连接字符串，业务代码基本不变。PDO的预处理语句采用真正的参数绑定，安全性更好。对于需要支持多种数据库的项目，PDO是必选。
module: 数据库操作
tags: ['PHP', 'PDO', 'mysqli', '数据库']
relatedLectures: ['lecture15']
draft: false
---
