---
question: 如何删除一个Cookie？
answer: 使用setcookie()将Cookie的过期时间设置为过去的时间，如setcookie("username", "", time() - 3600)。浏览器发现Cookie已过期，会自动删除它。
explanation: 删除Cookie的原理是让其过期。必须与原Cookie的路径和域名相同才能正确删除。例如原Cookie设置了路径"/admin/"，删除时也必须设置相同路径。
module: 表单与会话
tags: ['PHP', 'Cookie', '删除']
relatedLectures: ['lecture10']
draft: false
---
