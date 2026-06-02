---
question: 删除前为什么要用confirm()确认？
answer: 删除操作不可逆，confirm()可以在执行前让用户二次确认，防止误操作。如果用户点击"取消"，返回false阻止链接跳转或表单提交。
explanation: JavaScript的confirm()会弹出确认对话框，点击"确定"返回true继续执行，点击"取消"返回false阻止默认行为。这是一个简单但有效的安全措施，避免用户误点删除按钮造成数据丢失。
module: 数据库操作
tags: ['PHP', 'JavaScript', '删除', 'confirm']
relatedLectures: ['lecture14']
draft: false
---
