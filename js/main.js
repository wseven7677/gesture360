function funJudge(go,co){
//	console.log(go);
//	console.log(co);
	var flag = 0;
	for(var i = 0;i < co.length;++i){
		if(go[i] == co[i]){++flag;}
	}
	if(flag == co.length){
		$("#text").text("验证通过~");
	}else{
		$("#text").text("验证失败。");
	}
}
function clearStyle(){
	$(".yuan").css("background","#fff");
}



//------main function-------
function funinit(){
	var flagStart = false;
	var gstOder = new Array;
	var corectOder = new Array;
	var flagCO = 0;
//	var gstIdx = 0;
	
	$("#typeSet").click(function(){
		$("#text").text("手势设置中...");
		flagCO = 1;
	});
	$("#typeJudge").click(function(){
		$("#text").text("手势验证中...");
	});
	$(".yuan").on("mousedown",function(){
		if(flagCO == 0){
			$("#text").text("您还没有手势，请设置手势。");
		}else{
			if($("#typeSet:checked").val() == "on"){flagCO = 1;}//重新设置手势
			//正常流程：
			this.style.backgroundColor = "black";
			gstOder = new Array;
			gstOder.push($(".yuan").index(this));
			flagStart = true;
		}
	});
	$(".yuan").on("mouseup",function(){
		if(flagStart){
			if(flagCO == 1){
				if(gstOder.length < 4){
					$("#text").text("请设置长度大于等于4的手势。");
				}else{
					corectOder = gstOder;
					$("#text").text("手势设置完成。");
					flagCO = 2;
				}
			}else{
				funJudge(gstOder,corectOder);
			}
			clearStyle();
			flagStart = false;
		}
	});
	//正常划过流程：
	$(".yuan").on("mouseover",function(){
		
		if(flagStart){
			this.style.backgroundColor = "black";
			gstOder.push($(".yuan").index(this));
		}
	});
}
funinit();