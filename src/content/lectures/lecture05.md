---
title: 函数（一）
lectureNumber: 5
module: '函数与类'
description: '理解函数的概念和作用，掌握PHP常用系统函数的使用方法，包括检测函数、时间日期函数和随机函数。'
duration: '90分钟'
difficulty: 'intermediate'
prerequisites: ['lecture04']
tags: ['函数', '系统函数', '时间日期', '随机数']
hasSlides: true
hasAssignment: true
draft: false
---

# 第五讲：函数（一）

## 教学目标

1. 理解函数的概念和作用
2. 掌握 PHP 常用系统函数的使用方法
3. 学会使用检测函数、时间日期函数和随机函数
4. 能够综合运用所学函数解决实际问题

## 导入：什么是函数？

### 生活实例

想象你去奶茶店买奶茶：
- 你告诉店员：**"我要一杯珍珠奶茶，半糖，去冰"**
- 店员按照固定的配方和流程制作
- 最后把做好的奶茶递给你

这里的**制作流程**就是一个函数：
- **输入**：你的订单（珍珠奶茶、半糖、去冰）
- **处理**：按照配方制作
- **输出**：一杯奶茶

### 编程中的函数

> **函数**是完成特定功能的代码块，可以重复使用。

```php
// 定义一个函数：计算两个数的和
function add($a, $b) {
    return $a + $b;
}

// 调用函数
$result = add(3, 5);  // 结果是 8
```

## 第一部分：理解函数的本质

### 一、费曼技巧：用简单的语言解释

**核心概念**：
- 函数就像是一个**机器**或**食谱**
- 你放入一些东西（输入），它按照固定规则处理，然后给你结果（输出）
- 关键是：**同样的输入，永远得到同样的输出**

**榨汁机类比**：
```
榨汁机（函数）：
  放入：苹果 → 产出：苹果汁
  放入：橙子 → 产出：橙汁

计算平方（函数）：
  放入：3 → 产出：9
  放入：5 → 产出：25
```

**为什么需要函数？**
1. **消除重复** — 写一次，用多次
2. **分解复杂性** — 大问题拆分为小函数
3. **提高可读性** — 函数名本身就是注释
4. **实现抽象** — 使用者只需知道"做什么"，不必知道"怎么做"

### 二、第一性原理：从本质构建理解

#### 1. 起点：人类如何解决问题

想象你要教朋友做蛋糕。你有两种方式：

**方式一（线性）**：把每一步写成一行
```
取300克面粉 → 加3个蛋 → 加糖 → 搅拌 → 烘烤
```

**方式二（模块化）**：把"搅拌"定义为一个子程序
```
搅拌(x, y) = 用力混合x和y直到均匀
蛋糕 = 搅拌(面粉+蛋, 糖) → 烘烤
```

**关键洞察**：方式二中，"搅拌"成为一个**可命名的、可复用的操作单元**——这就是函数的雏形。

#### 2. 第一层抽象：命名与复用

没有函数时，代码是**一维的**（从上到下执行）。问题：如果某个操作需要重复10次，你要写10遍。

**函数的本质突破**：给一个代码块**命名**，之后通过名字调用。

```
原始状态：
  做A → 做B → 做C → 做B → 做C → 做B → 做C  [混乱、重复]

函数抽象：
  定义 X = 做B → 做C

  做A → X → X → X  [清晰、简洁]
```

#### 3. 第二层抽象：参数化（输入）

只命名还不够。真正的函数需要**处理不同的数据**。

**关键思想**：函数是一个**变换规则**，不是固定的计算。

```
固定计算（不是真正的函数）：
  say_hello = 打印("你好")  // 永远是"你好"

参数化函数：
  greet(name) = 打印("你好, " + name)

  greet("小明") → "你好, 小明"
  greet("小红") → "你好, 小红"
```

**参数的本质**：函数定义时的"占位符"，调用时填入实际值。

#### 4. 第三层抽象：返回值（输出）

完整的函数需要**把结果交还**给调用者，而不是只产生副作用（如打印）。

```
不完整（只有副作用）：
  add(a, b):
      打印(a + b)  // 结果只显示在屏幕上，程序无法使用

  add(2, 3)  // 你看到5，但程序拿不到这个5

完整（有返回值）：
  add(a, b):
      返回 a + b   // 把结果"传递"出去

  result = add(2, 3)  // result现在是5，可以被后续使用
  double = add(2, 3) * 2  // 可以链式使用：10
```

**返回值的意义**：函数成为**可组合的乐高积木**，输出可以作为另一个函数的输入。

#### 总结：函数的定义（从第一性原理）

**函数是一个三元组：**

| 组成部分 | 作用 | 类比 |
|---------|------|------|
| **名称** | 标识这段逻辑 | 机器的标签 |
| **参数** | 定义输入的"槽位" | 机器的进料口 |
| **体/返回值** | 定义如何转换输入为输出 | 机器的内部机制 |

**一句话定义**：
> 函数就是把一段逻辑打包、命名，以后可以反复使用，每次给它不同的输入，它返回对应的输出。

## 第二部分：系统函数

PHP 内置了丰富的系统函数，用于处理字符串、数组、文件等。

### 一、常用输出函数

```php
<?php
echo "Hello World";      // 输出字符串
print "Hello World";     // 输出字符串，返回1
print_r([1, 2, 3]);      // 打印数组/对象（易读格式）
var_dump("abc");         // 输出类型和值（调试常用）
?>
```

#### 输出函数对比

| 函数 | 输出多个值 | 支持表达式 | 返回值 | 主要用途 |
|------|-----------|-----------|--------|---------|
| `echo` | 是（逗号分隔） | 是 | 无 | 常规输出 |
| `print` | 否 | 是 | 1 | 简单输出 |
| `print_r()` | 否 | - | 可选 | 打印数组/对象 |
| `var_dump()` | 否 | - | 无 | 调试（含类型信息）|

### 二、检测函数

用于检测变量状态，是编写健壮代码的重要工具。

#### 1. `isset()` - 检测变量是否已设置

```php
<?php
$name = "张三";
$age = null;

var_dump(isset($name));  // bool(true) - 已设置且非null
var_dump(isset($age));   // bool(false) - 值为null
var_dump(isset($email)); // bool(false) - 未定义

// 检测多个变量（同时满足才返回true）
var_dump(isset($name, $email)); // bool(false)
?>
```

#### 2. `empty()` - 检测变量是否为空

```php
<?php
// 以下情况 empty() 返回 true
$var1 = "";       // 空字符串
$var2 = 0;        // 整数0
$var3 = 0.0;      // 浮点数0
$var4 = "0";      // 字符串"0"
$var5 = null;     // null
$var6 = false;    // 布尔false
$var7 = [];       // 空数组
$var8;            // 未声明变量

echo empty($var1) ? "空" : "非空";  // 输出：空

// 实际应用：表单验证
$username = $_POST['username'] ?? '';
if (empty($username)) {
    echo "用户名不能为空";
}
?>
```

#### `isset()` vs `empty()` 对比

| 表达式 | `isset()` | `empty()` |
|--------|-----------|-----------|
| `$x = "abc"` | true | false |
| `$x = ""` | true | true |
| `$x = 0` | true | true |
| `$x = "0"` | true | true |
| `$x = null` | false | true |
| `$x` (未定义) | false | true |

#### 3. `unset()` - 销毁变量

```php
<?php
$name = "张三";
$age = 20;

echo isset($name);  // 输出：1（true）

// 销毁单个变量
unset($name);
echo isset($name);  // 输出：（false）

// 销毁多个变量
unset($age, $email);
?>
```

#### 4. 类型检测函数

```php
<?php
$var = "123";

echo is_int($var);       // false - 不是整数类型
echo is_string($var);    // true - 是字符串类型
echo is_numeric($var);   // true - 是数字（可以是字符串形式的数字）

// 其他常用类型检测
$arr = [1, 2, 3];
$obj = new stdClass();

is_array($arr);      // true
is_object($obj);     // true
is_bool(true);       // true
is_float(3.14);      // true
is_null(null);       // true
?>
```

### 三、时间日期函数

#### 1. `date()` - 格式化日期时间

```php
<?php
// 常用格式字符
// Y - 4位年份 (2024)
// m - 2位月份 (01-12)
// d - 2位日期 (01-31)
// H - 24小时制 (00-23)
// i - 分钟 (00-59)
// s - 秒钟 (00-59)

echo date("Y-m-d");        // 输出：2024-01-15
echo date("Y年m月d日");     // 输出：2024年01月15日
echo date("H:i:s");        // 输出：14:30:25
echo date("Y-m-d H:i:s");  // 输出：2024-01-15 14:30:25

// 获取星期（中文需要额外处理）
$weekdays = ["日", "一", "二", "三", "四", "五", "六"];
$weekday = $weekdays[date("w")];  // w 返回 0(周日) 到 6(周六)
echo "今天是星期" . $weekday;
?>
```

#### 2. `time()` - 获取当前时间戳

```php
<?php
echo time();  // 输出：1705312225 (当前Unix时间戳，秒数)

// 时间戳是自 1970-01-01 00:00:00 UTC 以来的秒数
// 常用于计算时间差、生成唯一标识等

// 一天后的时间戳
$tomorrow = time() + 24 * 60 * 60;
echo date("Y-m-d H:i:s", $tomorrow);
?>
```

#### 3. `strtotime()` - 将字符串转为时间戳

```php
<?php
// 将各种日期字符串转为时间戳
echo strtotime("2024-01-15");           // 1705276800
echo strtotime("+1 day");                // 明天这个时间
echo strtotime("+1 week");               // 一周后
echo strtotime("next Monday");           // 下周一
echo strtotime("last Friday");           // 上周五

// 实际应用：计算会员到期日
$joinDate = "2024-01-15";
$expireDate = date("Y-m-d", strtotime($joinDate . " +1 year"));
echo "会员到期日：" . $expireDate;  // 2025-01-15
?>
```

#### 4. `mktime()` - 根据参数创建时间戳

```php
<?php
// mktime(时, 分, 秒, 月, 日, 年)
$timestamp = mktime(0, 0, 0, 1, 15, 2024);
echo date("Y-m-d H:i:s", $timestamp);  // 2024-01-15 00:00:00

// 应用场景：获取某月的第一天和最后一天
$year = 2024;
$month = 2;

// 当月第一天
$firstDay = mktime(0, 0, 0, $month, 1, $year);
// 下个月第一天减一秒 = 当月最后一天
$lastDay = mktime(0, 0, 0, $month + 1, 1, $year) - 1;

echo "2月第一天：" . date("Y-m-d", $firstDay) . "\n";
echo "2月最后一天：" . date("Y-m-d", $lastDay) . "\n";
?>
```

#### 5. `microtime()` - 获取微秒级时间戳

```php
<?php
// 返回当前 Unix 时间戳和微秒数
list($usec, $sec) = explode(" ", microtime());
$microtime = ((float)$usec + (float)$sec);
echo $microtime;  // 1705312225.123456

// 实际应用：计算代码执行时间
$start = microtime(true);

// 要测量的代码
$sum = 0;
for ($i = 1; $i <= 1000000; $i++) {
    $sum += $i;
}

$end = microtime(true);
$elapsed = $end - $start;
echo "执行时间：{$elapsed} 秒";
?>
```

### 四、随机函数

#### 1. `rand()` 和 `mt_rand()` - 生成随机整数

```php
<?php
// rand() - 生成随机整数（范围由系统决定，通常到32767）
echo rand();        // 随机整数
echo rand(1, 100);  // 1到100之间的随机整数

// mt_rand() - 更好的随机数生成器（推荐）
// 使用 Mersenne Twister 算法，更快且分布更均匀
echo mt_rand();        // 随机整数
echo mt_rand(1, 100);  // 1到100之间的随机整数

// 生成4位随机验证码
$code = mt_rand(1000, 9999);
echo "验证码：" . $code;
?>
```

#### 2. `random_int()` - 加密安全的随机整数

```php
<?php
// random_int() - 加密安全的随机数（适用于敏感场景）
// 用于生成密码、令牌等安全相关场景

try {
    $secureCode = random_int(100000, 999999);
    echo "安全验证码：" . $secureCode;
} catch (Exception $e) {
    echo "生成随机数失败";
}

// 对比：mt_rand vs random_int
// mt_rand() - 速度快，适合游戏、抽奖等普通场景
// random_int() - 安全，适合密码、会话ID等安全场景
?>
```

#### 3. `shuffle()` - 随机打乱数组

```php
<?php
// shuffle() - 随机打乱数组顺序（会改变原数组）
$cards = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

shuffle($cards);

echo "打乱后的牌序：";
print_r($cards);

// 实际应用：随机抽奖
$participants = ["张三", "李四", "王五", "赵六", "钱七"];
shuffle($participants);
$winner = $participants[0];
echo "中奖者是：" . $winner;
?>
```

#### 4. `array_rand()` - 随机获取数组键名

```php
<?php
// array_rand() - 从数组中随机取出一个或多个键名
$prizes = [
    "一等奖" => "iPhone 15",
    "二等奖" => "iPad Air",
    "三等奖" => "AirPods",
    "参与奖" => "优惠券"
];

// 随机取一个
$key = array_rand($prizes);
echo "你抽中了：{$key} - {$prizes[$key]}";

// 随机取多个
$keys = array_rand($prizes, 2);  // 取2个
foreach ($keys as $key) {
    echo "奖项：{$key} - {$prizes[$key]}<br>";
}
?>
```

## 综合案例：生成图形验证码

### 需求分析

1. 生成一个4位数字验证码
2. 将验证码显示为图片形式（使用 GD 库）
3. 添加干扰元素（噪点或干扰线）防止机器识别
4. 将验证码存入 Session 供后续验证

### 完整代码实现

```php
<?php
session_start();

// 1. 生成4位随机验证码
$code = '';
for ($i = 0; $i < 4; $i++) {
    $code .= mt_rand(0, 9);
}

// 存入 Session
$_SESSION['captcha'] = $code;

// 2. 创建图片
$width = 120;
$height = 40;
$image = imagecreatetruecolor($width, $height);

// 设置颜色
$bgColor = imagecolorallocate($image, 240, 240, 240);    // 浅灰背景
$textColor = imagecolorallocate($image, 50, 50, 50);      // 深灰文字
$noiseColor = imagecolorallocate($image, 180, 180, 180); // 噪点颜色

// 填充背景
imagefill($image, 0, 0, $bgColor);

// 3. 添加干扰噪点
for ($i = 0; $i < 100; $i++) {
    $x = mt_rand(0, $width);
    $y = mt_rand(0, $height);
    imagesetpixel($image, $x, $y, $noiseColor);
}

// 添加干扰线
for ($i = 0; $i < 3; $i++) {
    $x1 = mt_rand(0, $width);
    $y1 = mt_rand(0, $height);
    $x2 = mt_rand(0, $width);
    $y2 = mt_rand(0, $height);
    imageline($image, $x1, $y1, $x2, $y2, $noiseColor);
}

// 4. 绘制验证码文字
$fontSize = 20;
$x = 15;
for ($i = 0; $i < 4; $i++) {
    // 添加随机偏移，让文字不那么整齐
    $offsetY = mt_rand(-3, 3);
    imagestring($image, 5, $x, 10 + $offsetY, $code[$i], $textColor);
    $x += 25;
}

// 输出图片
header('Content-Type: image/png');
imagepng($image);

// 销毁图片资源
imagedestroy($image);
?>
```

### 代码解析

| 代码段 | 功能说明 |
|--------|---------|
| `session_start()` | 启动 Session，用于存储验证码 |
| `mt_rand(0, 9)` | 生成随机数字 |
| `imagecreatetruecolor()` | 创建真彩色图片 |
| `imagecolorallocate()` | 分配颜色 |
| `imagesetpixel()` | 绘制噪点 |
| `imageline()` | 绘制干扰线 |
| `imagestring()` | 绘制文字 |
| `header('Content-Type: image/png')` | 设置响应头，告诉浏览器这是图片 |
| `imagedestroy()` | 释放内存资源 |

## 课堂小结

### 知识点回顾

| 函数类别 | 常用函数 | 主要用途 |
|---------|---------|---------|
| 输出函数 | `echo`, `print`, `print_r`, `var_dump` | 输出信息、调试代码 |
| 检测函数 | `isset`, `empty`, `unset` | 检测变量状态 |
| 类型检测 | `is_int`, `is_string`, `is_array`, `is_numeric` | 判断数据类型 |
| 时间函数 | `date`, `time`, `strtotime`, `mktime`, `microtime` | 处理日期时间 |
| 随机函数 | `mt_rand`, `random_int`, `shuffle`, `array_rand` | 生成随机数 |

### 重点强调

1. **`isset()` vs `empty()`**：`isset` 检查变量是否存在且非 null；`empty` 检查变量是否为空值
2. **`mt_rand()` vs `random_int()`**：前者速度快，适合普通场景；后者安全，适合敏感场景
3. **时间戳计算**：记住一天的秒数是 `24 * 60 * 60 = 86400`

## 课后作业

### 基础练习

1. 使用 `date()` 函数输出今天是星期几（中文格式，如"今天是星期三"）

2. 编写程序计算两个日期之间相差多少天（提示：使用 `strtotime()`）

3. 使用 `mt_rand()` 模拟掷骰子（1-6点），统计掷100次的各点数出现次数

### 综合实践

4. **制作倒计时页面**：输入一个目标日期（如考试日期），显示距离目标还有"X天X小时X分X秒"

5. **完善验证码系统**：
   - 修改验证码案例，使其生成包含字母和数字的验证码
   - 创建一个验证页面，验证用户输入的验证码是否正确
   - 添加验证码刷新功能

### 思考题

6. 为什么 `empty("0")` 返回 `true`，而 `empty("0.0")` 返回 `false`？

7. 在实际项目中，什么时候应该使用 `mt_rand()`，什么时候应该使用 `random_int()`？

## 附录：常用函数速查表

### 输出函数

| 函数 | 语法 | 说明 |
|------|------|------|
| `echo` | `echo $str1, $str2` | 输出一个或多个字符串 |
| `print` | `print $str` | 输出字符串，总是返回1 |
| `print_r` | `print_r($var, true)` | 打印变量信息（数组/对象友好） |
| `var_dump` | `var_dump($var)` | 输出变量类型和值 |

### 检测函数

| 函数 | 说明 | 返回 true 的条件 |
|------|------|-----------------|
| `isset($var)` | 变量是否已设置 | 变量存在且不为 null |
| `empty($var)` | 变量是否为空 | 值为 ""、0、"0"、null、false、[] 或未定义 |
| `is_int($var)` | 是否为整数类型 | 变量是整数 |
| `is_string($var)` | 是否为字符串 | 变量是字符串 |
| `is_array($var)` | 是否为数组 | 变量是数组 |

### 时间日期函数

| 函数 | 语法 | 说明 |
|------|------|------|
| `date()` | `date("Y-m-d")` | 格式化日期时间 |
| `time()` | `time()` | 获取当前时间戳 |
| `strtotime()` | `strtotime("+1 day")` | 将字符串转为时间戳 |
| `mktime()` | `mktime(0,0,0,1,1,2024)` | 根据参数创建时间戳 |
| `microtime()` | `microtime(true)` | 获取微秒级时间戳 |

### 随机函数

| 函数 | 语法 | 说明 |
|------|------|------|
| `mt_rand()` | `mt_rand(1, 100)` | 生成随机整数（推荐） |
| `random_int()` | `random_int(1, 100)` | 加密安全的随机数 |
| `shuffle()` | `shuffle($array)` | 随机打乱数组 |
| `array_rand()` | `array_rand($array, 2)` | 随机获取数组键名 |
