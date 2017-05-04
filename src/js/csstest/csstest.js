window.home={};
(function(){
    var _this;
    window.home=function(){
        _this=this;
        _this._inint();
    }
    home.prototype={
        
        _inint:function(){
            _this._layout();
            _this._inintEvent();
        },
        _layout:function(){},
        _inintEvent:function(){}
    }
})()
$(document).ready(function(){
    window.myhome=new home();
})
