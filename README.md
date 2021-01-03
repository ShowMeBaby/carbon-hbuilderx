# carbon-hbuilderx 在线生成精美的代码片段图片

这是carbon插件的HbuilderX版本,本插件已发布至[HbuilerX插件市场](https://ext.dcloud.net.cn/plugin?id=3802)

## 示例

![1](https://gitee.com/retrocode/picture_bed/raw/master/image/1.png)

![2](https://gitee.com/retrocode/picture_bed/raw/master/image/2.png)

## 使用说明

1. 添加插件后,在hx中选中想要分享的代码后右键
2. 点击导出至carbon按钮,将会自动打开浏览器访问carbon网页
3. 默认访问的是我自建的[carbon镜像](http://carbon.retrocode.io),若你想访问carbon的源镜像或者其他自建镜像,可以在插件配置中修改

## 快捷键

将下列配置填写进hx的自定义快捷键即可

```json

{"key":"alt+shift+a","command":"carbon.openurl"}

```

## 插件配置

这些配置为跳转carbon时的默认值,跳转到carbon还可以二次调整,若你对carbon实在不熟悉,可以研究下跳转后carbon的相关配置,再在本插件内做相应调整即可

| 属性名                                   | 默认值                     | 说明                                                         |
| ---------------------------------------- | -------------------------- | ------------------------------------------------------------ |
| carbon域名                               | http://carbon.retrocode.io | 默认跳转的carbon镜像域名,若你想访问自己或[原版](https://carbon.now.sh/)的镜像将域名填在此处即可 |
| 背景色                                   | rgba(0,0,0,0)              | 图片背景色                                                   |
| 代码主题                                 | vscode                     | 图片代码样式主题                                             |
| 是否显示窗口                             | true                       | 图片中是否显示窗口样式                                       |
| 窗口主题(显示窗口时生效)                 | none                       | 窗口主题                                                     |
| 是否显示窗口阴影                         | true                       |                                                              |
| 窗口阴影偏移offset-y(显示窗口阴影时生效) | 0                          |                                                              |
| 窗口阴影半径blur-radius                  | 0                          |                                                              |
| 自动调整宽度                             | true                       |                                                              |
| padding上下边距                          | 50                         | 图片中代码窗距离图片的距离                                   |
| padding左右边距                          | 50                         | 图片中代码窗距离图片的距离                                   |
| 是否显示行数                             | false                      | 代码中是否显示行数                                           |
| 显示行数时的起始行数(显示行数时生效)     | 0                          | 如填写100,则代码行数会从100开始算起[100,101,102,…]           |
| 字体类型                                 | JetBrains Mono             | 即图片中的代码字体样式                                       |
| 字体大小                                 | 16                         |                                                              |
| 行高(百分比值)                           | 120                        | 代码行高采用百分比值,若填写120即代表行高为120%               |

