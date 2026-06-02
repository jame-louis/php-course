---
title: 文件操作与上传
lectureNumber: 9
module: 表单与会话
description: 掌握PHP文件读写、目录操作和文件上传技术，构建安全的文件管理系统。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture08']
tags: ['PHP', '文件操作', '文件上传', '目录', 'GD库', '安全']
hasSlides: false
hasAssignment: true
draft: false
---

> 学习目标：掌握PHP文件读写和上传技术，通过**刻意练习**构建安全的文件管理系统。

---

## 学习路线图

```
第1关：文件基础 ──→ 第2关：文件读写 ──→ 第3关：目录操作 ──→ 第4关：文件上传
    ↓                  ↓                    ↓                  ↓
  打开/关闭          读取/写入              创建/遍历          表单配置
  文件指针           文件锁                 路径处理           安全验证
```

---

## 第1关：文件操作基础

### 1.1 为什么需要文件操作？

**场景举例**：

| 场景 | 解决方案 |
|------|----------|
| 网站访问计数器 | 将次数写入文件，每次访问+1 |
| 日志记录 | 将用户操作记录到日志文件 |
| 用户头像 | 保存用户上传的图片文件 |
| 数据导出 | 将数据库内容导出为CSV |

> 一句话理解：文件是数据的"仓库"，PHP是"仓库管理员"。

---

### 1.2 文件操作三步骤

```php
<?php
// 第1步：打开文件（获取"钥匙"）
$file = fopen("data.txt", "r");   // r = read（只读）

// 第2步：读写操作
$content = fread($file, filesize("data.txt"));  // 读取内容

// 第3步：关闭文件（归还"钥匙"）
fclose($file);
?>
```

**文件打开模式**：

| 模式 | 含义 | 说明 |
|------|------|------|
| `r` | 只读 | 文件指针在开头，文件必须存在 |
| `r+` | 读写 | 文件指针在开头，文件必须存在 |
| `w` | 只写 | 清空文件或创建新文件 |
| `w+` | 读写 | 清空文件或创建新文件 |
| `a` | 追加 | 在文件末尾写入，不存在则创建 |
| `a+` | 追加读写 | 在文件末尾写入，可读取 |

---

### 1.3 检查文件是否存在

在操作文件前，通常需要先检查文件是否存在：

```php
<?php
// 检查文件是否存在
if (file_exists("data.txt")) {
    echo "文件存在";
} else {
    echo "文件不存在";
}

// 检查文件是否可读
if (is_readable("data.txt")) {
    echo "文件可读";
}

// 检查文件是否可写
if (is_writable("data.txt")) {
    echo "文件可写";
}
?>
```

**常用文件检测函数**：

| 函数 | 作用 |
|------|------|
| `file_exists($file)` | 检查文件或目录是否存在 |
| `is_file($file)` | 判断是否为文件（不是目录） |
| `is_dir($path)` | 判断是否为目录 |
| `is_readable($file)` | 检查文件是否可读 |
| `is_writable($file)` | 检查文件是否可写 |

---

### 动手练 1.1

**目标**：编写一个函数，读取文本文件内容并返回。

```php
<?php
// 要求：
// 1. 函数名：readFileContent($filename)
// 2. 检查文件是否存在
// 3. 返回文件内容，失败返回false

// 你的代码：

?>
```

<details>
<summary>参考答案</summary>

```php
<?php
function readFileContent($filename) {
    // 检查文件是否存在
    if (!file_exists($filename)) {
        return false;
    }

    // 打开文件
    $file = fopen($filename, "r");
    if (!$file) {
        return false;
    }

    // 读取内容
    $content = fread($file, filesize($filename));

    // 关闭文件
    fclose($file);

    return $content;
}

// 测试
$content = readFileContent("test.txt");
if ($content !== false) {
    echo $content;
} else {
    echo "读取失败";
}
?>
```
</details>

---

### 1.4 简便方法：file_get_contents()

对于简单的读取操作，PHP提供了更简便的方法：

```php
<?php
// 传统方法（需要3步）
$file = fopen("data.txt", "r");
$content = fread($file, filesize("data.txt"));
fclose($file);

// 简便方法（1步搞定）
$content = file_get_contents("data.txt");

// 处理不存在的情况
$content = @file_get_contents("data.txt");  // @抑制错误
if ($content === false) {
    echo "文件不存在或无法读取";
}
?>
```

> 注意：`file_get_contents()`适合小文件，大文件会占用大量内存。

---

### 1.5 写入文件

```php
<?php
// 方法1：传统方法
$file = fopen("log.txt", "a");  // a = 追加模式
fwrite($file, "用户登录：张三\n");
fclose($file);

// 方法2：简便方法（覆盖写入）
file_put_contents("data.txt", "新的内容");

// 方法3：简便方法（追加写入）
file_put_contents("log.txt", "新的日志\n", FILE_APPEND);
?>
```

### 动手练 1.2

**目标**：创建一个简单的访问计数器。

**要求**：
1. 读取count.txt中的数字
2. 数字+1
3. 写回文件
4. 显示"你是第X位访客"

<details>
<summary>参考答案</summary>

```php
<?php
$filename = "count.txt";

// 读取当前计数
if (file_exists($filename)) {
    $count = (int)file_get_contents($filename);
} else {
    $count = 0;
}

// 增加计数
$count++;

// 写回文件
file_put_contents($filename, $count);

// 显示结果
echo "你是第 {$count} 位访客！";
?>
```
</details>

---

## 第2关：目录操作

### 2.1 目录基础操作

```php
<?php
// 创建目录
mkdir("uploads");           // 创建uploads文件夹
mkdir("uploads/2024", 0777, true);  // 递归创建多级目录

// 检查是否为目录
if (is_dir("uploads")) {
    echo "uploads是目录";
}

// 删除空目录
rmdir("empty_folder");      // 只能删除空目录

// 获取当前工作目录
echo getcwd();              // 当前PHP运行的目录

// 切换目录
chdir("uploads");           // 进入uploads目录
?>
```

---

### 2.2 遍历目录

```php
<?php
// 方法1：使用opendir（传统方法）
$dir = opendir("uploads");
while (($file = readdir($dir)) !== false) {
    if ($file != "." && $file != "..") {  // 排除.和..
        echo $file . "<br>";
    }
}
closedir($dir);

// 方法2：使用scandir（简便方法）
$files = scandir("uploads");
foreach ($files as $file) {
    if ($file != "." && $file != "..") {
        echo $file . "<br>";
    }
}

// 方法3：使用glob（带通配符）
$images = glob("uploads/*.jpg");  // 获取所有jpg文件
foreach ($images as $img) {
    echo $img . "<br>";
}
?>
```

---

### 动手练 2.1

**目标**：编写函数，统计目录中文件数量。

```php
<?php
// 要求：
// 1. 函数名：countFiles($directory)
// 2. 返回文件数量（不包括.和..）
// 3. 如果目录不存在返回0

// 你的代码：

?>
```

<details>
<summary>参考答案</summary>

```php
<?php
function countFiles($directory) {
    // 检查目录是否存在
    if (!is_dir($directory)) {
        return 0;
    }

    // 获取所有文件
    $files = scandir($directory);

    // 计数（排除.和..）
    $count = 0;
    foreach ($files as $file) {
        if ($file != "." && $file != "..") {
            $count++;
        }
    }

    return $count;
}

// 测试
echo "uploads目录有 " . countFiles("uploads") . " 个文件";
?>
```
</details>

---

## 第3关：文件上传

### 3.1 HTML表单配置

文件上传需要特殊的表单配置：

```html
<!-- 关键：enctype="multipart/form-data" -->
<form action="upload.php" method="POST" enctype="multipart/form-data">
    <!-- 关键：type="file" -->
    <input type="file" name="avatar" accept="image/*">
    <button type="submit">上传</button>
</form>
```

**关键属性说明**：

| 属性 | 作用 |
|------|------|
| `enctype="multipart/form-data"` | 必须！告诉浏览器以二进制形式发送文件 |
| `type="file"` | 文件选择框 |
| `accept="image/*"` | 限制可选文件类型（可选） |

---

### 3.2 PHP接收上传文件

上传的文件保存在 `$_FILES` 超全局数组中：

```php
<?php
// 查看上传文件的信息
print_r($_FILES);

// 输出示例：
// Array (
//     [avatar] => Array (
//         [name] => photo.jpg          原始文件名
//         [type] => image/jpeg          MIME类型
//         [tmp_name] => /tmp/phpXX.tmp  临时文件路径
//         [error] => 0                  错误码（0=成功）
//         [size] => 123456              文件大小（字节）
//     )
// )
?>
```

**错误码说明**：

| 错误码 | 常量 | 含义 |
|--------|------|------|
| 0 | `UPLOAD_ERR_OK` | 上传成功 |
| 1 | `UPLOAD_ERR_INI_SIZE` | 超过php.ini限制 |
| 2 | `UPLOAD_ERR_FORM_SIZE` | 超过表单限制 |
| 3 | `UPLOAD_ERR_PARTIAL` | 部分上传 |
| 4 | `UPLOAD_ERR_NO_FILE` | 没有文件上传 |

---

### 3.3 基本的文件上传处理

```php
<?php
// upload.php

// 检查是否有文件上传
if (!isset($_FILES['avatar'])) {
    die("没有选择文件");
}

$file = $_FILES['avatar'];

// 检查上传是否成功
if ($file['error'] !== UPLOAD_ERR_OK) {
    die("上传失败，错误码：" . $file['error']);
}

// 移动文件到目标位置
// 从临时目录移动到uploads目录
$destination = "uploads/" . $file['name'];

if (move_uploaded_file($file['tmp_name'], $destination)) {
    echo "上传成功！文件保存在：{$destination}";
} else {
    echo "移动文件失败";
}
?>
```

> 重要：必须使用 `move_uploaded_file()`，不能直接用 `copy()` 或 `rename()`，前者会检查文件是否真的是上传的文件（安全性）。

---

### 动手练 3.1

**目标**：创建完整的文件上传表单和处理程序。

**要求**：
1. HTML表单（upload_form.html）：允许选择任意文件
2. PHP处理（upload.php）：接收并保存到uploads目录
3. 显示上传结果（成功/失败）

<details>
<summary>参考答案</summary>

**upload_form.html**：
```html
<!DOCTYPE html>
<html>
<head>
    <title>文件上传</title>
</head>
<body>
    <h2>上传文件</h2>
    <form action="upload.php" method="POST" enctype="multipart/form-data">
        <input type="file" name="myfile">
        <button type="submit">上传</button>
    </form>
</body>
</html>
```

**upload.php**：
```php
<?php
// 检查是否有文件上传
if (!isset($_FILES['myfile']) || $_FILES['myfile']['error'] === UPLOAD_ERR_NO_FILE) {
    die("请选择文件");
}

$file = $_FILES['myfile'];

// 检查错误
if ($file['error'] !== UPLOAD_ERR_OK) {
    die("上传失败，错误码：" . $file['error']);
}

// 确保uploads目录存在
if (!is_dir("uploads")) {
    mkdir("uploads");
}

// 移动文件
$destination = "uploads/" . basename($file['name']);

if (move_uploaded_file($file['tmp_name'], $destination)) {
    echo "上传成功！<br>";
    echo "文件名：" . htmlspecialchars($file['name']) . "<br>";
    echo "文件大小：" . round($file['size'] / 1024, 2) . " KB<br>";
    echo "文件类型：" . $file['type'];
} else {
    echo "上传失败";
}
?>
```
</details>

---

## 第4关：文件上传安全

### 4.1 为什么需要安全验证？

**危险场景**：
- 用户上传PHP文件，访问后执行恶意代码
- 上传超大文件导致服务器磁盘满
- 上传可执行文件（.exe）包含病毒

### 4.2 安全检查清单

```php
<?php
function safeUpload($file, $allowedTypes, $maxSize, $uploadDir) {
    // 1. 检查错误码
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'message' => '上传失败'];
    }

    // 2. 检查文件大小
    if ($file['size'] > $maxSize) {
        return ['success' => false, 'message' => '文件太大'];
    }

    // 3. 检查文件类型（MIME）
    if (!in_array($file['type'], $allowedTypes)) {
        return ['success' => false, 'message' => '不允许的文件类型'];
    }

    // 4. 检查扩展名
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    $allowedExts = ['jpg', 'jpeg', 'png', 'gif'];
    if (!in_array($ext, $allowedExts)) {
        return ['success' => false, 'message' => '不允许的扩展名'];
    }

    // 5. 生成安全的文件名（防止覆盖和特殊字符）
    $newName = date('YmdHis') . '_' . uniqid() . '.' . $ext;
    $destination = $uploadDir . '/' . $newName;

    // 6. 移动文件
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return ['success' => true, 'path' => $destination, 'name' => $newName];
    }

    return ['success' => false, 'message' => '保存失败'];
}

// 使用示例
$result = safeUpload(
    $_FILES['avatar'],
    ['image/jpeg', 'image/png', 'image/gif'],  // 允许的MIME类型
    2 * 1024 * 1024,                           // 最大2MB
    'uploads'                                  // 上传目录
);

if ($result['success']) {
    echo "上传成功：" . $result['name'];
} else {
    echo "错误：" . $result['message'];
}
?>
```

---

### 4.3 文件上传完整示例（头像上传）

```php
<?php
// upload_avatar.php

function uploadAvatar($file) {
    // 配置
    $config = [
        'max_size' => 2 * 1024 * 1024,  // 2MB
        'allowed_types' => ['image/jpeg', 'image/png', 'image/gif'],
        'allowed_exts' => ['jpg', 'jpeg', 'png', 'gif'],
        'upload_dir' => 'uploads/avatars/'
    ];

    // 创建目录
    if (!is_dir($config['upload_dir'])) {
        mkdir($config['upload_dir'], 0755, true);
    }

    // 检查上传
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['error' => '上传失败：' . $file['error']];
    }

    // 检查大小
    if ($file['size'] > $config['max_size']) {
        return ['error' => '文件太大，最大2MB'];
    }

    // 获取扩展名
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));

    // 检查扩展名
    if (!in_array($ext, $config['allowed_exts'])) {
        return ['error' => '只允许jpg、png、gif格式'];
    }

    // 检查MIME类型（更可靠）
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $mime = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);

    if (!in_array($mime, $config['allowed_types'])) {
        return ['error' => '文件类型不合法'];
    }

    // 生成新文件名
    $newName = uniqid('avatar_') . '.' . $ext;
    $destination = $config['upload_dir'] . $newName;

    // 移动文件
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return [
            'success' => true,
            'path' => $destination,
            'url' => $destination
        ];
    }

    return ['error' => '保存失败'];
}

// 处理上传
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = uploadAvatar($_FILES['avatar'] ?? []);

    if (isset($result['success'])) {
        echo "<h3>上传成功</h3>";
        echo "<img src='{$result['url']}' style='max-width:200px'><br>";
        echo "<a href='avatar_form.html'>再传一张</a>";
    } else {
        echo "<h3>{$result['error']}</h3>";
        echo "<a href='avatar_form.html'>返回</a>";
    }
}
?>
```

---

### 动手练 4.1

**目标**：编写安全的文档上传函数。

**要求**：
1. 只允许上传doc、docx、pdf文件
2. 最大限制5MB
3. 文件名使用当前时间+随机数
4. 返回包含success、message、path的数组

<details>
<summary>参考答案</summary>

```php
<?php
function uploadDocument($file) {
    $config = [
        'max_size' => 5 * 1024 * 1024,  // 5MB
        'allowed_exts' => ['doc', 'docx', 'pdf'],
        'allowed_types' => [
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/pdf'
        ],
        'upload_dir' => 'uploads/documents/'
    ];

    // 检查结果
    if ($file['error'] !== UPLOAD_ERR_OK) {
        return ['success' => false, 'message' => '上传失败'];
    }

    // 检查大小
    if ($file['size'] > $config['max_size']) {
        return ['success' => false, 'message' => '文件超过5MB限制'];
    }

    // 检查扩展名
    $ext = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    if (!in_array($ext, $config['allowed_exts'])) {
        return ['success' => false, 'message' => '只允许doc、docx、pdf格式'];
    }

    // 创建目录
    if (!is_dir($config['upload_dir'])) {
        mkdir($config['upload_dir'], 0755, true);
    }

    // 生成文件名：20240115_123456_abc123.pdf
    $newName = date('Ymd') . '_' . time() . '_' . uniqid() . '.' . $ext;
    $destination = $config['upload_dir'] . $newName;

    // 移动文件
    if (move_uploaded_file($file['tmp_name'], $destination)) {
        return [
            'success' => true,
            'message' => '上传成功',
            'path' => $destination
        ];
    }

    return ['success' => false, 'message' => '保存失败'];
}

// 测试
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $result = uploadDocument($_FILES['document']);
    print_r($result);
}
?>
```
</details>

---

## 综合挑战（刻意练习核心）

### 挑战1：图片管理器

**需求**：创建一个简单的图片管理页面

**功能**：
1. 显示uploads/images目录中的所有图片（缩略图列表）
2. 提供上传新图片的表单
3. 点击图片可以删除
4. 显示图片数量和总大小

<details>
<summary>分步提示</summary>

**第1步**：列出图片
```php
$images = glob("uploads/images/*.{jpg,png,gif}", GLOB_BRACE);
foreach ($images as $img) {
    echo "<img src='$img' style='width:100px'>";
}
```

**第2步**：计算总大小
```php
$totalSize = 0;
foreach ($images as $img) {
    $totalSize += filesize($img);
}
echo "总大小：" . round($totalSize / 1024 / 1024, 2) . " MB";
```

**第3步**：删除功能
```php
// delete.php
if (isset($_GET['file'])) {
    $file = $_GET['file'];
    // 安全检查：确保文件在uploads/images目录
    if (strpos($file, 'uploads/images/') === 0 && file_exists($file)) {
        unlink($file);
    }
}
```
</details>

---

### 挑战2：带预览的多文件上传

**需求**：创建支持多文件上传的相册系统

**功能**：
1. 一个表单可以选择多个文件（按住Ctrl多选）
2. 批量上传，显示每个文件的上传结果
3. 生成缩略图（使用GD库）
4. 记录上传日志到文件

**HTML关键**：
```html
<input type="file" name="photos[]" multiple accept="image/*">
```

**PHP处理**：
```php
<?php
// 多文件上传时，$_FILES结构不同
foreach ($_FILES['photos']['tmp_name'] as $key => $tmpName) {
    $file = [
        'name' => $_FILES['photos']['name'][$key],
        'type' => $_FILES['photos']['type'][$key],
        'tmp_name' => $tmpName,
        'error' => $_FILES['photos']['error'][$key],
        'size' => $_FILES['photos']['size'][$key]
    ];
    // 处理每个文件...
}
?>
```

---

## 自我检测清单

完成以下任务，检验是否掌握本课内容：

- [ ] 能使用`fopen`/`fclose`打开和关闭文件
- [ ] 能使用`fread`/`fwrite`读写文件内容
- [ ] 会使用`file_get_contents`/`file_put_contents`简便方法
- [ ] 能使用`mkdir`创建目录
- [ ] 能使用`scandir`或`glob`遍历目录
- [ ] 了解文件上传表单的`enctype`属性
- [ ] 能使用`$_FILES`接收上传的文件
- [ ] 会使用`move_uploaded_file`移动上传文件
- [ ] 能进行文件大小、类型、扩展名的安全检查
- [ ] 能编写安全的文件上传处理程序

---

## 常见错误速查表

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| 上传后`$_FILES`为空 | 表单缺少`enctype` | 添加`enctype="multipart/form-data"` |
| `move_uploaded_file`失败 | 目标目录不存在或无权限 | 创建目录并设置权限 |
| 大文件上传失败 | 超过php.ini限制 | 修改`upload_max_filesize` |
| 文件被覆盖 | 使用原始文件名 | 生成唯一文件名 |
| 上传PHP文件执行 | 没有检查扩展名 | 白名单验证扩展名和MIME类型 |
| 路径遍历攻击 | 文件名包含`../` | 使用`basename()`过滤 |

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| `fopen` | 打开文件的"钥匙"，获取文件指针 |
| `fread`/`fwrite` | 读/写文件内容的工具 |
| `file_get_contents` | 一键读取整个文件（简便方法） |
| `move_uploaded_file` | 将上传的临时文件移到正式位置 |
| `$_FILES` | 存储上传文件信息的"收纳盒" |
| `enctype` | 告诉浏览器以二进制发送文件 |
| `basename` | 从路径中提取文件名（防路径遍历） |
| `pathinfo` | 分析文件名，获取扩展名 |
| `mkdir` | 创建新文件夹 |
| `glob` | 按模式查找文件（如`*.jpg`） |

---

*本课教材参考：第9章 9.3.4节 (文件上传)*
