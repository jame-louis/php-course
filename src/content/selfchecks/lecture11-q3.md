---
question: Session和Cookie是如何配合工作的？
answer: Session数据存储在服务器，但需要在Cookie中保存Session ID（如PHPSESSID=abc123）。浏览器每次请求自动携带这个Cookie，服务器根据ID找到对应的Session数据。
explanation: 这是一种典型的"服务端存储+客户端标识"模式。Session ID是"钥匙"，存在Cookie里；Session数据是"储物柜里的物品"，存在服务器。这样既安全又能保持状态。
module: 表单与会话
tags: ['PHP', 'Session', 'Cookie', '工作原理']
relatedLectures: ['lecture11']
draft: false
---
