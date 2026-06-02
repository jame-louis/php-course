---
title: 函数（二）——刻意练习版
lectureNumber: 6
module: 函数与类
description: 通过刻意练习掌握PHP自定义函数，包括参数类型、返回值、作用域、字符串函数和图像函数。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture05']
tags: ['PHP', '函数', '参数', '返回值', '作用域', '字符串', 'GD库']
hasSlides: true 
slidevUrl: https://jame-louis.github.io/php/slidev/lecture06
hasAssignment: true
draft: false
---

> 学习目标：通过**刻意练习**掌握 PHP 自定义函数。每学完一个小节，立即完成对应的「动手练」环节。

---

## 学习路线图

```
第1关：函数基础 ──→ 第2关：参数类型 ──→ 第3关：返回值 ──→ 第4关：作用域
    ↓                  ↓                  ↓                ↓
  无参数函数       默认参数练习        单一返回值       局部/全局变量
  有参数函数       可变参数练习        多值返回         静态变量
```

---

## 第1关：函数基础

### 1.1 理解函数（类比思维）

函数就像**洗衣机**：
- **输入**：脏衣服（参数）
- **处理**：内部清洗（函数体）
- **输出**：干净衣服（返回值）

```php
<?php
// 定义一个"加法机器"函数
function add($a, $b) {      // 输入两个数
    $result = $a + $b;      // 内部计算
    return $result;         // 输出结果
}

// 使用函数
$sum = add(3, 5);           // 把3和5放入"机器"
echo $sum;                  // 输出：8
?>
```

### 动手练 1.1

**目标**：编写一个 `sayHello` 函数，输出 "你好，世界！"

<details>
<summary>参考答案</summary>

```php
<?php
function sayHello() {
    echo "你好，世界！";
}

sayHello();  // 调用函数
?>
```
</details>

---

### 1.2 函数命名规则

| 规则 | 正确 | 错误 |
|------|------|------|
| 字母或下划线开头 | `getName`, `_private` | `123abc` |
| 只能包含字母、数字、下划线 | `user_name`, `calcTotal2` | `my-func` |
| 不区分大小写 | `Add()` 和 `add()` 是同一个 | - |

> 命名建议：使用小驼峰（`getUserName`）或下划线（`get_user_name`）风格，保持一致。

### 动手练 1.2

判断以下函数名是否合法：
1. `function getData()` / 
2. `function 2fast()` / 
3. `function _internal()` / 
4. `function my func()` / 

<details>
<summary>答案</summary>

1.  合法
2.  非法（数字开头）
3.  合法（下划线开头）
4.  非法（包含空格）
</details>

---

## 第2关：参数类型（循序渐进）

### 2.1 必填参数（基础版）

```php
<?php
// 两个参数都必须提供
function greet($name, $greeting) {
    echo "{$greeting}，{$name}！\n";
}

greet("张三", "早上好");   // 输出：早上好，张三！
?>
```

### 动手练 2.1

编写 `calculateArea($width, $height)` 函数，计算并输出矩形面积。

<details>
<summary>参考答案</summary>

```php
<?php
function calculateArea($width, $height) {
    $area = $width * $height;
    echo "矩形面积：{$area}\n";
}

calculateArea(5, 3);   // 输出：矩形面积：15
calculateArea(10, 4);  // 输出：矩形面积：40
?>
```
</details>

---

### 2.2 默认参数（进阶版）

```php
<?php
// 默认参数必须在右侧
function order($product, $quantity = 1, $price = 10) {
    $total = $quantity * $price;
    echo "{$product} x {$quantity} = ¥{$total}\n";
}

order("苹果", 3, 5);   // 苹果 x 3 = ¥15（全部指定）
order("香蕉", 2);      // 香蕉 x 2 = ¥20（使用默认价格10）
order("橙子");          // 橙子 x 1 = ¥10（使用默认数量和价格）
?>
```

> 易错点：`function demo($a = 1, $b)` 是**错误**的！默认参数必须在最右边。

### 动手练 2.2

编写 `sendEmail($to, $subject = "无主题", $priority = "普通")` 函数。

测试用例：
- `sendEmail("user@example.com")`
- `sendEmail("boss@example.com", "紧急通知")`
- `sendEmail("test@example.com", "测试", "高")`

<details>
<summary>参考答案</summary>

```php
<?php
function sendEmail($to, $subject = "无主题", $priority = "普通") {
    echo "收件人：{$to}\n";
    echo "主题：{$subject}\n";
    echo "优先级：{$priority}\n";
    echo "---\n";
}

sendEmail("user@example.com");
// 收件人：user@example.com
// 主题：无主题
// 优先级：普通

sendEmail("boss@example.com", "紧急通知");
// 收件人：boss@example.com
// 主题：紧急通知
// 优先级：普通

sendEmail("test@example.com", "测试", "高");
// 收件人：test@example.com
// 主题：测试
// 优先级：高
?>
```
</details>

---

### 2.3 可变参数（高级版）

```php
<?php
// 使用 ... 接收任意数量的参数
function sum(...$numbers) {
    $total = 0;
    foreach ($numbers as $num) {
        $total += $num;
    }
    return $total;
}

echo sum(1, 2, 3);     // 6
echo sum(10, 20);      // 30
echo sum();            // 0

// 数组展开为参数
$nums = [5, 10, 15];
echo sum(...$nums);    // 30
?>
```

### 动手练 2.3

编写 `average(...$scores)` 函数，计算任意数量成绩的平均分。

<details>
<summary>参考答案</summary>

```php
<?php
function average(...$scores) {
    if (count($scores) === 0) {
        return 0;
    }
    $total = array_sum($scores);
    return $total / count($scores);
}

echo average(80, 90, 100);     // 90
echo average(60, 70);          // 65
echo average();                // 0
?>
```
</details>

---

### 2.4 引用传递（难点突破）

**值传递 vs 引用传递**

```php
<?php
// ========== 值传递（默认）==========
function addTen($num) {
    $num += 10;     // 修改的是副本
    return $num;
}

$x = 5;
echo addTen($x);    // 15
echo $x;            // 5（原变量不变）

// ========== 引用传递 ==========
function addTenRef(&$num) {   // & 符号表示引用
    $num += 10;               // 修改的是原变量
}

$y = 5;
addTenRef($y);
echo $y;            // 15（原变量被修改）
?>
```

### 动手练 2.4

编写 `doubleValues(&$a, &$b)` 函数，将两个变量的值都变为原来的2倍。

<details>
<summary>参考答案</summary>

```php
<?php
function doubleValues(&$a, &$b) {
    $a = $a * 2;
    $b = $b * 2;
}

$x = 3;
$y = 5;
doubleValues($x, $y);
echo "x={$x}, y={$y}";   // 输出：x=6, y=10
?>
```
</details>

---

## 第3关：返回值

### 3.1 基本返回

```php
<?php
// return 会立即结束函数
function checkAge($age) {
    if ($age < 0) {
        return "年龄不能为负数";
    }
    if ($age < 18) {
        return "未成年";
    }
    return "成年";
}

echo checkAge(-5);   // 年龄不能为负数
echo checkAge(15);   // 未成年
echo checkAge(20);   // 成年
?>
```

### 动手练 3.1

编写 `getGrade($score)` 函数，返回成绩等级：
- 90-100：优秀
- 80-89：良好
- 60-79：及格
- 0-59：不及格
- 其他：无效分数

<details>
<summary>参考答案</summary>

```php
<?php
function getGrade($score) {
    if ($score < 0 || $score > 100) {
        return "无效分数";
    }
    if ($score >= 90) {
        return "优秀";
    }
    if ($score >= 80) {
        return "良好";
    }
    if ($score >= 60) {
        return "及格";
    }
    return "不及格";
}

// 测试
echo getGrade(95);   // 优秀
echo getGrade(85);   // 良好
echo getGrade(70);   // 及格
echo getGrade(50);   // 不及格
echo getGrade(150);  // 无效分数
?>
```
</details>

---

### 3.2 返回多个值

```php
<?php
// 使用数组返回多个值
function calculate($a, $b) {
    return [
        '和' => $a + $b,
        '差' => $a - $b,
        '积' => $a * $b,
        '商' => $b != 0 ? $a / $b : null
    ];
}

$result = calculate(10, 3);
echo "和：" . $result['和'];     // 13

// 使用数组解构（PHP 7.1+）
function getUser() {
    return ["张三", 25, "zhangsan@example.com"];
}

[$name, $age, $email] = getUser();
echo "{$name}，{$age}岁";   // 张三，25岁
?>
```

### 动手练 3.2

编写 `analyzeString($str)` 函数，返回数组包含：
- `length`：字符串长度
- `uppercase`：转大写后的字符串
- `first_char`：首字符

<details>
<summary>参考答案</summary>

```php
<?php
function analyzeString($str) {
    return [
        'length' => strlen($str),
        'uppercase' => strtoupper($str),
        'first_char' => $str[0] ?? ''
    ];
}

$result = analyzeString("Hello");
echo "长度：" . $result['length'];        // 5
echo "大写：" . $result['uppercase'];    // HELLO
echo "首字符：" . $result['first_char'];  // H
?>
```
</details>

---

## 第4关：变量作用域

### 4.1 局部变量与全局变量

```php
<?php
$globalVar = "我是全局变量";

function demo() {
    // 函数内默认无法访问全局变量
    $localVar = "我是局部变量";  // 只在函数内有效

    // 使用 global 关键字访问全局变量
    global $globalVar;
    echo $globalVar;  // 输出：我是全局变量
}

demo();
echo $localVar;  // 报错！局部变量在函数外不可用
?>
```

### 4.2 静态变量

```php
<?php
// 静态变量：函数执行完后不销毁
function counter() {
    static $count = 0;  // 只初始化一次
    $count++;
    echo "第 {$count} 次调用\n";
}

counter();  // 第 1 次调用
counter();  // 第 2 次调用
counter();  // 第 3 次调用

// 对比普通变量
function normalCounter() {
    $count = 0;  // 每次调用都重新初始化
    $count++;
    echo "第 {$count} 次调用\n";
}

normalCounter();  // 第 1 次调用
normalCounter();  // 第 1 次调用（每次都重置）
?>
```

### 动手练 4

编写 `visitCount()` 函数，使用静态变量统计页面访问次数（每次调用计数+1）。

<details>
<summary>参考答案</summary>

```php
<?php
function visitCount() {
    static $count = 0;
    $count++;
    return $count;
}

echo visitCount();  // 1
echo visitCount();  // 2
echo visitCount();  // 3
?>
```
</details>

---

## 第5关：字符串函数刻意练习

### 5.1 基础操作速查表

| 函数 | 作用 | 示例 |
|------|------|------|
| `strlen($str)` | 获取长度 | `strlen("abc")` → `3` |
| `mb_strlen($str)` | 获取中文长度 | `mb_strlen("你好")` → `2` |
| `strpos($str, "a")` | 查找位置 | `strpos("abc", "b")` → `1` |
| `str_replace("a", "b", $str)` | 替换 | `str_replace("a", "b", "abc")` → `"bbc"` |

### 动手练 5.1

使用字符串函数完成以下任务：

```php
<?php
$str = "The quick brown fox jumps over the lazy dog";

// 任务1：将 fox 替换为 cat

// 任务2：提取前9个字符（The quick）

// 任务3：查找 dog 的位置
?>
```

<details>
<summary>参考答案</summary>

```php
<?php
$str = "The quick brown fox jumps over the lazy dog";

// 任务1
$result1 = str_replace("fox", "cat", $str);
echo $result1 . "\n";

// 任务2
$result2 = substr($str, 0, 9);
echo $result2 . "\n";

// 任务3
$pos = strpos($str, "dog");
echo "dog 的位置：{$pos}\n";
?>
```
</details>

---

### 5.2 字符串分割与拼接

```php
<?php
// 分割字符串
$data = "张三,25,北京";
$arr = explode(",", $data);
// 结果：["张三", "25", "北京"]

// 限制分割次数
$info = "a|b|c|d";
$result = explode("|", $info, 2);
// 结果：["a", "b|c|d"]

// 数组拼接成字符串
$fruits = ["apple", "banana", "orange"];
$str = implode(", ", $fruits);
// 结果："apple, banana, orange"
?>
```

### 动手练 5.2

解析路径 `"/home/user/documents/file.txt"`，提取：
1. 文件名（`file.txt`）
2. 扩展名（`txt`）
3. 目录路径（`/home/user/documents`）

<details>
<summary>参考答案</summary>

```php
<?php
$path = "/home/user/documents/file.txt";

// 方法1：使用 pathinfo
$info = pathinfo($path);
echo "文件名：" . $info['basename'] . "\n";  // file.txt
echo "扩展名：" . $info['extension'] . "\n"; // txt
echo "目录：" . $info['dirname'] . "\n";     // /home/user/documents

// 方法2：使用字符串函数
$parts = explode("/", $path);
$filename = end($parts);
echo "文件名：{$filename}\n";

$extParts = explode(".", $filename);
$ext = end($extParts);
echo "扩展名：{$ext}\n";
?>
```
</details>

---

## 第6关：图像函数入门

### 6.1 创建图像三步曲

```php
<?php
// 步骤1：创建画布
$img = imagecreatetruecolor(400, 300);

// 步骤2：定义颜色并绘制
$white = imagecolorallocate($img, 255, 255, 255);
$red = imagecolorallocate($img, 255, 0, 0);

imagefill($img, 0, 0, $white);                    // 填充背景
imagestring($img, 5, 50, 50, "Hello!", $red);     // 绘制文字

// 步骤3：输出并销毁
header('Content-Type: image/png');
imagepng($img);
imagedestroy($img);
?>
```

### 6.2 基本图形绘制

```php
<?php
$img = imagecreatetruecolor(400, 300);
$white = imagecolorallocate($img, 255, 255, 255);
$red = imagecolorallocate($img, 255, 0, 0);
$blue = imagecolorallocate($img, 0, 0, 255);

imagefill($img, 0, 0, $white);

// 绘制直线
imageline($img, 0, 0, 400, 300, $red);

// 绘制矩形
imagerectangle($img, 50, 50, 150, 150, $blue);      // 空心
imagefilledrectangle($img, 200, 50, 300, 150, $red); // 填充

// 绘制圆
imageellipse($img, 200, 200, 100, 100, $blue);

header('Content-Type: image/png');
imagepng($img);
imagedestroy($img);
?>
```

### 动手练 6

编写 `drawFlag($width, $height)` 函数，绘制一个简单的五星红旗背景（红色背景 + 黄色五角星示意）。

<details>
<summary>参考答案</summary>

```php
<?php
function drawFlag($width = 600, $height = 400) {
    $img = imagecreatetruecolor($width, $height);

    // 定义颜色
    $red = imagecolorallocate($img, 222, 41, 16);      // 国旗红
    $yellow = imagecolorallocate($img, 255, 222, 0);    // 五角星黄

    // 填充红色背景
    imagefill($img, 0, 0, $red);

    // 绘制大五角星（用圆形代替示意）
    $starX = $width * 0.15;
    $starY = $height * 0.25;
    $starSize = $height * 0.15;
    imagefilledellipse($img, $starX, $starY, $starSize, $starSize, $yellow);

    // 输出
    header('Content-Type: image/png');
    imagepng($img);
    imagedestroy($img);
}

drawFlag();
?>
```
</details>

---

## 综合挑战（刻意练习核心）

### 挑战1：文件扩展名检查器

**需求**：
```php
function checkExtension($filename, $allowed) {
    // 检查 $filename 的扩展名是否在 $allowed 数组中
    // 不区分大小写
    // 返回 true 或 false
}
```

**测试用例**：
```php
var_dump(checkExtension("photo.jpg", ["jpg", "png"]));     // true
var_dump(checkExtension("doc.PDF", ["pdf", "doc"]));        // true
var_dump(checkExtension("virus.exe", ["jpg", "png"]));     // false
var_dump(checkExtension("README", ["txt"]));               // false
```

<details>
<summary>分步提示（建议每步自己先尝试）</summary>

**第1步**：提取扩展名
```php
$ext = pathinfo($filename, PATHINFO_EXTENSION);
```

**第2步**：处理无扩展名的情况
```php
if (empty($ext)) {
    return false;
}
```

**第3步**：统一转为小写比较
```php
$ext = strtolower($ext);
$allowedLower = array_map('strtolower', $allowed);
return in_array($ext, $allowedLower);
```

**完整答案**：
```php
<?php
function checkExtension($filename, $allowed) {
    if (empty($filename)) {
        return false;
    }

    $ext = pathinfo($filename, PATHINFO_EXTENSION);

    if (empty($ext)) {
        return false;
    }

    $ext = strtolower($ext);
    $allowedLower = array_map('strtolower', $allowed);

    return in_array($ext, $allowedLower);
}
?>
```
</details>

---

### 挑战2：表格生成器

**需求**：编写 `printTable($rows, $cols, $options = [])` 函数

**渐进式实现路径**：

**阶段1**：实现基础表格（先完成最简单的）
```php
printTable(3, 3);  // 输出 3x3 的 HTML 表格
```

**阶段2**：添加选项支持
```php
printTable(3, 3, ['header' => false]);  // 无表头
printTable(3, 3, ['border' => 2]);      // 边框加粗
```

**阶段3**：添加隔行变色

<details>
<summary>参考答案</summary>

```php
<?php
function printTable($rows, $cols, $options = []) {
    // 默认配置
    $defaults = [
        'border' => 1,
        'width' => '100%',
        'header' => true,
        'cellpadding' => 5,
        'header_bg' => '#4CAF50',
        'even_bg' => '#f2f2f2'
    ];
    $opt = array_merge($defaults, $options);

    $tableId = 'table_' . uniqid();
    ?>
    <style>
        #<?php echo $tableId; ?> {
            border-collapse: collapse;
            width: <?php echo $opt['width']; ?>;
        }
        #<?php echo $tableId; ?> th, #<?php echo $tableId; ?> td {
            border: <?php echo $opt['border']; ?>px solid #ddd;
            padding: <?php echo $opt['cellpadding']; ?>px;
            text-align: center;
        }
        #<?php echo $tableId; ?> th {
            background-color: <?php echo $opt['header_bg']; ?>;
            color: white;
        }
        #<?php echo $tableId; ?> tr:nth-child(even) {
            background-color: <?php echo $opt['even_bg']; ?>;
        }
    </style>
    <table id="<?php echo $tableId; ?>">
        <?php if ($opt['header']): ?>
        <thead>
            <tr>
                <?php for ($j = 1; $j <= $cols; $j++): ?>
                <th>列 <?php echo $j; ?></th>
                <?php endfor; ?>
            </tr>
        </thead>
        <?php endif; ?>
        <tbody>
            <?php for ($i = 1; $i <= $rows; $i++): ?>
            <tr>
                <?php for ($j = 1; $j <= $cols; $j++): ?>
                <td>第<?php echo $i; ?>行第<?php echo $j; ?>列</td>
                <?php endfor; ?>
            </tr>
            <?php endfor; ?>
        </tbody>
    </table>
    <?php
}

// 测试
printTable(4, 4);
printTable(3, 3, ['header' => false, 'header_bg' => '#2196F3']);
?>
```
</details>

---

## 自我检测清单

完成以下任务，检验是否掌握本课内容：

- [ ] 能独立编写带参数的函数
- [ ] 理解默认参数的位置要求（必须在右侧）
- [ ] 能使用 `return` 返回结果
- [ ] 能使用数组返回多个值
- [ ] 理解 `global` 和 `static` 的区别
- [ ] 能使用 `strpos`、`substr`、`str_replace` 处理字符串
- [ ] 能使用 `explode` 和 `implode` 进行字符串和数组转换
- [ ] 能创建简单的图像并绘制基本图形

---

## 课后练习（进阶）

1. **回文判断**：`isPalindrome($str)` 判断字符串是否正读反读相同
2. **密码生成器**：`generatePassword($length)` 生成随机密码
3. **柱状图**：使用 GD 库绘制学生成绩柱状图

---

## 小结

| 知识点 | 核心要点 |
|--------|----------|
| 函数定义 | `function 函数名(参数) { return 值; }` |
| 参数类型 | 必填 → 默认 → 可变 → 引用 |
| 返回值 | `return` 立即结束函数；数组可返回多值 |
| 作用域 | `global` 访问全局变量；`static` 保持状态 |
| 字符串 | `strlen`, `strpos`, `substr`, `str_replace`, `explode/implode` |
| 图像 | `imagecreatetruecolor` → `imagecolorallocate` → 绘制 → `imagepng` |
