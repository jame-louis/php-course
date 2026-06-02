---
question: '遍历数组时，for循环和foreach循环各有什么适用场景？'
answer: 'for循环适合索引数组且需要知道当前索引位置的场景；foreach循环适合所有数组类型，语法更简洁，可遍历关联数组。foreach有两种形式：foreach($arr as $value)只获取值，foreach($arr as $key=>$value)同时获取键和值。'
explanation: 'foreach是PHP中最常用的数组遍历方式，因为它自动处理数组内部指针，不需要手动控制循环变量。关联数组必须使用foreach或while+each遍历，因为键名不是连续数字。'
module: '基础入门'
tags: ['数组', '循环', 'concept']
relatedLectures: ['lecture04']
draft: false
---
