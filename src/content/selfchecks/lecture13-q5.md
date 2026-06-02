---
question: 为什么查询完成后要调用mysqli_free_result()？
answer: mysqli_free_result()释放结果集占用的内存。虽然脚本结束时PHP会自动释放，但在长时间运行的脚本或处理大量数据时，及时释放内存是好的编程习惯，可以提高性能。
explanation: 结果集可能占用较多内存，特别是在查询大量数据时。及时释放可以让内存被其他操作使用。不过在一般的Web请求中，由于请求生命周期短，这一步不是绝对必须的，但养成习惯有助于编写更健壮的代码。
module: 数据库操作
tags: ['PHP', 'MySQL', '内存管理']
relatedLectures: ['lecture13']
draft: false
---
