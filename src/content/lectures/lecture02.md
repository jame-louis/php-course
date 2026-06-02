---
title: PHP开发基础与运算符
lectureNumber: 2
module: '基础入门'
description: '学习PHP基本语法、常量、变量、数据类型以及各类运算符的使用方法。'
duration: '90分钟'
difficulty: 'beginner'
prerequisites: ['lecture01']
tags: ['PHP语法', '变量', '数据类型', '运算符']
hasSlides: false 
hasAssignment: false
draft: false
---

# PHP开发基础与运算符

## PHPStudy安装

### 安装PhPStudy（一）

![phpstudy-setup-01.png](/assets/phpstudy-setup-01.png)

### 安装PHPStudy （二）
![phpstudy-setup-02.png](/assets/phpstudy-setup-02.png)


### 安装PHPStudy（三）

![phpstudy-setup-03.png](/assets/phpstudy-setup-03.png)

## PHPStudy使用

### 主界面

![phpstudy-quickstart-01.png](/assets/phpstudy-quickstart-01.png)

### 启动Apache服务器

![phpstudy-quickstart-02.png](/assets/phpstudy-quickstart-02.png)

![phpstudy-quickstart-03.png](/assets/phpstudy-quickstart-03.png)

![phpstudy-quickstart-04.png](/assets/phpstudy-quickstart-04.png)

![phpstudy-quickstart-05.png](/assets/phpstudy-quickstart-05.png)

### 找到WWW目录

![phpstudy-quickstart-04.png](/assets/phpstudy-quickstart-04.png)

![phpstudy-quickstart-06.png](/assets/phpstudy-quickstart-06.png)


## 编写第一个PHP程序

### Trae IDE 打开WWW目录

![hellophp-01.png](/assets/hellophp-01.png)

![hellophp-02.png](/assets/hellophp-02.png)

### Hello PHP

- 新建一个PHP文件：hello.php
- 在浏览器地址中输入：localhost/hello.php
- 浏览器显示：**你好，PHP！**

![hellophp-03.png](/assets/hellophp-03.png)


```php
<?php
	echo "Hello, PHP!";
?>
```

## PHP开发基础

### PHP基本语法

#### PHP标记符

- 四种风格：XML风格、简短风格、脚本风格、ASP风格

---
```php
// XML 风格
<?php
	echo "Hello world!";
?>
```

---
```php
// 简短风格
<?
	echo "PHP short style!";
?>
```

---

```php
// 脚本风格
// PHP7.0以前的版本支持脚本风格
// 在XHTML或XML中推荐使用这种标记风格，它符合XML语言规范的写法
<script language="php">
	echo "PHP script style";
</script>
```

---

```php
// ASP风格
// PHP 5.3.0以后版本不再支持这种风格
<%
	echo "PHP ASP style";
%>
```

#### PHP注释

- 单行注释：“//” 或者 “#”
- 多行注释："/* */"
---
```php
<?php
	echo 'C++ style'; // C++
	echo 'Shell style'; # Shell
?>
```

---
```php
<?php
	/*
	C style comments:
		1. echo 'hello';
		2. echo 'world';
	*/
	echo 'hello';
	echo 'world';
?>
```

#### PHP语句和语句块

- PHP程序由一条或多条PHP语句构成，每条语句都以英文分毫“;“结束
- 可以使用”{ }“将多条PHP语句包含起来，形成一个语句块

---
```php
<?php
	$i=1;
	echo "输出10以内的整数：";
	while($i<=10)
	{
		echo $i;
		$i++;
	}
?>
```

#### PHP 编程规范

- 编码规范是一套某种编程语言的导引手册，这种导引手册规定了一系列该语言的默认编程风格，用来增强这种语言的可读性、规范性和可维护性。
- 一门语言的编程规范主要包括：文件组织、缩进、注释、声明、空格处理、命名规则等。
- 在 PHP 的表述中，通常每一条 PHP 语句都以“;”结尾，

---
#### PHP命名规则

- 类命名
	- 使用大写字母作为词的分界，其他的字母均使用小写。  
	- 名字的首字母使用大写。  
	- 不要使用下画线。
- 常量、变量、数据、函数、类文件命名

### 常量

- 常量用于存储不经常改变的数据信息。
- 在 PHP 程序中，常量的值只能定义一次。
- 常量只包含标量值

---
```php
define(
	string constant_name,
	mixed value,
	caseSensitive=true
) 
```

---
```php
<?php
$radius = 4;

$ diameter = $ radius * 2;
$ circumference = M.PI * $ diameter;
$ area = M.PI * pow($ radius, 2);

echo "This circle has... <br />";
echo "A radius of". $ radius . "<br />";
echo "A diameter of". $ diameter . "<br />"; 
echo "A circumference of". $circumference . "<br />";
echo "An area of". $area . "<br />";
?> 
```

---
```php
<?php echo"当前文件路径为："._FILE_;//使用_FILE常量获取当前文件路径 
echo"<br>"; 
echo"当前行数为："._LINE_; //使用 LINE常量获取当前所在行号 
echo"<br>"; 
echo"当前PHP版本信息为："PHP_VERSION; //使用PHP_VERSION常量获取当前PHP版本 
echo"<br>";
```

---
### 变量

- 变量是指在程序运行过程中值可以变化的量。
- 变量为开发人员提供了有名字的内存存储区
---
PHP中的变量名称遵循以下约定：

- PHP中的变量名是区分大小写的。  
- 变量名必须以“$”开始。  
- 变量名可以以“_”开头。   
- 变量名不能以数字字符开头。  
- 变量名可以包含一些扩展字符，但不能包含非法扩展字符。

---
以下变量名均为合法变量名：

```php
$hello $Aform1 
```
以下为非法变量名：

```php
$168
$!like 
```
---
#### 变量作用域

- 内置的超全局变量(built-in super global variables)，在代码中的任意位置都可以访问。  
- 常数(constants)，一旦声明，就是全局性的，可以在函数内外使用。  
- 全局变量(global variables)，在代码前声明，可在代码间访问，但不能在函数中访问。  
- 在函数中创建和声明为静态变量的变量，在函数外是无法访问的，但是静态变量的值可以保留。  
- 在函数中创建和声明的局部变量，在函数外是无法访问的，并且在函数终止时失效。

---
```php
<?php
$a="Global variables";

function fun()
{
	// global $a;
	echo $a; 
	$a="Local variables";
	echo $a;
}

fun();
echo $a;
?> 
```

### 数据 类型

#### 标量类型


| 数据类型         | 描述                            |
| ------------ | ----------------------------- |
| 整形（integer)  | 用来存储整数，占用4个字节                 |
| 浮点型（float）   | 用来存储实数，即包含小数的数                |
| 布尔型（boolean） | 用来存储逻辑判断的真（true）或假（false）两种结果 |
| 字符串型（string） | 用来存储字符序列，组成字符串的字符可以是字母、数字或符号  |

```php
<?php
	$str1=12; //定义十进制变量
	$str2=012; //定义八进制变量
	$str3=0x12; //定义十六进制变量
	echo "输出数字12十进制、八进制、十六进制的结果分别为:<br>";
	echo "数字12十进制结果为:$str1<br>";
	echo "数字12十进制结果为:$str2<br>";
	echo "数字12十进制结果为:$str3<br>";
?> 
```

```php
<?php
	echo "请看圆周率的三种写法: ";
	echo "第一种为圆周率函数: ";
	echo pi()."<br>";
	echo "第二种为传统写法: ";
	$str 1=3.14159265359;
	echo $str1."<br>";
	echo "第三种为科学记数法: ";
	$str2=3.14159265359E-11;
	echo $str2."<br>";
?>
```

```php
<?php
$str=true;
if($str=true) 
{
    echo "这是为真的情况: ";
    echo $str."<br>";
}
else
{
    $str=false;
    echo "这是为假的情况: ";
    echo $str."<br>";
}
?> 
```

```php
<?php
$str="你好, 欢迎访问网站 PHP 乐园! : ";
echo "这是双引号的输出结果: <br>";
echo "$str <$br>";
echo "这是单引号的输出结果: <br>";
echo "$str <$br>";
}
?>
```

- 单引号：输出变量的名字
- 双引号：输出变量的值

#### 复合类型


| 数据类型        | 描述                         |
| ----------- | -------------------------- |
| 数组型（array）  | 用来存储一组具有相同数据类型的元素的数据结构     |
| 对象型（object） | 是面向对象语言中的一种复合数据类型，对象就是类的实例 |

```php
$array = ("value1","value2",...);
```

```php
<?php
$arr=array(0=>1, 1=>2);
echo "数字下标输出结果: <br>";
echo $arr[0];
echo "<br>";
echo "<br>";
$arr=array('hi' => "hello");
echo "字符串下标输出结果: <br>";
echo $arr['hi'];
?> 
```

#### 特殊类型


| 数据类型          | 描述                                                                 |
| ------------- | ------------------------------------------------------------------ |
| NULL          | 空类型只有一个值 NULL，未被赋值的变量的值就是 NULL                                     |
| 资源型(resource) | 资源型是 PHP特有的数据类型，又叫作“句柄”。可以用来表示 PHP扩展资源，可以是数据库访问操作或打开的文件，也可以是其他数据类型 |

空值表示没有为变量设置任何值。NULL类型是仅拥有NULL这个值的类型。这种类型用来标记变量为空。空值不区分大小写，NULL和null的效果是一样的。被赋予空值的情况有以下3种：

- 没有任何赋值  
- 被赋值 null  
- 被 unset()函数处理过的变量

```php
<?php
	$a;
	$b=NULL;
	$c=10;
	unset($c);
	echo "没有赋值情况输出结果: <br>";
	echo $a;
	echo "<br>";
	echo "被赋 null 值输出结果: <br>";
	echo $b;
	echo "<br>";
	echo "unset()处理后输出结果: <br>";
	echo $c;
	echo "<br>";
?> 
```

<table><tr><td>函数</td><td>检测类型</td></tr><tr><td>is bool</td><td>检测变量是否为布尔型</td></tr><tr><td>is_string</td><td>检测变量是否为字符串型</td></tr><tr><td>is_float</td><td>检测变量是否为浮点型</td></tr><tr><td>is_null</td><td>检测变量是否为空值</td></tr><tr><td>is_array</td><td>检测变量是否为数组类型</td></tr><tr><td>is_object</td><td>检测变量是否为对象类型</td></tr><tr><td>is_numeric</td><td>检测变量是否为数字或由数字组成的字符串</td></tr></table>


### 数据类型的转换

- 自动类型转换
	- 给变量重新赋值
	- 对不同数据类型的变量进行运算操作
- 强制类型转换
	- 使用强制类型转换：（类型名）变量或表达式。如(int)$num1
	- 使用类型转换函数：intval()、floatval()、strval()、settype()等

```php
<?php
	$str="3.1415926abc! ";
	int=intval($str);
	$float=floatval($str);
	var_dump($int);
	echo "<br>";
	var_dump($floa);
	echo "<br>";
	var_dump($str);
	echo "<br>";
?> 
```

### 数据的输出

- echo
- print
- var_dump

## 运算符和表达式

- 算术运算符
- 字符串运算符
- 赋值运算符
- 比较运算符
- 逻辑运算符
- 按位运算符
- 错误控制运算符
- 三元运算符

<table><tr><td>运算符</td><td>功 能</td></tr><tr><td>+</td><td>加法运算符，进行加法运算</td></tr><tr><td>-</td><td>减法运算符，进行减法运算</td></tr><tr><td>*</td><td>乘法运算符，进行乘法运算</td></tr><tr><td>/</td><td>除法运算符，进行除法运算</td></tr><tr><td>%</td><td>取余运算符，进行取余运算</td></tr><tr><td>++</td><td>累加运算符，进行累加运算</td></tr><tr><td>--</td><td>累减运算符，进行累减运算</td></tr></table>


<table><tr><td>运算符</td><td>功能</td></tr><tr><td>=</td><td>将右边的值赋值给左边的变量</td></tr><tr><td>+=</td><td>将左边的值加上右边的值并赋给左边的变量</td></tr><tr><td>-</td><td>将左边的值减去右边的值并赋给左边的变量</td></tr><tr><td>*</td><td>将左边的值乘以右边的值并赋给左边的变量</td></tr><tr><td>/=</td><td>将左边的值除以右边的值并赋给左边的变量</td></tr><tr><td>.=</td><td>将左边的字符串连接到右边</td></tr><tr><td>%=</td><td>将左边的值对右边的值取余数，然后赋给左边的变量</td></tr></table>


<table><tr><td>运算符</td><td>功能</td></tr><tr><td>==</td><td>进行相等关系运算，为“真”时返回1</td></tr><tr><td>===</td><td>进行完全相等关系运算，两边的操作数类型与值完全相等时返回1</td></tr><tr><td>!=</td><td>进行不相等关系运算</td></tr><tr><td>!=</td><td>进行完全不相等关系运算，即包括数值和类型</td></tr><tr><td>&gt;</td><td>进行大于关系运算</td></tr><tr><td>&lt;</td><td>进行小于关系运算</td></tr><tr><td>&gt;=</td><td>进行大于或等于关系运算</td></tr><tr><td>&lt;=</td><td>进行小于或等于关系运算</td></tr></table>

<table><tr><td>运算符</td><td>功 能</td></tr><tr><td>&amp;&amp;</td><td>逻辑与。如果两边都为真，则返回真</td></tr><tr><td>and</td><td>逻辑与。如果两边都为真，则返回真</td></tr><tr><td>||</td><td>逻辑或。如果两边有一个为真，则返回真</td></tr><tr><td>or</td><td>逻辑或。如果两边有一个为真，则返回真</td></tr><tr><td>!</td><td>逻辑非。返回一个相反的布尔值</td></tr><tr><td>not</td><td>逻辑非。返回一个相反的布尔值</td></tr><tr><td>xor</td><td>逻辑异或。两边布尔值不同时返回真</td></tr></table>

<table><tr><td>运算符</td><td>功 能</td></tr><tr><td>&amp;</td><td>按位和。例如$a&amp;&amp;b,表示将$a和$b都转换成二进制,对应位都是1,结果该位为1</td></tr><tr><td>|</td><td>按位或。例如$a|b,表示将$a和$b都转换成二进制,对应位中有一个是1,结果该位为1</td></tr><tr><td>^</td><td>按位异或。例如$a^b,表示将$a和$b都转换成二进制,对应位不相同时,结果该位为1</td></tr><tr><td>~</td><td>按位取反。例如~$a,表示将$a转换成二进制,对应位是1,结果该位为0;对应位是0,结果该位为1</td></tr><tr><td>&lt;&lt;</td><td>左移。例如$a&lt;&lt;$b,表示将$a转换成二进制,向左移动$b位,右边移空补0</td></tr><tr><td>&gt;&gt;</td><td>右移。例如$a&gt;&gt;$b,表示将$a转换成二进制,向右移动$b位,左边移空补0</td></tr></table>






- 运算符的优先级和结合规则
	- 加减乘除的先后顺序同数学运算中的完全一致。  
	- 对于括号，先括号内，再括号外。  
	- 对于赋值，由右向左运行，即依次从右边向左边的变量进行赋值。

- 表达式
	- 数学表达式(如2+3*4)
	- 字符串表达式(如"abc"."de")
	- 赋值表达式(如$a+=$b)
	- 关系表达式(如$i==6)
	- 逻辑表达式(如$a||$b&&$c)。


```php
$a=5;
$b=2;
echo $a."+".$b."=”; //".为连接字符串运算符,这里是为了输出 5+2=7 这样的表达式
echo $a+$b."<br />";
```