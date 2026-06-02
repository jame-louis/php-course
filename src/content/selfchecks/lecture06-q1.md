---
question: 在PHP中，默认参数应该放在参数列表的什么位置？
answer: 默认参数必须放在参数列表的右侧（末尾）。例如：function order($product, $quantity = 1, $price = 10) 是正确的，而 function demo($a = 1, $b) 是错误的。
explanation: 这是PHP的语法规定。如果默认参数放在非默认参数前面，调用时会产生歧义，PHP无法判断实参是传给哪个形参的。
module: 函数与类
tags: ['PHP', '函数', '默认参数']
relatedLectures: ['lecture06']
draft: false
---
