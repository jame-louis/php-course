---
question: 'time()、strtotime()和mktime()函数的作用和区别是什么？'
answer: 'time()获取当前Unix时间戳（秒数）；strtotime()将英文日期字符串转为时间戳，如strtotime("+1 day")得到明天此时的时间戳；mktime()根据给定的时分秒月日年创建时间戳，如mktime(0,0,0,1,1,2024)得到2024年元旦的时间戳。'
explanation: '这三个函数是PHP时间处理的核心。time()用于获取当前时间；strtotime()非常灵活，支持"+1 week"、"next Monday"等自然语言；mktime()适合构造特定日期。时间戳是自1970-01-01 00:00:00 UTC以来的秒数，便于计算时间差。'
module: '函数与类'
tags: ['函数', '时间日期', 'concept']
relatedLectures: ['lecture05']
draft: false
---
