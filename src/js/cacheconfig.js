window.dataManager={};
(function(){
    var _this
    window.dataManager=function(options){
        _this=this;
        this._inint(options);
    }
    dataManager.prototype={
        defaults:{//默认属性
            interface_url:"提交接口url",
            new_item:$(".new-item"),
            add_new_item_btn:$("#add_new_btn"),//向数据库中添加一个新数据 对应插入操作
            add_btn:"",
            edit_btn:$(".edit_btn"),
            del_btn:$(".del_btn"),
            save_btn:$(".save_btn"),
            cancel_btn:$(".cancel_btn"),
            add_fildes_btn:$(".add-fildes")//添加一个子选项
        },
        constructor:dataManager,
        _inint:function(options){
            this.options=$.extend(true,{},_this.defaults,options)
            this._inintEvent();
            
            $("input").each(function(){
                $(this).attr("data",$(this).val()||"").attr("disabled","true")
            })
            $("textarea").each(function(){
                $(this).attr("data",$(this).val()||"").attr("disabled","true")
            })
        },
        //加载事件
        _inintEvent:function(){
            var _id,_data,_op;
            //展开一个增加面板
            _this.options.add_new_item_btn.bind("click",function(){
                _this._add_new_item()
            })
            //编辑列表
            _this.options.edit_btn.live("click",function(e){
                _this._edite(this)
            }) 
            //删除东西
            _this.options.del_btn.live("click",function(e){
                _this._delete(this);
            }) 
            //保存
            _this.options.save_btn.live("click",function(e){//保存
                _id=$(e).parent().parent().attr("_id")||new Date().getTime();
                _data=  _this._getparam($(e).parent().parent())
               
               _this._save("update",_id,_data);
            }) 
            //取消编辑 
            _this.options.cancel_btn.live("click",function(e){//取消
                _this._cancel(this)
            }) 
            _this.options.add_new_item_btn.bind("click",function(){
                 _id=$(e).parent().parent().attr("_id")||new Date().getTime();
                _data=  _this._getparam($(e).parent().parent())
                _this._save("insert",_id,_data);
            }),
            _this.options.add_fildes_btn.bind("click",function(){//增加一个子选项
                var parent=$(this).parent();
                _this._add_multi_filds(parent);
            })
        },
        //增加一个新的自选项
        _add_new_item:function(){
            $(".edit").find("input").attr("disabled","true")
            $(".edit").find("testarea").attr("disabled","true")
            $(".edit").removeClass("edit");
            _this.options.new_item.show();
        },
        //删除当前选项
        _delete:function(e){
            var parent=$(e).parent().parent();
            var _id=parent.attr("_id");
            $.ajax({
                url:"/Cachefonfig?op=del",
                type:"post",
                data:({
                    _id:_id
                }),
                statusCode: {
                    404: function() {
                        alert('page not found');
                    }
                },
                success:function(data){
                    data=="ok"?window.location.reload():alert("删除失败");
                    
                }
            })
        },
        //编辑当前选中选项
        _edite:function(e){
            var parent=$(e).parent().parent();
            _this._relayout(parent,"edit")
        },
        //取消编辑
        _cancel:function(e){
            var parent=$(e).parent().parent();
          _this._relayout(parent,"cancel");
        },
        //调整布局状态
        _relayout:function(target,state){//重新计算布局 edite,cnancel,add（三个状态）
            if(state=="edit"){
                _this.options.new_item.fadeOut(500);
                //改变文本框状态
                $(".edit").find("input").attr("disabled","true");
                $(".edit").find("textarea").attr("disabled","true")
                $(".edit").removeClass("edit");
                target.addClass("edit").find("input").removeAttr("disabled");
                target.find("textarea").removeAttr("disabled");
            }
            if(state=="cancel"){
                target.removeClass("edit");
                target.find("input").each(function(){
                    var data=$(this).attr("data");
                    $(this).attr("value",data).attr("disabled","true");
                })
                target.find("textarea").each(function(){
                    var data=$(this).attr("data");
                    $(this).attr("value",data).attr("disabled","true");
                })
            }
        },
        //获取参数的公用函数
        _getparam:function(e){
            var param={};
            $(e).find("td").each(function(){
                var key=$(this).attr("key");
                var kind=$(this).attr("kind");
                var type=_this._judge_type($(this));
               
                kind=kind||"single"
                 
                if(key!=null){
                    if(type=="input"){
                        param[key]=[]//先默认定义为数组，如果是单值会将它覆盖掉
                        $(this).find("input").each(function(){
                            var value=$(this).val();
                            (value!=null&&value.length>0)?
                            (kind=="multi"?
                                (param[key].push(value)):
                                (param[key]=value)
                                ):""
                        })
                    }
                    if(type=="textarea"){
                        param[key]=[]
                        $(this).find("textarea").each(function(){
                            var value=$(this).val();
                            value!=null&&value.length>0?
                            (kind=="multi"?
                                (param[key].push(value)):
                                (param[key]=value)
                                ):""
                        })
                    }
                }  
            })
            console.log("the data:"+JSON.stringify(param))
            return param;
        },
        //判断类型
        _judge_type:function(e){
            //返回值为 input
            var input=$(e).find("input");
            var textarea=$(e).find("textarea");
            var select=$(e).find("select");
            var checkbox=$(e).find("input");
            var radio=$(e).find("input");
            var res=(input.length&&"input")||(textarea.length&&"textarea")|| (select.length&&"select")||(checkbox.length&&"checkbox")||(radio.length&&"radio")||"无法识别"
            return res
        },
        _add_multi_filds:function(e){
            var item='<input type="text" value="">'
            var item2='<textarea></textarea>'
            var input=$(e).find("input").length;
            var textare=$(e).find("textare").length;
            input>0?$(e).append(item):"";
            textare>0?$(e).append(item2):"";
        },
        _save:function(op,_id,data){
            $.ajax({
                url:_this.options.interface_url,
                type:op,
                data:({
                    _id:_id,
                    data:encodeURI(JSON.stringify(data))
                }),
                statusCode: {
                    404: function() {
                        alert('page not found');
                    }
                },
                success:function(data){
                    data=="ok"?window.location.reload():alert("操作失败");
                }
            })
        }
    }
})();
$(document).ready(function(){
    window.mydataManager=new dataManager({});
})