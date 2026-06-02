---
title: PHP + MySQL 全栈开发实战
description: 掌握 PDO 数据库操作、用户认证与会话管理、关联数据查询与分页、以及生产环境安全最佳实践。
lectureNumber: 15
module: 数据库操作
duration: 90分钟
difficulty: advanced
prerequisites:
  - lecture14
tags:
  - PHP
  - MySQL
  - PDO
  - 用户认证
  - 安全
  - 生产环境
hasSlides: true 
slidevUrl: https://jame-louis.github.io/php/slidev/lecture12
hasAssignment: true
draft: false
---

> 学习目标：掌握 PDO 数据库操作、用户认证与会话管理、关联数据查询与分页、以及生产环境安全最佳实践。

---

## 1. MySQL 简单介绍

MySQL 是一个开源的**关系型数据库管理系统**，常用于 Web 应用程序的数据存储。它使用 SQL（结构化查询语言）进行数据操作。

### 1.1 数据库和表的概念

**费曼解释**：把数据库想象成一座**图书馆**，每个表就是图书馆里的一个**书架**，而表中的每一行记录就像书架上的一**本书**。

| 概念 | 类比 | 说明 |
|------|------|------|
| **数据库** | 图书馆 | 存储相关数据的容器 |
| **表 (Table)** | 书架 | 存储特定类型数据的结构 |
| **记录 (Record)** | 书籍 | 表中的一行数据 |
| **字段 (Field)** | 书的属性 | 如书名、作者、出版日期 |

### 1.2 基础 SQL 语句示例

SQL 是与数据库对话的语言，四个最常用命令：

```sql
-- 创建表：定义数据结构
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL
);

-- 插入数据：添加新记录
INSERT INTO users (name, email) VALUES ('张三', 'zhangsan@example.com');

-- 查询数据：读取记录
SELECT * FROM users WHERE name = '张三';

-- 更新数据：修改记录
UPDATE users SET email = 'new@example.com' WHERE id = 1;

-- 删除数据：移除记录
DELETE FROM users WHERE id = 1;
```

> 💡 **记忆口诀**：增(`INSERT`) 删(`DELETE`) 改(`UPDATE`) 查(`SELECT`)

---

## 2. PHP 连接 MySQL 与 CRUD 基础

### 2.1 为什么用 PDO 而不是 mysqli？

**费曼解释**：mysqli 像是只能开 MySQL 车的司机，而 PDO 像是拥有国际驾照的司机——不仅能开 MySQL，还能开 PostgreSQL、SQLite 等其他"车型"。对于初学者，PDO 的语法更统一，而且它的**预处理语句**是防止 SQL 注入的铜墙铁壁。

### 2.2 数据库连接配置

```php
<?php
// config.php
$host = 'localhost';
$db   = 'school_db';
$user = 'root';
$pass = '';
$charset = 'utf8mb4';

$dsn = "mysql:host=$host;dbname=$db;charset=$charset";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,  // ← 关键：禁用模拟预处理
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    die("Database connection failed: " . $e->getMessage());
}
?>
```

**⚠️ 关键配置解析**：

| 常量 | 作用 | 不设置的后果 |
|------|------|-------------|
| `ATTR_ERRMODE => ERRMODE_EXCEPTION` | 出错时抛异常 | 错误被静默忽略，数据可能写入失败 |
| `ATTR_DEFAULT_FETCH_MODE => FETCH_ASSOC` | 默认返回关联数组 | 返回索引+关联混合数组，浪费内存 |
| `ATTR_EMULATE_PREPARES => false` | 让 MySQL 真预处理 | `LIMIT` 等语句可能报语法错误 |

### 2.3 预处理语句——SQL 注入的疫苗

```php
// ❌ 危险：直接拼接（SQL 注入漏洞）
$id = $_GET['id'];
$post = $pdo->query("SELECT * FROM posts WHERE id = $id")->fetch();

// ✅ 安全：预处理语句
$stmt = $pdo->prepare("SELECT * FROM posts WHERE id = ?");
$stmt->execute([$id]);
$post = $stmt->fetch();
```

**原理类比**：预处理就像餐厅的点餐单。你先把菜单（SQL 结构）给厨房，之后不管客人点多少份（参数），厨师只按菜单做，不会被客人写的"特殊要求"改变菜谱结构。

### 2.4 完整 CRUD 示例

**READ - 显示学生列表 (index.php)**
```php
<?php require 'config.php'; ?>
<!DOCTYPE html>
<html>
<head><title>Students</title></head>
<body>
  <h1>Student List</h1>
  <a href="add.php">Add Student</a>
  <table border="1" cellpadding="8">
    <tr><th>ID</th><th>Name</th><th>Email</th><th>Actions</th></tr>
    <?php
    $stmt = $pdo->query("SELECT * FROM students");
    while ($row = $stmt->fetch()):
    ?>
    <tr>
      <td><?= htmlspecialchars($row['id']) ?></td>
      <td><?= htmlspecialchars($row['name']) ?></td>
      <td><?= htmlspecialchars($row['email']) ?></td>
      <td>
        <a href="edit.php?id=<?= $row['id'] ?>">Edit</a>
        <a href="delete.php?id=<?= $row['id'] ?>" onclick="return confirm('Sure?')">Delete</a>
      </td>
    </tr>
    <?php endwhile; ?>
  </table>
</body>
</html>
```

**CREATE - 添加学生 (add.php)**
```php
<?php
require 'config.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $stmt = $pdo->prepare("INSERT INTO students (name, email) VALUES (?, ?)");
    $stmt->execute([$_POST['name'], $_POST['email']]);
    header("Location: index.php");
    exit;
}
?>
<!-- HTML 表单省略 -->
```

**UPDATE - 修改数据**
```php
$stmt = $pdo->prepare("UPDATE students SET name = ?, email = ? WHERE id = ?");
$stmt->execute([$name, $email, $id]);
```

**DELETE - 删除数据**
```php
$stmt = $pdo->prepare("DELETE FROM students WHERE id = ?");
$stmt->execute([$id]);
```

---

## 3. 用户认证与会话管理

### 3.1 Session 与 Cookie 的储物柜类比

**费曼解释**：
- **Cookie** = 你口袋里的**会员卡**（存储在浏览器，很小，服务员能认出你）
- **Session** = 健身房里的**储物柜**（存储在服务器，空间大，能放衣服、书包）
- **Session ID** = 储物柜的**钥匙**（存在 Cookie 里，每次请求时交给服务器开锁）
- `session_destroy()` = **退租储物柜**（清空服务器数据，但会员卡本身还在，只是失效了）

```php
<?php
// 开启储物柜系统
session_start();

// 登录成功后将用户信息存入储物柜
$_SESSION['user_id']  = $user['id'];
$_SESSION['username'] = $user['username'];

// 退出时清空并销毁
$_SESSION = [];
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}
session_destroy();
?>
```

### 3.2 密码绝不能明文存储

```php
<?php
// 注册时：将密码变成"指纹"
$hash = password_hash($password, PASSWORD_DEFAULT);
// 存入数据库的是 $hash，不是原密码

// 登录时：验证指纹是否匹配
if (password_verify($password, $user['password_hash'])) {
    // 匹配成功，登录
}
?>
```

**⚠️ 警告**：永远不要自己写 `md5()` 或 `sha1()` 来存密码。`password_hash()` 会自动加盐、使用当前最安全的算法（目前是 bcrypt）。

### 3.3 完整的注册流程 (register.php)

```php
<?php
require 'config.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // 表单验证
    if ($username === '' || $email === '' || $password === '') {
        $error = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $error = 'Invalid email format.';
    } elseif (strlen($password) < 6) {
        $error = 'Password must be at least 6 characters.';
    } else {
        // 检查邮箱/用户名是否已存在
        $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR username = ?");
        $stmt->execute([$email, $username]);

        if ($stmt->fetch()) {
            $error = 'Username or email already taken.';
        } else {
            // 创建用户
            $hash = password_hash($password, PASSWORD_DEFAULT);
            $stmt = $pdo->prepare("INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)");
            $stmt->execute([$username, $email, $hash]);
            header("Location: login.php");
            exit;
        }
    }
}
?>
```

### 3.4 完整的登录流程 (login.php)

```php
<?php
session_start();
require 'config.php';

$error = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email    = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->execute([$email]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id']  = $user['id'];
        $_SESSION['username'] = $user['username'];
        header("Location: dashboard.php");
        exit;
    } else {
        $error = 'Invalid email or password.';
    }
}
?>
```

### 3.5 登录保护检查

在每个需要登录的页面顶部添加：

```php
<?php
session_start();
require 'config.php';

if (!isset($_SESSION['user_id'])) {
    header("Location: login.php");
    exit;
}
?>
```

---

## 4. 关联数据、搜索与分页

### 4.1 数据库关系：一对一、一对多

**博客系统示例**：

```
users 表（作者）                    posts 表（文章）
┌────┬────────┐                  ┌────┬──────────┬───────────┐
│ id │ username│                  │ id │ title    │ author_id │
├────┼────────┤                  ├────┼──────────┼───────────┤
│ 1  │ 张三    │◄────────────────│ 1  │ PHP入门  │ 1         │
│ 2  │ 李四    │◄────────────────│ 2  │ MySQL优化│ 2         │
└────┴────────┘                  └────┴──────────┴───────────┘
```

### 4.2 JOIN 查询：把碎片拼成完整信息

**显示文章列表 (index.php)**
```php
<?php
require 'config.php';

$stmt = $pdo->query("
    SELECT posts.*, users.username
    FROM posts
    JOIN users ON posts.author_id = users.id
    ORDER BY posts.created_at DESC
");
$posts = $stmt->fetchAll();
?>

<?php foreach ($posts as $post): ?>
  <article>
    <h2><?= htmlspecialchars($post['title']) ?></h2>
    <p><small>By <?= htmlspecialchars($post['username']) ?>
       on <?= $post['created_at'] ?></small></p>
    <p><?= nl2br(htmlspecialchars(substr($post['content'], 0, 200))) ?>...</p>
  </article>
<?php endforeach; ?>
```

### 4.3 搜索功能：模糊匹配

```php
$search = $_GET['search'] ?? '';
$stmt = $pdo->prepare("
    SELECT p.*, u.username
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    WHERE p.title LIKE ? OR p.content LIKE ?
    ORDER BY p.created_at DESC
");
$stmt->execute(["%$search%", "%$search%"]);
$posts = $stmt->fetchAll();
```

**⚠️ XSS 防护**：搜索关键词回显到页面时必须转义：

```php
<input type="text" name="search" value="<?= htmlspecialchars($search) ?>">
```

### 4.4 分页：LIMIT 与 OFFSET

```php
<?php
$page    = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT) ?: 1;
$perPage = 5;
$offset  = ($page - 1) * $perPage;

// 查询当前页数据
$stmt = $pdo->prepare("
    SELECT SQL_CALC_FOUND_ROWS p.*, u.username
    FROM posts p
    LEFT JOIN users u ON p.author_id = u.id
    ORDER BY p.created_at DESC
    LIMIT ? OFFSET ?
");
$stmt->execute([$perPage, $offset]);
$posts = $stmt->fetchAll();

// 获取总条数（MySQL 优化，无需再执行 COUNT(*)）
$total = $pdo->query("SELECT FOUND_ROWS()")->fetchColumn();
$totalPages = (int) ceil($total / $perPage);
?>
```

**为什么用 `SQL_CALC_FOUND_ROWS`**：
- 普通做法：先 `COUNT(*)` 再 `SELECT`，查询两次
- 优化做法：`SQL_CALC_FOUND_ROWS` + `FOUND_ROWS()`，MySQL 在查询时顺便统计，只查一次

---

## 5. 生产环境最佳实践

### 5.1 代码组织：从"一锅粥"到"模块化"

**初学者常见结构（一锅粥）**：
```
project/
├── index.php      (HTML + SQL + 逻辑 混在一起)
├── add.php
└── delete.php
```

**Phase 6 专业结构**：
```
project/
├── config.php          ← 数据库配置（常量定义）
├── functions.php       ← 全局助手函数
├── init.php            ← 启动引导（引入 config、functions，开启 session，错误处理）
├── partials/
│   ├── header.php      ← 共享头部
│   └── footer.php      ← 共享尾部
├── index.php
├── create.php
└── delete.php
```

### 5.2 配置文件进化：使用常量 (config.php)

```php
<?php
// Phase 6: 使用常量代替变量，更清晰、不易被意外修改
define('DB_HOST', 'localhost');
define('DB_NAME', 'school_db');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_CHARSET', 'utf8mb4');

// 环境控制：生产环境设为 false
define('DEBUG', true);
```

### 5.3 核心工具函数 (functions.php)

```php
<?php
/**
 * Escape HTML entities for safe output.
 * 简写：e() = htmlspecialchars()
 */
function e(string $text): string {
    return htmlspecialchars($text, ENT_QUOTES, 'UTF-8');
}

/**
 * Redirect and immediately exit.
 */
function redirect(string $url): void {
    header("Location: $url");
    exit;
}

/**
 * Flash message helper.
 * 调用 flash('消息') 设置，flash() 获取并清除
 */
function flash(string $message = null): ?string {
    if ($message !== null) {
        $_SESSION['flash'] = $message;
        return null;
    }
    if (isset($_SESSION['flash'])) {
        $msg = $_SESSION['flash'];
        unset($_SESSION['flash']);
        return $msg;
    }
    return null;
}

/**
 * Generate or retrieve a CSRF token.
 */
function csrf_token(): string {
    if (empty($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

/**
 * Verify a submitted CSRF token.
 */
function verify_csrf(string $token): bool {
    return isset($_SESSION['csrf_token']) && hash_equals($_SESSION['csrf_token'], $token);
}
```

### 5.4 启动引导 init.php

```php
<?php
require __DIR__ . '/config.php';
require __DIR__ . '/functions.php';

// 错误处理：根据环境控制显示
if (DEBUG) {
    ini_set('display_errors', '1');
    ini_set('display_startup_errors', '1');
    error_reporting(E_ALL);
} else {
    ini_set('display_errors', '0');
    error_reporting(0);
}

session_start();

// PDO 连接
$dsn = 'mysql:host=' . DB_HOST . ';dbname=' . DB_NAME . ';charset=' . DB_CHARSET;
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, DB_USER, DB_PASS, $options);
} catch (PDOException $e) {
    error_log($e->getMessage());  // 记录到日志
    // 生产环境不暴露详细错误
    die(DEBUG ? 'Database connection failed: ' . $e->getMessage()
              : 'A system error occurred. Please try again later.');
}
```

### 5.5 安全删除流程（完整模板）

```php
<?php
require __DIR__ . '/init.php';

// 1. 登录检查
if (!isset($_SESSION['user_id'])) {
    flash('Please log in first.');
    redirect('login.php');
}

// 2. 必须是 POST 请求（防止直接访问 URL 删除）
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    flash('Invalid request method.');
    redirect('index.php');
}

// 3. 验证 CSRF 令牌
if (!verify_csrf($_POST['csrf_token'] ?? '')) {
    die('Invalid CSRF token.');
}

// 4. 验证 ID 类型
$id = filter_input(INPUT_POST, 'id', FILTER_VALIDATE_INT);
if (!$id) {
    flash('Invalid post ID.');
    redirect('index.php');
}

// 5. 检查数据所有权（只能删自己的）
$stmt = $pdo->prepare("SELECT author_id FROM posts WHERE id = ?");
$stmt->execute([$id]);
$post = $stmt->fetch();

if (!$post) {
    flash('Post not found.');
    redirect('index.php');
}

if ($post['author_id'] != $_SESSION['user_id']) {
    flash('You can only delete your own posts.');
    redirect('index.php');
}

// 6. 执行删除
$stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
$stmt->execute([$id]);
flash('Post deleted.');
redirect('index.php');
```

### 5.6 表单中的 CSRF 保护

```html
<form method="POST" action="delete.php">
    <input type="hidden" name="csrf_token" value="<?= csrf_token() ?>">
    <input type="hidden" name="id" value="<?= $post['id'] ?>">
    <button type="submit" onclick="return confirm('确定删除？')">删除</button>
</form>
```

### 5.7 显示 Flash 消息

```php
<?php if ($msg = flash()): ?>
    <div class="alert"><?= e($msg) ?></div>
<?php endif; ?>
```

---

## 6. 阶段演进对比

| 特性 | 第2章 (student_app) | 第3章 (auth_app) | 第4章 (blog_app) | 第5章 (phase6_blog) |
|------|----------------------|-------------------|-------------------|----------------------|
| **数据库** | 基础 PDO 连接 | 用户认证查询 | JOIN 多表查询 | 常量配置 + 错误处理 |
| **安全** | `htmlspecialchars()` | `password_hash()` | 搜索过滤 | CSRF + 完整权限检查 |
| **代码组织** | 单文件 | 分离 config | 分离 config | config/functions/init |
| **错误处理** | `die()` | `die()` | 无 | DEBUG 开关 + 日志 |
| **用户体验** | 跳转 | 基础登录 | 文章列表 | Flash 消息 + 友好错误 |

---

## 安全清单（开发自检表）

在将项目部署到生产环境前，逐条检查：

| 检查项 | 危险示例 | 正确做法 |
|--------|---------|---------|
| SQL 拼接 | `"WHERE id = $id"` | 预处理语句 `execute([$id])` |
| 原样输出 | `<?= $user_input ?>` | `<?= e($user_input) ?>` |
| GET 删除 | `<a href="delete.php?id=1">` | POST 表单 + CSRF 令牌 |
| 明文密码 | `md5($password)` | `password_hash()` |
| 错误暴露 | 显示 SQL 报错给访客 | `DEBUG => false`，记录日志 |
| 无所有权检查 | 任何人可删任何文章 | 验证 `author_id == user_id` |
| 缺少过滤 | `$_GET['page']` 直接用 | `filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT)` |

---

## 总结

```
第2章 给你工具  →  第3章 给你门钥匙  →  第4章 给你望远镜  →  第5章 给你盔甲
    (PDO/CRUD)        (Session/Auth)         (JOIN/Search)          (Security/Structure)
```
