---
question: 如何防止Session Fixation攻击？
answer: 在用户身份验证成功后（如登录成功），调用session_regenerate_id(true)重新生成Session ID，使攻击者之前获取的Session ID失效。
explanation: Session Fixation攻击是指攻击者预设一个Session ID，诱导用户使用该ID登录。 regenerate_id(true)会创建新的Session ID并删除旧文件，true参数确保删除旧文件防止信息泄露。
module: 表单与会话
tags: ['PHP', 'Session', '安全', 'Session Fixation']
relatedLectures: ['lecture11']
draft: false
---
