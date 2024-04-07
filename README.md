# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

## 部署 （1、2 部只需要执行一次

1. 手动找到你的本地 node_modules/react-hydratable/src/crawler.js
2. 找到下面的代码，将 excutablePath 换成你本地 chrome 的启动路径，如果你本地没有装 chrome 按理 puppeteer 应该会自动下载 chrome.

```
const startCrawler = async (
 host,
 urls,
 outputRoot,
 delayTime,
 userAgent,
 htmlPrefix,
 pageCount
) => {
 console.log('Crawling: start');

 const browser = await puppeteer.launch({
   args: ['--disable-web-security'],
   executablePath:'C:\/Program Files\/Google\/Chrome\/Application\/chrome.exe'
 });
```

3. 如果没有初始化 ookini-production 项目，执行 ```git submodule update```
4. 执行 ```npm run build ```就会自动构建上传和部署到服务器
