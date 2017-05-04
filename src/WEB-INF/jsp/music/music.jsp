<%-- 
    Document   : musicjsp
    Created on : 2013-5-22, 17:52:13
    Author     : windows 7
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>小清新播放器</title>
        <link type="text/css" href="css/music/music.css" rel="stylesheet"/>
        <meta content="width=device-width, initial-scale=0.6" name="viewport">
    </head>
    <body>
        <div id="wrapper">
            <h1>小清新播放器</h1>
            <audio preload></audio>
            <ol>
                <li><a href="#" data-src="music/雷阵雨.mp3">梁静茹-偶阵雨</a></li>
                <li><a href="#" data-src="music/NOVA - 我忘了.mp3">NOVA - 我忘了</a></li>
                <li><a href="#" data-src="music/刘力扬 - 旅途.mp3">刘力扬 - 旅途</a></li>
                <li><a href="#" data-src="music/原声带-天使にふれたよ!(《轻音少女》插曲).mp3">原声带-天使にふれたよ!(《轻音少女》插曲)</a></li>
            </ol>
        </div>
        <div id="shortcuts">
            <div>
                <h1>键盘上按键:</h1>
                <p><em>&rarr;</em> 下一首</p>
                <p><em>&larr;</em> 上一首</p>
                <p><em>空格</em> 播放/暂停</p>
            </div>
        </div>
        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/music/audio.min.js"></script>
        <script type="text/javascript" src="js/music/music.js"></script>
    </body>
</html>