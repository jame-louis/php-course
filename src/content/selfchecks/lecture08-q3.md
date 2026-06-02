---
question: 如何防止XSS攻击？
answer: 使用htmlspecialchars()函数对用户输入进行转义，将特殊字符（如<、>、"等）转换为HTML实体，使其作为纯文本显示而不会被执行。
explanation: XSS攻击是指攻击者在输入中插入恶意脚本（如<script>alert('hack')</script>），如果不处理直接输出，脚本会在用户浏览器中执行。推荐写法：htmlspecialchars($str, ENT_QUOTES, 'UTF-8')。
module: 表单与会话
tags: ['PHP', '安全', 'XSS', 'htmlspecialchars']
relatedLectures: ['lecture08']
draft: false
---
