<%-- 
    Document   : blog
    Created on : 2013-5-26, 20:16:25
    Author     : ghy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/imgslide/common.css" media="all" />
        <link rel="stylesheet" type="text/css" href="css/bootstrap/bootstrap.min.css" media="all" />
        <link rel="stylesheet" type="text/css" href="css/blog/blog.css" media="all" />
        <title>netbeans 安装sass插件</title>
    </head>
    <body>
        <div id="head">
            <div id="head-inner">
                <ul id="head-nav">
                    <li><a href="home.htm">主页</a></li>
                    <li><a>博客</a></li>
                    <li><a>插件</a></li>
                </ul>
            </div>
        </div>
        <div id="content">
            <h3>netbeans 安装 sass插件</h3>
            <h4>
                使用scss来重构你的代码
            </h4>
            <p>
                对于sass只能说相见恨晚，或许他就是下一代网页开发技术。关于sass是什么，怎么用，这儿不多介绍，可以百度一下，这儿主要介绍怎么在集成环境中怎么安装sass插件，让我们写出结构和兼容性良好的代码，并且提高我们的开发效率

            </p>
            <h4>什么是scss,sass?</h4>
            <p>
                SASS是CSS3的一个扩展，增加了规则嵌套、变量、混合、选择器继承等等。通过使用命令行的工具或WEB框架插件把它转换成标准的、格式良好的CSS代码。</br>
                SCSS即是SASS的新语法，是Sassy CSS的简写，是CSS3语法的超集，也就是说所有有效的CSS3样式也同样适合于SASS。
            </p>
            <h4>
                1: 安装 ruby
            </h4>
            <p>
                由于SASS是基于ruby的，所以事先需要安装ruby环境点击<a href="http://219.239.26.14/download/43296773/63389885/2/exe/171/168/1367636085163_936/rubyinstaller-2.0.0-p0.exe      
                                                  ">这儿</a>下载,去官网下载最新版的ruby。
            </p>
            <p>
                安装完ruby后，在cmd命令行切换到ruby安装的bin目录下然后通过gem来安装sass</br>
                <img class="step1" src="images/blog/step1.png"></img>
            </p>
            <h4>
                2:安装netbeans sass插件
            </h4>
            <p>
                下载netbeans sass插件<a href="http://code.google.com/p/scss-editor/downloads/list">点击这儿</a>下载适合你netbeans版本的插件
            </p>
            <p>
                netbeans 安装插件</br>
                <img  class="step2" src="images/blog/step2.png"></img>
            </p>
            <p>
                装好插件后，添加scss类库</br>
                <img  class="step2" src="images/blog/step3.png"></img>
            </p>
            <h4>3:编辑scss</h4>
            <p>
                装好scss插件后开始你的scss之旅吧</br>
                <img  class="step2" src="images/blog/step4.png"></img>
            </p>
        </div>

    </body>
</html>
