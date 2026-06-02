---
question: 'PHP中的标量数据类型有哪些？单引号和双引号字符串有什么区别？'
answer: 'PHP标量类型包括：整型(integer)、浮点型(float)、布尔型(boolean)、字符串型(string)。单引号字符串原样输出，不解析变量；双引号字符串会解析变量和转义字符。例如：$name="PHP"; echo "$name"输出PHP，而echo "$name"输出$name。'
explanation: '理解单双引号的区别对字符串处理很重要。双引号会解析其中的变量，适合需要嵌入变量的场景；单引号性能略好，适合纯文本。'
module: '基础入门'
tags: ['数据类型', '字符串', 'concept']
relatedLectures: ['lecture02']
draft: false
---
