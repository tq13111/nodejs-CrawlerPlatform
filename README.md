## 协议
    本协议使用HTTP/1.1协议进行通讯，通过约定一系列的接口，实现爬虫微服务与聚合推荐系统的数据共通与同步 
    协议名称：FULL_NET_SPIDER_PROTOCOL/0.1

## 服务发现：
    为满足聚合推荐服务发现合规的爬虫，并进行数据拉取的操作，所需要的服务发现和注册 数据同步：本服务规定了一系列的数据同步规则，用于在聚合推荐服务和爬虫之间交换数据

## 聚合推荐服务接口约定
### 注册服务接口：
```
PATH: /api/admin/spider
METHOD: POST
CONTENT-TYPE: application/json
REQUEST-BODY:
{
    service: {
        name: String, // 服务名，不能与数据库中现有服务重名
        validationUrl, // 验证URL，爬虫服务需要在该URL被访问时采取正确的回应
    }
}
SUCCESS-RESPONSE-BODY:
    {
        code:0,
    }
ERROR-RESPONSE-BODY:
    {
        code: errorCode,
        msg: errorMsg,
    }
```

## 数据结构约定
### 单条内容数据结构
符合本平台推荐内容的数据，结构应该如下：
```
title: {
    type: String, required: true,
}
contentType: { type: String, } // link, full-text, dom, video, audio
content: { type: Mixed, },
tags: [{
    name: String,
    value: String,
    score: Number,
}],
contentId: String,
source: {
    type: String, 
    required: true
}
```