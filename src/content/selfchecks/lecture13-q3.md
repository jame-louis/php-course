---
question: 分页查询中如何计算LIMIT的偏移量（OFFSET）？
answer: 偏移量 = (当前页码 - 1) × 每页显示条数。例如每页10条，第1页偏移量是0，第2页是10，第3页是20。
explanation: 数据库记录从0开始计数，所以第1页从0开始取，第2页跳过前10条从第11条开始。SQL写法：LIMIT 偏移量, 数量 或 LIMIT 数量 OFFSET 偏移量。
module: 数据库操作
tags: ['PHP', 'MySQL', '分页']
relatedLectures: ['lecture13']
draft: false
---
