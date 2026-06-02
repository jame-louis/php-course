---
question: 什么是LEFT JOIN？与INNER JOIN有什么区别？
answer: LEFT JOIN返回左表的所有记录，右表匹配不上的显示NULL；INNER JOIN只返回两表匹配的记录。LEFT JOIN适合需要显示主表全部数据的场景。
explanation: 在学生成绩查询中，用LEFT JOIN可以显示所有学生，即使有的学生还没有成绩（成绩显示为NULL）。用INNER JOIN则只显示有成绩的学生。选择哪种JOIN取决于业务需求。
module: 数据库操作
tags: ['MySQL', 'JOIN', '关联查询']
relatedLectures: ['lecture13']
draft: false
---
