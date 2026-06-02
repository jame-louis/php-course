---
question: 'mt_rand()和random_int()有什么区别？各适用于什么场景？'
answer: 'mt_rand()使用Mersenne Twister算法，生成速度快，适合游戏、抽奖等普通场景；random_int()使用加密安全的随机数生成器，适合生成密码、令牌、验证码等安全敏感场景。random_int()在PHP7+可用，失败时抛出异常。'
explanation: '安全场景必须使用random_int()，因为mt_rand()生成的随机数是可预测的。例如生成密码重置令牌、CSRF防护令牌、加密密钥等，如果使用mt_rand()可能被攻击者破解。普通场景如随机显示名言、随机排序等用mt_rand()即可。'
module: '函数与类'
tags: ['函数', '随机数', '安全', 'concept']
relatedLectures: ['lecture05']
draft: false
---
