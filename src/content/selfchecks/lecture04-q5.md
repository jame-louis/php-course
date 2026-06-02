---
question: '什么是二维数组？如何遍历二维数组？'
answer: '二维数组是数组的数组，用于存储表格型数据。定义如$students=[["name"=>"张三","score"=>85],["name"=>"李四","score"=>90]]。遍历使用嵌套foreach：foreach($students as $student){ echo $student["name"]; }'
explanation: '二维数组常用于存储多行数据，如学生成绩表、订单列表。遍历时外层循环取每一行，内层（或直接）访问该行各字段。可以用多个[]访问深层数据，如$arr[0]["name"]。PHP还支持三维及以上数组。'
module: '基础入门'
tags: ['数组', '数据结构', 'concept']
relatedLectures: ['lecture04']
draft: false
---
