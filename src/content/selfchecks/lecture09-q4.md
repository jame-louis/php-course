---
question: 为什么文件上传后必须使用move_uploaded_file()而不是rename()？
answer: move_uploaded_file()会检查文件是否是通过HTTP POST上传的，防止恶意构造的文件路径攻击；而rename()没有这个安全检查，可能导致安全问题。
explanation: move_uploaded_file()是专门为上传文件设计的，它会验证临时文件确实是上传产生的，防止攻击者通过构造$_FILES数组来操作服务器上的任意文件。这是安全上传的必要步骤。
module: 表单与会话
tags: ['PHP', '文件上传', '安全', 'move_uploaded_file']
relatedLectures: ['lecture09']
draft: false
---
