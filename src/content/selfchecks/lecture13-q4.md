---
question: mysqli_fetch_assoc()和mysqli_fetch_row()有什么区别？
answer: mysqli_fetch_assoc()返回关联数组（字段名作为键），如['id'=>1,'name'=>'张三']；mysqli_fetch_row()返回索引数组（数字下标），如[1,'张三']。
explanation: 关联数组更易读，可以直接用$row['name']获取字段值；索引数组需要记住字段顺序，用$row[1]获取。通常推荐使用mysqli_fetch_assoc()，代码可读性更好。
module: 数据库操作
tags: ['PHP', 'MySQL', '结果集处理']
relatedLectures: ['lecture13']
draft: false
---
