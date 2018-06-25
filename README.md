# my-toy
> a desktop application write by electron

### Feature

* 快速搜索
* 支持打开本地文件
* 支持浏览器书签的导入和书签的匹配和打开
* 内置了一些开发功能(静态服务器,生成二维码,编码转换等)

#### 快速功能
> 【搜索前置字符】 + 【空格】 + 【搜索内容】组成
* 例如: 输入"bd electron"按回车,会自动打开浏览器并跳转到https://www.baidu.com/s?wd=electron 相当百度搜索electron
* 搜索前置字符可在"设置"中进行设置修改
* 内置的前置字符有["b","g","m","s"]等详见"设置"


#### 打开文本文件
1. 输入quickstart,跳转"添加快速启动页面" 
2. 添加本地文件路径(如:将qq.exe拖入指定区域进行路径添加)
3. 之后在输入框中输入"qq"并选中 "打开qq.exe"按回车就可以启动qq


#### 书签的导入和搜索
1. 输入"bookmark"回车,选中浏览器导出的书签(.html格式文件)即可
2. 输入框中的输入只要和书签路径局部匹配,下拉列表就会显示相应书签


#### 内置了一些常用的功能
> 根据以下关键字搜索启动功能

关键字|功能描述|
----|---|
static|静态服务器|
encode|编码转换|
qrcode|生成二维码|
jsformat|json格式化|


#### Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```









