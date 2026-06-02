---
question: 如何安全地销毁Session（实现登出功能）？
answer: 1) 调用session_start()启动Session；2) 清空$_SESSION数组：$_SESSION = []；3) 销毁Session文件：session_destroy()；4) 删除Cookie中的Session ID。
explanation: 完整的登出需要四步：清空数组移除数据，session_destroy()删除服务器端文件，删除Cookie移除客户端标识。这样下次访问时就会创建全新的Session。
module: 表单与会话
tags: ['PHP', 'Session', '销毁', '登出']
relatedLectures: ['lecture11']
draft: false
---
