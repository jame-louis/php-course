---
question: 使用Session前必须先做什么？
answer: 必须先调用session_start()函数启动Session。该函数必须在任何输出之前调用，包括HTML标签和空格。
explanation: session_start()会创建或恢复Session，初始化$_SESSION数组。如果没有调用就直接使用$_SESSION，会报错或未定义行为。通常在PHP文件最开头调用。
module: 表单与会话
tags: ['PHP', 'Session', 'session_start']
relatedLectures: ['lecture11']
draft: false
---
