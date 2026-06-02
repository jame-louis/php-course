---
question: 批量删除时为什么要检查空数组？
answer: 如果没有选择任何记录就提交，IN子句会变成DELETE FROM student WHERE id IN ()，这是语法错误的SQL。需要先检查数组是否为空，为空则提示用户选择。
explanation: SQL的IN子句不能为空。在PHP中用empty($ids)检查，如果为空则给出提示并不执行删除。这是防御性编程，防止程序因SQL语法错误而崩溃。
module: 数据库操作
tags: ['PHP', 'MySQL', '批量删除', '验证']
relatedLectures: ['lecture14']
draft: false
---
