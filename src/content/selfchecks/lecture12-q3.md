---
question: 什么是SQL注入攻击？如何防止？
answer: SQL注入是攻击者在输入中插入恶意SQL代码（如' OR '1'='1），如果直接拼接到SQL语句中执行，可能导致数据泄露或被删除。防止方法是使用预处理语句，将SQL结构和参数分开处理。
explanation: 预处理语句先用占位符（?）定义SQL结构，再传入参数，数据库会将参数当作纯文本而非SQL代码执行。例如mysqli_prepare()配合mysqli_stmt_bind_param()可以安全地处理用户输入。
module: 数据库操作
tags: ['PHP', 'MySQL', '安全', 'SQL注入', '预处理语句']
relatedLectures: ['lecture12']
draft: false
---
