function clearStyle(){
	$(".yuan").css("background","#fff");
}
function rmvAdd(gst){
	var gstRtn = new Array;
	var temp = gst[0];
	gstRtn.push(temp);
	for(var i = 1; i < gst.length;++i){
		if(gst[i] != temp){
			temp = gst[i];
			gstRtn.push(temp);
		}
	}
	return gstRtn;
}
function judgeEnterYuan(x,y){
	//初始化返回值：
	var rtn = new Object;
	rtn.flag = false;
	rtn.yuan = $(".yuan")[0];
	//
	for(var i = 0; i < $(".yuan").length;++i){
		var a = $(".yuan").eq(i);
		var fg = ( y > a.offset().top && y < a.offset().top + a.height())&& ( x > a.offset().left && x < a.offset().left + a.width() );
		if(fg){
			rtn.flag = true;
			rtn.yuan = $(".yuan")[i];
		}
	}
	return rtn;
}
function recordGst(e){
	if(gstStart == true){
		var posx = e.touches[0].pageX;
		var posy = e.touches[0].pageY;
		var rtn;
		rtn = judgeEnterYuan(posx,posy);
		if(rtn.flag){
			rtn.yuan.style.backgroundColor = stlColor;//被滑过后样式
			gstOder.push($(".yuan").index(rtn.yuan));//记录路径
		}
	}
}

function judgeGst(co,go){
	var flag = 0;
	for(var i = 0;i < co.length;++i){
		if(go[i] == co[i]){++flag;}
	}
	if(flag == co.length){
		return true;
	}else{
		return false;
	}
}

function setGst(co,go,st){
	var flag = false;
	var tms = st;//记录设置次数
	switch (st){
		case 1:
			$("#text").text("了解！请再次滑动确认手势：");
			++tms;
			break;
		case 2:
			flag = judgeGst(co,go);
			if(flag){
				$("#text").text("手势设置完成。");
				++tms;
			}else{
				$("#text").text("两次输入不一致，请重新设置手势。");
				tms = 0;
			}
			break;
	}
	return tms;
}
//---main----
function funinit(){
	var gstType = 0;
	gstStart = false;//路径开始
	
	gstOder = new Array;//每次的手势
	corectOder = new Array;//保存的手势
	var flagco = false;//是否有保存的手势
	var setTimes = 0;
	
	stlColor = "#2d2d2d";//选中的颜色样式
	
	//事件：
	$("#typeSet").click(function(){
		$("#text").text("手势设置中...");
	});
	$("#typeJudge").click(function(){
		$("#text").text("手势验证中...");
	});
	$("input").on("click",function(){//随时判断当前要进行的操作种类
		if($("#typeSet:checked").val() == "on"){
			gstType = 1;
		}else if($("#typeJudge:checked").val() == "on"){
			gstType = 2;
		}
	});
	//操作事件（主事件）：
	$(".yuan").on("touchstart",function(){
		if((gstType == 0)||(!flagco && gstType == 2)){
			$("#text").text("您还没有手势，请设置手势。");
		}else{
			gstStart = true;//开始滑动
			gstOder = new Array;//清空上次路径
			this.style.backgroundColor = stlColor;//被滑过后样式
			gstOder.push($(".yuan").index(this));//记录路径			
		}
	});
	document.addEventListener("touchmove",recordGst,false);
	$("body").on("touchend",function(){
		if(gstStart == true){
			clearStyle();//清除样式
			gstStart = false;//滑动结束
			gstOder = rmvAdd(gstOder);//数组去重
			if(gstOder.length < 4){
				$("#text").text("长度需要大于等于4");
			}else{
				if(gstType == 1){//设置手势
					if(setTimes == 0){
						corectOder = gstOder;
						++setTimes;
					}
					setTimes = setGst(corectOder,gstOder,setTimes);
					if(setTimes == 3){
						flagco = true;
						setTimes = 0;
					}
				}else if(gstType ==2){//验证手势
					if(judgeGst(corectOder,gstOder)){
						$("#text").text("验证通过~");
					}else{
						$("#text").text("验证失败。");
					}
				}
			}
				
		}
	});
}
	
funinit();
