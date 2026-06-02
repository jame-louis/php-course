---
question: 使用GD库创建图像的基本步骤是什么？
answer: 1. 使用imagecreatetruecolor()创建画布；2. 使用imagecolorallocate()定义颜色；3. 使用绘图函数（如imagefill、imageline等）绘制图形；4. 使用header()设置Content-Type；5. 使用imagepng()或imagejpeg()输出图像；6. 使用imagedestroy()释放资源。
explanation: GD库是PHP的图像处理扩展，可以动态生成图像。必须在任何输出之前调用header()设置内容类型，否则图像无法正常显示。记得使用imagedestroy()释放内存，避免资源泄漏。
module: 函数与类
tags: ['PHP', 'GD库', '图像处理']
relatedLectures: ['lecture06']
draft: false
---
