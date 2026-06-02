---
question: PHP连接MySQL数据库的四个步骤是什么？
answer: 1) 使用mysqli_connect()建立连接；2) 使用mysqli_set_charset()设置字符集防止中文乱码；3) 使用mysqli_query()或预处理语句执行SQL；4) 使用mysqli_close()关闭连接释放资源。
explanation: 这四个步骤是标准流程。第一步获取数据库连接对象，第二步设置utf8mb4字符集支持中文，第三步执行增删改查操作，第四步关闭连接是良好的编程习惯，避免资源泄漏。
module: 数据库操作
tags: ['PHP', 'MySQL', '数据库连接']
relatedLectures: ['lecture12']
draft: false
---
