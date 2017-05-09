window.musicup={};
(function(){
    var _this;
    window.musicup=function(){
        _this=this;
        _this._inint();
    }
    musicup.prototype={
        
        _inint:function(){
            _this._layout();
            _this._inintEvent();
        },
        _layout:function(){},
        _inintEvent:function(){}
    }
})()
$(document).ready(function(){
    window.mymusicup=new musicup();
})