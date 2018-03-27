window.onload = function () {
    /*顶部搜索*/
    search();
    /*轮播图*/
    banner();
    /*倒计时*/
    downTime();
};
var search = function(){
    /*默认顶部为透明*/
    var jdHeaderBox= document.querySelector('.jd_header_box');
    window.onscroll = function (e) {
        /*兼容获取页面卷曲高度*/
        var scrollTop = window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop;
        /*轮播图高度*/
        var jdBanner = document.querySelector('.jd_banner');
        /*获取轮播图部分的高度0*/
        var height = jdBanner.offsetHeight;
        var opacity=0;
        if(scrollTop<height){
            opacity = scrollTop/height*0.85;
        }else{
            opacity=0.85;
        }
        jdHeaderBox.style.background='rgba(216,80,92,'+opacity+')';
    };
    /*当页面滚动时，透明度变大 最大为0.85*/
    /*当超过轮播图的位置时，透明度就不变了*/
};

var banner = function(){
 var jdBanner = document.querySelector('.jd_banner');

 /*获取当前容器的宽度*/
 var width = jdBanner.offsetWidth;
 /*图片容器*/
 var imageBox = jdBanner.querySelector('ul:first-child');
 /*点容器*/
 var pointBox = jdBanner.querySelector('ul:last-child');
 /*所有的点*/
 var lis = pointBox.querySelectorAll('li');

 var addTransition = function () {
     imageBox.style.transition='all 0.3s';
     imageBox.style.webkitTransition='all 0.3s';
 };
 var removeTransition = function () {
     imageBox.style.transition='none';
     imageBox.style.webkitTransition='none';
 };
 var setTranslateX = function (translateX) {
     imageBox.style.transform = 'translateX('+translateX+'px)';
     imageBox.style.webkitTransform= 'translateX('+translateX+'px)';
 };
 /*自动轮播+无缝+过渡动画+位移*/
 var index = 1;
 var timer = setInterval(function () {
     index++;
     /*动画切换*/
     addTransition();
     setTranslateX(-index * width);
 },1000);
 /*最后一张图片切换完成 瞬间定位到第二张*/
    imageBox.addEventListener('transitionend',function(){
        if(index>=9){
            index=1;
            /*取消过渡*/
           removeTransition();
            /*位移*/
            setTranslateX(-index * width);
        }else if(index<=0){
            index=8;
            /*取消过渡*/
          removeTransition();
            /*位移*/
        setTranslateX(-index * width);
        }
        /*点对应当前图片 根据索引改点的now样式*/
        /*index范围1-8 所以li为0-7*/
        setPoint();
    });
    var setPoint= function(){
        pointBox.querySelector('li.now').classList.remove('now');
        lis[index-1].classList.add('now');
    };


/*滑动功能  滑动过程中轮播图停止 使用touch事件更改触摸的容器的位置*/
var startX  =0;
var distanceX = 0;
var startTime =0;
var isMove= false;
imageBox.addEventListener('touchstart',function(e){
    startX = e.touches[0].clientX;
    startTime = Date.now();
    clearInterval(timer);
});
imageBox.addEventListener('touchmove',function(e){
    e.preventDefault();
    clearInterval(timer);
    var moveX = e.touches[0].clientX;
    distanceX = moveX-startX;
    var translateX = -index*width +distanceX;
    removeTransition();
    setTranslateX(translateX);
    isMove =true;
});
imageBox.addEventListener('touchend',function(e){
    /*一定滑动过*/
    if(isMove){
        var t = Date.now() - startTime; //毫秒
        var d = Math.abs(distanceX);
        var speed = d/t;//怎么求这个速度   移动的距离/滑动的时间 = 速度
        /*经过测试  体感速度  0.5 px/ms 比较快*/
        //console.log(speed);
        if(speed > 0.3){
            /*6. 附加功能 滑动的速度超过（手感的比较快的速度）切换图片  上一张  下一张*/
            /*右滑  上一张*/
            if (distanceX > 0) {
                index--;
            }
            /*左滑  下一张*/
            else {
                index++;
            }
            /*切换动画*/
            addTransition();
            setTranslateX(-index * width);
        }else{
            /*4. 滑动结束 滑动的距离 不超过三分之一  吸附回去 */
            if (Math.abs(distanceX) < width / 3) {
                /*吸附效果 有动画  回到原来的位置*/
                addTransition();
                setTranslateX(-index * width);
            }
            /*5. 滑动结束 滑动的距离 超过三分之一  图片切换  上一张  下一张 */
            else {
                /*右滑  上一张*/
                if (distanceX > 0) {
                    index--;
                }
                /*左滑  下一张*/
                else {
                    index++;
                }
                /*切换动画*/
                addTransition();
                setTranslateX(-index * width);
            }
        }
    }

    /*1. 定时器重新开启*/
    clearInterval(timer); //防止多次绑定定时器
    timer = setInterval(function () {
        index++;
        /*动画切换*/
        /*过渡*/
        addTransition();
        /*位移*/
        setTranslateX(-index * width);
    }, 1000);
    /*2. 如果没有滑动过*/
    isMove = false;
    startX = 0;
    startTime = 0;
    distanceX = 0;
    /*重置参数*/
});
};
var downTime = function () {
/*模拟需要倒计时4小时*/
/*每秒更新数据*/
var spanList = document.querySelectorAll('.sk_time span');
 var time = 4*60*60;
 var timer =setInterval(function(){
     time--;
     var h = Math.floor(time/3600);
     var m = Math.floor(time%3600/60);
     var s = Math.floor(time%60);
     spanList[0].innerHTML=Math.floor(h/10);
     spanList[1].innerHTML=h % 10;

     spanList[3].innerHTML=Math.floor(m/10);
     spanList[4].innerHTML=m%10;

     spanList[6].innerHTML=Math.floor(s/10);
     spanList[7].innerHTML=s%10;
 },1000);
};