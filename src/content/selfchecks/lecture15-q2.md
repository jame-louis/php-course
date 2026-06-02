---
question: 为什么密码不能用md5()存储？正确的做法是什么？
answer: md5()容易被彩虹表破解，不安全。正确做法是用password_hash()生成哈希，它自动使用当前最安全的算法（如bcrypt）并加盐。验证时用password_verify()。
explanation: password_hash()生成的哈希包含算法信息、盐值和哈希值，每次生成的结果都不同。password_verify()可以验证密码是否匹配，即使不知道具体算法和盐值也能正确验证。永远不要自己写哈希算法。
module: 数据库操作
tags: ['PHP', '安全', '密码', 'password_hash']
relatedLectures: ['lecture15']
draft: false
---
