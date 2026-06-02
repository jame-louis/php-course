---
title: PHP操作数据库——学生成绩管理系统（一）
lectureNumber: 12
module: 数据库操作
description: 理解MySQL数据库基础，掌握phpMyAdmin管理工具，学会使用PHP连接数据库，通过学生成绩管理系统的案例掌握INSERT添加数据。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture11']
tags: ['PHP', 'MySQL', '数据库', 'phpMyAdmin', 'INSERT', '预处理语句']
hasSlides: false
hasAssignment: true
draft: false
---

> 学习目标：理解MySQL数据库基础，掌握phpMyAdmin管理工具，学会使用PHP连接数据库，通过学生成绩管理系统的案例掌握INSERT添加数据。

---

## 学习路线图

```
第1关：项目与数据库 ──→ 第2关：phpMyAdmin建表 ──→ 第3关：PHP连接数据库 ──→ 第4关：添加学生数据
       ↓                        ↓                         ↓                        ↓
   学生成绩管理系统          创建school数据库          mysqli_connect()         INSERT语句
   数据库设计               student表设计             连接四步骤                预处理添加
```

---

## 第1关：学生成绩管理系统与数据库设计

### 1.1 什么是学生成绩管理系统？

**费曼解释**：想象学校的教务处有一本厚厚的"学生成绩登记册"。每个学生占一页，记录姓名、学号、各科成绩。数据库就是这本登记册的电子版，能同时让成百上千人查阅、修改，而且永远不会丢失。

```
传统纸质登记册：                数据库管理系统：
┌─────────────────┐           ┌─────────────────────────────┐
│ 学生成绩登记册    │           │        school 数据库         │
│ ┌─────────────┐ │           │  ┌───────────────────────┐  │
│ │姓名：张三     │ │           │  │    student 学生表      │  │
│ │学号：2024001 │ │     →     │  │ ┌────┬─────┬────┬───┐ │  │
│ │语文：85      │ │           │  │ │学号│姓名 │班级│年龄│ │  │
│ │数学：90      │ │           │  │ ├────┼─────┼────┼───┤ │  │
│ │英语：78      │ │           │  │ │001 │张三 │一班│20 │ │  │
│ └─────────────┘ │           │  │ │002 │李四 │一班│21 │ │  │
│ 查找慢、易丢失   │           │  │ └────┴─────┴────┴───┘ │  │
└─────────────────┘           │  └───────────────────────┘  │
                              │  ┌───────────────────────┐  │
                              │  │     score 成绩表       │  │
                              │  │ ┌────┬────┬────┬────┐ │  │
                              │  │ │学号│语文│数学│英语│ │  │
                              │  │ ├────┼────┼────┼────┤ │  │
                              │  │ │001 │ 85 │ 90 │ 78 │ │  │
                              │  │ │002 │ 92 │ 88 │ 95 │ │  │
                              │  │ └────┴────┴────┴────┘ │  │
                              │  └───────────────────────┘  │
                              └─────────────────────────────┘
```

### 1.2 数据库核心概念

| 术语 | 类比（学生成绩册） | 说明 |
|------|-------------------|------|
| **数据库(Database)** | 整个登记册 | 存储数据的容器 |
| **表(Table)** | 登记册中的一页/一个表格 | 具体存储数据的结构 |
| **行(Row)** | 一条学生记录 | 一条完整的数据 |
| **列(Column)** | 姓名/学号/成绩栏 | 数据的一个属性/字段 |
| **主键(Primary Key)** | 学号 | 唯一标识每条记录 |

### 1.3 学生成绩管理系统数据库设计

我们将创建两个核心数据表：

**student 表（学生信息表）**：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INT, 主键, 自增 | 记录编号 |
| student_no | VARCHAR(20), 唯一 | 学号 |
| name | VARCHAR(50) | 姓名 |
| gender | VARCHAR(10) | 性别 |
| age | INT | 年龄 |
| class_name | VARCHAR(50) | 班级 |
| created_at | TIMESTAMP | 创建时间 |

**score 表（成绩表）**：

| 字段名 | 类型 | 说明 |
|--------|------|------|
| id | INT, 主键, 自增 | 记录编号 |
| student_no | VARCHAR(20) | 学号（关联学生） |
| chinese | INT | 语文成绩 |
| math | INT | 数学成绩 |
| english | INT | 英语成绩 |
| exam_date | DATE | 考试日期 |

---

## 第2关：phpMyAdmin操作数据库

### 2.1 什么是phpMyAdmin？

**phpMyAdmin** 是一个用PHP编写的Web版MySQL管理工具，通过浏览器就能管理数据库，就像用一个可视化界面来操作电子表格。

```
访问地址：http://localhost/phpmyadmin
```

### 2.2 创建数据库

```sql
-- 创建数据库
CREATE DATABASE school DEFAULT CHARSET=utf8mb4;

-- 使用数据库
USE school;
```

**在phpMyAdmin中操作**：
1. 点击左侧"新建"或顶部"数据库"标签
2. 输入数据库名：`school`
3. 选择排序规则：`utf8mb4_unicode_ci`
4. 点击"创建"

### 2.3 创建 student 表

```sql
USE school;

CREATE TABLE student (
    id INT AUTO_INCREMENT PRIMARY KEY COMMENT '主键ID',
    student_no VARCHAR(20) NOT NULL UNIQUE COMMENT '学号',
    name VARCHAR(50) NOT NULL COMMENT '姓名',
    gender VARCHAR(10) DEFAULT '男' COMMENT '性别',
    age INT COMMENT '年龄',
    class_name VARCHAR(50) COMMENT '班级',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

**常用数据类型速查**：

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `INT` | 整数 | 年龄、成绩、数量 |
| `VARCHAR(n)` | 变长字符串（最多n字符） | 姓名、学号、班级 |
| `TEXT` | 长文本 | 备注、文章内容 |
| `DECIMAL(m,d)` | 精确小数 | 金额 |
| `DATE` | 日期 | 出生日期、考试日期 |
| `DATETIME` | 日期时间 | 精确到秒的时间 |
| `TIMESTAMP` | 时间戳（自动更新） | 记录创建/修改时间 |

### 2.4 创建 score 表

```sql
CREATE TABLE score (
    id INT AUTO_INCREMENT PRIMARY KEY,
    student_no VARCHAR(20) NOT NULL COMMENT '学号',
    chinese INT DEFAULT 0 COMMENT '语文成绩',
    math INT DEFAULT 0 COMMENT '数学成绩',
    english INT DEFAULT 0 COMMENT '英语成绩',
    exam_date DATE COMMENT '考试日期',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

### 动手练 2.4

在phpMyAdmin中完成以下操作：
1. 创建数据库 `school`
2. 创建 `student` 表（按上面的结构）
3. 创建 `score` 表（按上面的结构）
4. 执行 `SHOW TABLES;` 确认两个表都已创建

<details>
<summary>验证方法</summary>

在phpMyAdmin的SQL窗口中执行：
```sql
USE school;
SHOW TABLES;
DESCRIBE student;
DESCRIBE score;
```

应显示：
```
Tables_in_school
student
score
```

</details>

---

## 第3关：PHP连接数据库

### 3.1 连接数据库的四步骤

```
步骤1：建立连接        步骤2：设置字符集        步骤3：执行SQL        步骤4：关闭连接
    ↓                      ↓                      ↓                      ↓
mysqli_connect()      mysqli_set_charset()    mysqli_query()       mysqli_close()
     │                      │                      │                      │
     └──────────────────────┴──────────────────────┴──────────────────────┘
                              学生成绩管理系统
```

### 3.2 基本连接代码

```php
<?php
// 数据库配置参数
$host = 'localhost';      // 数据库服务器地址
$username = 'root';       // 用户名（WampServer默认root）
$password = '';           // 密码（WampServer默认空）
$database = 'school';     // 数据库名

// 1. 建立连接
$conn = mysqli_connect($host, $username, $password, $database);

// 检查连接是否成功
if (!$conn) {
    die('数据库连接失败: ' . mysqli_connect_error());
}

echo '数据库连接成功！';

// 2. 设置字符集（防止中文乱码）
mysqli_set_charset($conn, 'utf8mb4');

// 3. 执行SQL操作...

// 4. 关闭连接
mysqli_close($conn);
?>
```

### 3.3 封装数据库连接文件（db_connect.php）

在实际项目中，我们会把数据库连接代码封装成一个单独的文件，供其他页面引用：

```php
<?php
/**
 * 学生成绩管理系统 - 数据库连接文件
 * 文件名：db_connect.php
 * 用法：在需要连接数据库的页面顶部 require_once 'db_connect.php'
 */

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'school';

// 建立连接
$conn = mysqli_connect($host, $username, $password, $database);

if (!$conn) {
    die('数据库连接失败: ' . mysqli_connect_error());
}

// 设置字符集
mysqli_set_charset($conn, 'utf8mb4');
?>
```

**使用示例**：
```php
<?php
require_once 'db_connect.php';

// 现在可以直接使用 $conn 进行数据库操作
// ...

mysqli_close($conn);
?>
```

---

## 第4关：使用INSERT添加学生数据

### 4.1 基本INSERT语句

```php
<?php
require_once 'db_connect.php';

// 方法1：直接写SQL（了解即可，实际不推荐）
$sql = "INSERT INTO student (student_no, name, gender, age, class_name)
        VALUES ('2024001', '张三', '男', 20, '软件工程1班')";

if (mysqli_query($conn, $sql)) {
    echo '学生添加成功！';
    echo '新记录ID：' . mysqli_insert_id($conn);
} else {
    echo '添加失败: ' . mysqli_error($conn);
}

mysqli_close($conn);
?>
```

### 4.2 使用预处理语句添加数据（推荐）

**为什么要用预处理语句？**

```
没有预处理：
用户输入：张三'; DROP TABLE student; --
拼接SQL：INSERT INTO student (name) VALUES ('张三'; DROP TABLE student; --')
结果：💥 数据库被删除！（SQL注入攻击）

使用预处理：
SQL模板：INSERT INTO student (name) VALUES (?)
参数：张三'; DROP TABLE student; --
结果：安全！参数被当作纯文本处理
```

```php
<?php
require_once 'db_connect.php';

// 使用预处理语句
$sql = "INSERT INTO student (student_no, name, gender, age, class_name)
        VALUES (?, ?, ?, ?, ?)";

// 准备SQL模板
$stmt = mysqli_prepare($conn, $sql);

// 绑定参数：s = string, i = integer
// 'sssis' 表示 5 个参数的类型分别是：string, string, string, integer, string
mysqli_stmt_bind_param($stmt, 'sssis', $studentNo, $name, $gender, $age, $className);

// 设置参数值
$studentNo = '2024002';
$name = '李四';
$gender = '女';
$age = 19;
$className = '软件工程1班';

// 执行
if (mysqli_stmt_execute($stmt)) {
    echo '学生添加成功！';
} else {
    echo '添加失败: ' . mysqli_stmt_error($stmt);
}

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
```

### 4.3 从表单添加学生信息

```php
<?php
require_once 'db_connect.php';

$error = '';
$success = '';

// 处理表单提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // 获取并清理表单数据
    $studentNo = trim($_POST['student_no'] ?? '');
    $name = trim($_POST['name'] ?? '');
    $gender = $_POST['gender'] ?? '男';
    $age = (int)($_POST['age'] ?? 0);
    $className = trim($_POST['class_name'] ?? '');

    // 简单验证
    if (empty($studentNo) || empty($name)) {
        $error = '学号和姓名不能为空';
    } elseif ($age < 0 || $age > 120) {
        $error = '年龄填写不正确';
    } else {
        // 使用预处理语句插入
        $sql = "INSERT INTO student (student_no, name, gender, age, class_name)
                VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, 'sssis', $studentNo, $name, $gender, $age, $className);

        if (mysqli_stmt_execute($stmt)) {
            $success = "学生 {$name} 添加成功！";
            // 清空表单
            $studentNo = $name = $className = '';
            $age = 0;
        } else {
            $error = '添加失败: ' . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);
?>
```

### 4.4 批量添加测试数据

```php
<?php
require_once 'db_connect.php';

// 批量添加学生数据（用于测试）
$students = [
    ['2024001', '张三', '男', 20, '软件工程1班'],
    ['2024002', '李四', '女', 19, '软件工程1班'],
    ['2024003', '王五', '男', 21, '软件工程2班'],
    ['2024004', '赵六', '女', 20, '软件工程2班'],
    ['2024005', '孙七', '男', 19, '软件工程1班'],
];

$sql = "INSERT INTO student (student_no, name, gender, age, class_name) VALUES (?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

$count = 0;
foreach ($students as $student) {
    mysqli_stmt_bind_param($stmt, 'sssis', $student[0], $student[1], $student[2], $student[3], $student[4]);
    if (mysqli_stmt_execute($stmt)) {
        $count++;
    }
}

echo "成功添加 {$count} 名学生！";

mysqli_stmt_close($stmt);
mysqli_close($conn);
?>
```

### 动手练 4.4

编写 `add_score.php` —— 为学生添加成绩信息：
1. 表单包含：学号、语文成绩、数学成绩、英语成绩、考试日期
2. 使用预处理语句插入 `score` 表
3. 成绩范围验证（0-100分）
4. 添加成功后提示

<details>
<summary>参考答案</summary>

```php
<?php
require_once 'db_connect.php';

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $studentNo = trim($_POST['student_no'] ?? '');
    $chinese = (int)($_POST['chinese'] ?? -1);
    $math = (int)($_POST['math'] ?? -1);
    $english = (int)($_POST['english'] ?? -1);
    $examDate = $_POST['exam_date'] ?? '';

    if (empty($studentNo)) {
        $error = '学号不能为空';
    } elseif ($chinese < 0 || $chinese > 100 || $math < 0 || $math > 100 || $english < 0 || $english > 100) {
        $error = '成绩必须在0-100之间';
    } else {
        $sql = "INSERT INTO score (student_no, chinese, math, english, exam_date) VALUES (?, ?, ?, ?, ?)";
        $stmt = mysqli_prepare($conn, $sql);
        mysqli_stmt_bind_param($stmt, 'siiis', $studentNo, $chinese, $math, $english, $examDate);

        if (mysqli_stmt_execute($stmt)) {
            $success = "成绩添加成功！";
        } else {
            $error = '添加失败: ' . mysqli_stmt_error($stmt);
        }

        mysqli_stmt_close($stmt);
    }
}

mysqli_close($conn);
?>
```

</details>

---

## 综合挑战

### 挑战：学生信息批量导入页面

**需求**：
创建一个 `batch_add_students.php` 页面，允许一次性添加多名学生：

1. 页面显示 5 组学生信息输入框（学号、姓名、性别、年龄、班级）
2. 用户填写后点击"批量添加"
3. 使用预处理语句循环插入
4. 显示成功添加的人数和失败原因

<details>
<summary>分步提示</summary>

**Step 1**: 表单使用数组形式的 name
```html
<input type="text" name="students[0][student_no]" placeholder="学号">
<input type="text" name="students[0][name]" placeholder="姓名">
...<input type="text" name="students[1][student_no]" placeholder="学号">
```

**Step 2**: PHP 处理二维数组
```php
$students = $_POST['students'] ?? [];
$successCount = 0;
$errors = [];

$sql = "INSERT INTO student (student_no, name, gender, age, class_name) VALUES (?, ?, ?, ?, ?)";
$stmt = mysqli_prepare($conn, $sql);

foreach ($students as $index => $student) {
    $no = trim($student['student_no'] ?? '');
    $name = trim($student['name'] ?? '');
    // ... 验证

    mysqli_stmt_bind_param($stmt, 'sssis', $no, $name, $gender, $age, $class);
    if (mysqli_stmt_execute($stmt)) {
        $successCount++;
    } else {
        $errors[] = "第" . ($index + 1) . "行失败：" . mysqli_stmt_error($stmt);
    }
}
```

**Step 3**: 显示结果
```php
echo "成功添加 {$successCount} 名学生<br>";
foreach ($errors as $error) {
    echo "<span style='color:red'>{$error}</span><br>";
}
```

</details>

---

## 自我检测清单

- [ ] 理解学生成绩管理系统的数据库设计
- [ ] 能用phpMyAdmin创建数据库和数据表
- [ ] 了解常用MySQL数据类型（INT, VARCHAR, DATE等）
- [ ] 能用PHP连接MySQL数据库（四步骤）
- [ ] 理解预处理语句的作用（防止SQL注入）
- [ ] 能用INSERT语句添加单条数据
- [ ] 能从表单获取数据并插入数据库
- [ ] 能批量添加多条数据

---

## 常见错误速查表

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| Access denied | 用户名/密码错误 | 检查 `db_connect.php` 中的配置 |
| Unknown database | 数据库不存在 | 先用phpMyAdmin创建 `school` 数据库 |
| Duplicate entry | 学号重复（UNIQUE约束） | 检查是否已存在相同学号 |
| Table doesn't exist | 表未创建 | 执行建表SQL |
| 中文乱码 | 字符集不一致 | 设置 `utf8mb4` |
| SQL injection | 直接拼接用户输入 | 使用预处理语句 |
| headers already sent | 输出后才跳转 | `header()` 前不能有任何输出 |

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| 数据库 | 电子化的"登记册"，结构化存储数据 |
| 表 | 登记册中的一页，由行和列组成 |
| 主键 | 唯一标识每条记录的"身份证号" |
| phpMyAdmin | 浏览器里管理MySQL的可视化工具 |
| mysqli_connect() | PHP连接MySQL的"钥匙" |
| 预处理语句 | 先编译SQL模板再传参数，防止SQL注入 |
| INSERT | 向表中"新增"一行数据 |

---

*本课教材参考：第11章 学生成绩管理系统（数据库设计与添加数据）*
