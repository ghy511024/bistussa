window.xxx={};
(function(){
    var _this
    window.xxx=function(){
        _this=this;
        this.inint();
    }
    xxx.prototype={
        constructor:xxx,
        inint:function(){
            this.inintEvent();
              var x;
            var m="我好";
            console.log(" x:"+x+" m: "+m)
        },
        inintEvent:function(){
            $(".edit_btn").live("click",function(e){
                _this._edite(this)
            }) 
            $(".edit_btn").live("click",function(e){
//                _this._edite(this)
                }) 
            $(".edit_btn").live("click",function(e){
//                _this._edite(e)
                }) 
            $(".cancel_btn").live("click",function(e){
                _this._cnacel(this)
                }) 
            
        },
        _add:function(){
          
            
        },
        _delate:function(){},
        _edite:function(e){
            var parent=$(e).parent().parent();
            console.log($(parent).attr("_id"))
            $(".edit").find("input").attr("disabled","true").removeClass("edit")
            parent.addClass("edit").find("input").removeAttr("disabled");
        },
        _cnacel:function(e){
            var parent=$(e).parent().parent();
            parent.removeClass("edit");
        },
        _save:function(){
            $.ajax({
                url:"",
                type:"post",
                data:({}),
                statusCode: {
                    404: function() {
                        alert('page not found');
                    }
                },
                success:function(data){}
            })
        }
    }
})();
$(document).ready(function(){
    window.myxxx=new xxx();
})