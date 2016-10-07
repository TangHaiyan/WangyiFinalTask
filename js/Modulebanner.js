
(function () {  
       function getElementsByClassName(className) {
    var classArr = [];
    var tags = document.getElementsByTagName('*');
    for (var item in tags) {
      if (tags[item].nodeType == 1) {
        if (tags[item].getAttribute('class') == className) {
          classArr.push(tags[item]);
        }
      }
    }
    return classArr; //返回
  }
  function hasClass(obj, cls) { //class位于单词边界
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
  }
  function addClass(obj, cls) {
    if (!hasClass(obj, cls)) {
      obj.className += cls;
    }
  }
  function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      obj.className = obj.className.replace(reg, '');
    }
  }
  
  function extend(o1, o2){
    for(var i in o2) 
      o1[i]=o2[i];
      if(typeof o1[i] === 'undefined'){
        o1[i] = o2[i]
      } 
    return o1
  }


        var template = 
    '<li ><a><img class="imgOn"></a></li>\
      <li><a><img></a></li>\
      <li><a><img></a></li>';
    function Banner(opt) {
       this.opt={
      href: ["http://open.163.com",
        "http://study.163.com/",
        "http://www.icourse163.org/"

      ],
      img: ["/网易大作业/pic/banner1.jpg",
        "/网易大作业/pic/banner2.jpg",
        "/网易大作业/pic/banner3.jpg",
      ],
      timer:5000,
      fadeTime:500,
      container:getElementsByClassName('m-imgList')[0],
    }
      extend(this.opt,opt);

      this.container=this.opt.container;
      this.container.innerHTML=template;
          // console.log(slider);
      this.aHrefArr=this.container.getElementsByTagName('a');
      this.imgListArr=this.container.getElementsByTagName('li');
      this.imgArr=this.container.getElementsByTagName('img');


      this.imgLen = this.imgArr.length;
      this.cursor=getElementsByClassName('m-cursor')[0];//?      
      this.indexArr=this.cursor.getElementsByTagName('li');

        // 内部数据结构
    this.curIndex = 0;
      this.create();
      // body...
    };

    Banner.prototype={

        create:function(){

          for (var i = 0; i < this.aHrefArr.length; i++) {
          this.aHrefArr[i].href=this.opt.href[i]
          };

  
          for (var i = 0; i < this.imgLen; i++) {
            this.imgArr[i].src=this.opt.img[i]
          };
              
        },
    //   setOpacity: function(img,level) {
    //   if (this.filters) {
    //     img.style.filter = "alpha(opacity=" + level + ")";
    //   } else {
    //     img.style.opacity = level / 100;
    //   }
    // },
      //淡入处理函数
    fadeIn: function(obj) {
      var _this=this;
      var opt=this.opt;
      obj.style.opacity=0;


      //this.setOpacity(num,0); //初始全透明
      for (var i = 0; i <= 20; i++) { //透明度改变 20 * 5 = 100
        

        (function() {
         var level = i * 5; //透明度每次变化值
         //var img=this.imgArr[num];
          setTimeout(function() {
            obj.style.opacity = level/100;
           // _this.setOpacity(img,level)
          }, i*(opt.fadeTime / 20)); //i * 25 即为每次改变透明度的时间间隔，自行设定
        })(i); //每次循环变化一次
      }
    },

    //淡出处理函数
    fadeOut: function(obj) {
      var _this=this;
      var opt=this.opt;
      for (var i = 0; i <= 20; i++) { //透明度改变 20 * 5 = 100
        (function() {
          var level = 100 - i * 5; //透明度每次变化值
          //var img=this.imgArr[num];
          setTimeout(function() {
            obj.style.opacity = level / 100;
           // _this.setOpacity(img,level)
          }, i * (opt.fadeTime/20)); //i * 25 即为每次改变透明度的时间间隔，自行设定
        })(i); //每次循环变化一次
      }
    },
        //变换处理函数
      changeTo:  function (num) {
        var _this=this;
                //设置image
          this.imgOn = getElementsByClassName("imgOn")[0];
          _this.fadeOut(this.imgOn); //淡出当前 image
          removeClass(this.imgOn, "imgOn");
          addClass(this.imgArr[num], "imgOn");
          this.fadeIn(this.imgArr[num]); //淡入目标 image
          //设置image的控制下标 index
          this._curIndex = getElementsByClassName("indexOn")[0];
          removeClass(this._curIndex, "indexOn");
          addClass(this.indexArr[num], "indexOn");
        },

        autoChange: function(){
          var _this=this;
          var opt=this.opt;
          this.changeTimer=setInterval(function() {
          if (_this.curIndex < _this.imgLen - 1) {
            _this.curIndex++;
          } else {
            _this.curIndex = 0;
          }
          //调用变换处理函数
          _this.changeTo(_this.curIndex);
        }, opt.timer);
      }

    }   


    window.Banner=Banner;

//    this.container.appendChild(this.slider);

     
})()