---
question: GET和POST两种表单提交方式有什么区别？
answer: GET通过URL传递数据（如?page=1&id=5），数据可见且容量有限，适合搜索、筛选等非敏感操作；POST通过HTTP请求体传递数据，数据隐藏且容量较大，适合登录、提交表单等敏感操作。
explanation: GET的数据会显示在URL中，有长度限制（约2KB），不安全但可缓存、可收藏；POST数据不显示在URL中，无明确大小限制，相对安全。敏感信息如密码、个人信息必须使用POST。
module: 表单与会话
tags: ['PHP', '表单', 'GET', 'POST']
relatedLectures: ['lecture08']
draft: false
---
