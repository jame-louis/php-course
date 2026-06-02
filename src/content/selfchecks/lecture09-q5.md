---
question: 文件上传安全检查应该包括哪些方面？
answer: 1) 检查错误码是否为UPLOAD_ERR_OK；2) 检查文件大小是否在允许范围内；3) 检查文件扩展名是否在白名单中；4) 检查MIME类型是否合法；5) 生成新的随机文件名防止覆盖和注入攻击。
explanation: 这些检查层层防护：错误码检查确保上传成功；大小检查防止资源耗尽；扩展名和MIME检查防止上传可执行文件；新文件名防止路径遍历攻击（如../../../etc/passwd）。
module: 表单与会话
tags: ['PHP', '文件上传', '安全', '验证']
relatedLectures: ['lecture09']
draft: false
---
