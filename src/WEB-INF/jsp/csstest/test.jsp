<%-- 
    Document   : test
    Created on : 2013-4-27, 10:17:56
    Author     : windows 7
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link type="text/css" href="${root}css/csstest/style1.css" rel="stylesheet"/>
        <!--<link type="text/css" href="${root}less/csstest/test.scss" rel="stylesheet"/>-->
        <title>test</title>
    </head>
    <body>
        <div id="head"></div>
        <div id="content">   
            <div class="logo"><a href="###" id="test">SSA</a></div>
            <nav class="menu-icon">
                <a class="menu-enabled">&nbsp;</a>
                <a class="link-disabled" target="_blank">&nbsp;</a>
                <a class="prev-disabled" data-context="project">&nbsp;</a>
                <a class="next-disabled" data-context="project">&nbsp;</a>
                <a class="back-enabled" data-context="timeline" href="http://www.czk.fr">&nbsp;</a>
            </nav>
            <div class="point time hide">
                <img src="http://www.czk.fr/bin/images/icones/aiguille-petite.png" width="120" height="120" alt="Aiguille des heures" class="icon-aiguille">
                <img src="http://www.czk.fr/bin/images/icones/aiguille-grande.png" width="120" height="120" alt="Aiguille des minutes" class="icon-trotteuse">
            </div>
            <div class="line"></div>
            <!--            <div class="nanv-item item">
                            <div class="pastille">
                                <img src="http://www.czk.fr/bin/images/icones/oeil.png" height="14" width="22" alt="En savoir plus">
                            </div>
                        </div>-->
            <div class="content-inner op-hide">
                <div class="prev fade">
                    <img src="http://www.czk.fr/bin/images/icones/prev-arrow.png" width="20" height="14" alt="suivant">
                </div>
                <div class="next">
                    <img src="http://www.czk.fr/bin/images/icones/next-arrow.png" width="20" height="14" alt="précédent">
                </div>
                <div class="inf nav-inf-0 item-hide" page="0" >
                    <div class="item item0" >
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>javaweb</h2>
                            <p>一直从事java开发....</p>
                        </div>
                    </div>
                    <div class="item item1" >
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>html/css</h2>
                            <p>我不是java架构师，但我是前端工程师</p>
                        </div>
                    </div>
                    <div class="item item2" >
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>javascript/jQuery</h2>
                            <p>追求更卓越更简洁的代码，创造更通用更实用的插件</p>
                        </div>
                    </div>
                    <div class="item item3">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>spring mvc</h2>
                            <p>基于mvc 的架构能让项目业务开发更快。可以舍弃java但我离不开mvc</p>
                        </div>
                    </div>
                    <div class="item item4">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>maven</h2>
                            <p>maven 让我跨入一个新的领域，拜托一个工程因为依赖关系而给移植带来的各种麻烦</p>
                        </div>
                    </div>
                    <div class="item item5">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>hibernate/mysql</h2>
                            <p></p>
                        </div>
                    </div>
                    <div class="item item6">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>mongodb</h2>
                            <p>工作中 使用的数据库，</p>
                        </div>
                    </div>
                    <div class="item item7">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>linux</h2>
                            <p></p>
                        </div>
                    </div>
                    <div class="item item8">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>glassfish</h2>
                            <p></p>
                        </div>
                    </div>
                    <div class="item item9">
                        <div class="pastille"><a href="#"></a></div>
                        <div class="text">
                            <h2>nginx</h2>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="pro">
                </div>

            </div>
        </div>
        <script type="text/javascript" src="${root}js/jquery-1.8.3.min.js"></script>
        <script>
            $(document).ready(function(){
                var allpage=3;//(从零开始)
                var cpage=0;
                $("#test").click(function(){
                    $(".line").toggleClass("line1");
                    $(".point").removeClass("hide");
                    setTimeout(function(){
                        $(".point").fadeOut(1000);
                        $(".hide").removeClass("hide");
                    },1000)
                })
                $(".next").click(function(){
                    var page=Number($(".inf").attr("page"));
                    $(".prev").removeClass("fade");
                    if(page<allpage-1){
                        console.log("正常执行...."+page);
                        $(".next").removeClass("fade");
                    }
                    else{
                        console.log("执行到最大数了..."+page);
                        $(".next").addClass("fade");
                    }
                    $(".inf").attr("page",(page+1))
                    $(".inf").removeClass("nav-inf-"+page)
                    $(".inf").addClass("nav-inf-"+(page+1));
                })    
                $(".prev").click(function(){
                    var page=Number($(".inf").attr("page"));
                    $(".next").removeClass("fade");
                    if(page>1){
                       
                    }
                    else{
                        console.log("执行到最大数了..."+page);
                        $(".prev").addClass("fade");
                    }
                    $(".inf").attr("page",(page-1))
                    $(".inf").removeClass("nav-inf-"+page);
                    $(".inf").addClass("nav-inf-"+(page-1));
                })   
                setTimeout(function(){
                    $(".op-hide").removeClass("op-hide");
                    $(".item-hide").removeClass("item-hide");
                },2000)
            })
        </script>
    </body>
</html>
