---
question: SELECT语句中WHERE、ORDER BY、LIMIT的作用分别是什么？
answer: WHERE用于筛选符合条件的记录；ORDER BY用于按指定字段排序（ASC升序/DESC降序）；LIMIT用于限制返回的记录数量，常用于分页。
explanation: 这三个子句是查询的核心。WHERE缩小结果集范围，ORDER BY控制显示顺序，LIMIT控制显示数量。例如：SELECT * FROM student WHERE age>18 ORDER BY age DESC LIMIT 10 返回年龄大于18的10名学生，按年龄从大到小排列。
module: 数据库操作
tags: ['MySQL', 'SELECT', '查询']
relatedLectures: ['lecture13']
draft: false
---
