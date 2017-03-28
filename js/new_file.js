function clearStyle(){
	$(".yuan").css("background","#fff");
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
	var gstStart = false;//路径开始
	
	var gstOder = new Array;//每次的手势
	var corectOder = new Array;//保存的手势
	var flagco = false;//是否有保存的手势
	var setTimes = 0;
	
	//事件：
	$("#typeSet").click(function(){
		$("#text").text("手势设置中...");
	});
	$("#typeJudge").click(function(){
		$("#text").text("手势验证中...");
	});
	$("body").on("mousemove",function(){//随时判断当前要进行的操作种类
		if($("#typeSet:checked").val() == "on"){
			gstType = 1;
		}else if($("#typeJudge:checked").val() == "on"){
			gstType = 2;
		}
	});
	//操作事件（主事件）：
	$(".yuan").on("mousedown",function(){
		if((gstType == 0)||(!flagco && gstType == 2)){
			$("#text").text("您还没有手势，请设置手势。");
		}else{
			gstStart = true;//开始滑动
			gstOder = new Array;//清空上次路径
			this.style.backgroundColor = "black";//被滑过后样式
			gstOder.push($(".yuan").index(this));//记录路径			
		}

	});
	$(".yuan").on("mouseover",function(){
		if(gstStart == true){
			this.style.backgroundColor = "black";//被滑过后样式
			gstOder.push($(".yuan").index(this));//记录路径
		}
	});
	$("body").on("mouseup",function(){
		if(gstStart == true){
			clearStyle();//清除样式
			gstStart = false;//滑动结束
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
