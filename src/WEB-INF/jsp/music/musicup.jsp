<%-- 
    Document   : musicup
    Created on : 2013-5-25, 0:24:56
    Author     : ghy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <form id="uploadform" name="uploadform" method="POST" action="musicUpServer" ENCTYPE="multipart/form-data" target="hidden_frame">
            <input id="chose-input" name="filename" size="40" type="file"  >
            <iframe name='hidden_frame' id="hidden_frame" style='display: none'></iframe>
            <input type="submit" value="提交"/>
            <button id="close-up">给我消失</button>
        </form>

        <script type="text/javascript" src="js/jquery.js"></script>
        <script type="text/javascript" src="js/music/musicup.js"></script>
    </body>
</html>
