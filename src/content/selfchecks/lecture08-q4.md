---
question: 正则表达式中，^、$、\d、+ 分别代表什么含义？
answer: ^表示字符串开头，$表示字符串结尾，\d表示任意数字(0-9)，+表示前面的字符出现1次或多次。
explanation: 这些是正则的基础元字符。例如 /^\d{11}$/ 匹配11位数字（如手机号），^和$确保整个字符串完全匹配，而不是部分匹配。\d{11}表示连续11个数字。
module: 表单与会话
tags: ['PHP', '正则表达式', 'preg_match']
relatedLectures: ['lecture08']
draft: false
---
