//
// site.js
//
// the arbor.js website
//
(function($){
  
  var imageObj = new Image();
  var Renderer = function(elt){
    var dom = $(elt)
    var canvas = dom.get(0)
    var ctx = canvas.getContext(
    "2d");
    var gfx = arbor.Graphics(canvas)
    var sys = null
    var _vignette = null
    var selected = null,
        nearest = null,
        _mouseP = null;

    
    var that = {
      init:function(pSystem){
        sys = pSystem
        sys.screen({size:{width:dom.width(), height:dom.height()},
                    padding:[36,60,36,60]})

        $(window).resize(that.resize)
        that.resize()
        that._initMouseHandling()

        if (document.referrer.match(/echolalia|atlas|halfviz/)){
          // if we got here by hitting the back button in one of the demos, 
          // start with the demos section pre-selected
          that.switchSection('part')
        }
      },
      resize:function(){
        canvas.width = $(window).width()
        canvas.height = .75* $(window).height()
        sys.screen({size:{width:canvas.width, height:canvas.height}})
        _vignette = null
        that.redraw()
      },
      redraw:function(){
        gfx.clear()
        sys.eachEdge(function(edge, p1, p2){
          if (edge.source.data.alpha * edge.target.data.alpha == 0) return
          gfx.line(p1, p2, {stroke:"#b2b19d", width:2, alpha:edge.target.data.alpha})
        })
        sys.eachNode(function(node, pt){
          var w = Math.max(20, 20+gfx.textWidth(node.name) )
          if (node.data.alpha===0) return
          if (node.data.shape=='dot'){
          
             if(node.data.img!=undefined){
                 gfx.rect(pt.x-w/2, pt.y-8, w, 20, 4, {fill:node.data.color, alpha:node.data.alpha})
            gfx.text(node.name, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
            gfx.text(node.name, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
//                  ctx.drawImage(node.data.img, pt.x-(w)/2, pt.y-(w)/2,w, w);
                
              }
              else{
             gfx.oval(pt.x-(w+40)/2, pt.y-(w+40)/2, w+40, w+40, {fill:node.data.color, alpha:node.data.alpha})
            gfx.text(node.name, pt.x, pt.y+7, {color:"white", align:"center", font:"Arial", size:28})
            gfx.text(node.name, pt.x, pt.y+7, {color:"white", align:"center", font:"Arial", size:28})
              }
          }else{
               if(node.data.img!=undefined){
                  ctx.drawImage(node.data.img, pt.x-(w)/2, pt.y-(w)/2,w, w);
//                  gfx.rect(pt.x-w/2+4, pt.y+20, w-8, 16, 4, {fill:node.data.color, alpha:node.data.alpha})
//                   gfx.text(node.name, pt.x, pt.y+35, {color:"white", align:"center", font:"Arial", size:6})
              }
              else{
            gfx.rect(pt.x-w/2, pt.y-8, w, 20, 4, {fill:node.data.color, alpha:node.data.alpha})
            gfx.text(node.name, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})
            gfx.text(node.name, pt.x, pt.y+9, {color:"white", align:"center", font:"Arial", size:12})}
          }
          
        })
        that._drawVignette()
      },
      
      _drawVignette:function(){
        var w = canvas.width
        var h = canvas.height
        var r = 0

        if (!_vignette){
          var top = ctx.createLinearGradient(0,0,0,r)
          top.addColorStop(0, "#e0e0e0")
          top.addColorStop(.7, "rgba(255,255,255,122)")

                
                var bot = ctx.createLinearGradient(0,h-r,0,h)
          bot.addColorStop(0, "rgba(255,255,255,122)")
          bot.addColorStop(1, "white")

          _vignette = {top:top, bot:bot}
        }
        
        // top
        ctx.fillStyle = _vignette.top
        ctx.fillRect(0,0, w,r)

        // bot
        ctx.fillStyle = _vignette.bot
        ctx.fillRect(0,h-r, w,r)
      },

      switchMode:function(e){
        if (e.mode=='hidden'){
          dom.stop(true).fadeTo(e.dt,0, function(){
            if (sys) sys.stop()
            $(this).hide()
          })
        }else if (e.mode=='visible'){
          dom.stop(true).css('opacity',0).show().fadeTo(e.dt,1,function(){
            that.resize()
          })
          if (sys) sys.start()
        }
      },
      
      switchSection:function(newSection){
        var parent = sys.getEdgesFrom(newSection)[0].source
        var children = $.map(sys.getEdgesFrom(newSection), function(edge){
          return edge.target
        })
        
        sys.eachNode(function(node){
          if (node.data.shape=='dot') return // skip all but leafnodes

          var nowVisible = ($.inArray(node, children)>=0)
          var newAlpha = (nowVisible) ? 1 : 0
          var dt = (nowVisible) ? .5 : .5
          sys.tweenNode(node, dt, {alpha:newAlpha})

          if (newAlpha==1){
            node.p.x = parent.p.x + .05*Math.random() - .025
            node.p.y = parent.p.y + .05*Math.random() - .025
            node.tempMass = .001
          }
        })
      },
      
      
      _initMouseHandling:function(){
        // no-nonsense drag and drop (thanks springy.js)
        selected = null;
        nearest = null;
        var dragged = null;
        var oldmass = 1

        var _section = null

        var handler = {
          moved:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            nearest = sys.nearest(_mouseP);

            if (!nearest.node) return false

            if (nearest.node.data.shape!='dot'){
              selected = (nearest.distance < 50) ? nearest : null
              if (selected){
                 dom.addClass('linkable')
                 window.status = selected.node.data.link.replace(/^\//,"http://"+window.location.host+"/").replace(/^#/,'')
              }
              else{
                 dom.removeClass('linkable')
                 window.status = ''
              }
            }else if ($.inArray(nearest.node.name, ['S S A','部门','关于','成果','活动']) >=0 ){
              if (nearest.node.name!=_section){
                _section = nearest.node.name
                that.switchSection(_section)
              }
              dom.removeClass('linkable')
              window.status = ''
            }
            
            return false
          },
          clicked:function(e){
            var pos = $(canvas).offset();
            _mouseP = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)
            nearest = dragged = sys.nearest(_mouseP);
            
            if (nearest && selected && nearest.node===selected.node){
              var link = selected.node.data.link
              if (link.match(/^#/)){
                 $(that).trigger({type:"navigate", path:link.substr(1)})
              }else{
                 window.location = link
              }
              return false
            }
            
            
            if (dragged && dragged.node !== null) dragged.node.fixed = true

            $(canvas).unbind('mousemove', handler.moved);
            $(canvas).bind('mousemove', handler.dragged)
            $(window).bind('mouseup', handler.dropped)

            return false
          },
          dragged:function(e){
            var old_nearest = nearest && nearest.node._id
            var pos = $(canvas).offset();
            var s = arbor.Point(e.pageX-pos.left, e.pageY-pos.top)

            if (!nearest) return
            if (dragged !== null && dragged.node !== null){
              var p = sys.fromScreen(s)
              dragged.node.p = p
            }

            return false
          },

          dropped:function(e){
            if (dragged===null || dragged.node===undefined) return
            if (dragged.node !== null) dragged.node.fixed = false
            dragged.node.tempMass = 1000
            dragged = null;
            // selected = null
            $(canvas).unbind('mousemove', handler.dragged)
            $(window).unbind('mouseup', handler.dropped)
            $(canvas).bind('mousemove', handler.moved);
            _mouseP = null
            return false
          }


        }

        $(canvas).mousedown(handler.clicked);
        $(canvas).mousemove(handler.moved);

      }
    }
    
    return that
  }
  
  
  var Nav = function(elt){
    var dom = $(elt)

    var _path = null
    
    var that = {
      init:function(){
        $(window).bind('popstate',that.navigate)
        dom.find('> a').click(that.back)
        $('.more').one('click',that.more)
        
        $('#docs dl:not(.datastructure) dt').click(that.reveal)
        that.update()
        return that
      },
      more:function(e){
        $(this).removeAttr('href').addClass('less').html('&nbsp;').siblings().fadeIn()
        $(this).next('h2').find('a').one('click', that.less)
        
        return false
      },
      less:function(e){
        var more = $(this).closest('h2').prev('a')
        $(this).closest('h2').prev('a')
        .nextAll().fadeOut(function(){
          $(more).text('creation & use').removeClass('less').attr('href','#')
        })
        $(this).closest('h2').prev('a').one('click',that.more)
        
        return false
      },
      reveal:function(e){
        $(this).next('dd').fadeToggle('fast')
        return false
      },
      back:function(){
        _path = "/"
        if (window.history && window.history.pushState){
          window.history.pushState({path:_path}, "", _path);
        }
        that.update()
        return false
      },
      navigate:function(e){
        var oldpath = _path
        if (e.type=='navigate'){
          _path = e.path
          if (window.history && window.history.pushState){
             window.history.pushState({path:_path}, "", _path);
          }else{
            that.update()
          }
        }else if (e.type=='popstate'){
          var state = e.originalEvent.state || {}
          _path = state.path || window.location.pathname.replace(/^\//,'')
        }
        if (_path != oldpath) that.update()
      },
      update:function(){
        var dt = 'fast'
        if (_path===null){
          // this is the original page load. don't animate anything just jump
          // to the proper state
          _path = window.location.pathname.replace(/^\//,'')
          dt = 0
          dom.find('p').css('opacity',0).show().fadeTo('slow',1)
        }

        switch (_path){
          case '':
          case '/':
          dom.find('p').text('a graph visualization library using web workers and jQuery')
          dom.find('> a').removeClass('active').attr('href','#')

          $('#docs').fadeTo('fast',0, function(){
            $(this).hide()
            $(that).trigger({type:'mode', mode:'visible', dt:dt})
          })
          document.title = "arbor.js"
          break
          
          case 'introduction':
          case 'reference':
          $(that).trigger({type:'mode', mode:'hidden', dt:dt})
          dom.find('> p').text(_path)
          dom.find('> a').addClass('active').attr('href','#')
          $('#docs').stop(true).css({opacity:0}).show().delay(333).fadeTo('fast',1)
                    
          $('#docs').find(">div").hide()
          $('#docs').find('#'+_path).show()
          document.title = "arbor.js » " + _path
          break
        }
        
      }
    }
    return that
  }
  
  $(document).ready(function(){
    var IMG={
        "wlsrc":"images/mid-50/wl.png",
        "wlbsrc":"images/mid-50/wlb.png",
        "kfsrc":"images/mid-50/kf.png",
        "mgsrc":"images/mid-50/mg.png",
        "hcsrc":"images/mid-50/hc.png",
        "bgssrc":"images/mid-50/bgs.png",
        "zxtsrc":"images/mid-50/zxt.png",
        "jcsrc":"images/mid-50/jc.png",
        "wlimg":new Image(),
        "wlbimg":new Image(),
        "kfimg":new Image(),
        "mgimg":new Image(),
        "zxtimg":new Image(),
        "hcimg":new Image(),
        "bgsimg":new Image(),
        "jcimg":new Image()
    }
    IMG.wlimg.src=IMG.wlsrc;
    IMG.wlbimg.src=IMG.wlbsrc;
    IMG.kfimg.src=IMG.kfsrc;
    IMG.jcimg.src=IMG.jcsrc;
    IMG.zxtimg.src=IMG.zxtsrc;
    IMG.bgsimg.src=IMG.bgssrc;
    IMG.hcimg.src=IMG.hcsrc;
    IMG.mgimg.src=IMG.mgsrc;
    var CLR = {
      gy:"#8cecf7",
      cg:"#e0a2f4",
      hd:"#bae857",
      bm:"#a7af00"
    }
    var direct="department.html?target="
    var theUI = {
        
        
      nodes:{"S S A":{color:"orange", shape:"dot", alpha:1}, 
//             加入我们:{color:CLR.branch, shape:"dot", alpha:1}, 
             部门:{color:CLR.bm,  shape:"dot", alpha:1,link:direct+'WLB'}, 
             网络部:{color:CLR.bm,  alpha:0, link:direct+'WLB',img:IMG.wlimg},
             开发部:{color:CLR.bm, alpha:0, link:direct+'KFB',img:IMG.kfimg },
             主席团:{color:CLR.bm, alpha:0, link:direct+'ZXT',img:IMG.zxtimg},
             外联部:{color:CLR.bm, alpha:0, link:direct+'WL',img:IMG.wlbimg},
             办公室:{color:CLR.bm, alpha:0, link:direct+'BGS',img:IMG.bgsimg},
             美工部:{color:CLR.bm, alpha:0, link:direct+'MGB',img:IMG.mgimg},
             活动部:{color:CLR.bm, alpha:0, link:direct+'MGB',img:IMG.hcimg},
//     ====================关于==================
             关于:{color:CLR.gy, shape:"dot", alpha:1}, 
             我们:{color:CLR.gy, alpha:0, link:'about.html'},
             科协:{color:CLR.gy, alpha:0, link:'about.html'},
             前辈:{color:CLR.gy, alpha:0, link:'about.html'},
//     ==========================活动=============
             活动:{color:CLR.hd, shape:"dot", alpha:1,link:'#'},
             近期活动:{color:CLR.gy, alpha:0, link:"active.html"},
//     =======================成果===============
             成果:{color:CLR.cg, shape:"dot", alpha:1,link:'#'},
//     =======================博客===============
             博客:{color:CLR.cg,  alpha:1,link:'blog.htm'}
            },
            
            
      edges:{
        "S S A":{
          部门:{length:1.9},
          关于:{length:1.8},
          成果:{length:1.8},
          活动:{length:4.8}
        },
        部门:{开发部:{},
               网络部:{},
               主席团:{},
               办公室:{},
               外联部:{},
               美工部:{},
               活动部:{}
        },
        关于:{我们:{},
              科协:{},
              前辈:{}
        },
        活动:{
            近期活动:{}
        },
        成果:{
           博客:{}
        }
      }
    }


    var sys = arbor.ParticleSystem()
    sys.parameters({stiffness:900, repulsion:2000, gravity:true, dt:0.015})
    sys.renderer = Renderer("#sitemap")
    sys.graft(theUI)
    var nav = Nav("#nav")
    $(sys.renderer).bind('navigate', nav.navigate)
    $(nav).bind('mode', sys.renderer.switchMode)
    nav.init()
  })
})(this.jQuery)