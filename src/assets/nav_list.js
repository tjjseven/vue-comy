function dragList() {
  var contentList = document.querySelectorAll(".content-list");
  var nav = document.querySelectorAll("nav");
  var loading = document.querySelectorAll(".loading");

  var translateX = nav[0].offsetWidth;
  var flag = true;

  var moveX = 0;
  /*多个list*/
  for (var i = 0; i < contentList.length; i++) {
    swiper(contentList[i],nav[i]);
    nav[i].count = 0;
  }
  function swiper(contentList,nav) {
    /*初始化列表位置*/
    cssTransform(contentList, "translateX", -translateX);
    var startX = 0;
    var listLeft = 0;
    /*touchstart*/
    contentList.addEventListener("touchstart",function (ev) {
      for (var i = 0; i < loading.length; i++) {
        loading[i].style.opacity = "0";
      }
      if(!flag){
        return;
      }
      startX = ev.changedTouches[0].clientX;
      listLeft = cssTransform(contentList, "translateX");
    });
    /*touchmove*/
    contentList.addEventListener("touchmove",function (ev) {
      if(!flag){
        return;
      }
      var endX = ev.changedTouches[0].clientX;
      moveX = endX - startX;
      cssTransform(contentList, "translateX", moveX+listLeft);
      /*判断滑动距离*/
      if(Math.abs(moveX)>translateX/2){
        var targetX = moveX>0?0:-2*translateX;
        contentList.style.transition = "1s";
        cssTransform(contentList, "translateX", targetX);
        /*滑屏结束*/
        contentList.addEventListener("transitionend",transEnd);
        contentList.addEventListener("webkitTransitionEnd",transEnd);
      }
    });

    function transEnd() {
      contentList.removeEventListener("transitionend",transEnd);
      contentList.removeEventListener("webkitTransitionEnd",transEnd);
      for (var i = 0; i < loading.length; i++) {
        loading[i].style.opacity = "1";
      }
      flag = false;
      /*移动导航条*/
      var aLength = nav.querySelectorAll("a").length;
      var navSpan = nav.querySelector(".navSpan");
      var navSpanLeft = nav.querySelectorAll("a")[0].offsetWidth;

      nav.count = moveX>0?(nav.count-1):(nav.count+1);
      if(nav.count>=aLength){
        nav.count=0;
        navSpan.style.transition = "none";
        cssTransform(navSpan, "translateX", navSpanLeft*nav.count);
      }else if(nav.count<0){
        nav.count=aLength-1;
        navSpan.style.transition = "none";
        cssTransform(navSpan, "translateX", navSpanLeft*nav.count);
      }
      // console.log(count);
      setTimeout(function () {
        navSpan.style.transition = "500ms";
        cssTransform(navSpan, "translateX", navSpanLeft*nav.count);
      },10);


      /*模拟发送Ajax*/
      setTimeout(function () {
        contentList.style.transition = "none";
        cssTransform(contentList, "translateX", -translateX);
        flag = true
      },2000)
    }

    /*touchend*/
    contentList.addEventListener("touchend",function (ev) {
      if(!flag){
        return;
      }
      var endX = ev.changedTouches[0].clientX;
      var moveX = endX - startX;
      /*判断滑动距离*/
      if(Math.abs(moveX)<translateX/2){
        contentList.style.transition = "100ms";
        cssTransform(contentList, "translateX", -translateX);
      }
    })
  }

}


/**
 * Created by Administrator on 2016/9/12.
 */
/*立即执行函数IIFE*/
(function (w) {
  /*定义一个函数，给元素添加一个获取设置2D变化值的方法*/
  w.cssTransform = function(el, attr, val) {
    /*给元素添加一个属性对象*/
    if(!el.transform){
      el.transform = {};
    }
    /*判断是取值还是赋值*/
    if(arguments.length>2){
      /*给属性对象添加方法*/
      el.transform[attr] = val;
      /*定义一个变量接收变化类型的值*/
      var transValue = "";
      /*遍历处理不同类型的属性*/
      for (var transAttr in el.transform) {
        switch(transAttr) {
          case "rotate":  /*旋转*/
          case "skew":    /*变形*/
          case "skewX":
          case "skewY":
            transValue += transAttr+"("+ el.transform[transAttr] +"deg) ";
            break;
          case "translate":  /*位移*/
          case "translateX":
          case "translateY":
          case "translateZ":
            transValue += transAttr+"("+ el.transform[transAttr] +"px) ";
            break;
          case "scale":  /*缩放*/
          case "scaleX":
          case "scaleY":
            transValue += transAttr+"("+ el.transform[transAttr] +") ";
            break;
        }
      }
      /*给属性赋值*/
      el.style.WebkitTransform = el.style.transform = transValue;
    }else{
      /*取值*/
      var val = el.transform[attr];
      if(typeof val == "undefined"){
        if(attr == "scale" || attr == "scaleX" || attr == "scaleY"){
          val = 1;
        }else{
          val = 0;
        }
      }
      return val;
    }
  }
})(window);
