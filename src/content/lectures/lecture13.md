---
title: PHP查询数据——学生成绩管理系统（二）
lectureNumber: 13
module: 数据库操作
description: 掌握SELECT语句查询数据，学会制作学生列表与成绩详情页，实现分页显示功能。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture12']
tags: ['PHP', 'MySQL', 'SELECT', '查询', '分页', 'JOIN']
hasSlides: false
hasAssignment: true
draft: false
---

> 学习目标：掌握SELECT语句查询数据，学会制作学生列表与成绩详情页，实现分页显示功能。

---

## 学习路线图

```
第1关：SELECT查询 ──→ 第2关：学生列表 ──→ 第3关：成绩详情页 ──→ 第4关：分页显示
       ↓                     ↓                      ↓                     ↓
   基础SELECT           查询student表          关联查询成绩            LIMIT偏移
   WHERE条件            表格展示页面           GET传参id             页码计算
   ORDER BY排序         统计人数
```

---

## 第1关：SELECT查询基础

### 1.1 基本查询语句

在学生成绩管理系统中，常用的查询有：

```sql
-- 查询所有学生
SELECT * FROM student;

-- 查询指定列
SELECT student_no, name, class_name FROM student;

-- 条件查询：查询1班的学生
SELECT * FROM student WHERE class_name = '软件工程1班';

-- 条件查询：查询女生
SELECT * FROM student WHERE gender = '女';

-- 模糊查询：查询姓"张"的学生
SELECT * FROM student WHERE name LIKE '张%';

-- 排序：按年龄从小到大
SELECT * FROM student ORDER BY age ASC;

-- 排序：按创建时间倒序（最新的在前面）
SELECT * FROM student ORDER BY created_at DESC;

-- 限制返回条数（只查前5条）
SELECT * FROM student LIMIT 5;

-- 分页核心：偏移+限制
SELECT * FROM student LIMIT 0, 5;   -- 第1页（记录1-5）
SELECT * FROM student LIMIT 5, 5;   -- 第2页（记录6-10）
```

### 1.2 多表关联查询（学生+成绩）

```sql
-- 查询学生及其成绩（内连接）
SELECT
    s.student_no,
    s.name,
    s.class_name,
    sc.chinese,
    sc.math,
    sc.english,
    (sc.chinese + sc.math + sc.english) AS total_score
FROM student s
LEFT JOIN score sc ON s.student_no = sc.student_no
WHERE s.class_name = '软件工程1班'
ORDER BY total_score DESC;
```

**LEFT JOIN 图解**：

```
student 表                 score 表
┌────┬──────┐             ┌────┬────────┐
│学号│ 姓名  │             │学号│ 语文   │
├────┼──────┤             ├────┼────────┤
│001 │ 张三  │◄───────────►│001 │ 85     │
│002 │ 李四  │◄───────────►│002 │ 92     │
│003 │ 王五  │    × 无成绩  │    │        │
└────┴──────┘             └────┴────────┘

LEFT JOIN 结果：王五也会被列出，成绩显示为 NULL
```

### 1.3 常用查询条件

| 运算符 | 说明 | 示例 |
|--------|------|------|
| `=` | 等于 | `WHERE gender = '男'` |
| `>` / `<` | 大于/小于 | `WHERE age > 18` |
| `BETWEEN` | 范围内 | `WHERE age BETWEEN 18 AND 22` |
| `LIKE` | 模糊匹配 | `WHERE name LIKE '张%'` |
| `AND` / `OR` | 与/或 | `WHERE class='1班' AND gender='女'` |

---

## 第2关：PHP查询学生数据

### 2.1 查询并显示学生列表

```php
<?php
require_once 'db_connect.php';

// 查询所有学生
$sql = "SELECT id, student_no, name, gender, age, class_name, created_at FROM student ORDER BY id DESC";
$result = mysqli_query($conn, $sql);

// 检查是否有数据
if (mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        echo '学号: ' . $row['student_no'] . ' | ';
        echo '姓名: ' . $row['name'] . ' | ';
        echo '班级: ' . $row['class_name'] . '<br>';
    }
} else {
    echo '暂无学生数据，请先添加学生';
}

mysqli_free_result($result);
mysqli_close($conn);
?>
```

### 2.2 结果集处理函数

| 函数 | 说明 | 返回值示例 |
|------|------|-----------|
| `mysqli_fetch_assoc()` | 关联数组 | `['id'=>1, 'name'=>'张三']` |
| `mysqli_fetch_array()` | 数组（可选模式） | 混合数组 |
| `mysqli_fetch_row()` | 索引数组 | `[1, '张三', '男']` |
| `mysqli_num_rows()` | 结果集总行数 | `int` |
| `mysqli_free_result()` | 释放内存 | `void` |

### 2.3 学生列表页面（带统计）

```php
<?php
require_once 'db_connect.php';

// 查询学生列表
$sql = "SELECT id, student_no, name, gender, age, class_name FROM student ORDER BY student_no ASC";
$result = mysqli_query($conn, $sql);

// 统计各班级人数
$countSql = "SELECT class_name, COUNT(*) as count FROM student GROUP BY class_name";
$countResult = mysqli_query($conn, $countSql);
?>
<!DOCTYPE html>
<html>
<head>
    <title>学生列表 - 学生成绩管理系统</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 30px auto; padding: 20px; background: #f5f5f5; }
        .container { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
        th { background-color: #4CAF50; color: white; }
        tr:nth-child(even) { background-color: #f9f9f9; }
        tr:hover { background-color: #f1f1f1; }
        .btn { padding: 6px 12px; color: white; text-decoration: none; border-radius: 4px; font-size: 14px; }
        .btn-view { background: #2196F3; }
        .btn-add { background: #4CAF50; padding: 10px 20px; display: inline-block; margin-bottom: 15px; }
        .stats { background: #e3f2fd; padding: 15px; border-radius: 4px; margin-bottom: 20px; }
        .stats span { margin-right: 20px; }
        .empty { text-align: center; padding: 50px; color: #666; }
    </style>
</head>
<body>
    <div class="container">
        <h2>📋 学生列表</h2>

        <!-- 班级统计 -->
        <div class="stats">
            <strong>班级统计：</strong>
            <?php while ($c = mysqli_fetch_assoc($countResult)): ?>
                <span><?php echo htmlspecialchars($c['class_name']); ?>：<?php echo $c['count']; ?>人</span>
            <?php endwhile; ?>
        </div>

        <a href="student_add.php" class="btn btn-add">+ 添加学生</a>

        <?php if (mysqli_num_rows($result) > 0): ?>
        <table>
            <thead>
                <tr>
                    <th>学号</th>
                    <th>姓名</th>
                    <th>性别</th>
                    <th>年龄</th>
                    <th>班级</th>
                    <th>操作</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = mysqli_fetch_assoc($result)): ?>
                <tr>
                    <td><?php echo htmlspecialchars($row['student_no']); ?></td>
                    <td><?php echo htmlspecialchars($row['name']); ?></td>
                    <td><?php echo $row['gender']; ?></td>
                    <td><?php echo $row['age']; ?></td>
                    <td><?php echo htmlspecialchars($row['class_name']); ?></td>
                    <td>
                        <a href="student_detail.php?id=<?php echo $row['id']; ?>" class="btn btn-view">查看详情</a>
                    </td>
                </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
        <?php else: ?>
            <div class="empty">暂无学生数据，请先添加学生</div>
        <?php endif; ?>
    </div>

<?php
mysqli_free_result($result);
mysqli_free_result($countResult);
mysqli_close($conn);
?>
</body>
</html>
```

### 动手练 2.3

编写 `score_list.php` —— 成绩列表页面，要求：
1. 使用多表关联查询，显示：学号、姓名、班级、语文、数学、英语、总分
2. 按总分从高到低排序
3. 每行有"查看详情"链接

---

## 第3关：成绩详情页（二级页面）

### 3.1 URL传参原理

```
学生列表页:
student_list.php
    ↓ 点击"查看详情"
student_detail.php?id=5
    ↓ PHP获取参数
$_GET['id'] = 5
    ↓ 查询数据库（学生表 + 成绩表）
SELECT * FROM student WHERE id = 5
    ↓ 显示学生信息和成绩
```

### 3.2 学生成绩详情页

```php
<?php
require_once 'db_connect.php';

// 获取URL参数
$id = isset($_GET['id']) ? (int)$_GET['id'] : 0;

if ($id <= 0) {
    die('参数错误');
}

// 查询学生基本信息
$stmt = mysqli_prepare($conn, "SELECT * FROM student WHERE id = ?");
mysqli_stmt_bind_param($stmt, 'i', $id);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
$student = mysqli_fetch_assoc($result);
mysqli_stmt_close($stmt);

if (!$student) {
    die('学生不存在');
}

// 查询该学生的成绩
$stmt2 = mysqli_prepare($conn, "SELECT * FROM score WHERE student_no = ? ORDER BY exam_date DESC");
mysqli_stmt_bind_param($stmt2, 's', $student['student_no']);
mysqli_stmt_execute($stmt2);
$scoreResult = mysqli_stmt_get_result($stmt2);
?>
<!DOCTYPE html>
<html>
<head>
    <title><?php echo htmlspecialchars($student['name']); ?> - 学生详情</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 600px; margin: 50px auto; padding: 20px; background: #f5f5f5; }
        .card { background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        h2 { color: #333; border-bottom: 2px solid #4CAF50; padding-bottom: 10px; }
        .info { margin: 15px 0; }
        .info label { font-weight: bold; color: #555; display: inline-block; width: 80px; }
        .score-table { width: 100%; border-collapse: collapse; margin-top: 20px; }
        .score-table th, .score-table td { border: 1px solid #ddd; padding: 10px; text-align: center; }
        .score-table th { background: #2196F3; color: white; }
        .total { font-weight: bold; color: #f44336; font-size: 18px; }
        .back { display: inline-block; margin-top: 20px; color: #4CAF50; text-decoration: none; }
    </style>
</head>
<body>
    <div class="card">
        <h2>👤 <?php echo htmlspecialchars($student['name']); ?> 的详细信息</h2>

        <div class="info"><label>学号：</label><?php echo $student['student_no']; ?></div>
        <div class="info"><label>姓名：</label><?php echo htmlspecialchars($student['name']); ?></div>
        <div class="info"><label>性别：</label><?php echo $student['gender']; ?></div>
        <div class="info"><label>年龄：</label><?php echo $student['age']; ?></div>
        <div class="info"><label>班级：</label><?php echo htmlspecialchars($student['class_name']); ?></div>

        <h3 style="margin-top: 30px; color: #333;">📊 成绩记录</h3>

        <?php if (mysqli_num_rows($scoreResult) > 0): ?>
        <table class="score-table">
            <tr>
                <th>考试日期</th><th>语文</th><th>数学</th>
                <th>英语</th><th>总分</th>
            </tr>
            <?php while ($score = mysqli_fetch_assoc($scoreResult)): ?>
            <?php $total = ($score['chinese'] ?? 0) + ($score['math'] ?? 0) + ($score['english'] ?? 0); ?>
            <tr>
                <td><?php echo $score['exam_date']; ?></td>
                <td><?php echo $score['chinese']; ?></td>
                <td><?php echo $score['math']; ?></td>
                <td><?php echo $score['english']; ?></td>
                <td class="total"><?php echo $total; ?></td>
            </tr>
            <?php endwhile; ?>
        </table>
        <?php else: ?>
            <p style="color: #666;">暂无成绩记录</p>
        <?php endif; ?>

        <a href="student_list.php" class="back">← 返回列表</a>
    </div>

<?php
mysqli_free_result($scoreResult);
mysqli_close($conn);
?>
</body>
</html>
```

---

## 第4关：分页显示

### 4.1 分页原理

```
假设学生表共有 37 条记录，每页显示 10 条：

总页数 = ceil(37 / 10) = 4 页

第1页: LIMIT 0, 10   (记录 1-10)
第2页: LIMIT 10, 10  (记录 11-20)
第3页: LIMIT 20, 10  (记录 21-30)
第4页: LIMIT 30, 10  (记录 31-37)

公式：偏移量 = (当前页码 - 1) × 每页条数
```

### 4.2 分页实现代码

```php
<?php
require_once 'db_connect.php';

// 1. 配置
$pageSize = 10;                          // 每页显示条数
$page = isset($_GET['page']) ? (int)$_GET['page'] : 1;  // 当前页码
if ($page < 1) $page = 1;

// 2. 获取总记录数
$countResult = mysqli_query($conn, "SELECT COUNT(*) as total FROM student");
$totalRow = mysqli_fetch_assoc($countResult);
$totalRecords = $totalRow['total'];
mysqli_free_result($countResult);

// 3. 计算总页数
$totalPages = (int)ceil($totalRecords / $pageSize);
if ($totalPages < 1) $totalPages = 1;
if ($page > $totalPages) $page = $totalPages;

// 4. 计算偏移量
$offset = ($page - 1) * $pageSize;

// 5. 查询当前页数据
$sql = "SELECT id, student_no, name, gender, age, class_name FROM student ORDER BY student_no ASC LIMIT ?, ?";
$stmt = mysqli_prepare($conn, $sql);
mysqli_stmt_bind_param($stmt, 'ii', $offset, $pageSize);
mysqli_stmt_execute($stmt);
$result = mysqli_stmt_get_result($stmt);
?>

<!-- 学生列表表格（同2.3，略） -->

<!-- 分页导航 -->
<div class="pagination">
    <style>
        .pagination { text-align: center; margin-top: 25px; }
        .pagination a, .pagination span {
            display: inline-block; padding: 8px 14px; margin: 0 3px;
            border: 1px solid #ddd; text-decoration: none; color: #333; border-radius: 4px;
        }
        .pagination a:hover { background: #f0f0f0; }
        .pagination .current { background: #4CAF50; color: white; border-color: #4CAF50; }
        .pagination .disabled { color: #ccc; cursor: not-allowed; }
        .info { color: #666; margin-left: 10px; }
    </style>

    <!-- 首页/上一页 -->
    <?php if ($page > 1): ?>
        <a href="?page=1">首页</a>
        <a href="?page=<?php echo $page - 1; ?>">上一页</a>
    <?php else: ?>
        <span class="disabled">首页</span>
        <span class="disabled">上一页</span>
    <?php endif; ?>

    <!-- 页码 -->
    <?php
    $start = max(1, $page - 2);
    $end = min($totalPages, $page + 2);
    for ($i = $start; $i <= $end; $i++):
    ?>
        <?php if ($i == $page): ?>
            <span class="current"><?php echo $i; ?></span>
        <?php else: ?>
            <a href="?page=<?php echo $i; ?>"><?php echo $i; ?></a>
        <?php endif; ?>
    <?php endfor; ?>

    <!-- 下一页/末页 -->
    <?php if ($page < $totalPages): ?>
        <a href="?page=<?php echo $page + 1; ?>">下一页</a>
        <a href="?page=<?php echo $totalPages; ?>">末页</a>
    <?php else: ?>
        <span class="disabled">下一页</span>
        <span class="disabled">末页</span>
    <?php endif; ?>

    <span class="info">共 <?php echo $totalRecords; ?> 条，<?php echo $totalPages; ?> 页</span>
</div>

<?php
mysqli_free_result($result);
mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
```

### 动手练 4.2

为学生成绩列表 `score_list.php` 添加分页功能，每页显示 5 条记录。

---

## Web系统中的变量传递方法回顾

在构建学生成绩管理系统的过程中，我们已经使用了多种变量传递方式：

| 传递方式 | 使用场景 | 本课示例 |
|----------|----------|----------|
| `$_GET` | URL传参，适合id、页码等公开参数 | `student_detail.php?id=5` |
| `$_POST` | 表单提交，适合新增/修改数据 | 添加学生表单 |
| `$_SESSION` | 跨页面保持登录状态等 | （第10-11课已学） |
| `$_COOKIE` | 长期保存用户偏好 | （第10课已学） |

**选择建议**：
- 查询、翻页、详情 → `$_GET`（可收藏链接）
- 添加、修改、删除操作 → `$_POST`（安全，不暴露参数）
- 用户登录状态 → `$_SESSION`

---

## 综合挑战

### 挑战：带搜索的分页学生列表 ⭐⭐⭐

**需求**：
为 `student_list.php` 添加搜索功能：

1. 搜索框可按姓名模糊搜索（`LIKE '%关键词%'`）
2. 下拉框可按班级筛选
3. 搜索结果支持分页
4. 翻页时保持搜索条件（如 `?page=2&keyword=张&class=软件工程1班`）

---

## 自我检测清单

- [ ] 掌握SELECT基本查询语句
- [ ] 掌握WHERE条件筛选和LIKE模糊查询
- [ ] 掌握ORDER BY排序
- [ ] 理解LEFT JOIN多表关联查询
- [ ] 能用PHP执行查询并显示在表格中
- [ ] 理解`$_GET`传参原理
- [ ] 能实现详情页（二级页面）
- [ ] 理解分页原理（LIMIT偏移量）
- [ ] 能实现基本的分页功能
- [ ] 理解Web系统中GET/POST/SESSION/COOKIE的适用场景

---

## 常见错误速查表

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| Undefined index | `$_GET['id']`不存在 | 用`isset()`判断 |
| 参数未转义 | 直接拼接URL参数到SQL | 用预处理语句 |
| 分页越界 | 页码大于总页数 | `max/min`限制 |
| 总页数为0 | 无数据时除以0 | `max(1, ceil(...))` |
| 翻页丢失条件 | 链接没带上搜索参数 | `http_build_query()` |
| JOIN查询重复 | 关联条件写错 | 检查ON条件 |

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| SELECT | 从数据库中"查找"数据 |
| WHERE | 筛选条件，只返回符合条件的记录 |
| LIKE | 模糊匹配，`%`表示任意字符 |
| ORDER BY | 排序，`ASC`升序，`DESC`降序 |
| LIMIT | 限制返回条数，分页的核心 |
| LEFT JOIN | 左表全显示，右表匹配不上填NULL |
| `$_GET` | 获取URL中`?key=value`传来的值 |
| 分页 | `(页码-1)×每页条数` 计算偏移量 |

---

*本课教材参考：第11章 学生成绩管理系统（查询与分页）、第12章 个人博客系统（前台查询）*
