---
title: Session与会话技术进阶
lectureNumber: 11
module: 表单与会话
description: 掌握Session的工作原理，理解Session与Cookie的区别，实现简易购物车案例。
duration: 90分钟
difficulty: intermediate
prerequisites: ['lecture10']
tags: ['PHP', 'Session', 'Cookie', '购物车', '会话管理']
hasSlides: true 
slidevUrl: https://jame-louis.github.io/php/slidev/lecture11
hasAssignment: true
draft: false
---

> 学习目标：掌握Session的工作原理，理解Session与Cookie的区别，实现简易购物车案例。

---

## 学习路线图

```
第1关：Session基础 ──→ 第2关：Session操作 ──→ 第3关：购物车案例
       ↓                      ↓                      ↓
  Session原理            增删改查操作            商品添加/查看
  与Cookie区别           安全注意事项            数量修改/删除
```

---

## 第1关：Session基础

### 1.1 什么是Session？

**费曼解释**：如果说Cookie是"会员卡"，Session就是"储物柜"——你的东西存在服务器，只用一把钥匙（Cookie里的Session ID）来开。

```
Cookie方式（会员卡） VS Session方式（储物柜）

会员卡（Cookie）：               储物柜（Session）：
┌──────────────┐              ┌──────────────┐
│ 服务器：张三  │              │ 服务器：储物柜 #001 = [用户信息]
│ 卡片：张三    │              │ 卡片：钥匙 #001
└──────────────┘              └──────────────┘

优点：节省服务器空间    优点：安全、可存敏感信息
缺点：不安全、容量小    缺点：占用服务器内存
```

### 1.2 Session vs Cookie 对比

| 特性 | Cookie | Session |
|------|--------|---------|
| **存储位置** | 浏览器（客户端） | 服务器（服务端） |
| **安全性** | 较低，易被篡改 | 较高，数据不在客户端 |
| **存储容量** | 约4KB | 服务器内存限制（通常更大） |
| **生命周期** | 可长期保存 | 默认浏览器关闭即销毁 |
| **依赖关系** | 独立工作 | 依赖Cookie存储Session ID |

### 1.3 Session工作原理

```
第一次请求：
浏览器 ──→ 服务器：GET /page.php
              ↓ 服务器创建Session
浏览器 ←── 服务器：HTTP/1.1 200 OK
                  Set-Cookie: PHPSESSID=abc123
                  [页面内容]

后续请求：
浏览器 ──→ 服务器：GET /page.php
                  Cookie: PHPSESSID=abc123
              ↓ 服务器根据ID找到对应Session数据
浏览器 ←── 服务器：[页面内容 + Session数据]
```

---

## 第2关：Session操作

### 2.1 启动Session

**重要**：使用Session前必须先启动！

```php
<?php
// 方法1：session_start() - 必须在任何输出之前调用
session_start();

// 之后才能使用$_SESSION
$_SESSION['username'] = '张三';

// 方法2：检查Session是否已启动（PHP 5.4+）
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}
?>
```

**常见错误**：

```php
<?php
// 错误：先输出了内容
echo "Hello";
session_start();  // 报错：headers already sent

// 错误：BOM头导致的问题
// 文件以UTF-8 with BOM保存
// BOM字符在<?php之前就被输出了
?>
```

### 2.2 读写Session数据

```php
<?php
session_start();

// 写入数据（支持各种数据类型）
$_SESSION['username'] = '张三';
$_SESSION['age'] = 25;
$_SESSION['is_logged_in'] = true;
$_SESSION['cart'] = ['item1', 'item2'];  // 数组
$_SESSION['user'] = [
    'id' => 1,
    'name' => '张三',
    'email' => 'zhangsan@example.com'
];  // 关联数组

// 读取数据
$username = $_SESSION['username'];
$age = $_SESSION['age'];

// 安全读取（防止未定义索引错误）
$theme = $_SESSION['theme'] ?? 'light';  // 默认值
$language = $_SESSION['lang'] ?? 'zh';

// 检查是否存在
if (isset($_SESSION['is_logged_in'])) {
    echo "已登录";
}
?>
```

### 2.3 删除Session数据

```php
<?php
session_start();

// 删除单个Session变量
unset($_SESSION['username']);
unset($_SESSION['age']);

// 清空所有Session数据（但保留Session ID）
$_SESSION = [];

// 完全销毁Session（包括ID和文件）
session_destroy();

// 同时删除Cookie中的Session ID
if (isset($_COOKIE[session_name()])) {
    setcookie(session_name(), '', time() - 3600, '/');
}
?>
```

### 2.4 Session安全注意事项

```php
<?php
// 1. 启动Session时设置安全参数
ini_set('session.cookie_httponly', 1);    // 防止JavaScript访问
ini_set('session.cookie_secure', 1);         // 仅HTTPS传输
ini_set('session.use_strict_mode', 1);       // 严格模式

session_start();

// 2. 重新生成Session ID（防止Session Fixation攻击）
// 在登录成功后调用
if (isset($_SESSION['is_logged_in']) && $_SESSION['is_logged_in'] === true) {
    session_regenerate_id(true);
}

// 3. 验证Session有效性
if (isset($_SESSION['ip']) && $_SESSION['ip'] !== $_SERVER['REMOTE_ADDR']) {
    // IP地址改变，可能是Session劫持
    session_destroy();
    die("安全验证失败，请重新登录");
}
?>
```

---

## 第3关：简易购物车案例

### 3.1 购物车设计思路

```php
<?php
// 购物车数据结构（存储在Session中）
$_SESSION['cart'] = [
    'items' => [
        [
            'id' => 1,
            'name' => 'iPhone 15',
            'price' => 5999,
            'quantity' => 1
        ],
        [
            'id' => 3,
            'name' => 'AirPods',
            'price' => 1299,
            'quantity' => 2
        ]
    ],
    'total_items' => 3,
    'total_price' => 8597
];
?>
```

### 3.2 购物车核心功能实现

```php
<?php
session_start();

/**
 * 添加商品到购物车
 */
function addToCart($product) {
    if (!isset($_SESSION['cart'])) {
        $_SESSION['cart'] = ['items' => []];
    }

    $items = &$_SESSION['cart']['items'];

    // 检查是否已存在
    foreach ($items as &$item) {
        if ($item['id'] === $product['id']) {
            $item['quantity'] += $product['quantity'] ?? 1;
            updateCartTotals();
            return true;
        }
    }

    // 添加新商品
    $items[] = [
        'id' => $product['id'],
        'name' => $product['name'],
        'price' => $product['price'],
        'quantity' => $product['quantity'] ?? 1
    ];

    updateCartTotals();
    return true;
}

/**
 * 更新购物车统计
 */
function updateCartTotals() {
    $items = $_SESSION['cart']['items'] ?? [];
    $totalItems = 0;
    $totalPrice = 0;

    foreach ($items as $item) {
        $totalItems += $item['quantity'];
        $totalPrice += $item['price'] * $item['quantity'];
    }

    $_SESSION['cart']['total_items'] = $totalItems;
    $_SESSION['cart']['total_price'] = $totalPrice;
}

/**
 * 修改商品数量
 */
function updateQuantity($productId, $quantity) {
    if ($quantity < 1) {
        removeFromCart($productId);
        return;
    }

    foreach ($_SESSION['cart']['items'] as &$item) {
        if ($item['id'] === $productId) {
            $item['quantity'] = $quantity;
            updateCartTotals();
            return;
        }
    }
}

/**
 * 从购物车移除商品
 */
function removeFromCart($productId) {
    $items = &$_SESSION['cart']['items'];

    foreach ($items as $key => $item) {
        if ($item['id'] === $productId) {
            unset($items[$key]);
            $items = array_values($items);  // 重新索引
            updateCartTotals();
            return;
        }
    }
}

/**
 * 清空购物车
 */
function clearCart() {
    unset($_SESSION['cart']);
}

/**
 * 获取购物车数据
 */
function getCart() {
    return $_SESSION['cart'] ?? [
        'items' => [],
        'total_items' => 0,
        'total_price' => 0
    ];
}
?>
```

### 3.3 购物车页面

```php
<?php
session_start();
require_once 'cart_functions.php';

// 处理表单提交
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'update':
                updateQuantity($_POST['product_id'], (int)$_POST['quantity']);
                break;
            case 'remove':
                removeFromCart($_POST['product_id']);
                break;
            case 'clear':
                clearCart();
                break;
        }
    }

    header("Location: cart.php");
    exit;
}

$cart = getCart();
?>
<!DOCTYPE html>
<html>
<head>
    <title>购物车</title>
    <style>
        body { font-family: Arial, sans-serif; max-width: 800px; margin: 50px auto; padding: 20px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #ddd; padding: 12px; text-align: center; }
        th { background-color: #4CAF50; color: white; }
        .empty { color: #666; padding: 50px; text-align: center; }
        .total { background-color: #f0f0f0; font-weight: bold; }
        input[type="number"] { width: 60px; padding: 5px; }
        button { padding: 5px 15px; cursor: pointer; }
        .btn-update { background: #2196F3; color: white; border: none; }
        .btn-remove { background: #f44336; color: white; border: none; }
        .btn-clear { background: #ff9800; color: white; border: none; padding: 10px 20px; }
        .continue { display: inline-block; margin-top: 20px; color: #4CAF50; }
    </style>
</head>
<body>
    <h2>我的购物车</h2>

    <?php if (empty($cart['items'])): ?>
        <div class="empty">
            <p>购物车是空的~</p>
            <a href="products.php" class="continue">去购物 →</a>
        </div>
    <?php else: ?>
        <form method="POST">
            <table>
                <thead>
                    <tr>
                        <th>商品名称</th>
                        <th>单价</th>
                        <th>数量</th>
                        <th>小计</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($cart['items'] as $item): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($item['name']); ?></td>
                            <td>¥<?php echo number_format($item['price'], 2); ?></td>
                            <td>
                                <input type="number" name="quantity" value="<?php echo $item['quantity']; ?>" min="1">
                                <input type="hidden" name="product_id" value="<?php echo $item['id']; ?>">
                            </td>
                            <td>¥<?php echo number_format($item['price'] * $item['quantity'], 2); ?></td>
                            <td>
                                <button type="submit" name="action" value="update" class="btn-update">更新</button>
                                <button type="submit" name="action" value="remove" class="btn-remove">删除</button>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
                <tfoot>
                    <tr class="total">
                        <td colspan="2"><strong>总计</strong></td>
                        <td><strong><?php echo $cart['total_items']; ?> 件</strong></td>
                        <td colspan="2"><strong>¥<?php echo number_format($cart['total_price'], 2); ?></strong></td>
                    </tr>
                </tfoot>
            </table>

            <p style="text-align: right;">
                <button type="submit" name="action" value="clear" class="btn-clear">清空购物车</button>
                <a href="products.php" class="continue">继续购物 →</a>
            </p>
        </form>
    <?php endif; ?>

</body>
</html>
```

---

## 综合挑战

### 挑战：完整用户登录与购物车系统

**需求**：
1. **登录系统**（login.php）
   - 用户名/密码表单
   - 使用Session保存登录状态
   - 密码使用简单验证（如 admin/123456）

2. **商品列表**（products.php）
   - 展示商品列表（至少5个商品）
   - 每个商品有"加入购物车"按钮
   - 显示当前购物车商品数量

3. **购物车**（cart.php）
   - 显示已选商品
   - 可以修改数量
   - 可以删除商品
   - 显示总价

4. **结算页面**（checkout.php）
   - 确认订单信息
   - 提交订单后清空购物车

<details>
<summary>分步提示</summary>

**Step 1**: 创建商品数据文件（products_data.php）
```php
<?php
$products = [
    ['id' => 1, 'name' => 'iPhone 15', 'price' => 5999, 'image' => 'iphone.jpg'],
    ['id' => 2, 'name' => 'MacBook Air', 'price' => 8999, 'image' => 'macbook.jpg'],
    // ... 更多商品
];
?>
```

**Step 2**: 创建登录验证（login.php）
```php
<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $password = $_POST['password'] ?? '';

    // 简单验证（实际应该从数据库验证）
    if ($username === 'admin' && $password === '123456') {
        $_SESSION['user_id'] = 1;
        $_SESSION['username'] = $username;
        $_SESSION['is_logged_in'] = true;

        header("Location: products.php");
        exit;
    } else {
        $error = "用户名或密码错误";
    }
}
?>
<!-- 登录表单HTML -->
```

**Step 3**: 创建商品列表（products.php）
```php
<?php
session_start();
require_once 'products_data.php';

// 检查登录状态
if (!isset($_SESSION['is_logged_in'])) {
    header("Location: login.php");
    exit;
}

// 处理添加到购物车
if (isset($_POST['add_to_cart'])) {
    $productId = $_POST['product_id'];
    $product = array_filter($products, fn($p) => $p['id'] == $productId);

    if ($product) {
        $product = array_values($product)[0];

        if (!isset($_SESSION['cart'])) {
            $_SESSION['cart'] = ['items' => []];
        }

        // 添加商品到购物车逻辑...
        // （使用前面定义的addToCart函数）
    }
}

$cartCount = $_SESSION['cart']['total_items'] ?? 0;
?>
<!-- 商品列表HTML -->
```

**Step 4**: 完成购物车和结算页面
- 使用前面的cart_functions.php和cart.php
- 创建checkout.php处理订单提交

</details>

---

## 自我检测清单

- [ ] 理解Session的工作原理
- [ ] 理解Session与Cookie的区别
- [ ] 能正确启动Session（`session_start()`）
- [ ] 能使用`$_SESSION`读写数据
- [ ] 能删除Session数据（单个/全部）
- [ ] 了解Session安全注意事项
- [ ] 能实现简易购物车功能

---

## 常见错误速查表

| 错误 | 原因 | 解决方法 |
|------|------|----------|
| headers already sent | 输出前调用了session_start() | 确保`session_start()`在文件最开头 |
| Undefined index | 未启动Session就访问$_SESSION | 先调用`session_start()` |
| Session数据丢失 | 浏览器Cookie被禁用 | 检查浏览器设置或使用URL重写 |
| 无法删除Session | 只unset了变量 | 需要同时`session_destroy()` |

---

## 费曼小结

| 知识点 | 一句话解释 |
|--------|-----------|
| Session | 服务器的"储物柜"，用Cookie里的钥匙开 |
| session_start() | 打开储物柜，必须在输出前调用 |
| $_SESSION | 存取储物柜数据的数组 |
| session_destroy() | 销毁储物柜（登出用） |
| 与Cookie区别 | Session存服务器，Cookie存浏览器 |

---

*本课教材参考：第10章 10.2节 (p.248-256)*
