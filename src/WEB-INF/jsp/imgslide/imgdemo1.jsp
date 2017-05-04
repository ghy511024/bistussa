<%-- 
    Document   : slide1
    Created on : 2013-5-26, 10:47:50
    Author     : ghy
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <link rel="stylesheet" type="text/css" href="css/imgslide/common.css" media="all" />
        <link rel="stylesheet" type="text/css" href="css/imgslide/style.css" media="all" />
        <link rel="stylesheet" type="text/css" href="css/imgslide/global.css" media="all" />
        <title>JSP Page</title>
        <script src="js/jquery.js"></script>
        <script src="js/imgslide/slides.min.jquery.js"></script>
        <script>
            $(function(){
                $('#slides').slides({
                    preload: true,
                    preloadImage: 'img/loading.gif',
                    play: 5000,
                    pause: 2500,
                    hoverPause: true,
                    animationStart: function(current){
                        $('.caption').animate({
                            bottom:-35
                        },100);
                        if (window.console && console.log) {
                            // example return of current slide number
                            console.log('animationStart on slide: ', current);
                        };
                    },
                    animationComplete: function(current){
                        $('.caption').animate({
                            bottom:0
                        },200);
                        if (window.console && console.log) {
                            // example return of current slide number
                            console.log('animationComplete on slide: ', current);
                        };
                    },
                    slidesLoaded: function() {
                        $('.caption').animate({
                            bottom:0
                        },200);
                    }
                });
            });
        </script>
    </head>
    <body>
        <div id="head"></div>
        <div id="content">
            <div class="demo">
                <div id="slides">
                    <div class="slides_container">
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/jliba/4665625073/" title="145.365 - Happy Bokeh Thursday! | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-1.jpg" width="570" height="270" alt="Slide 1"></a>
                            <div class="caption" style="bottom:0">
                                <p>Happy Bokeh Thursday!</p>
                            </div>
                        </div>
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/stephangeyer/3020487807/" title="Taxi | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-2.jpg" width="570" height="270" alt="Slide 2"></a>
                            <div class="caption">
                                <p>Taxi</p>
                            </div>
                        </div>
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/childofwar/2984345060/" title="Happy Bokeh raining Day | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-3.jpg" width="570" height="270" alt="Slide 3"></a>
                            <div class="caption">
                                <p>Happy Bokeh raining Day</p>
                            </div>
                        </div>
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/b-tal/117037943/" title="We Eat Light | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-4.jpg" width="570" height="270" alt="Slide 4"></a>
                            <div class="caption">
                                <p>We Eat Light</p>
                            </div>
                        </div>
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/bu7amd/3447416780/" title="&ldquo;I must go down to the sea again, to the lonely sea and the sky; and all I ask is a tall ship and a star to steer her by.&rdquo; | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-5.jpg" width="570" height="270" alt="Slide 5"></a>
                            <div class="caption">
                                <p>&ldquo;I must go down to the sea again, to the lonely sea and the sky...&rdquo;</p>
                            </div>
                        </div>
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/streetpreacher/2078765853/" title="twelve.inch | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-6.jpg" width="570" height="270" alt="Slide 6"></a>
                            <div class="caption">
                                <p>twelve.inch</p>
                            </div>
                        </div>
                        <div class="slide">
                            <a href="http://www.flickr.com/photos/aftab/3152515428/" title="Save my love for loneliness | Flickr - Photo Sharing!" target="_blank"><img src="img/slide-7.jpg" width="570" height="270" alt="Slide 7"></a>
                            <div class="caption">
                                <p>Save my love for loneliness</p>
                            </div>
                        </div>
                    </div>
                    <a href="#" class="prev"><img src="img/arrow-prev.png" width="24" height="43" alt="Arrow Prev"></a>
                    <a href="#" class="next"><img src="img/arrow-next.png" width="24" height="43" alt="Arrow Next"></a>
                </div>
            </div>
        </div>
    </body>
</html>
