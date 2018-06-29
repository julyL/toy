# mytoy
> a desktop application write by electron,use ALt+D to toggle show or hide

[下载地址](https://github.com/julyL/toy/releases)

[预览地址](http://7u2snw.com1.z0.glb.clouddn.com/preview.gif)

### 功能列表
* 快速搜索
* 书签的导入和搜索
* 支持打开本地文件(需提前添加)


#### 快速搜索
> 【搜索前置字符】 + 【空格】 + 【搜索内容】组成
* 例如: 输入"s electron"按回车,会使用stackoverflow搜索electron
* 常用的一些搜索可在"设置"中查看

#### 书签的导入和搜索
1. 输入"bookmark"回车,选中浏览器导出的书签(.html格式文件)进行导入
2. 导入成功后可根据关键字查找匹配的书签,并快速在浏览器中打开

#### 打开本地文件
1. 输入quickstart,跳转"添加快速启动页面" 
2. 添加本地文件路径(如:将qq可执行文件拖入指定区域)
3. 输入"qq",选中"打开qq.exe"按回车就可以启动qq

#### Build Setup
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

```










