(function ($) {
    // html
    function addHtml(Target,val) {
        val.pageDiv.push("<i class='pagePro'>上一页</i><span class='firstPage'>1</span><strong class='StartStrong'>···</strong>");
        for (var i=1;i<=3;i++){
            val.pageDiv.push("<span>"+(i+1)+"</span>")
        }
        val.pageDiv.push("<strong class='EndStrong'>···</strong><span class='pageEnd'>"+val.conSize+"</span><i class='pageNext'>下一页</i>");
        Target.append(val.pageDiv)
    }
    // 事件
    function addEvents(Target,val) {
        setHtmlSize(Target.children("span").eq( (val.pageDiv.length-1) - (val.conSize-val.itemsSize) ),Target.children("span").eq(val.itemsSize-1));
        Target.children("span").each(function (index) {
            $(this).bind('click',function () {
                val.itemsSize=parseInt($(this).html());
                setHtmlSize($(this),$(this));
                val.getPageS(val.itemsSize)
            })
        });
        $(".pagePro").click(function () {
            setNextPro(-1)
        });
        $(".pageNext").click(function () {
            setNextPro(1)
        });
        // 赋值
        function setIndexPage(val) {
            Target.children("span").eq(1).html(val-1);
            Target.children("span").eq(2).html(val);
            Target.children("span").eq(3).html(val+1);
        }
        // 循环判断
        function setHtmlSize(DIV1,DIV2) {
            if (val.itemsSize>3){
                $(".StartStrong").show();
                if (val.itemsSize>3 && val.itemsSize<val.conSize-1){
                    setIndexPage(val.itemsSize);
                    Target.children("span").eq(2).addClass("pageActive").siblings().removeClass("pageActive")
                }else{
                    DIV1.addClass("pageActive").siblings().removeClass("pageActive");
                    setIndexPage(val.conSize-2);
                }
            }else{
                if (val.itemsSize==3){
                    $(".StartStrong").hide();
                    setIndexPage(val.itemsSize)
                }else{
                    setIndexPage(3)
                }
                $(".StartStrong").hide();
                DIV2.addClass("pageActive").siblings().removeClass("pageActive");
            }
            if (val.itemsSize>val.conSize-3){
                $(".EndStrong").hide()
            }else{
                $(".EndStrong").show()
            }
        }
        // 上一页、下一页
        function setNextPro(_val) {
            val.itemsSize=val.itemsSize+_val;
            if (val.itemsSize<=1){
                val.itemsSize=1;
            }else if (val.itemsSize>=val.conSize){
                val.itemsSize=val.conSize;
            }
            setHtmlSize(Target.children("span").eq( (val.pageDiv.length-1) - (val.conSize-val.itemsSize) ),Target.children("span").eq(val.itemsSize-1));
        }
    }
    $.fn.setPage=function (tVal) {
        var valSize=$.extend({
            conSize:10,
            itemsSize:0,
            pageDiv:[],
            getPageS:function () {}
        },tVal);
        addHtml(this,valSize);
        addEvents(this,valSize);
    }
})(jQuery);


