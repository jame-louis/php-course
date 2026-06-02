---
question: setcookie()函数调用有什么限制？
answer: setcookie()必须在任何输出之前调用，包括HTML标签、echo输出、甚至BOM头。因为Cookie是通过HTTP响应头发送的，而响应头必须在响应体之前发送。
explanation: 如果已经有输出，HTTP头已经发送，再调用setcookie()会报"headers already sent"错误。解决方法是确保setcookie()在文件最开头，或者在输出缓冲区开启的情况下使用。
module: 表单与会话
tags: ['PHP', 'Cookie', 'setcookie']
relatedLectures: ['lecture10']
draft: false
---
