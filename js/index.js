/**
 * 
 * 声明公共变量和函数
 * 
 */
// 声明全局变量
var rotate;
var pageWidth;
var pageHeight;
var wrapper;
var count_move = 0;
var num_move = 0;
var taskid;
var show_div;
var start_btn;
var img_list;
var lists;
var unames;
var flag_style = 0;
var upfile;
var info;
var btn_con3_menu_c1;
var btn_con3_menu_c2;


// 获得全局变量
function getVar() {
	rotate = document.getElementById("rotate");
	wrapper = document.getElementById("wrapper");
	show_div = document.getElementById("show_div");
	start_btn = document.getElementById("start_btn");
	img_list = document.getElementById("img_list");
	lists = img_list.children;
	unames = document.getElementsByClassName("uname");
	upfile = document.getElementById("upfile");
	info = document.getElementById("info_con");
	btn_con3_menu_c1 = document.getElementById("con3_menu_c1").children[1];
	btn_con3_menu_c2 = document.getElementById("con3_menu_c2").children[0];
}

/**
 * 
 * 目标：运行更多的window.onload事件
 * 
 */
function moreOnload(func) {
	var old_onload = window.onload;
	if (typeof old_onload == "function") {
		window.onload = function() {
			old_onload();
			func();
		};
	} else {
		window.onload = func;
	}
}

/**
 * 
 * 目标：通过点击按钮，实现显示页面切换
 * 
 */
// 实时改变wrapper的left属性，保证改变窗口大小时container不错位。
function currentLeft() {
	taskid = setInterval(function() {
		num_move = count_move * (pageWidth + 20);
		wrapper.style.left = -num_move + "px";
	}, 100);
}

// wrapper移动
function wrapperMoveNext() {
	clearInterval(taskid);
	wrapper.style.left = -(num_move - 20) + "px";
	count_move++;
	num_move = count_move * (pageWidth + 20);
	setTimeout(function() {
		wrapper.style.left = -(num_move + 20) + "px";
	}, 500);
	setTimeout(function() {
		wrapper.style.left = -num_move + "px";
		currentLeft();
	}, 1000);
}

function wrapperMoveBack(obj) {
	clearInterval(taskid);
	wrapper.style.left = -(num_move + 20) + "px";
	count_move--;
	num_move = count_move * (pageWidth + 20);
	setTimeout(function() {
		wrapper.style.left = -(num_move - 20) + "px";
	}, 500);
	setTimeout(function() {
		wrapper.style.left = -num_move + "px";
		currentLeft();
	}, 1000);
}

/**
 * 
 * 目标：点击按钮切换样式
 * 
 */
// 样式模板
function styleModel(bgc, c, bgc2, c2) {
	var btn_con2_menu = document.getElementById("con2_menu").children[1];
	var con3_menu = document.getElementById("con3_menu");
	var con3_menu_c1_div = document.getElementById("con3_menu_c1").children[0];
	var con3_menu_c2 = document.getElementById("con3_menu_c2");
	var con4_menu = document.getElementById("con4_menu");
	var share = document.getElementById("share");
	var start = document.getElementById("start");
	
	show_div.style.backgroundColor = bgc;
	btn_con2_menu.style.borderColor = c;
	btn_con2_menu.style.color = c;
	con3_menu.style.borderColor = c;
	con3_menu.style.color = c;
	con3_menu_c1_div.style.borderBottomColor = c;
	con3_menu_c2.style.borderRightColor = c;
	btn_con3_menu_c1.style.color = c;
	btn_con3_menu_c2.style.color = c;
	con4_menu.style.borderColor = c;
	share.style.backgroundColor = bgc2;
	share.style.color = c2;
	start.style.color = c;
}

// 红色主色调样式
function changeRedStyle() {
	styleModel("#EB3F43", "white", "white", "#EB3F43");
	flag_style = 1;
}

// 浅粉色主色调样式
function changePinkStyle() {
	styleModel("rgba(245,186,197,1)", "#EB3F43", "#EB3F43", "white");
	flag_style = 2;
}

/**
 * 
 * 改变用户名称
 * 
 */
function changeUserId(u) {
	if (typeof u != "string") {
		alert("用户名不是字符串");
		return;
	}
	var spans_use = document.getElementsByClassName("uname");
	for (var i = 0; i < spans_use.length; i++) {
		spans_use[i].innerHTML = u;
	}
}


/*
 * 
 * 检测屏幕宽和高函数
 * 
 */
function getScreenWH() {
	pageWidth = window.innerWidth;
	pageHeight = window.innerHeight;
	
	// 提升兼容性
	if (typeof pageWidth != "number") {
		if (document.compatMode == "CSS1Compat") {
			pageWidth = document.documentElement.clientWidth;
			pageHeight = document.documentElement.clientHeight;
		} else {
			pageWidth = document.body.clientWidth;
			pageHeight = document.body.clientHeight;
		}
	} 
}

/*****************container1*******************/
// 点击“开始发现”切换样式并切换页面
function startFind() {
	start_btn.onclick = function() {
		show_div.removeAttribute("style");
		wrapper.removeAttribute("style");
		wrapperMoveNext(this);
		setTimeout(function() {
			changePinkStyle();
		}, 600);
	};
}


/*****************container2*******************/
/**
 * 
 * 目标：实现id为pic_wrapper的div元素宽度，
 * 	        是id为show_pic的div元素的宽度的4倍
 * 
 */
function setPicWrapWidth() {
	var show_pic = document.getElementById("show_pic");
	var pic_wrapper = document.getElementById("pic_wrapper");
	pic_wrapper.style.width = show_pic.offsetWidth * 4 + "px";
}


/**
 * 
 * 目标：点击小预览图片: 1、切换菜单样式
 *  				2、切换大预览图片
 * 
 */
// id为pic_wrapper的div元素移动函数
function changeImage(liCtrl) {
	var li_id = liCtrl.getAttribute("id");
	var pic_wrapper = document.getElementById("pic_wrapper");
	var offset0 = document.getElementById("sbg0").offsetWidth;
	var offset1 = document.getElementById("sbg1").offsetWidth;
	var offset2 = document.getElementById("sbg2").offsetWidth;
	var offset3 = document.getElementById("sbg3").offsetWidth;
	var offset4 = document.getElementById("sbg4").offsetWidth;
    
    switch (li_id) {
    	case "sbg0_min":
    		pic_wrapper.style.left = "0px";
    		changePinkStyle();
    		
    		changeCon3Iamge(0);
    		
    		break;
    		
    	case "sbg1_min":
    		pic_wrapper.style.left = -offset0 + "px";
    		changeRedStyle();
    		
    		changeCon3Iamge(1);
    		
    		break;
    		
    	case "sbg2_min":
    		pic_wrapper.style.left = -(offset0 + offset1) + "px";
    		changeRedStyle();
    		
    		changeCon3Iamge(2);
    		
    		break;
    		
    	case "sbg3_min":
    		pic_wrapper.style.left = -(offset0 + offset1 + offset2) + "px";
    		changeRedStyle();
    		
    		changeCon3Iamge(3);
    		
    		break;
    		
    	case "sbg4_min":
    		pic_wrapper.style.left = -(offset0 + offset1 + offset2 + offset3) + "px";
    		changePinkStyle();
    		
    		changeCon3Iamge(4);
    		
    		break;
    }
}

// 点击小预览图片的样式
function minImageStyle(liCtrl) {
	for (var i = 0; i < lists.length; i++) {
		lists[i].style.border = "none";
	}
	
	if (liCtrl != lists[0]) {
		unames[1].style.color = "white";
		unames[2].style.color = "white";
		unames[3].style.color = "white";
		unames[4].style.color = "white";
		unames[5].style.color = "white";
	} else {
		unames[0].style.color = "#EB3F43";
		unames[5].style.color = "#EB3F43";
	}
	
	if (liCtrl == lists[0] || liCtrl == lists[4]) {
		liCtrl.style.border = "1px solid #EB3F43";
		lists[0].children[0].removeAttribute("class");
	} else {
		liCtrl.style.border = "1px solid white";
		lists[0].children[0].className = "white_border";
	}
}

// 点击小预览图片功能
function onClickMinImage() {
	var img_list = document.getElementById("img_list");
	var lists = img_list.children;
	for (var i = 0; i < lists.length; i++) {
		lists[i].onclick = function() {
			minImageStyle(this);
			changeImage(this);
		};
	}
}

// 默认调用
function defaultOnClick() {
	var sbg0_min = document.getElementById("sbg0_min");
	minImageStyle(sbg0_min);
	changeImage(sbg0_min);
}

/**
 * 
 * 目标：实现“下一步”按钮功能： 1、切换到第三页
 * 						 2、改变第三页显示的图片
 * 						 3、改变第三页按钮菜单样式
 * 
 */
// 切换第三页的显示图片
function changeCon3Iamge(i) {
	var img = document.getElementById("show_pic2").children[1];
	var img2 = img_list.children[i].children[0];
	img.src = img2.src;
}

// 点击第二页“下一步”按钮，切换第三页"点击上传图片"样式
// 第三页"点击上传图片"样式
function upFileStyle(bgc, c) {
	var label = document.getElementsByTagName("label")[0];
	label.style.backgroundColor = bgc;
	label.style.color = c;
}

// 第三页“下一步”、“上一步”按钮样式
function con3BtnStyle (bgc, c) {
	btn_con3_menu_c1.style.backgroundColor = bgc;
	btn_con3_menu_c1.style.color = c;
}

// 第二页“下一页”按钮功能实现
function nextBtnToChangeUpFile () {
	var btn_con2_menu = document.getElementById("con2_menu").children[1];
	btn_con2_menu.onclick = function() {
		// 切换到第三页
		wrapperMoveNext(this);
		// 第三页样式变化
		if (upfile.value) {
			switch (flag_style) {
				case 1:
					upFileStyle("#EB3F43", "white");
					con3BtnStyle ("white", "#EB3F43");
					break;
				case 2:
					upFileStyle("rgba(245,186,197,1)", "#EB3F43");
					con3BtnStyle ("#EB3F43", "white");
			}
		} else {
			switch (flag_style) {
				case 1:
					upFileStyle("white", "#EB3F43");
					con3BtnStyle ("#EB3F43", "white");
					break;
				case 2:
					upFileStyle("#EB3F43", "white");
					con3BtnStyle ("rgba(245,186,197,1)", "#EB3F43");
			}
		}
	};
}

/*****************container3*******************/
/**
 * 
 * 目标：“上传图片”按钮功能实现：1、改变按钮菜单样式
 * 						  2、改变预览图片
 * 
 */
// 根据show_pic2的高度，来决定预览图片的高度
function previewPicHeight() {
	var show_pic2 = document.getElementById("show_pic2");
	var height = show_pic2.offsetHeight;
	var preview_pic = document.getElementById("preview_pic");
	preview_pic.style.height = (height * 0.4) + "px";
}

// “上传图片”按钮功能实现
var img_pt;
function changeUpFile() {
	upfile.onchange = function() {
		// 决定预览图片的高度
		previewPicHeight();
		// 改变按钮菜单样式
		if (flag_style == 1) {
			con3BtnStyle ("white", "#EB3F43");
			upFileStyle("#EB3F43", "white");
		}
		
		if (flag_style == 2) {
			con3BtnStyle ("#EB3F43", "white");
			upFileStyle("rgba(245,186,197,1)", "#EB3F43");
		}
		
		// 改变预览图片
		if (typeof img_pt == "undefined") {
			var preview_pic = document.getElementById("preview_pic"); 
			img_pt = document.createElement("img");
			preview_pic.appendChild(img_pt);
		}
		img_pt.src = window.URL.createObjectURL(this.files[0]);
		htmlToImage();
	};
}

/**
 * 
 * 目标：“下一步”按钮功能实现： 1、当没有上传图片时，显示提示，并且留在当前页面
 * 						   2、当有上传图片时，进入下一页，并且将网页转换成图片
 * 
 */
// 显示或不显示提示框
function isShowInfo(boo) {
	if (boo) {
		info.style.zIndex = "5";
		info.style.opacity = "1";
	} else {
		info.style.zIndex = "-1";
		info.style.opacity = "0";
	}
}

// 提示框关闭按钮
function closeInfo() {
	var close_info = document.getElementById("close_info");
	close_info.onclick = function() {
		isShowInfo(false);
	};
}

// 将HTML转换成图片
function htmlToImage() {
	var show_pic3 = document.getElementById("show_pic3");
    html2canvas(document.querySelector("#show_pic2")).then(function(canvas) {
    	var img = document.createElement("img");
    	img.src = canvas.toDataURL("image/png");
    	show_pic3.appendChild(img);
     })
}

// “生成海报”按钮功能实现
function nextBtntoChangeHtml() {
	btn_con3_menu_c1.onclick = function() {
		if (upfile.value) {
			wrapperMoveNext(this);
		} else {
			isShowInfo(true);
		}
	};
}

/**
 * 
 * 目标：“上一步”按钮功能实现： 返回上一页
 * 						   
 * 
 */
function goBack() {
	btn_con3_menu_c2.onclick = function() {
		wrapperMoveBack(this);
	}
}


/*****************container4*******************/
// 点击“再试一次”切换样式并返回“开始发现”页面
function toStart() {
	var btn_start = document.getElementById("start");
	btn_start.onclick = function() {
		location.reload();
		/*show_div.style.transition = "none";
		wrapper.style.transition = "none";
		wrapper.style.left = "0px";
		count_move = 0;
		num_move = count_move * pageWidth;
		changeRedStyle();*/
	};
}

/*****************函数调用***********************/
// 全局
moreOnload(getVar);
moreOnload(currentLeft);
moreOnload(function() {
	changeUserId("Leon");
});
// 获得屏幕宽和高
moreOnload(getScreenWH);
// container1
moreOnload(startFind);
// container2
moreOnload(setPicWrapWidth);
moreOnload(defaultOnClick);
moreOnload(onClickMinImage);
moreOnload(nextBtnToChangeUpFile);
// container3
moreOnload(changeUpFile);
moreOnload(closeInfo);
moreOnload(nextBtntoChangeHtml);
moreOnload(goBack);
// container4
moreOnload(toStart);
