(function() {
		//主函数
		function main() {
			init();
			addEvent();
		}

		//数据请求函数封装
		function get(url, callback, options) {
			if (!!options) {
				url = url + "?" + serialize(options);
			} else {
				url = url;
			}
			var request = new XMLHttpRequest();		 
			request.onreadystatechange = function() {
				if (request.readyState == 4) {

					if ((request.status >= 200 && request.status < 300) || request.status == 304) {
						callback(request.responseText);
					} else {
						console.log("请求失败，错误状态码为：" + request.responseText);
					}
				}
			};
			request.open("get", url, true);
			request.send(null);
			function serialize(options) {
				if (!options) {
					return "";
				}
				var paris = [];
				for (var key in options) {
					if ((!options.hasOwnProperty(key)) || (typeof options[key] === "function")) {
						continue;
					}
					var value = options[key].toString();
					key = encodeURIComponent(key);
					value = encodeURIComponent(value);
					paris.push(key + "=" + value);
				}
				return paris.join("&");
			}
		}

		var UrlClasses = "http://study.163.com/webDev/couresByCategory.htm";
		var UrlHot = "http://study.163.com/webDev/hotcouresByCategory.htm";
		var TypeIndex;
		var Container=$('.m-classes-PM');

		//请求具体的课程
		function getClasses(pageNum, TypeIndex, Container) {
			var optionsPM = {
				pageNo: pageNum,
				psize: 20,
				type: TypeIndex
			};
			get(UrlClasses, function(jsonData) {
				classTOobj(jsonData, Container);

			}, optionsPM);
		}

		//请求课程到悬浮框
		getClasses(1,10,$('.m-classes-descripton'));


		//课程数据解析。把请求回来的数据转化obj，并提取需要的字段，把各字段添加到DOM中。
		function classTOobj(jsonData,Container) {
			var jsonObj = JSON.parse(jsonData),
				list = jsonObj.list;
			for (var i = 0, len = list.length; i < len; i++) {
				var backgroundPicMid = list[i].middlePhotoUrl,
					backgroundPicBig = list[i].bigPhotoUrl,
					backgroundPicSmall = list[i].smallPhotoUrl,
					categoryName = list[i].categoryName,
					tittle = list[i].name,
					author = list[i].provider,
					num = list[i].learnerCount,
					price = list[i].price,
					description = list[i].description;
				price = (price == 0) ? '免费' : ('￥' + price);
				categoryName=(categoryName==null)? '无':categoryName;


	                    var template=
	                       '<div class="m-classes-description">\
		                             <img src=' + backgroundPicMid + '>\
		                             <h4>'+ tittle +'</h4>\
		                             <p class="author">'+author+'</p>\
		                             <div class="num">\
		                             <span></span><i>'+num+'</i>\
		                             </div>\
		                             <p class="price">'+price+'</p>\
	                             </div>\
				                 <div class="m-classes-detail clearfix">\
							         <div >\
								        <img src='+backgroundPicMid+'>\
								         <div>\
								        	<h4>'+tittle+'</h4>\
								        	<p><span></span>'+num+'人在学</p>\
								        	<p>发布者：'+author+'</p>\
								        	<p>分类：'+categoryName+'</p>\
								        </div title='+description+'>\
								        <p>'+description+'</p>\
							        </div>\
						        </div>'                  

				var classesSon = document.createElement('div');
				classesSon.className="m-classes-son";
				classesSon.innerHTML=template.toString();
				var classesContainerCur=Container.querySelector('.current');
				classesContainerCur.appendChild(classesSon);
				   
			}

		}
		//hotclass解析
		function hotClassTOobj(jsonData) {
			var jsonObj = JSON.parse(jsonData);
			for (var i = 0, len = jsonObj.length; i < len; i++) {
				var backgroundPicMid = jsonObj[i].middlePhotoUrl,
					backgroundPicBig = jsonObj[i].bigPhotoUrl,
					backgroundPicSmall = jsonObj[i].smallPhotoUrl,
					categoryName = jsonObj[i].categoryName,
					tittle = jsonObj[i].name,
					author = jsonObj[i].provider,
					num = jsonObj[i].learnerCount,
					price = jsonObj[i].price,
					description = jsonObj[i].description;
				price = (price == 0) ? '免费' : ('￥' + price);
				var template='<img src=' + backgroundPicSmall + '><div class="hot-classes-title"><h4>' + tittle + '</h4>' + '<div class="num"><span></span>' + num + '</div>'+'</div>';				
				var hotClass = document.createElement('div');
				hotClass.className = "hotclasses clearfix";
				hotClass.innerHTML = template.toString();

				if (i < 10) {
					hotClassesCur.appendChild(hotClass);
				} else {
					hotClassesChange.appendChild(hotClass);

				}
			}
		}

		//DOM节点
		//父节点
		var gNotice =$('.g-notice'),
			gHeader = $('.g-header'),
			gBanner =$('.g-banner'),
			gProducts = $('.g-products'),
			gEnvironment = $('.g-environment'),
			gClasses = $('.g-classes'),
			gFoot = $('.g-foot'),
			mLogin = $('.m-login');


		var classesPM = gClasses.querySelector('.m-classes-PM'),
		    classesPagesPM = Array.prototype.concat.apply([],classesPM.querySelectorAll('.classespages')).slice(0),
		    classesPL = gClasses.querySelector('.m-classes-PL'),
		    classesPagesPL = Array.prototype.concat.apply([],classesPL.querySelectorAll('.classespages')).slice(0),
			classesPLCur = classesPL.querySelector('.current'),
			allHotClasses = gClasses.querySelector('.all-hotclasses'),
			hotClassesCur = allHotClasses.querySelector('.current'),
			hotClassesChange = allHotClasses.querySelector('.change');

		//事件节点
		var toFollow = gHeader.querySelector('.m-header-tofollow'),
			followed = gHeader.querySelector('.m-header-followed'),
			closeLoginTag = mLogin.getElementsByTagName('span')[0],
			closeNoticeTag = gNotice.querySelector('.m-notice-no'),
			classesPage = gClasses.querySelector('.m-classes-page'),
			classesPageForward = classesPage.querySelector('.forward'),
			classesPageBack = classesPage.querySelector('.back'),
			classesPageIndex = classesPage.getElementsByTagName('i'),
			classesType = gClasses.getElementsByTagName('li'),
			classes= gClasses.getElementsByTagName('ul')[0],
			videobig=$('.m-classes-video').getElementsByTagName('img')[0],
		    videoClose=$('.play').getElementsByTagName('span')[0],
		    videoPlay=$('.m-classes-video').getElementsByTagName('video')[0];
			


		//热门课程5秒切换
		setInterval(function() {
				if (hotClassesCur.style.display == 'block') {
					showBlock(hotClassesChange);
					hide(hotClassesCur)
				} else {
					showBlock(hotClassesCur);
					hide(hotClassesChange);
				}
			}, 5000)
		//事件绑定
		function addEvent(){
			//tab切换
            EventUtil.addHandler(classes,'click',function(event){
            	var target=event.target;
            	console.log(target);
            	if (target.className == 'current') {
					return;
			     } else{
			     	//按钮样式切换
					classes.querySelector('.current').className = "";
					target.className = 'current';
					//课程数据切换
					if (classesPLCur.childNodes.length == 0) {
						getClasses(1, 20, classesPL);
						classesPagesPL[0].className='classespages current';
					}
					var classesShow=(classesPL.style.display == 'block')?classesPM:classesPL,
					    classesHide=(classesPL.style.display == 'block')?classesPL:classesPM,
					    classesNameShow=(classesPL.style.display == 'block')?'m-classes-PM':'m-classes-PL',
					    classesNameHide=(classesPL.style.display == 'block')?'m-classes-PL':'m-classes-PM';
						showBlock(classesShow);
						hide(classesHide);
						classesShow.className=classesNameShow+' current clearfix';
						classesHide.className=classesNameHide+' clearfix';
						//classesHide.querySelector('.current').className='classespages';	
				    //page数据切换
				    var id=classesShow.querySelector('.current').id;				    
				    for (var i = 0; i < classesPageIndex.length; i++) {
				    	classesPageIndex[i].className='';
				    }
				    classesPageIndex[id].className='current';
			     }


            })
             

			//点击关注
			EventUtil.addHandler(toFollow, 'click', function() {
					showInline(mLogin);

			})

			//取消关注
		    EventUtil.addHandler($('.m-header-followed').getElementsByTagName('span')[2], 'click', function() {
					showInline(toFollow);
					hide(followed);

			})
			

				//点击关闭登录框
			EventUtil.addHandler(closeLoginTag, 'click', function() {
					hide(mLogin);
			})
				//点击关闭顶部提示框并添加cookie
			EventUtil.addHandler(closeNoticeTag, 'click', function() {
					hide(gNotice);
					cookieUtil.CookieSetter("notice", "yes")

			})
			//点击显示视频浮层
			EventUtil.addHandler(videobig,'click',function(){
				showBlock($('.play'));
			})
			//点击关闭视频浮层
			EventUtil.addHandler(videoClose,'click',function(){
				hide($('.play'));
			})
			//点击视频播放
			EventUtil.addHandler(videoPlay,'click',function(){
				if (this.paused) {
					this.play()
				}else{
					this.pause()
				}
				
			})


	       //课程页码切换
			for (var i = 0; i < classesPageIndex.length; i++) {
				classesPageIndex[i].id=i;
				//var classesTypePages=Container.getElementsByClassName('classespages')
				classesPagesPM[i].id=i;
				classesPagesPL[i].id=i;
				EventUtil.addHandler(classesPageIndex[i], 'click', function() {
					if (this.className == 'current') {
						return;
					} else {
						 //样式切换
						classesPage.querySelector('.current').className ="";
						this.className = 'current';
						//数据切换
						classesId(this.id);						
					}
				})

			}
         //向前切换

		    EventUtil.addHandler(classesPageForward,'click',function(){
	        	 var curPageId=$('.m-classes-page').querySelector('.current').id;
	        	if (curPageId<8) {
	        		classesId(parseInt(curPageId)+1);
	            }
            })
        //向后切换
            EventUtil.addHandler(classesPageBack,'click',function(){
	        	 var curPageId=$('.m-classes-page').querySelector('.current').id;
	        	if (curPageId>0) {
	        		classesId(parseInt(curPageId)-1);
	            }
            })
        
         
        //登录框请求验证
         var btn=document.getElementsByTagName('button')[0]
         EventUtil.addHandler(btn,'click',function(){
             var name=$('.m-login').querySelector('.userName').value,
               password=$('.m-login').querySelector('.password').value;
	         var form=document.forms[0];
	         form.elements[0].value=MD5(name);
	         form.elements[1].value=MD5(password);
             var urlLogin="http://study.163.com/webDev/login.htm";
	         var optionsLog={
	         	userName:MD5(name),
	         	password:MD5(password),
	         };

         	get(urlLogin,function (data){
         		if (data==1) {
         			alert("验证通过");
         			hide($('.m-login'));
         			hide($('.m-header-tofollow'));
         			showInline($('.m-header-followed'));
         			cookieUtil.CookieSetter('follow','yes');

         		}else if ( data==0) {
         			console.log(data);
         			alert('用户名或密码不匹配');
         			hide($('.m-login'));
         		}
         	},optionsLog)

		})
    }

	//初始化函数
	function init() {
		//判断是否有缓存
		if (cookieUtil.CookieGetter("notice")) {
			hide(gNotice);
		}
		if (cookieUtil.CookieGetter("follow")) {
			hide($('.m-header-tofollow'));
				showInline($('.m-header-followed'));
		}
		//数据初始加载。请求产品设计的第一页内容
		getClasses(1, 10, $('.m-classes-PM'));
		//请求热门课程
		get(UrlHot, function(jsonData) {
			hotClassTOobj(jsonData);
		});

	}

	//帮助函数，内部使用

	function $(classname){
		var element=document.querySelector(classname);
		return element;
	   }

	function showInline(ele) {
		var isBolck = getStyle(ele, "display");
		if (isBolck == 'none') {
			ele.style.display = "inline-block";
		}
	}

	function showBlock(ele) {
		var isBolck = getStyle(ele, "display");
		if (isBolck == 'none') {
			ele.style.display = "block";
		}
	}

	function hide(ele) {
		var isBolck = getStyle(ele, "display");
		if (isBolck != 'none') {
			ele.style.display = "none";
		}
	}

	//帮助函数 请求某一页的数据封装
	function classesId(id){	        	
	    var classesCur=(classesType[0].className == 'current')?classesPM:classesPL,
			classesPageCur=(classesType[0].className == 'current')?classesPagesPM:classesPagesPL;
	    for (var j = 0; j < classesPageIndex.length; j++) {
				hide(classesPageCur[j]);
				classesPageCur[j].className='classespages';
			    classesPageIndex[j].className='';
				}
		    classesPageIndex[id].className='current';
		    console.log(id);
		    console.log(classesPageIndex[id]);
			classesPageCur[id].className='classespages current';
			showBlock(classesPageCur[id]);  
			//如果页面没有数据，先请求数据
	        if (classesPageCur[id].childNodes.length==0) {
	        	getClasses(id, 20, classesCur);
	        }
	    }

	//帮助函数 cookie缓存
	var cookieUtil = (function() {
		var prefix = "study_163_";
		var CookieSetter = function(name, value) {
				var Days = 30 * 6; //cookie 将被保存一年  
				var exp = new Date(); //获得当前时间  
				exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000); //换成毫秒  
				document.cookie = prefix +name + "=" + escape(value) + ";expires=" + exp.toGMTString();
			};
		var CookieGetter = function (name) {
				var arr = document.cookie.match(new RegExp("(^| )" +prefix + name + "=([^;]*)(;|$)"));
				if (arr != null) {
					return unescape(arr[2]);
				} else {
					return null;
				}
			}

		return {
			CookieSetter: CookieSetter,
			CookieGetter: CookieGetter,
		}
	})();


	//帮助函数。处理事件兼容
	var EventUtil = {
		//添加事件处理函数，IE不一样
		addHandler: function(element, type, handler) {
			if (element.addEventListener) {
				element.addEventListener(type, handler, false)
			} else if (element.attachEvent) {
				element.attachEvent("on" + type, handler)
			} else {
				element["on" + type] = handler
			}
		},
		//移除事件处理函数，IE不一样
		removeHandler: function(element, type, handler) {
			if (element.removeEventListener) {
				element.removeEventListener(type, handler, false)
			} else if (element.dettachEvent) {
				element.dettachEvent("on" + type, handler)
			} else {
				element["on" + type] = null
			}
		},
		//获取event事件，IE不一样
		getEvent: function(event) {
			return event ? event : window.event;
		},
		//获取目标元素
		getTarget: function(event) {
			return event.target || event.srcElement;
		},
	};
	//帮助函数。处理获取样式兼容
	function getStyle(element, cssPropertyName) {
		if (window.getComputedStyle) {
			return window.getComputedStyle(element, null)[cssPropertyName]; //第二个参数有没有都OK
		} else {
			cssPropertyName = cssPropertyName.replace(/\-[a-z]/g, function(value, lower) {
				return lower.toUpperCase()
			})
			return element.currentStyle[cssPropertyName];
		}
	}


	//MD5加密函数
	var hex_chr = "0123456789abcdef";
	    function rhex(num) {
	        str = "";
	        for (j = 0; j <= 3; j++) {
	            str += hex_chr.charAt((num >> (j * 8 + 4)) & 15) + hex_chr.charAt((num >> (j * 8)) & 15);
	        }
	        return str;
	    }

	    function str2blks_MD5(str) {
	        nblk = ((str.length + 8) >> 6) + 1;
	        blks = new Array(nblk * 16);
	        for (i = 0; i < nblk * 16; i++) {
	            blks[i] = 0;
	        }
	        for (i = 0; i < str.length; i++) {
	            blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
	        }
	        blks[i >> 2] |= 128 << ((i % 4) * 8);
	        blks[nblk * 16 - 2] = str.length * 8;
	        return blks;
	    }

	    function add(x, y) {
	        var lsw = (x & 65535) + (y & 65535);
	        var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
	        return (msw << 16) | (lsw & 65535);
	    }

	    function rol(num, cnt) {
	        return (num << cnt) | (num >>> (32 - cnt));
	    }

	    function cmn(q, a, b, x, s, t) {
	        return add(rol(add(add(a, q), add(x, t)), s), b);
	    }

	    function ff(a, b, c, d, x, s, t) {
	        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
	    }

	    function gg(a, b, c, d, x, s, t) {
	        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
	    }

	    function hh(a, b, c, d, x, s, t) {
	        return cmn(b ^ c ^ d, a, b, x, s, t);
	    }

	    function ii(a, b, c, d, x, s, t) {
	        return cmn(c ^ (b | (~d)), a, b, x, s, t);
	    }

	    function MD5(str) {
	        x = str2blks_MD5(str);
	        var a = 1732584193;
	        var b = -271733879;
	        var c = -1732584194;
	        var d = 271733878;
	        for (i = 0; i < x.length; i += 16) {
	            var olda = a;
	            var oldb = b;
	            var oldc = c;
	            var oldd = d;
	            a = ff(a, b, c, d, x[i + 0], 7, -680876936);
	            d = ff(d, a, b, c, x[i + 1], 12, -389564586);
	            c = ff(c, d, a, b, x[i + 2], 17, 606105819);
	            b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
	            a = ff(a, b, c, d, x[i + 4], 7, -176418897);
	            d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
	            c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
	            b = ff(b, c, d, a, x[i + 7], 22, -45705983);
	            a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
	            d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
	            c = ff(c, d, a, b, x[i + 10], 17, -42063);
	            b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
	            a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
	            d = ff(d, a, b, c, x[i + 13], 12, -40341101);
	            c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
	            b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
	            a = gg(a, b, c, d, x[i + 1], 5, -165796510);
	            d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
	            c = gg(c, d, a, b, x[i + 11], 14, 643717713);
	            b = gg(b, c, d, a, x[i + 0], 20, -373897302);
	            a = gg(a, b, c, d, x[i + 5], 5, -701558691);
	            d = gg(d, a, b, c, x[i + 10], 9, 38016083);
	            c = gg(c, d, a, b, x[i + 15], 14, -660478335);
	            b = gg(b, c, d, a, x[i + 4], 20, -405537848);
	            a = gg(a, b, c, d, x[i + 9], 5, 568446438);
	            d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
	            c = gg(c, d, a, b, x[i + 3], 14, -187363961);
	            b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
	            a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
	            d = gg(d, a, b, c, x[i + 2], 9, -51403784);
	            c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
	            b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
	            a = hh(a, b, c, d, x[i + 5], 4, -378558);
	            d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
	            c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
	            b = hh(b, c, d, a, x[i + 14], 23, -35309556);
	            a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
	            d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
	            c = hh(c, d, a, b, x[i + 7], 16, -155497632);
	            b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
	            a = hh(a, b, c, d, x[i + 13], 4, 681279174);
	            d = hh(d, a, b, c, x[i + 0], 11, -358537222);
	            c = hh(c, d, a, b, x[i + 3], 16, -722521979);
	            b = hh(b, c, d, a, x[i + 6], 23, 76029189);
	            a = hh(a, b, c, d, x[i + 9], 4, -640364487);
	            d = hh(d, a, b, c, x[i + 12], 11, -421815835);
	            c = hh(c, d, a, b, x[i + 15], 16, 530742520);
	            b = hh(b, c, d, a, x[i + 2], 23, -995338651);
	            a = ii(a, b, c, d, x[i + 0], 6, -198630844);
	            d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
	            c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
	            b = ii(b, c, d, a, x[i + 5], 21, -57434055);
	            a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
	            d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
	            c = ii(c, d, a, b, x[i + 10], 15, -1051523);
	            b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
	            a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
	            d = ii(d, a, b, c, x[i + 15], 10, -30611744);
	            c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
	            b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
	            a = ii(a, b, c, d, x[i + 4], 6, -145523070);
	            d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
	            c = ii(c, d, a, b, x[i + 2], 15, 718787259);
	            b = ii(b, c, d, a, x[i + 9], 21, -343485551);
	            a = add(a, olda);
	            b = add(b, oldb);
	            c = add(c, oldc);
	            d = add(d, oldd);
	        }
	        return rhex(a) + rhex(b) + rhex(c) + rhex(d);
	    }



	main();

})()