---
question: 'isset()和empty()函数有什么区别？'
answer: 'isset()检查变量是否存在且不为null，存在且非null返回true；empty()检查变量是否为空值，值为""、0、"0"、null、false、[]或未定义时返回true。关键区别：isset认为""和0是非空，empty认为它们是空。'
explanation: '二者是PHP中最常用的变量检测函数。isset($var)为false的情况只有两种：变量未定义、变量值为null。empty($var)相当于!isset($var) || $var==false。表单验证时常用empty()检查用户是否填写了字段。'
module: '函数与类'
tags: ['函数', '检测函数', 'concept']
relatedLectures: ['lecture05']
draft: false
---
