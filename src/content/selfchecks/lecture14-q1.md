---
question: UPDATE和DELETE语句为什么必须带WHERE条件？
answer: 不带WHERE会修改或删除表中所有记录，这是非常危险的操作。例如UPDATE student SET age=20会修改所有学生的年龄，DELETE FROM student会删除所有学生数据。
explanation: WHERE子句用于限定操作范围。开发时务必先写WHERE再写SET/DELETE，养成习惯。如果不小心执行了全表更新/删除，可能造成无法挽回的数据丢失。建议操作前先备份或使用事务。
module: 数据库操作
tags: ['MySQL', 'UPDATE', 'DELETE', '安全']
relatedLectures: ['lecture14']
draft: false
---
