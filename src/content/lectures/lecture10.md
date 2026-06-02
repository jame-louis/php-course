---
title: Cookie与会话技术基础
lectureNumber: 10
module: 表单与会话
description: 理解HTTP无状态特性，掌握Cookie的工作原理及基本操作，为Session学习打下基础。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture09']
tags: ['PHP', 'Cookie', 'HTTP', '会话', '无状态']
hasSlides: false
hasAssignment: true
draft: false
---

> 学习目标：理解HTTP无状态特性，掌握Cookie的工作原理及基本操作，为Session学习打下基础。

---

## 学习路线图

```
第1关：理解HTTP无状态 ──→ 第2关：Cookie基础 ──→ 第3关：Cookie操作
         ↓                        ↓                      ↓
    什么是无状态               Cookie原理               创建/读取/删除
    为什么需要会话             存储位置                 过期时间设置
```

---

## 第1关：理解HTTP无状态

### 1.1 什么是无状态？

**费曼解释**：HTTP协议就像"金鱼记忆"——每次请求都是全新的开始，服务器不会记得你之前做过什么。

```
用户A  ──→ 服务器：我要登录
服务器 ──→ 用户A：登录成功

[5分钟后]

用户A  ──→ 服务器：我要查看个人信息   服务器：你是谁？
```

**为什么需要会话技术？**

| 场景 | 无HTTP会话 | 有会话技术 |
|------|-----------|-----------|
| 登录状态 | 每次请求都要重新登录 | 登录后保持登录状态 |
| 购物车 | 无法记住已选商品 | 跨页面保存购物车 |
| 用户偏好 | 无法记住设置 | 保存用户偏好 |

---

## 第2关：Cookie基础

### 2.1 Cookie是什么？

**类比理解**：Cookie就像"会员卡"——服务器给你的凭证，你每次来都出示，服务器就知道你是谁。

```
第一次访问商店：
顾客 ──→ 商店：我要买东西
商店 ──→ 顾客：给你会员卡（Cookie），下次带它来

再次访问：
顾客 ──→ 商店：我要买东西 + 出示会员卡（Cookie）
商店 ──→ 顾客：欢迎回来，张先生！
```

**技术流程**：

```
┌──────────┐                    ┌──────────┐
│  浏览器   │ ─── 1.首次请求 ───→ │  Web服务器 │
│          │                    │          │
│          │ ←─ 2.响应+Set-Cookie─│          │
│  保存Cookie│                    │          │
│          │                    │          │
│          │ ── 3.后续请求+Cookie─→│          │
│  自动携带 │                    │ 识别用户  │
└──────────┘                    └──────────┘
```

### 2.2 Cookie存储在哪里？

| 存储位置 | 说明 | 示例 |
|---------|------|------|
| 浏览器内存 | 会话Cookie，关闭浏览器即删除 | 未设置过期时间的Cookie |
| 本地文件 | 持久Cookie，按过期时间保存 | 设置了过期时间的Cookie |

**Chrome查看Cookie**：
```
F12 → Application → Cookies → 选择网站
```

---

## 第3关：Cookie操作

### 3.1 设置Cookie

**基本语法**：

```php
<?php
// setcookie(name, value, expire, path, domain, secure, httponly)

// 最简单的设置（会话Cookie，关闭浏览器即失效）
setcookie("username", "张三");

// 设置持久Cookie（1小时后过期）
setcookie("username", "张三", time() + 3600);

// 设置7天有效期的Cookie
setcookie("remember", "yes", time() + 7 * 24 * 3600);

// 设置特定路径可用的Cookie
setcookie("admin", "true", time() + 3600, "/admin/");
?>
```

**重要提示**：`setcookie()` 必须在任何输出之前调用！

```php
<?php
// 正确：setcookie在输出之前
cookie("user", "test");
echo "Cookie已设置";

// 错误：已经有输出了
// echo "Hello";
// setcookie("user", "test");  // 会报错！
?>
```

### 动手练 3.1

编写一个页面，设置3个Cookie：
1. `username` - 保存你的名字，7天有效期
2. `visit_count` - 访问计数器（每次访问+1）
3. `last_visit` - 上次访问时间

<details>
<summary>参考答案</summary>

```php
<?php
// 1. 设置用户名（7天）
setcookie("username", "张三", time() + 7 * 24 * 3600);

// 2. 访问计数器
$count = $_COOKIE['visit_count'] ?? 0;
$count++;
setcookie("visit_count", $count, time() + 365 * 24 * 3600);

// 3. 上次访问时间
$lastVisit = $_COOKIE['last_visit'] ?? '首次访问';
setcookie("last_visit", date('Y-m-d H:i:s'), time() + 365 * 24 * 3600);

echo "<h2>Cookie设置成功</h2>";
echo "<p>用户名：张三</p>";
echo "<p>访问次数：{$count}</p>";
echo "<p>上次访问：{$lastVisit}</p>";
?>
```

</details>

---

### 3.2 读取Cookie

**基本语法**：

```php
<?php
// 通过 $_COOKIE 超全局数组读取

// 检查Cookie是否存在
if (isset($_COOKIE['username'])) {
    echo "欢迎回来，" . $_COOKIE['username'];
} else {
    echo "请先登录";
}

// 使用 ?? 提供默认值
$theme = $_COOKIE['theme'] ?? 'light';  // 默认浅色主题
$language = $_COOKIE['lang'] ?? 'zh';   // 默认中文

// 读取并解码数组Cookie（需要反序列化）
if (isset($_COOKIE['preferences'])) {
    $prefs = unserialize($_COOKIE['preferences']);
    // 注意：这种方法有安全风险，推荐使用JSON
}

// 安全的数组存储方式（JSON）
if (isset($_COOKIE['settings'])) {
    $settings = json_decode($_COOKIE['settings'], true);
}
?>
```

### 动手练 3.2

编写一个"个性化欢迎页面"：
1. 如果用户首次访问，显示表单让用户输入名字
2. 如果用户已设置名字（通过Cookie），显示个性化欢迎信息

<details>
<summary>参考答案</summary>

```php
<?php
// 处理表单提交
if ($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($_POST['name'])) {
    setcookie("visitor_name", $_POST['name'], time() + 30 * 24 * 3600);
    header("Location: " . $_SERVER['PHP_SELF']);
    exit;
}

// 检查是否有Cookie
$name = $_COOKIE['visitor_name'] ?? null;
?>
<!DOCTYPE html>
<html>
<head>
    <title>个性化欢迎</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding-top: 100px; }
        .welcome { color: #4CAF50; font-size: 2em; }
        form { margin-top: 20px; }
        input { padding: 10px; font-size: 16px; }
        button { padding: 10px 20px; background: #4CAF50; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <?php if ($name): ?>
        <div class="welcome">欢迎回来，<?php echo htmlspecialchars($name); ?>！</div>
        <p>上次访问时间：<?php echo $_COOKIE['last_visit'] ?? '未知'; ?></p>
        <?php setcookie("last_visit", date('Y-m-d H:i:s'), time() + 30 * 24 * 3600); ?>
    <?php else: ?>
        <h2>欢迎来到我的网站</h2>
        <p>请告诉我你的名字：</p>
        <form method="POST">
            <input type="text" name="name" placeholder="你的名字" required>
            <button type="submit">开始体验</button>
        </form>
    <?php endif; ?>
</body>
</html>
```

</details>

---

### 3.3 删除Cookie

**删除Cookie的方法**：

```php
<?php
// 方法1：设置过期时间为过去的时间（推荐）
setcookie("username", "", time() - 3600);

// 方法2：设置空值
setcookie("username", "");

// 删除特定路径的Cookie
setcookie("admin", "", time() - 3600, "/admin/");

// 删除后跳转
header("Location: login.php");
exit;
?>
```

### 动手练 3.3

编写"登出"功能：
1. 删除所有用户相关的Cookie
2. 显示"已成功登出"信息
3. 3秒后自动跳转到登录页

<details>
<summary>参考答案</summary>

```php
<?php
// 删除用户相关Cookie
setcookie("username", "", time() - 3600);
setcookie("user_id", "", time() - 3600);
setcookie("is_logged_in", "", time() - 3600);
setcookie("last_visit", "", time() - 3600);
?>
<!DOCTYPE html>
<html>
<head>
    <title>已登出</title>
    <meta http-equiv="refresh" content="3;url=login.php">
    <style>
        body { font-family: Arial, sans-serif; text-align: center; padding-top: 100px; }
        .message { color: #4CAF50; font-size: 1.5em; }
        .countdown { color: #666; }
    </style>
</head>
<body>
    <div class="message"> 已成功登出</div>
    <p class="countdown">3秒后自动跳转到登录页面...</p>
    <p><a href="login.php">立即跳转</a></p>
</body>
</html>
```

</details>

---

### 3.4 使用Cookie保存数组

**安全地保存数组数据**：

```php
<?php
// 不推荐的方式（安全性差）
// setcookie("data", serialize(['name' => '张三', 'age' => 25]));

// 推荐：使用JSON
$userData = [
    'name' => '张三',
    'preferences' => ['theme' => 'dark', 'lang' => 'zh']
];

// 保存（30天有效期）
setcookie("user_prefs", json_encode($userData), time() + 30 * 24 * 3600);

// 读取
if (isset($_COOKIE['user_prefs'])) {
    $data = json_decode($_COOKIE['user_prefs'], true);
    echo "主题：" . ($data['preferences']['theme'] ?? 'light');
}
?>
```

---

## 综合挑战

### 挑战：记住我登录系统

**需求**：
1. 登录页面（login.php）
   - 用户名/密码输入
   - "记住我"复选框
2. 处理登录（do_login.php）
   - 验证用户名密码（模拟：admin/123456）
   - 如果"记住我"，设置7天有效期的Cookie
   - 如果不"记住我"，设置会话Cookie
3. 主页（index.php）
   - 检查登录状态
   - 显示欢迎信息
4. 登出（logout.php）
   - 清除所有相关Cookie

<details>
<summary>分步提示</summary>

**Step 1**: 创建登录表单（login.php）
```php
<form method="POST" action="do_login.php">
    <input type="text" name="username" placeholder="用户名" required>
    <input type="password" name="password" placeholder="密码" required>
    <label>
        <input type="checkbox" name="remember" value="1"> 记住我
    </label>
    <button type="submit">登录</button>
</form>
```

**Step 2**: 处理登录（do_login.php）
```php
<?php
$username = $_POST['username'] ?? '';
$password = $_POST['password'] ?? '';
$remember = isset($_POST['remember']);

// 验证（实际应从数据库验证）
if ($username === 'admin' && $password === '123456') {
    // 设置Cookie
    $expire = $remember ? time() + 7 * 24 * 3600 : 0;
    setcookie("user", $username, $expire);
    setcookie("is_logged_in", "1", $expire);

    header("Location: index.php");
    exit;
} else {
    echo "用户名或密码错误";
}
?>
```

**Step 3**: 主页（index.php）
```php
<?php
if (!isset($_COOKIE['is_logged_in'])) {
    header("Location: login.php");
    exit;
}
?>
<!DOCTYPE html>
<html>
<head>
    <title>主页</title>
</head>
<body>
    <h2>欢迎，<?php echo htmlspecialchars($_COOKIE['user'] ?? '用户'); ?>！</h2>
    <p><a href="logout.php">退出登录</a></p>
</body>
</html>
```

**Step 4**: 登出（logout.php）
```php
<?php
// 删除Cookie
setcookie("user", "", time() - 3600);
setcookie("is_logged_in", "", time() - 3600);

header("Location: login.php");
exit;
?>
```

</details>

---

## 自我检测清单

- [ ] 理解HTTP无状态的概念
- [ ] 理解Cookie的工作原理
- [ ] 能使用`setcookie()`创建Cookie
- [ ] 能通过`$_COOKIE`读取Cookie
- [ ] 能正确删除Cookie
- [ ] 能设置Cookie的过期时间
- [ ] 理解"记住我"功能的实现原理

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| HTTP无状态 | 服务器不会记得之前的请求 |
| Cookie | 服务器给浏览器的"会员卡" |
| setcookie() | 发卡函数，必须在输出前调用 |
| $_COOKIE | 读取浏览器携带的Cookie |
| 过期时间 | time() + 秒数，0表示会话Cookie |
| 删除Cookie | 设置过期时间为过去 |

---

*本课教材参考：第10章 10.1节 (p.241-248)*
