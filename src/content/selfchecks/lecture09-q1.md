---
question: file_get_contents()和fopen()/fread()有什么区别？
answer: file_get_contents()是简便方法，一步读取整个文件内容，适合小文件；fopen()/fread()是传统方法，可以控制读取长度、使用不同模式（如追加a、写入w等），适合大文件或需要精细控制的场景。
explanation: file_get_contents()内部实际上也是调用fopen等函数，但使用更简单。对于大文件，应该使用fopen配合fread分块读取，避免内存溢出。file_get_contents()还可以通过URL读取远程文件（如果allow_url_fopen开启）。
module: 表单与会话
tags: ['PHP', '文件操作', 'file_get_contents']
relatedLectures: ['lecture09']
draft: false
---
