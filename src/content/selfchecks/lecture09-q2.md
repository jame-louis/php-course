---
question: 遍历目录的scandir()和glob()有什么区别？
answer: scandir()返回指定目录中的所有文件和目录（包括.和..），返回数组包含所有条目；glob()支持通配符模式匹配（如*.jpg），只返回匹配的文件，功能更强大。
explanation: scandir适合列出所有内容；glob适合按模式查找，如获取所有图片$images = glob("uploads/*.jpg")。glob还支持GLOB_BRACE标志实现多模式匹配，如glob("*.{jpg,png,gif}", GLOB_BRACE)。
module: 表单与会话
tags: ['PHP', '目录操作', 'scandir', 'glob']
relatedLectures: ['lecture09']
draft: false
---
