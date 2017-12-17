<h2>html-withimg-loader配置简述（处理html中的图片路径）</h2>

<h3>前注：</h3>

文档全文请查看 [根目录的文档说明](https://github.com/qq20004604/webpack-study)。

如果可以，请给本项目加【Star】和【Fork】持续关注。

有疑义请[点击这里](https://github.com/qq20004604/webpack-study/issues)，发【Issues】。

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/html_withimg_loader)地址

<h3>0、使用说明</h3>

安装：

```
npm install
```

运行：

```
npm run test
```

<h3>1、概述</h3>

简单来说，``html-withimg-loader`` 最主要的作用，是将引用的 html 文件中的 img 文件，或``background-image:url()``，转为可被 ``url-loader`` 等其他loader处理的东西。

他包含两个功能：

1. 解析引入 html 文件，转换 url ，从而触发其他loader；
2. 在引入的 html 文件中，再引入其他 html 文件；

即将 html 也视作一个模块来进行处理，那么处理里面的的路径就像处理 css 文件中的图片路径一样。

>优点：

支持 ``jpg|jpeg|png|gif|svg|webp`` 文件的处理

>缺点：

需要手动将 html 字符串挂载到源 html 文件里。例如：

```javascript
import html from './template.html'
// 这个时候引入的是一个html字符串

let div = document.createElement('div')
div.innerHTML = html
document.body.append(div)
```

<h3>2、使用说明</h3>

<h4>2.1、基本使用方法</h4>

假如我要在 ``<body></body>`` 里实现这样一个东西：

```html
<body>
    <img style="width: 200px;height: 200px;" src="./login_background.svg" alt="">
    <img style="width: 200px;height: 200px;" src="./large_image.jpg" alt="">
</body>
```

那么实际中应该这么写：

入口文件：

```javascript
// src/app.js
import html from './template.html'
// 这个时候引入的是一个html字符串

let div = document.createElement('div')
div.innerHTML = html
document.body.append(div)
```

模板文件：

```html
// src/template.html
<img style="width: 200px;height: 200px;" src="./login_background.svg" alt="">
<img style="width: 200px;height: 200px;" src="./large_image.jpg" alt="">
```

webpack配置（部分）：

```javascript
module: {
    // loader放在rules这个数组里面
    rules: [
        {
            test: /\.html$/,
            use: [
                'html-withimg-loader'
            ]
        },
        {
            test: /\.(png|jpg|jpeg|gif|svg)$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[hash].[ext]'
                    }
                }
            ]
        }
    ]
}
```

---

转换结果：

1. 将比较小的svg图片转为了base64字符串，并使用在 img 标签中；
2. 将比较大的图片，成功打包；
3. 这两个标签的插入逻辑，在 js 文件中，而不是直接插入了结果的html文件中（webpack也从来没这么干过）。

<h4>2.2、html里引入html</h4>

``html-withimg-loader``也支持在 html 文件里引用另外一段 html 模块；

引用的语法是：

```
#include('./template.html')
```

括号内的必须是字符串（被引号包裹），值表示描述的是路径。效果是将指定的 html 字符串，全部插入这一行代码所在的位置。

示例代码：

```html
// src/template.html
<div>
    <h1>以下有两个图片：</h1>
    #include('./child_template.html')
</div>
```

```html
// src/child_template.html
<img style="width: 200px;height: 200px;" src="./login_background.svg" alt="">
<img style="width: 200px;height: 200px;" src="./large_image.jpg" alt="">
```

---

转换后效果：

```html
<div>
    <h1>以下有两个图片：</h1>
    <img style="width: 200px;height: 200px;" src="data:image/svg+xml;base64,（太长略略略）" alt="">
    <img style="width: 200px;height: 200px;" src="img/e883922b89e7fb608db088fbdc3979e0.jpg" alt="">
</div>
```

[DEMO](https://github.com/qq20004604/webpack-study/tree/master/5%E3%80%81Loader/html_withimg_loader)地址
