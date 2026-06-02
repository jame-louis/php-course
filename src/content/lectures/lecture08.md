---
title: 表单处理与正则验证
lectureNumber: 8
module: 表单与会话
description: 学习HTML表单创建、PHP接收表单数据、表单验证和正则表达式验证技术。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture06']
tags: ['PHP', '表单', 'GET', 'POST', '验证', '正则表达式', 'XSS']
hasSlides: true 
slidevUrl: https://jame-louis.github.io/php/slidev/lecture08
hasAssignment: true
draft: false
---

> 学习目标：用**最简单的话**解释表单处理原理，通过**刻意练习**掌握正则验证。

---

## 学习路线图

```
第1关：表单基础 ──→ 第2关：GET vs POST ──→ 第3关：表单验证 ──→ 第4关：正则表达式
    ↓                  ↓                    ↓                  ↓
  HTML表单           数据接收              合法性检查          模式匹配
  name属性           $_GET/$_POST          必填/类型/范围      验证邮箱手机
```

---

## 第1关：表单基础

### 1.1 表单是什么？

**表单就像快递单**：
- **填写人** → 用户在网页上输入信息
- **收件地址** → `action="目标页面.php"`（数据寄到哪里）
- **寄送方式** → `method="GET/POST"`（快递类型）
- **物品清单** → `name="字段名"`（每个输入框的标签）

```html
<!-- 一个简单的登录表单 -->
<form action="login.php" method="POST">
    <!-- 每个input就像快递单上的一个填写项 -->
    用户名：<input type="text" name="username">  name是标签！
    密码：<input type="password" name="password">
    <button type="submit">提交</button>
</form>
```

> 表单是"快递员"，负责把用户填写的数据送到PHP页面。

#### form标签及常见属性

**form标签**：定义表单的开始和结束，所有表单元素都必须在form标签内。

```html
<form action="目标页面.php" method="GET/POST">
    <!-- 表单元素 -->
</form>
```

**常见属性**：
- **action**：指定表单数据提交到哪个PHP页面
- **method**：指定提交方式，GET（可见）或POST（隐藏）

#### 表单元素

**常见表单元素**：
- **文本框**（`<input type="text">`）
- **密码框**（`<input type="password">`）
- **单选框**（`<input type="radio">`）
- **复选框**（`<input type="checkbox">`）
- **下拉列表**（`<select>`）
- **提交按钮**（`<button type="submit">`）

```html
<form>
    <input type="text" name="name">
    <input type="number" name="age">
    <input type="password" name="password">
    <input type="submit" value="提交">
</form>
```

### 动手练 1.1

**目标**：创建一个收集学生信息的HTML表单，需要包含：
- 姓名（name="name"）
- 年龄（name="age"）
- 提交按钮

<details>
<summary>参考答案</summary>

```html
<!DOCTYPE html>
<html>
<head>
    <title>学生信息</title>
</head>
<body>
    <form action="process.php" method="POST">
        <p>
            姓名：<input type="text" name="name">
        </p>
        <p>
            年龄：<input type="number" name="age">
        </p>
        <button type="submit">提交</button>
    </form>
</body>
</html>
```
</details>

---

### 1.2 name属性的重要性（常见错误）

**没有name = 数据丢失！**

```html
<!--  错误：没有name，PHP收不到数据 -->
<input type="text">              数据会丢失！

<!--  正确：有name，PHP能通过$_POST['username']获取 -->
<input type="text" name="username">
```

### 动手练 1.2

下面的表单有什么问题？

```html
<form action="save.php" method="POST">
    邮箱：<input type="email">
    电话：<input type="tel" name="phone">
    <button type="submit">保存</button>
</form>
```

<details>
<summary>答案</summary>

邮箱输入框缺少 `name` 属性，PHP无法通过 `$_POST['email']` 获取邮箱数据。

修复：`<input type="email" name="email">`
</details>

---

## 第2关：PHP接收表单数据

### 2.1 理解$_GET和$_POST

**两种"快递方式"的区别**：

| 方式 | GET | POST |
|------|-----|------|
| **比喻** | 明信片（内容可见） | 信封（内容隐藏） |
| **数据位置** | URL后面 `?name=张三&age=20` | HTTP请求体（隐藏） |
| **安全性** | 低（所有人可见） | 较高 |
| **容量** | 小（URL长度限制） | 大 |
| **用途** | 搜索、筛选、分页 | 登录、注册、敏感数据 |

```php
<?php
// 表单：method="GET"
// URL: search.php?keyword=手机&page=1

// 用$_GET数组接收数据
$keyword = $_GET['keyword'];   // "手机"
$page = $_GET['page'];         // "1"
?>
```

```php
<?php
// 表单：method="POST"

// 用$_POST数组接收数据
$username = $_POST['username'];
$password = $_POST['password'];
?>
```

### 动手练 2.1

创建完整的「成绩录入系统」：
1. HTML表单（form.html）：姓名、语文、数学、英语成绩
2. PHP处理页（result.php）：接收并显示所有成绩

<details>
<summary>参考答案</summary>

**form.html**（表单页面）：
```html
<!DOCTYPE html>
<html>
<head>
    <title>成绩录入</title>
</head>
<body>
    <h2>学生成绩录入</h2>
    <form action="result.php" method="POST">
        <p>姓名：<input type="text" name="student_name"></p>
        <p>语文：<input type="number" name="chinese" min="0" max="100"></p>
        <p>数学：<input type="number" name="math" min="0" max="100"></p>
        <p>英语：<input type="number" name="english" min="0" max="100"></p>
        <button type="submit">提交成绩</button>
    </form>
</body>
</html>
```

**result.php**（处理页面）：
```php
<?php
// 接收数据
$name = $_POST['student_name'];
$chinese = $_POST['chinese'];
$math = $_POST['math'];
$english = $_POST['english'];

// 计算总分和平均分
$total = $chinese + $math + $english;
$average = $total / 3;

// 显示结果
echo "<h2>成绩报告单</h2>";
echo "<p>学生：{$name}</p>";
echo "<p>语文：{$chinese} 分</p>";
echo "<p>数学：{$math} 分</p>";
echo "<p>英语：{$english} 分</p>";
echo "<hr>";
echo "<p><strong>总分：{$total} 分</strong></p>";
echo "<p><strong>平均分：{$average} 分</strong></p>";
?>
```
</details>

---

### 2.2 数据是否存在的检查（安全性第一步）

**问题**：如果用户直接访问result.php，没有提交表单会怎样？

```php
<?php
//  直接访问会报错：Undefined index
$name = $_POST['name'];   // 报错！

//  先检查是否存在
if (isset($_POST['name'])) {
    $name = $_POST['name'];
} else {
    $name = "未填写";
}

//  更简洁的写法（PHP 7+）
$name = $_POST['name'] ?? "未填写";   // 如果不存在就用默认值
?>
```

### 动手练 2.2

完善result.php，处理以下情况：
1. 用户直接访问页面（无POST数据）
2. 用户填写了姓名但没有填写成绩

<details>
<summary>参考答案</summary>

```php
<?php
// 检查是否是表单提交
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('请通过表单提交数据');
}

// 获取数据（带默认值）
$name = $_POST['student_name'] ?? '';
$chinese = $_POST['chinese'] ?? 0;
$math = $_POST['math'] ?? 0;
$english = $_POST['english'] ?? 0;

// 验证必填项
if (empty($name)) {
    die('姓名不能为空');
}

// 计算并显示...
?>
```
</details>

---

## 第3关：表单验证基础

### 3.1 三层验证体系（费曼解释）

**验证就像三重安检**：

```
第一层（前端HTML）   第二层（PHP格式检查）    第三层（PHP逻辑检查）
    ↓                      ↓                      ↓
必填字段没填？      数据类型对不对？         数值范围合理吗？
邮箱格式对吗？      长度够吗？               用户名重复吗？
年龄填了数字吗？    包含危险字符吗？
```

```html
<!-- 第一层：HTML5验证 -->
<form action="register.php" method="POST">
    <!-- required: 必填 -->
    用户名：<input type="text" name="username" required>

    <!-- type="email": 邮箱格式验证 -->
    邮箱：<input type="email" name="email" required>

    <!-- min/max: 数值范围 -->
    年龄：<input type="number" name="age" min="1" max="120">

    <!-- minlength/maxlength: 长度限制 -->
    密码：<input type="password" name="password" minlength="6" required>

    <button type="submit">注册</button>
</form>
```

```php
<?php
// 第二层&第三层：PHP验证

// 1. 获取并清理数据（去除首尾空格）
$username = trim($_POST['username'] ?? '');
$email = trim($_POST['email'] ?? '');
$age = $_POST['age'] ?? 0;

// 2. 必填验证
if (empty($username)) {
    die('用户名不能为空');
}

// 3. 长度验证
if (strlen($username) < 3 || strlen($username) > 20) {
    die('用户名长度必须在3-20个字符之间');
}

// 4. 范围验证
if ($age < 1 || $age > 120) {
    die('年龄必须在1-120之间');
}

// 5. 邮箱格式验证（简单版）
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die('邮箱格式不正确');
}

echo "验证通过！欢迎 {$username}";
?>
```

### 动手练 3.1

编写 `validateUser($data)` 函数，验证用户注册信息：
- 用户名：必填，3-20字符
- 密码：必填，至少6位
- 年龄：必填，10-100之间

返回数组：`['valid' => true/false, 'message' => '错误信息']`

<details>
<summary>参考答案</summary>

```php
<?php
function validateUser($data) {
    // 默认值
    $username = trim($data['username'] ?? '');
    $password = $data['password'] ?? '';
    $age = $data['age'] ?? 0;

    // 用户名验证
    if (empty($username)) {
        return ['valid' => false, 'message' => '用户名不能为空'];
    }
    if (strlen($username) < 3 || strlen($username) > 20) {
        return ['valid' => false, 'message' => '用户名长度必须在3-20个字符之间'];
    }

    // 密码验证
    if (empty($password)) {
        return ['valid' => false, 'message' => '密码不能为空'];
    }
    if (strlen($password) < 6) {
        return ['valid' => false, 'message' => '密码至少6位'];
    }

    // 年龄验证
    if (empty($age)) {
        return ['valid' => false, 'message' => '年龄不能为空'];
    }
    if ($age < 10 || $age > 100) {
        return ['valid' => false, 'message' => '年龄必须在10-100之间'];
    }

    return ['valid' => true, 'message' => '验证通过'];
}

// 测试
$result = validateUser(['username' => '张三', 'password' => '123456', 'age' => 25]);
var_dump($result);  // 通过

$result = validateUser(['username' => 'ab', 'password' => '123', 'age' => 5]);
var_dump($result);  // 失败
?>
```
</details>

---

### 3.2 XSS安全防护（必须掌握）

**什么是XSS攻击？**

用户在表单中输入`<script>alert('黑客')</script>`，如果不处理直接显示，脚本就会执行！

```php
<?php
$userInput = "<script>alert('攻击')</script>";

//  危险：直接输出，会执行脚本
echo $userInput;

//  安全：转义特殊字符，变成纯文本
echo htmlspecialchars($userInput);
// 输出：&lt;script&gt;alert('攻击')&lt;/script&gt;   浏览器不会执行
?>
```

** htmlspecialchars() 函数参数 **

```php
<?php
$str = '<a href="test">测试 & "例子"</a>';

// 默认只转义 < 和 >
echo htmlspecialchars($str);        // &lt;a href=&quot;test&quot;&gt;测试 & &quot;例子&quot;&lt;/a&gt;

// ENT_QUOTES: 也转义单引号
echo htmlspecialchars($str, ENT_QUOTES);

// ENT_HTML5: 使用HTML5标准

// 推荐写法
$output = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
?>
```

### 动手练 3.2

创建安全的用户信息显示页面：

```php
<?php
// 假设这是用户提交的数据
$userData = [
    'name' => '<script>alert("hack")</script>张三',
    'bio' => '我喜欢编程，<b>特别</b>是PHP！'
];

// 任务：安全地输出用户数据（保留<b>标签用于加粗，但过滤<script>）
?>
```

<details>
<summary>参考答案</summary>

```php
<?php
$userData = [
    'name' => '<script>alert("hack")</script>张三',
    'bio' => '我喜欢编程，<b>特别</b>是PHP！'
];

// 净化函数：去除script标签但保留其他标签
function sanitize($str) {
    // 先转义所有HTML
    $safe = htmlspecialchars($str, ENT_QUOTES, 'UTF-8');
    // 允许<b>和<i>标签（可选）
    $allowed = '<b><i><strong><em>';
    return strip_tags($safe, $allowed);
}

echo "<p>姓名：" . sanitize($userData['name']) . "</p>";
echo "<p>简介：" . sanitize($userData['bio']) . "</p>";
?>
```
</details>

---

## 第4关：正则表达式（刻意练习）

### 4.1 什么是正则？（费曼一句话）

> 正则表达式是"文字的模式"，就像用「通配符」搜索文件，但功能更强大。

```
搜索文件：*.jpg   匹配所有jpg文件

正则匹配：/^1[3-9]\d{9}$/   匹配手机号
```

### 4.2 正则基础语法（渐进式学习）

**阶段1：简单匹配**

```php
<?php
// 检查是否包含"PHP"
$pattern = '/PHP/';
$text = '我爱PHP编程';

if (preg_match($pattern, $text)) {
    echo "包含'PHP'";
}

// 匹配邮箱（简单版）
$email = "user@example.com";
$pattern = '/@/';   // 包含@符号
if (preg_match($pattern, $email)) {
    echo "可能是邮箱";
}
?>
```

**阶段2：特殊字符**

| 符号 | 含义 | 示例 |
|------|------|------|
| `.` | 任意一个字符 | `/a.c/` 匹配 "abc", "a1c" |
| `\d` | 数字 (0-9) | `/\d\d/` 匹配 "25" |
| `\w` | 字母、数字、下划线 | `/\w+/` 匹配 "user123" |
| `+` | 前面字符出现1次或多次 | `/a+/` 匹配 "a", "aaa" |
| `*` | 前面字符出现0次或多次 | `/ab*/` 匹配 "a", "ab", "abbb" |
| `{n}` | 前面字符出现n次 | `/\d{3}/` 匹配 "123" |
| `{n,m}` | 前面字符出现n到m次 | `/\d{2,4}/` 匹配 "12", "1234" |

```php
<?php
// 验证手机号（中国大陆）：1开头，第二位3-9，后面9位数字
$phone = "13800138000";
$pattern = '/^1[3-9]\d{9}$/';
// 解释：
// ^     开头
// 1     必须以1开头
// [3-9] 第二位是3-9
// \d{9} 后面跟着9位数字
// $     结尾

if (preg_match($pattern, $phone)) {
    echo "手机号格式正确";
}

// 验证身份证号（18位，最后一位可以是X）
$idcard = "11010119900101123X";
$pattern = '/^\d{17}[\dX]$/';
// 解释：
// \d{17}  17位数字
// [\dX]   第18位是数字或X
?>
```

**阶段3：常用正则模式**

```php
<?php
// 1. 验证邮箱
function isEmail($email) {
    $pattern = '/^[\w.-]+@[\w.-]+\.\w+$/';
    return preg_match($pattern, $email);
}
// 解释：[\w.-]+ 用户名（字母数字下划线.和-）
//       @       @符号
//       [\w.-]+ 域名部分
//       \.      点号
//       \w+     后缀（com/cn等）

// 2. 验证用户名（字母开头，允许字母数字下划线，3-20位）
function isUsername($username) {
    $pattern = '/^[a-zA-Z]\w{2,19}$/';
    return preg_match($pattern, $username);
}

// 3. 验证中文姓名（2-4个汉字）
function isChineseName($name) {
    $pattern = '/^[\x{4e00}-\x{9fa5}]{2,4}$/u';
    return preg_match($pattern, $name);
}

// 测试
var_dump(isEmail("test@example.com"));     // 1 (true)
var_dump(isEmail("invalid-email"));         // 0 (false)
var_dump(isUsername("user123"));            // 1
var_dump(isChineseName("张三"));            // 1
?>
```

### 动手练 4.1

编写验证函数：
1. `isStrongPassword($pwd)`：至少8位，包含大小写字母和数字
2. `isUrl($url)`：以http://或https://开头

<details>
<summary>参考答案</summary>

```php
<?php
// 强密码验证
function isStrongPassword($pwd) {
    // 至少8位
    if (strlen($pwd) < 8) return false;

    // 包含小写字母
    if (!preg_match('/[a-z]/', $pwd)) return false;

    // 包含大写字母
    if (!preg_match('/[A-Z]/', $pwd)) return false;

    // 包含数字
    if (!preg_match('/\d/', $pwd)) return false;

    return true;
}

// URL验证
function isUrl($url) {
    $pattern = '/^https?:\/\/.+/';
    return preg_match($pattern, $url);
}

// 测试
var_dump(isStrongPassword("Hello123"));      // true
var_dump(isStrongPassword("hello123"));      // false (没有大写)
var_dump(isStrongPassword("Hello"));         // false (没有数字)

var_dump(isUrl("https://example.com"));      // true
var_dump(isUrl("ftp://example.com"));        // false
?>
```
</details>

---

### 4.3 preg_replace替换

```php
<?php
// 将所有数字替换为*
$text = "我的电话是13800138000，生日是1990年";
$result = preg_replace('/\d/', '*', $text);
echo $result;  // 我的电话是***********，生日是****年

// 隐藏手机号中间4位
$phone = "13800138000";
$result = preg_replace('/(\d{3})\d{4}(\d{4})/', '$1****$2', $phone);
echo $result;  // 138****8000

// 提取所有邮箱
$text = "联系我：a@qq.com 或 b@gmail.com";
preg_match_all('/[\w.-]+@[\w.-]+\.\w+/', $text, $matches);
print_r($matches[0]);  // Array ( [0] => a@qq.com [1] => b@gmail.com )
?>
```

### 动手练 4.2

使用正则表达式完成以下任务：
1. 验证IP地址（如192.168.1.1）
2. 提取字符串中的所有手机号

<details>
<summary>参考答案</summary>

```php
<?php
// 1. 简单IP验证（每段0-255）
function isValidIP($ip) {
    $pattern = '/^(\d{1,3}\.){3}\d{1,3}$/';
    if (!preg_match($pattern, $ip)) return false;

    // 进一步检查每段是否0-255
    $parts = explode('.', $ip);
    foreach ($parts as $part) {
        if ($part < 0 || $part > 255) return false;
    }
    return true;
}

// 2. 提取所有手机号
function extractPhones($text) {
    $pattern = '/1[3-9]\d{9}/';
    preg_match_all($pattern, $text, $matches);
    return $matches[0];
}

// 测试
$text = "联系人：13800138000，备用：13987654321，固话：010-12345678";
$phones = extractPhones($text);
print_r($phones);  // Array ( [0] => 13800138000 [1] => 13987654321 )
?>
```
</details>

---

## 综合挑战（刻意练习核心）

### 挑战1：用户注册表单验证器

**需求**：创建一个完整的用户注册验证函数

```php
<?php
function validateRegistration($data) {
    // 验证规则：
    // 1. 用户名：3-20位，字母开头，只允许字母数字下划线
    // 2. 密码：8-20位，必须包含大小写字母和数字
    // 3. 邮箱：标准邮箱格式
    // 4. 手机号：中国大陆手机号
    // 5. 年龄：18-60岁

    // 返回：['success' => true/false, 'errors' => [...]]
}
?>
```

<details>
<summary>分步提示</summary>

**第1步**：定义验证规则数组
```php
$rules = [
    'username' => '/^[a-zA-Z]\w{2,19}$/',
    'email'    => '/^[\w.-]+@[\w.-]+\.\w+$/',
    'phone'    => '/^1[3-9]\d{9}$/',
];
```

**第2步**：遍历验证
```php
foreach ($rules as $field => $pattern) {
    if (!preg_match($pattern, $data[$field] ?? '')) {
        $errors[] = "{$field}格式不正确";
    }
}
```

**第3步**：特殊验证（密码、年龄）

**完整答案**：
```php
<?php
function validateRegistration($data) {
    $errors = [];

    // 用户名验证
    $username = $data['username'] ?? '';
    if (!preg_match('/^[a-zA-Z]\w{2,19}$/', $username)) {
        $errors[] = '用户名：3-20位，字母开头，只允许字母数字下划线';
    }

    // 密码验证（使用之前写的函数）
    if (!isStrongPassword($data['password'] ?? '')) {
        $errors[] = '密码：8-20位，必须包含大小写字母和数字';
    }

    // 邮箱验证
    $email = $data['email'] ?? '';
    if (!preg_match('/^[\w.-]+@[\w.-]+\.\w+$/', $email)) {
        $errors[] = '邮箱格式不正确';
    }

    // 手机号验证
    $phone = $data['phone'] ?? '';
    if (!preg_match('/^1[3-9]\d{9}$/', $phone)) {
        $errors[] = '手机号格式不正确';
    }

    // 年龄验证
    $age = $data['age'] ?? 0;
    if ($age < 18 || $age > 60) {
        $errors[] = '年龄必须在18-60岁之间';
    }

    return [
        'success' => empty($errors),
        'errors' => $errors
    ];
}

// 测试
$test = [
    'username' => 'user123',
    'password' => 'Hello123',
    'email' => 'test@example.com',
    'phone' => '13800138000',
    'age' => 25
];
$result = validateRegistration($test);
var_dump($result);
?>
```
</details>

---

### 挑战2：成绩管理系统（完整版）

**需求**：
1. 成绩录入表单（form.html）
2. 数据验证处理（process.php）
   - 姓名：必填，2-4个汉字
   - 各科成绩：0-100的数字
3. 显示结果页面（显示总分、平均分、等级）

<details>
<summary>参考答案</summary>

**form.html**：
```html
<!DOCTYPE html>
<html>
<head>
    <title>成绩录入</title>
</head>
<body>
    <h2>学生成绩录入系统</h2>
    <form action="process.php" method="POST">
        <p>
            姓名：<input type="text" name="name" required>
            <small>（2-4个汉字）</small>
        </p>
        <p>语文：<input type="number" name="chinese" min="0" max="100" required></p>
        <p>数学：<input type="number" name="math" min="0" max="100" required></p>
        <p>英语：<input type="number" name="english" min="0" max="100" required></p>
        <button type="submit">提交</button>
    </form>
</body>
</html>
```

**process.php**：
```php
<?php
// 验证函数
function validateScoreData($data) {
    $errors = [];

    // 姓名验证（2-4个汉字）
    $name = trim($data['name'] ?? '');
    if (!preg_match('/^[\x{4e00}-\x{9fa5}]{2,4}$/u', $name)) {
        $errors[] = '姓名必须是2-4个汉字';
    }

    // 成绩验证
    $subjects = ['chinese', 'math', 'english'];
    foreach ($subjects as $subject) {
        $score = $data[$subject] ?? '';
        if (!is_numeric($score) || $score < 0 || $score > 100) {
            $errors[] = '各科成绩必须是0-100之间的数字';
            break;
        }
    }

    return [
        'valid' => empty($errors),
        'errors' => $errors,
        'data' => [
            'name' => $name,
            'chinese' => (int)($data['chinese'] ?? 0),
            'math' => (int)($data['math'] ?? 0),
            'english' => (int)($data['english'] ?? 0)
        ]
    ];
}

// 获取等级
function getGrade($score) {
    if ($score >= 90) return ['level' => 'A', 'label' => '优秀'];
    if ($score >= 80) return ['level' => 'B', 'label' => '良好'];
    if ($score >= 60) return ['level' => 'C', 'label' => '及格'];
    return ['level' => 'D', 'label' => '不及格'];
}

// 主流程
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    die('请通过表单提交');
}

$result = validateScoreData($_POST);

if (!$result['valid']) {
    echo "<h3>验证失败</h3>";
    echo "<ul>";
    foreach ($result['errors'] as $error) {
        echo "<li>" . htmlspecialchars($error) . "</li>";
    }
    echo "</ul>";
    echo '<a href="form.html">返回重填</a>';
    exit;
}

// 数据计算
$d = $result['data'];
$total = $d['chinese'] + $d['math'] + $d['english'];
$average = round($total / 3, 1);
$totalGrade = getGrade($average);
?>

<!DOCTYPE html>
<html>
<head>
    <title>成绩报告单</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: center; }
        th { background-color: #4CAF50; color: white; }
        .total { background-color: #f0f0f0; font-weight: bold; }
        .grade-A { color: green; }
        .grade-D { color: red; }
    </style>
</head>
<body>
    <h2>成绩报告单</h2>
    <p>学生：<?php echo htmlspecialchars($d['name']); ?></p>

    <table>
        <tr>
            <th>科目</th>
            <th>成绩</th>
            <th>等级</th>
        </tr>
        <tr>
            <td>语文</td>
            <td><?php echo $d['chinese']; ?></td>
            <td><?php echo getGrade($d['chinese'])['label']; ?></td>
        </tr>
        <tr>
            <td>数学</td>
            <td><?php echo $d['math']; ?></td>
            <td><?php echo getGrade($d['math'])['label']; ?></td>
        </tr>
        <tr>
            <td>英语</td>
            <td><?php echo $d['english']; ?></td>
            <td><?php echo getGrade($d['english'])['label']; ?></td>
        </tr>
        <tr class="total">
            <td>总分</td>
            <td><?php echo $total; ?></td>
            <td><?php echo $totalGrade['label']; ?></td>
        </tr>
        <tr class="total">
            <td>平均分</td>
            <td><?php echo $average; ?></td>
            <td class="grade-<?php echo $totalGrade['level']; ?>">
                <?php echo $totalGrade['level']; ?>
            </td>
        </tr>
    </table>

    <a href="form.html">录入下一位</a>
</body>
</html>
```
</details>

---

## 自我检测清单

完成以下任务，检验是否掌握本课内容：

- [ ] 能创建包含多个字段的HTML表单
- [ ] 理解`name`属性的作用
- [ ] 能区分GET和POST的使用场景
- [ ] 能使用`$_GET`和`$_POST`接收数据
- [ ] 会使用`isset()`或`??`处理缺失数据
- [ ] 能进行必填、长度、范围等基本验证
- [ ] 会使用`htmlspecialchars()`防止XSS
- [ ] 能读懂简单正则表达式
- [ ] 能编写正则验证手机号、邮箱
- [ ] 能编写完整的表单验证系统

---

## 常见错误速查表

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| Undefined index | 表单字段没有name属性 | 添加name属性 |
| 表单提交后页面空白 | PHP语法错误或显示被关闭 | 检查error_log |
| 验证总是失败 | 正则表达式缺少定界符 | 使用`/pattern/`格式 |
| XSS攻击成功 | 直接输出用户输入 | 使用htmlspecialchars() |
| 中文验证失败 | 正则缺少/u修饰符 | 添加`/u` |

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| 表单 | 快递员，把用户数据送到PHP |
| GET | 明信片，数据在URL里可见 |
| POST | 信封，数据在请求体里隐藏 |
| name | 快递单上的标签，告诉PHP这是什么数据 |
| $_POST | 接收POST数据的"收件箱" |
| htmlspecialchars | 把危险字符变成无害文本 |
| 正则表达式 | 文字的模式匹配工具 |

---

*本课教材参考：第9章 9.1-9.4节 (p.191-217)*
