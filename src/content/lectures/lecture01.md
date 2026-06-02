---
title: PHP概述与环境搭建
lectureNumber: 1
module: '基础入门'
description: 'PHP（PHP: Hypertext Preprocessor，即"PHP：超文本预处理器"）是一种广泛使用的开源服务器端脚本语言。'
duration: '90分钟'
difficulty: 'beginner'
prerequisites: []
tags: ['面向对象', '数据库', '文件操作']
hasSlides: true
hasAssignment: false
draft: false
---


# PHP概述与环境搭建

## PHP概述

PHP（PHP: Hypertext Preprocessor，即"PHP：超文本预处理器"）是一种广泛使用的开源服务器端脚本语言。

**PHP的特点：**
- **开源免费**：完全免费，社区活跃
- **跨平台**：支持Windows、Linux、Mac OS
- **易学易用**：语法借鉴C、Java、Perl
- **丰富的数据库支持**：MySQL、PostgreSQL、MongoDB等
- **庞大的社区**：丰富的框架和工具（Laravel、ThinkPHP等）

## 发展历程

| 版本    | 发布时间  | 主要特性             |
| ----- | ----- | ---------------- |
| PHP 3 | 1998年 | 第一个正式版本          |
| PHP 4 | 2000年 | 引入Zend引擎         |
| PHP 5 | 2004年 | 面向对象支持           |
| PHP 7 | 2015年 | 性能大幅提升（2倍）       |
| PHP 8 | 2020年 | JIT编译器、命名参数、联合类型 |

## PHP的应用领域

- **网站开发**：Facebook、Wikipedia、WordPress
- **电商平台**：Magento、Shopify
- **内容管理系统**：WordPress、Drupal、Joomla
- **API开发**：RESTful API、微服务

## B/S架构与动态网页原理

```txt
┌─────────────┐      HTTP请求        ┌─────────────────────┐
│   浏览器     │  ───────────────→   │   Web服务器(Apache)  │
│  (Client)   │                     │        +            │
└─────────────┘  ←───────────────   │   PHP解释器          │
                    返回HTML         │        +            │
                                    │   MySQL数据库        │
                                    └     (Server)        ┘ 
```

**工作流程：**
1. 用户在浏览器输入URL
2. 浏览器向Web服务器发送HTTP请求
3. Web服务器将PHP文件交给PHP解释器处理
4. PHP解释器执行代码，生成HTML
5. Web服务器将HTML返回给浏览器
6. 浏览器渲染显示页面

## 静态网页 vs 动态网页

| 特性 | 静态网页(.html) | 动态网页(.php) |
|------|-----------------|----------------|
| 内容 | 固定不变 | 根据请求动态生成 |
| 交互性 | 无 | 强（用户登录、数据提交等） |
| 数据库 | 不支持 | 支持 |
| 文件扩展名 | .html/.htm | .php |

## 集成环境选择

**常用集成环境：**

| 工具       | 支持平台          | 特点          |
| -------- | ------------- | ----------- |
| XAMPP    | Win/Mac/Linux | 功能全面，文档丰富   |
| WAMP     | Windows       | 专为Windows优化 |
| MAMP     | Mac/Windows   | 界面美观        |
| phpStudy | Windows       | 国产，简单易用     |

## 安装Warmpserver

- [Warmpserver安装教程 - CSDN](https://blog.csdn.net/ba_qi/article/details/102736014)

![PHP/Attachments/setup-01.png](/assets/PHP/Attachments/setup-01.png)

![PHP/Attachments/setup-02.png](/assets/PHP/Attachments/setup-02.png)

![PHP/Attachments/setup-03.png](/assets/PHP/Attachments/setup-03.png)

![PHP/Attachments/setup-04.png](/assets/PHP/Attachments/setup-04.png)

![PHP/Attachments/setup-05.png](/assets/PHP/Attachments/setup-05.png)

![setup-06.png](/assets/setup-06.png)


## 安装可能遇到的问题及解决方法

![setup-00.png](/assets/setup-00.png)

![setup-00-01.png](/assets/setup-00-01.png)

![setup-00-02.png](/assets/setup-00-02.png)

## Hello PHP

```php
<?php
	echo "Hello, PHP!";
?>
```php