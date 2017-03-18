### 介绍
基于发布/订阅机制实现了一个消息交换平台，该平台使用http协议进行数据交换。使用该平台，用户可以轻松的搭建消息通信管道，为用户建立分布式平台提供便利。

### 使用

    npm install
    node index.js

### 服务
* publish (exchange) -> channel

提供数据通信管道的发布服务。

* subscribe (exchange) -> channel

提供数据通信管道的订阅服务。

* push (channel, message) -> channel

提供数据通信管道的数据推送服务。

* fetch (channel) -> message

提供数据通信管道的数据接收服务。

