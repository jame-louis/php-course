---
title: PHP编辑与删除数据——学生成绩管理系统（三）
lectureNumber: 14
module: 数据库操作
description: 掌握UPDATE修改数据和DELETE删除数据，完成学生成绩管理系统的CRUD功能，并了解个人博客系统项目结构。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture13']
tags: ['PHP', 'MySQL', 'UPDATE', 'DELETE', 'CRUD', '批量删除']
hasSlides: false
hasAssignment: true
draft: false
---

> 学习目标：掌握UPDATE修改数据和DELETE删除数据，完成学生成绩管理系统的CRUD功能，并了解个人博客系统项目结构。

---

## 学习路线图

```
第1关：UPDATE修改 ──→ 第2关：DELETE删除 ──→ 第3关：批量删除 ──→ 第4关：个人博客系统
       ↓                    ↓                      ↓                      ↓
   UPDATE语句           单条删除确认            复选框批量操作          Chapter 12案例
   数据回显表单         安全删除流程            空数组校验              博客CRUD框架
```

---

## 第1关：UPDATE修改学生信息

### 1.1 UPDATE基本语法

```sql
-- 修改单条记录（必须带WHERE！）
UPDATE student SET age = 21 WHERE id = 1;

-- 修改多个字段
UPDATE student SET name = '张三丰', class_name = '软件工程2班' WHERE id = 1;

-- 按条件批量修改
UPDATE student SET class_name = '软件工程3班' WHERE class_name = '软件工程2班';
```

**⚠️ 重要警告**：
```sql
UPDATE student SET age = 20;        -- ❌ 危险！修改了所有学生的年龄！
UPDATE student SET age = 20 WHERE id = 5;   -- ✅ 正确，只改id=5的
```

### 1.2 编辑页面（带数据回显）

编辑页面的核心逻辑：**先查询原有数据 → 显示在表单中 → 用户修改后提交 → UPDATE更新数据库**

```php
<?php
require_once 'db_connect.php';

// 获取要编辑的学生ID
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    die('参数错误');
}

$error = '';
$success = '';

// 处理表单提交（保存修改）
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $studentNo = trim($_POST['student_no'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $gender = $_POST['gender'] ?? '男';
    $age = (int)($_POST['age'] ?? 0);
    $className = trim($_POST['class_name'] ?? '');

    // 验证
    if (empty($studentNo) || empty($name)) {
        $error = '学号和姓名不能为空';
    } else {
        // 使用预处理语句更新
        $sql = "UPDATE student SET student_no = ?, name = ?, gender = ?, age = ?, class_name = ? WHERE id = ?";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, 'sssisi', $studentNo, $name, $gender, $age, $className, $id);

        if (mysqli_stmt_execute($stmt)) {
            $success = "学生 {$name} 的信息已更新！";
        } else {
            $error = '更新失败: ' . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    }
}

// 查询当前学生数据（用于表单回显）
$stmt = mysqli_prepare($conn, "SELECT * FROM student WHERE id = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$student = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$student) {
    die('学生不存在');
}

mysqli_close($conn);
?>
<!DOCTYPE html>
<html>
<head>
    <title>编辑学生 - 学生成绩管理系统</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 500px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2 { color: #333; border-bottom: 2px solid #2196F3; padding-bottom: 10px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; color: #555; }
        input, select { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
        button { background: #2196F3; color: white; padding: 12px 30px; border: none; border-radius: 4px; cursor: pointer; font-size: 16px; }
        button:hover { background: #1976D2; }
        .error { color: #f44336; background: #ffebee; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
        .success { color: #4CAF50; background: #e8f5e9; padding: 10px; border-radius: 4px; margin-bottom: 15px; }
        .back { display: inline-block; margin-top: 15px; color: #666; text-decoration: none; }
    </style>
</head>
<body>
    <div class="container">
        <h2>✏️ 编辑学生信息</h2>

        <?php if ($error): ?>
            <div class="error"><?php echo $error; ?></div>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="success"><?php echo $success; ?></div>
        <?php endif; ?>

        <form method="POST">
            <div class="form-group">
                <label>学号 *</label>
                <input type="text" name="student_no" value="<?php echo htmlspecialchars($student['student_no']); ?>" required>
            </div>
            <div class="form-group">
                <label>姓名 *</label>
                <input type="text" name="name" value="<?php echo htmlspecialchars($student['name']); ?>" required>
            </div>
            <div class="form-group">
                <label>性别</label>
                <select name="gender">
                    <option value="男" <?php echo $student['gender'] === '男' ? 'selected' : ''; ?>>男</option>
                    <option value="女" <?php echo $student['gender'] === '女' ? 'selected' : ''; ?>>女</option>
                </select>
            </div>
            <div class="form-group">
                <label>年龄</label>
                <input type="number" name="age" value="<?php echo $student['age']; ?>" min="1" max="120">
            </div>
            <div class="form-group">
                <label>班级</label>
                <input type="text" name="class_name" value="<?php echo htmlspecialchars($student['class_name']); ?>">
            </div>
            <button type="submit">💾 保存修改</button>
            <a href="student_list.php" class="back">← 返回列表</a>
        </form>
    </div>
</body>
</html>
```

### ✅ 动手练 1.2

编写 `score_edit.php` —— 修改成绩信息：
1. 根据 `id` 获取成绩数据回显到表单
2. 提交后更新 `score` 表
3. 成功后返回成绩列表

---

## 第2关：DELETE删除数据

### 2.1 DELETE基本语法

```sql
-- 删除单条记录（必须带WHERE！）
DELETE FROM student WHERE id = 5;

-- 删除符合条件的多条记录
DELETE FROM score WHERE exam_date < '2023-01-01';

-- ❌ 危险！删除所有数据！
DELETE FROM student;
```

**⚠️ 删除前确认机制**：
```
用户点击"删除"
    ↓
弹出确认对话框（JavaScript confirm）
    ↓
用户点击"确定"
    ↓
执行DELETE语句
    ↓
提示删除成功，返回列表
```

### 2.2 删除实现（单条）

在列表页添加删除链接：

```php
<!-- 在 student_list.php 的操作列中 -->
<td>
    <a href="student_edit.php?id=<?php echo $row['id']; ?>" class="btn btn-edit">编辑</a>
    <a href="student_delete.php?id=<?php echo $row['id']; ?>"
       class="btn btn-delete"
       onclick="return confirm('确定要删除学生 【<?php echo htmlspecialchars($row['name']); ?>】 吗？此操作不可恢复！');">
       删除
    </a>
</td>
```

删除处理页面 `student_delete.php`：

```php
<?php
require_once 'db_connect.php';

$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    die('参数错误');
}

// 先查询确认记录存在
$checkStmt = mysqli_prepare($conn, "SELECT id, name FROM student WHERE id = ?");
mysqli_stmt_bind_param($checkStmt, 'i', $id);
mysqli_stmt_execute($checkStmt);
$result = mysqli_stmt_get_result($checkStmt);
$student = mysqli_fetch_assoc($result);
mysqli_stmt_close($checkStmt);

if (!$student) {
    die('学生不存在');
}

// 执行删除
$sql = "DELETE FROM student WHERE id = ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'i', $id);

if (mysqli_stmt_execute($stmt)) {
    echo '<script>alert("学生【' . htmlspecialchars($student['name']) . '】已删除"); location.href="student_list.php";</script>';
} else {
    echo '删除失败: ' . mysqli_stmt_error($stmt);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
```

---

## 第3关：批量删除

### 3.1 批量删除原理

```
列表页显示复选框
┌────┬──────┬──────┬────────┐
│ ☑️ │ 学号  │ 姓名  │ 操作   │
├────┼──────┼──────┼────────┤
│ ☑️ │ 001  │ 张三  │        │
│ ☐  │ 002  │ 李四  │        │
│ ☑️ │ 003  │ 王五  │        │
└────┴──────┴──────┴────────┘
   ↓ 选中后点击"删除选中项"
   ↓ 表单提交 ids[] = [1, 3]
   ↓ PHP处理
DELETE FROM student WHERE id IN (1, 3)
```

### 3.2 批量删除实现

```php
<?php
require_once 'db_connect.php';

// 处理批量删除
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['ids'])) {
    $ids = array_map('intval', $_POST['ids']);  // 全部转为整数

    // ⚠️ 重要：检查是否为空数组，避免 SQL 语法错误
    if (empty($ids)) {
        echo '<script>alert("请先选择要删除的学生");</script>';
    } else {
        $idList = implode(',', $ids);

        // 由于已用 intval 确保是整数，可直接拼接（教学简化）
        // 生产环境建议用多次预处理或 IN 占位符扩展
        $sql = "DELETE FROM student WHERE id IN ($idList)";

        if (mysqli_query($conn, $sql)) {
            $deletedCount = mysqli_affected_rows($conn);
            echo '<script>alert("成功删除 ' . $deletedCount . ' 名学生"); location.href="student_list.php";</script>';
        } else {
            echo '删除失败: ' . mysqli_error($conn);
        }
    }
}

// 查询所有学生用于显示复选框
$result = mysqli_query($conn, "SELECT id, student_no, name, gender, age, class_name FROM student ORDER BY id DESC");
?>
<!DOCTYPE html>
<html>
<head>
    <title>批量删除学生</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 30px auto; padding: 20px; }
        table { width: 100%; border-collapse: collapse; }
        th, td { border: 1px solid #ddd; padding: 10px; text-align: left; }
        th { background: #f44336; color: white; }
        .btn-delete { background: #f44336; color: white; padding: 10px 20px; border: none; cursor: pointer; border-radius: 4px; }
        .btn-delete:hover { background: #d32f2f; }
        .back { color: #666; text-decoration: none; margin-left: 10px; }
    </style>
</head>
<body>
    <h2>学生管理 - 批量删除</h2>
    <form method="POST" onsubmit="return confirm('确定要删除选中的学生吗？此操作不可恢复！');">
        <table>
            <tr>
                <th><input type="checkbox" onclick="toggleAll(this)"></th>
                <th>学号</th><th>姓名</th><th>性别</th><th>年龄</th><th>班级</th>
            </tr>
            <?php while ($row = mysqli_fetch_assoc($result)): ?>
            <tr>
                <td><input type="checkbox" name="ids[]" value="<?php echo $row['id']; ?>"></td>
                <td><?php echo htmlspecialchars($row['student_no']); ?></td>
                <td><?php echo htmlspecialchars($row['name']); ?></td>
                <td><?php echo $row['gender']; ?></td>
                <td><?php echo $row['age']; ?></td>
                <td><?php echo htmlspecialchars($row['class_name']); ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
        <p>
            <button type="submit" class="btn-delete">🗑️ 删除选中项</button>
            <a href="student_list.php" class="back">← 返回列表</a>
        </p>
    </form>

    <script>
        function toggleAll(source) {
            var checkboxes = document.querySelectorAll('input[name="ids[]"]');
            checkboxes.forEach(cb => cb.checked = source.checked);
        }
    </script>
</body>
</html>
<?php mysqli_free_result($result); mysqli_close($conn); ?>
```

---

## 第4关：综合案例——个人博客系统

### 4.1 从学生成绩管理系统到个人博客系统

教材 **第12章** 介绍了一个更复杂的综合项目——**个人博客系统**。通过对比两个项目，可以理解不同场景下的数据库设计思路：

| 对比项 | 学生成绩管理系统 | 个人博客系统 |
|--------|------------------|--------------|
| **核心功能** | 学生信息 + 成绩CRUD | 文章发布 + 评论管理 |
| **用户角色** | 管理员（单一角色） | 博主 + 访客 |
| **数据关系** | 学生-成绩（一对多） | 文章-评论（一对多） |
| **页面类型** | 管理后台为主 | 前台展示 + 后台管理 |
| **技术重点** | 多表关联、分页查询 | 登录验证、内容展示 |

### 4.2 个人博客系统数据库设计

```sql
-- 创建博客数据库
CREATE DATABASE blog DEFAULT CHARSET=utf8mb4;
USE blog;

-- 文章表
CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(200) NOT NULL COMMENT '文章标题',
    content TEXT COMMENT '文章内容',
    author VARCHAR(50) COMMENT '作者',
    views INT DEFAULT 0 COMMENT '浏览量',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 评论表
CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    article_id INT NOT NULL COMMENT '关联文章ID',
    nickname VARCHAR(50) COMMENT '评论者昵称',
    content TEXT COMMENT '评论内容',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 4.3 个人博客系统页面结构

```
前台（访客可见）：
├── index.php          首页 - 文章列表
├── article.php?id=1   文章详情页 - 显示内容+评论
└── comment.php        提交评论处理

后台（管理员）：
├── admin/
│   ├── login.php      管理员登录
│   ├── index.php      后台首页
│   ├── article_list.php   文章管理列表
│   ├── article_add.php    发布文章
│   ├── article_edit.php   编辑文章
│   └── article_delete.php 删除文章
```

### 4.4 浏览量自增实现

```php
<?php
// article.php - 文章详情页
$id = (int)$_GET['id'];

// 浏览量 +1
$updateStmt = mysqli_prepare($conn, "UPDATE articles SET views = views + 1 WHERE id = ?");
mysqli_stmt_bind_param($updateStmt, 'i', $id);
mysqli_stmt_execute($updateStmt);
mysqli_stmt_close($updateStmt);

// 再查询文章详情用于显示...
?>
```

---

## 综合挑战

### 挑战A：完整的学生成绩管理后台 ⭐⭐⭐

**需求**：整合12-14讲内容，完成以下功能：

1. **student_manage.php** - 学生管理首页
   - 表格展示所有学生（分页，每页10条）
   - 搜索框：按姓名搜索
   - 下拉筛选：按班级筛选
   - 操作列：编辑、删除
   - 顶部有"添加学生"、"批量删除"按钮

2. **score_manage.php** - 成绩管理
   - 显示学生成绩列表（关联查询）
   - 支持添加、修改成绩

### 挑战B：个人博客系统（Chapter 12）⭐⭐⭐⭐

**需求**：搭建教材第12章的个人博客系统：

1. 创建 `blog` 数据库和 `articles` 表
2. **前台首页** `index.php`：显示文章列表（标题、作者、发布时间、浏览量）
3. **文章详情页** `article.php`：显示文章内容，浏览量+1，显示评论列表
4. **后台管理**：
   - `admin/login.php`：简单登录验证（固定账号：admin/123456）
   - `admin/article_list.php`：文章管理（增删改查分页）

---

## 自我检测清单

- [ ] 掌握UPDATE语句修改数据
- [ ] 理解"修改必须带WHERE"的安全原则
- [ ] 能编写带数据回显的编辑表单
- [ ] 掌握DELETE语句删除数据
- [ ] 能实现删除前的确认机制
- [ ] 能实现批量删除功能（含空数组校验）
- [ ] 理解CRUD完整流程
- [ ] 能实现浏览量等统计字段的自增更新
- [ ] 理解学生成绩管理系统与个人博客系统的区别
- [ ] 能独立搭建简单的管理后台

---

## 常见错误速查表

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| 修改了所有记录 | UPDATE没有WHERE | 检查SQL条件 |
| 删除了所有记录 | DELETE没有WHERE | 检查SQL条件 |
| 修改后数据没变 | 提交的是原值 | 检查表单value绑定 |
| 数据回显失败 | `value`没加引号 | `value="<?php echo ...; ?>"` |
| 删除无响应 | JS confirm返回false | 检查onclick写法 |
| 批量删除报错 | 未选任何项，`IN ()`语法错误 | 加`empty($ids)`判断 |
| 批量删除SQL注入 | 直接拼接用户输入 | 先用`intval`转换或改用预处理 |

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| UPDATE | 修改已有数据，**必须带WHERE** |
| DELETE | 删除数据，**必须带WHERE** |
| 数据回显 | 把数据库的值填到表单value中 |
| confirm() | JS确认对话框，点取消阻止跳转 |
| 批量删除 | 用复选框+IN语句一次删除多条，要校验空数组 |
| CRUD | Create增 Read查 Update改 Delete删 |
| 浏览量 | `UPDATE views = views + 1` 实现自增 |
| 个人博客系统 | 教材Chapter 12，前台展示+后台管理的综合项目 |

---

*本课教材参考：第11章 学生成绩管理系统（编辑与删除）、第12章 个人博客系统（综合项目）*
