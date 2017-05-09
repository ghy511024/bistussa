window.chinamap={};
(function(){
    var _this
    window.chinamap=function(){
        _this=this;
        this.inint();
        this.url="http://report0.bj.ppweb.com.cn:56132/provinceQuery/partnerMetric?name=usee&metricName=DropFactor&json=true&st=20130414105418&et=20130416105418&location=wf_SH%2Cwf_AH%2Cwf_JS%2Cwf_TJ%2Cwf_HB%2Cwf_JL"
    }
    chinamap.prototype={
        constructor:chinamap,
        inint:function(){
            this.inintEvent();
            this.layout();
           
        },
        layout:function(){
            
            
            
        },
        inintEvent:function(){
            $("#test").click(function(){
                _this.getdata();
            })
        },
        getdata:function(){
//            $.ajax({
//                url:_this.url,
//                type:"post",
//                data:({}),
//                statusCode: {
//                    404: function() {
//                        alert('page not found');
//                    }
//                },
//                success:function(data){
//                    alert(data)
//                }
//            })

var data= _this.changedata(tmp_data);

        },callback:function(data){
            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'container2',
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: 'Browser market shares at a specific website, 2010'
                },
                tooltip: {
                    formatter: function() {
                        return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                    }
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            formatter: function() {
                                return '<b>'+ this.point.name +'</b>: '+ this.percentage +' %';
                            }
                        }
                    }
                },
                series: [{
                    type: 'pie',
                    name: 'Browser share',
                    data: [
                    ['Firefox',   45.0],
                    ['IE',       26.8],
                    {
                        name: 'Chrome',
                        y: 12.8
                    //                        sliced: true,
                    //                        selected: true
                    },
                    ['Safari',    8.5],
                    ['Opera',     6.2],
                    ['Others',   0.7]
                    ]
                }]
            });
        },
       
        changedata:function(data){
            var maplist=[]
            var map={}
            map.type="pie";
            map.name="统计图";
            
            var src_data=JSON.parse(data);
            map.data=[]
           for(var key in src_data){
               var tmp={}
               tmp.name=key
               tmp.y=src_data[key]
               map.data.push(tmp)
           }
           console.log(JSON.stringify(map));
           maplist.push(map);
           return maplist;
        }
        
    }
})();
$(document).ready(function(){
    window.mychinamap=new chinamap();
})

//==================数据部分==================================
var tmp_data='{ "BJ":1, "SH":1, "AH":1, "JS":1, "TJ":1, "HB":1, "SX":1, "JL":1, "JS":1, "ZJ":1, "JX":1, "SD":5, "HN":10, "SC":12, "SN":1, "GS":1, "QH":1, "HN":1, "HL":1, "HA":1, "YN":1, "NX":1, "XJ":1, "TW":1, "HK":1, "MO":1, "NM":1, "GZ":1, "GX":1, "HI":1, "HB":1, "GD":1, "XZ":1, "CQ":1, "Unknown":1, "TW":1, "LN":1, "HK":1, "MO":1, "JAPAN":1 }';

var dataStatus = [{
    cha: 'HKG', 
    name: '香港', 
    des: '<br/>无活动点'
},
{
    cha: 'HAI', 
    name: '海南', 
    des: '<br/>无活动点'
},
{
    cha: 'YUN', 
    name: '云南', 
    des: '<br/>无活动点'
},
{
    cha: 'BEJ', 
    name: '北京', 
    des: '<br/>2个活动点'
},
{
    cha: 'TAJ', 
    name: '天津', 
    des: '<br/>无活动点'
},
{
    cha: 'XIN', 
    name: '新疆', 
    des: '<br/>无活动点'
},
{
    cha: 'TIB', 
    name: '西藏', 
    des: '<br/>无活动点'
},
{
    cha: 'QIH', 
    name: '青海', 
    des: '<br/>无活动点'
},
{
    cha: 'GAN', 
    name: '甘肃', 
    des: '<br/>无活动点'
},
{
    cha: 'NMG', 
    name: '内蒙古', 
    des: '<br/>无活动点'
},
{
    cha: 'NXA', 
    name: '宁夏', 
    des: '<br/>无活动点'
},
{
    cha: 'SHX', 
    name: '山西', 
    des: '<br/>无活动点'
},
{
    cha: 'LIA', 
    name: '辽宁', 
    des: '<br/>无活动点'
},
{
    cha: 'JIL', 
    name: '吉林', 
    des: '<br/>无活动点'
},
{
    cha: 'HLJ', 
    name: '黑龙江', 
    des: '<br/>无活动点'
},
{
    cha: 'HEB', 
    name: '河北', 
    des: '<br/>无活动点'
},
{
    cha: 'SHD', 
    name: '山东', 
    des: '<br/>无活动点'
},
{
    cha: 'HEN', 
    name: '河南', 
    des: '<br/>无活动点'
},
{
    cha: 'SHA', 
    name: '陕西', 
    des: '<br/>无活动点'
},
{
    cha: 'SCH', 
    name: '四川', 
    des: '<br/>无活动点'
},
{
    cha: 'CHQ', 
    name: '重庆', 
    des: '<br/>无活动点'
},
{
    cha: 'HUB', 
    name: '湖北', 
    des: '<br/>1个活动点'
},
{
    cha: 'ANH', 
    name: '安徽', 
    des: '<br/>无活动点'
},
{
    cha: 'JSU', 
    name: '江苏', 
    des: '<br/>无活动点'
},
{
    cha: 'SHH', 
    name: '上海', 
    des: '<br/>1个活动点'
},
{
    cha: 'ZHJ', 
    name: '浙江', 
    des: '<br/>无活动点'
},
{
    cha: 'FUJ', 
    name: '福建', 
    des: '<br/>无活动点'
},
{
    cha: 'TAI', 
    name: '台湾', 
    des: '<br/>无活动点'
},
{
    cha: 'JXI', 
    name: '江西', 
    des: '<br/>无活动点'
},
{
    cha: 'HUN', 
    name: '湖南', 
    des: '<br/>无活动点'
},
{
    cha: 'GUI', 
    name: '贵州', 
    des: '<br/>无活动点'
},
{
    cha: 'GXI', 
    name: '广西', 
    des: '<br/>无活动点'
}, 
{
    cha: 'GUD', 
    name: '广东', 
    des: '<br/>无活动点'
}];
$('#container').vectorMap({
    map: 'china_zh',
    color: "#B4B4B4", //地图颜色
    onLabelShow: function (event, label, code) {//动态显示内容
        $.each(dataStatus, function (i, items) {
            if (code == items.cha) {
                label.html(items.name + items.des);
            }
        });
    }
})
$.each(dataStatus, function (i, items) {
    if (items.des.indexOf('个') != -1) {//动态设定颜色，此处用了自定义简单的判断
        var josnStr = "{" + items.cha + ":'#00FF00'}";
        $('#container').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
    }
});
$('.jvectormap-zoomin').click(); //放大