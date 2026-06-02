---
question: 为什么表单元素必须设置name属性？
answer: name属性是表单数据提交时的"键"，PHP通过$_GET或$_POST数组根据name获取对应的值。没有name属性的表单元素，其数据不会被提交到服务器。
explanation: 例如<input type="text" name="username">，提交后PHP可以用$_POST['username']获取值。如果省略name，该输入框的数据会丢失。
module: 表单与会话
tags: ['PHP', '表单', 'HTML']
relatedLectures: ['lecture08']
draft: false
---
