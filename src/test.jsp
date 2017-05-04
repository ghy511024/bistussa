<%-- 
    Document   : test
    Created on : 2013-5-20, 11:29:13
    Author     : ghy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
        <link rel="stylesheet" type="text/css" href="css/test.css" media="all" />
    </head>
    <body>
        <div class="content">
            <div class="parent">
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="item"></div>
                <div class="clear"></div>
            </div>
        </div>
        <a id="test" href="http://tieba.baidu.com/p/2844440201" target="_blank">sdfsdf</a>
        <script type="text/javascript" src="js/jquery-1.8.3.min.js"></script>
        <script type="text/javascript" >
            window.open("http://tieba.baidu.com/p/2844440201","")
          $("#test").trigger("click");
          $("#test").click();
        </script>
    </body>
</html>
