window.department={
    "authour":"ghy"
};
(function(){
    var _this;
    var b=true;
    department=function(){
        _this=this;
        this.inintEvent()
    }
    department.prototype={
        constructor:department,
        inint:function(target){
            if(target!=null){
                $("#"+target).addClass("current-part");
                this.showPartment(target);
            }
        },
        inintEvent:function(){
        
        },
        showPartment:function(partment){
            
            var tmp=$(".current-part").attr("id");
            if(tmp==partment){
                $("#"+partment).slideDown(500,"easeInOutSine", function(){
                    $(this).addClass("current-part");
                })  
            }
            else{
                if(b){
                    b=false;
                    $("#"+tmp).find("img").fadeOut(400);
                    $("#"+tmp).slideUp(500,"easeInOutSine", function(){
                        $(".current-part").removeClass("current-part");
                        $("#"+partment).find("img").fadeIn(400);
                        $("#"+partment).slideDown(700,"easeInOutSine", function(){
                             
                            $(this).addClass("current-part");
                            b=true
                        })  
                    }) 
                }
            }
        },
        hidepartment:function(partment){
            $("#"+partment).slideToggle(2000,"easeOutElastic", function(){
                })    
        }
    }

})()
$(function(){
    
    var str=document.URL+"";
    var target=str.split("=");
    window.mydepartment=new department();
    target[1]==null?(mydepartment.inint("WLB")):
    mydepartment.inint(target[1]);
})


