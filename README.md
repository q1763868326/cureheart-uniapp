# cureheart-uniapp
Uniapp制作的 cureheart项目

- ### 2020.5.30 music板块实现在线搜索音乐功能并支持多种音质音乐的下载，体验地址

<html>
<a href="http://116.62.47.156/static/cureheart/#/pages/music/music">网页链接</a>
</html>

---

#### QQ音乐抓包主要过程

##### 开始搜索
##### https://c.y.qq.com/soso/fcgi-bin/client_search_cp?p=1&n=10&w=搜索值

##### 得到songmid
id=songmid
https://api.qq.jsososo.com/song/urls?id=003YC3p31HyR96,003KExF60zMMGK

##### 得到下载地址如下
{"data":{"003YC3p31HyR96":"https://dl.stream.qqmusic.qq.com/C400003PqNcI3aDlfY.m4a?guid=2796982635&vkey=52CC2BA86FB7295A866B7E28732B54C3205816D179F72363154164DC41D496A439745C9C9B65A827540883296763F443BE17BE6830BB4DEB&uin=1899&fromtag=66}

---

- ### 2020.5.15 实现了在线聊天功能，方法采用轮询
<html>
<a href="http://116.62.47.156/static/cureheart/">网页链接</a>
</html>

- ##### 体验的话需要登陆
