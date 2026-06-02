---
question: 为什么生产环境要关闭display_errors？
answer: 显示错误信息会暴露服务器路径、数据库结构等敏感信息给攻击者。生产环境应关闭显示，将错误记录到日志文件，只给用户友好的错误提示。
explanation: 在config.php中设置DEBUG常量控制。开发环境DEBUG=true显示错误方便调试；生产环境DEBUG=false隐藏错误，用error_log()记录到文件。这是基本的安全配置。
module: 数据库操作
tags: ['PHP', '安全', '生产环境', '错误处理']
relatedLectures: ['lecture15']
draft: false
---
