---
title: 数组
lectureNumber: 4
module: '基础入门'
description: '学习PHP数组的创建方式、遍历方法、常用数组函数，以及二维数组和数组与字符串的转换操作。'
duration: '90分钟'
difficulty: 'beginner'
prerequisites: ['lecture03']
tags: ['数组', '数据结构', '字符串处理']
hasSlides: true
hasAssignment: false
draft: false
---

# 数组

## 创建数组

### 1. 使用 `array()` 函数创建

```php
<?php
// 索引数组（数字键名）
$fruits = array("苹果", "香蕉", "橙子");

// 关联数组（字符串键名）
$student = array("姓名" => "张三", "年龄" => 20, "班级" => "计算机1班");
?>
```

### 2. 使用短数组语法 `[]`（PHP 5.4+）

```php
<?php
// 索引数组
$colors = ["红色", "绿色", "蓝色"];

// 关联数组
$user = ["username" => "admin", "password" => "123456"];
?>
```

### 3. 创建空数组

```php
<?php
$empty1 = array();
$empty2 = [];
?>
```

## 数组的遍历

### 1. `for` 循环（适合索引数组）

```php
<?php
$fruits = ["苹果", "香蕉", "橙子", "葡萄"];

for ($i = 0; $i < count($fruits); $i++) {
    echo "第" . ($i + 1) . "个水果是：" . $fruits[$i] . "<br>";
}
// 输出：
// 第1个水果是：苹果
// 第2个水果是：香蕉
// 第3个水果是：橙子
// 第4个水果是：葡萄
?>
```

### 2. `foreach` 循环（最常用）

```php
<?php
// 遍历索引数组
$scores = [85, 92, 78, 96];
$sum = 0;

foreach ($scores as $score) {
    $sum += $score;
}
$average = $sum / count($scores);
echo "平均分是：" . $average;  // 输出：平均分是：87.75

// 遍历关联数组
$student = ["姓名" => "李四", "年龄" => 21, "专业" => "软件工程"];

foreach ($student as $key => $value) {
    echo $key . "：" . $value . "<br>";
}
// 输出：
// 姓名：李四
// 年龄：21
// 专业：软件工程
?>
```

### 3. 使用 `each()` 和 `list()`（传统方式，了解即可）

```php
<?php
$colors = ["red" => "红色", "green" => "绿色", "blue" => "蓝色"];

while (list($key, $value) = each($colors)) {
    echo "$key => $value<br>";
}
?>
```

## 数组基本应用

### 1. 常用数组函数

```php
<?php
// count() - 统计数组元素个数
$arr = [1, 2, 3, 4, 5];
echo count($arr);  // 输出：5

// in_array() - 检查值是否在数组中
$fruits = ["苹果", "香蕉", "橙子"];
if (in_array("香蕉", $fruits)) {
    echo "有香蕉！";
}

// array_key_exists() - 检查键名是否存在
$student = ["name" => "张三", "age" => 20];
if (array_key_exists("name", $student)) {
    echo "存在 name 键";
}

// array_merge() - 合并数组
$arr1 = ["a", "b"];
$arr2 = ["c", "d"];
$result = array_merge($arr1, $arr2);
// 结果：["a", "b", "c", "d"]

// array_push() / array_pop() - 入栈/出栈
$stack = [];
array_push($stack, "第一个");
array_push($stack, "第二个");
$last = array_pop($stack);  // "第二个"

// sort() / rsort() - 排序（升序/降序）
$nums = [3, 1, 4, 1, 5];
sort($nums);   // [1, 1, 3, 4, 5]
rsort($nums);  // [5, 4, 3, 1, 1]

// asort() / arsort() - 保持键名的排序
$scores = ["张三" => 85, "李四" => 92, "王五" => 78];
arsort($scores);  // 按分数降序，保持姓名关联
?>
```

### 2. 二维数组（嵌套数组）

```php
<?php
// 定义学生成绩表（二维数组）
$students = [
    ["姓名" => "张三", "语文" => 85, "数学" => 92, "英语" => 78],
    ["姓名" => "李四", "语文" => 90, "数学" => 88, "英语" => 95],
    ["姓名" => "王五", "语文" => 78, "数学" => 85, "英语" => 82]
];

// 遍历二维数组
echo "<table border='1'>";
echo "<tr><th>姓名</th><th>语文</th><th>数学</th><th>英语</th><th>总分</th></tr>";

foreach ($students as $student) {
    $total = $student["语文"] + $student["数学"] + $student["英语"];
    echo "<tr>";
    echo "<td>{$student['姓名']}</td>";
    echo "<td>{$student['语文']}</td>";
    echo "<td>{$student['数学']}</td>";
    echo "<td>{$student['英语']}</td>";
    echo "<td>{$total}</td>";
    echo "</tr>";
}
echo "</table>";
?>
```

## 数组与字符串

### 1. 字符串转数组

```php
<?php
// explode() - 按分隔符分割字符串
$str = "苹果,香蕉,橙子,葡萄";
$fruits = explode(",", $str);
// 结果：["苹果", "香蕉", "橙子", "葡萄"]

// 限制分割次数
$info = "张三|20|男|北京";
$data = explode("|", $info, 3);
// 结果：["张三", "20", "男|北京"]

// str_split() - 按字符分割
$letters = str_split("Hello");
// 结果：["H", "e", "l", "l", "o"]
?>
```

### 2. 数组转字符串

```php
<?php
// implode() / join() - 用分隔符连接数组元素
$colors = ["红", "绿", "蓝"];
$str = implode(",", $colors);
echo $str;  // 输出：红,绿,蓝

// 应用场景：生成 SQL 中的 IN 条件
$ids = [1, 2, 3, 4, 5];
$idString = implode(",", $ids);
$sql = "SELECT * FROM users WHERE id IN ($idString)";
?>
```

## 练习题

### 练习 1：创建二维数组保存订单信息

**要求**：
1. 创建一个包含 3 条订单信息的二维数组
2. 每条订单包含：订单号、商品名称、单价、数量
3. 计算每条订单的小计和总计金额
4. 用表格形式输出所有订单信息

<details>
<summary>点击展开/收起</summary>

**参考答案**：

```php
<?php
// 定义订单数据
$orders = [
    ["order_no" => "2024001", "product" => "手机", "price" => 2999, "qty" => 2],
    ["order_no" => "2024002", "product" => "耳机", "price" => 199, "qty" => 5],
    ["order_no" => "2024003", "product" => "键盘", "price" => 399, "qty" => 3]
];

// 计算小计和总计
$total = 0;
echo "<h2>订单详情</h2>";
echo "<table border='1' cellpadding='10'>";
echo "<tr style='background:#f0f0f0'>
        <th>订单号</th>
        <th>商品名称</th>
        <th>单价</th>
        <th>数量</th>
        <th>小计</th>
      </tr>";

foreach ($orders as $order) {
    $subtotal = $order["price"] * $order["qty"];
    $total += $subtotal;

    echo "<tr>
            <td>{$order['order_no']}</td>
            <td>{$order['product']}</td>
            <td>¥{$order['price']}</td>
            <td>{$order['qty']}</td>
            <td>¥{$subtotal}</td>
          </tr>";
}

echo "<tr style='background:#e0e0e0'>
        <td colspan='4' align='right'><strong>总计：</strong></td>
        <td><strong>¥{$total}</strong></td>
      </tr>";
echo "</table>";
?>
```
</details>

### 练习 2：编写裁判评分程序

**要求**：
1. 假设有 7 位评委给选手打分（0-100分）
2. 去掉一个最高分和一个最低分
3. 计算剩余 5 个分数的平均分
4. 输出所有评委分数、去掉的分数和最终得分

<details>
<summary>点击展开/收起</summary>

**参考答案**：

```php
<?php
// 模拟7位评委的打分
$scores = [88, 92, 85, 90, 78, 95, 87];

echo "<h2>裁判评分系统</h2>";
echo "<p><strong>原始分数：</strong>" . implode(", ", $scores) . "</p>";

// 复制数组，避免修改原始数据
$tempScores = $scores;

// 找最高分
$maxScore = max($tempScores);
echo "<p><strong>最高分（去掉）：</strong>{$maxScore}</p>";

// 找最低分
$minScore = min($tempScores);
echo "<p><strong>最低分（去掉）：</strong>{$minScore}</p>";

// 计算总分（减去最高分和最低分）
$total = array_sum($tempScores) - $maxScore - $minScore;

// 计算平均分
$average = $total / 5;

echo "<hr>";
echo "<p><strong>剩余5个分数总和：</strong>{$total}</p>";
echo "<p style='color:red;font-size:20px'><strong>最终得分：</strong>" . round($average, 2) . "</p>";
?>
```
</details>

## 小结

| 知识点 | 要点 |
|--------|------|
| 创建数组 | `array()` 或 `[]` |
| 数组类型 | 索引数组、关联数组、二维数组 |
| 遍历方式 | `for`、`foreach` |
| 常用函数 | `count()`、`in_array()`、`array_merge()`、`sort()` |
| 字符串转换 | `explode()` 字符串转数组，`implode()` 数组转字符串 |
