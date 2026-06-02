---
question: 编辑页面如何实现数据回显？
answer: 首先根据ID查询数据库获取原有数据，然后在表单元素的value属性中输出这些值。例如<input value="<?php echo $student['name']; ?>">，这样用户打开页面时就能看到当前数据。
explanation: 编辑流程是：1) 从URL获取ID；2) 查询该记录数据；3) 将数据填入表单value；4) 用户修改提交；5) 执行UPDATE。如果忘记加value属性，表单会显示为空，用户就看不到要修改的原值了。
module: 数据库操作
tags: ['PHP', '表单', '数据回显', '编辑']
relatedLectures: ['lecture14']
draft: false
---
