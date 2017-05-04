<%-- 
    Document   : chinamap
    Created on : 2013-4-15, 17:50:13
    Author     : windows 7
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
    <head>
        <title>统计图</title>
        <link href="css/chinamap/jquery.vector-map.css" media="screen" rel="stylesheet" type="text/css" />
        <script src="js/chinamap/jquery-1.6.min.js" type="text/javascript"></script>
        <script src="js/chinamap/jquery.vector-map.js" type="text/javascript"></script>
        <script src="js/chinamap/china-zh.js" type="text/javascript"></script>
        <script type="text/javascript">
            $(function () {
                //数据可以动态生成，格式自己定义，cha对应china-zh.js中省份的简称
            });
      
        </script>
        <script type="text/javascript">
            $(function () {
                var chart;
                $(document).ready(function() {
                   
                });
    
            });
        </script>
    </head>
    <body>
        <div id="container" style="margin-left: 45px; padding-top: 10px; padding-left: 10px;
             background: white; width: 650px; height: 530px;">
        </div>
        <button id="test">test</button>
        <script src="${contextRoot}js/chinamap/highcharts.js"></script>
        <script src="${contextRoot}js/chinamap/exporting.js"></script>
        <script src="${contextRoot}js/chinamap/chinaMap.js"></script>
        <div id="container2" style="min-width: 400px; height: 400px; margin: 0 auto"></div>
    </body>
</html>