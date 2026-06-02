---
title: 流程控制语句
lectureNumber: 3
module: '基础入门'
description: '学习PHP的条件控制语句（if、switch）和循环控制语句（while、for、foreach），以及跳转控制语句的使用。'
duration: '90分钟'
difficulty: 'beginner'
prerequisites: ['lecture01','lecture02']
tags: ['流程控制', '条件语句', '循环语句']
hasSlides: false
hasAssignment: false
draft: false
---

# 流程控制语句

## 课程目标

- 条件控制语句
- 循环控制语句
- 跳转控制语句

## 概述

流程控制，是指根据需要让程序转向执行指定的语句。

- 顺序控制语句
- 条件控制语句：if 和 switch
- 循环控制语句：while、do-while、for和foreach
- 跳转控制语句：break、continue和return

## 条件控制语句

### if 语句

```php
if(expr) {
	statement1;
	statement2;
}
```

```php
<?php
	$num = 2;
	if($num%2==0) 
	{
		echo "$num 是偶数.";
	}
?>
```

### if...else 语句

```php
if(expr){
	statement1;
}
else {
	statement2;
}
```

```php
<?php
	$score=89; //定义变量
	if($score>=60) //判断是否符合条件
	{
		echo "及格";
	}
	else
	{
		echo "不及格";
	}
?> 
```

### if..elseif...else 语句

```php
if(expr1){ 
	statement 1; 
} 
else if(expr2)
{ 
	statement 2; 
}
... 
else{ 
	statement n; 
} 
```

```php
<?php
$score=89; //定义变量
if($score>=90) //判断是否符合条件
{
	echo "优秀";
}
elseif($score<90&&80score>=80) //判断是否符合条件
{
	echo "良好";
}
elseif($score<80&&80score>=70) //判断是否符合条件
{
	echo "中等";
}
elseif($score<70&&80score>=60) //判断是否符合条件
{
	echo "及格";
}
else
{
	echo "不及格";
}
?>
```

### switch 语句

```php
switch(variable)   
{ 
	case value1: statement 1; break; 
	case value 2: statement 2; break; 
	case value 3: statement 3; break; 
	default: statement n; 
} 
```

```php
<?php
$weekday=3; //定义变量
switch($weekday)
{
	case 1:
	    echo "今天星期一, 希望新的一周有个好的开始。";
	    break;
	case 2:
		echo "今天星期二, 继续努力。";
		break;
	case 3:
	    echo "今天星期三, 劳动人民最可爱。";
	    break;
	case 4:
		echo "今天星期四, 勤奋才能出成绩, 加油! ";
		break;
	case 5:
		echo "今天星期五，马上就是周末，完成工作好好休息。";
		break;  
	case 6:
		echo "今天星期六，没办法，还要加个班啊。";
		break;  
	default:
		echo "今天星期日，终于可以睡到自然醒了。";
		break;  
}
?>
```

## 循环控制语句

能够按照一定的条件重复执行某段功能代码的代码结构。

- while
- do-while
- for
- foreach

### while 循环语句

```php
while(expr) { statement; } 
```

```php
<?php
$i=1; //定义变量
echo "输出100以内的整数: ";
while($i<=100) //判断是否符合条件
{
	echo $i;
	$i++;
}
?>
```

### do-while 语句

```php
do{ 
	statement; 
} while(expr); 
```

```php
<?php
$i=1; //定义变量
echo "输出100以内的整数: ";
do{
	echo $i;
	$i++;
} while ($i<=100); //判断是否符合条件
echo $i;
?> 
```

### while vs do-while语句

```php
<?php
$a=0;
while($a!=0) {
	echo "while 要执行的内容";
}
do{
	echo "do...while 要执行的内容";
} while($a!=0);
?>
```

### for 循环语句

```php
for(expr1; expr2; expr3)  
{ 
	statement; 
} 
```

```php
<?php
for($i=1; $i<=100; $i++) {
	echo $i;
}
?> 
```

### foreach 循环语句

```php
foreach(arry_expression as $value)
{ 
	statement; 
}

foreach(arry_expression as $key->value)
{ 
	statement; 
}  
```

```php
<?php
$arr=arry("one", "two", "three");
foreach($arr as $value) {
	echo "数组值: ".value. "<br />";
}
?> 
```

## 跳转控制语句

- 用于实现程序流程的跳转。
- break
- continue
- return

### break 语句

- 结束当前循环。

```php
break n; 
```

```php
<?php
$n=0;
while(++$n)
{
	switch($n)
	{
		case 1:
	    echo "case one";
		    break; // 跳出switch
	    case 2:
	        echo "case two";
	        break 2; // 跳出switch和while
	    default:
	        echo "case three";
	        break 1;// 跳出switch
	}
}
?> 
```

### continue 语句

- 跳出循环，并继续执行循环体后续的语句
- 只能终止本次循环，而进入下一次循环

```php
<?php
$i=0;
while($i++)<6>
{
	if($i%2==0)
	{
		continue;
	}
	echo $i. "<br>";
}
?> 
```

### exit 语句

```php
void exit([string message]);
```

```php
<?php
$i=1/0;
exit ("除数不能为 0");
echo "这条语句不会输出";
?>
```
