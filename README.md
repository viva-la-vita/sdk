# 生如夏花 API

生如夏花 API 使得开发者们可以以编程的方式访问生如夏花的各项资源。目前，API 提供文档下载功能，更多功能也会陆续上线。

## 安装

```bash
npm install viva-la-vita
```

## 使用

您需要指定一个文件夹（绝对路径或相对路径）用于下载。

一行代码下载整个生如夏花知识库：

```javascript
require('viva-la-vita').downloadWiki('test');
```

一行代码下载整个生如夏花主页：

```javascript
require('viva-la-vita').downloadMeta('test');
```

