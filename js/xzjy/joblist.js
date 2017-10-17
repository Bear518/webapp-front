var chnub=[];var areacd=[];
$(function(){
	$('.gzjy').addClass("active");
	iptinit()
	jobload(jobdata(0));
	/*清空*/
	$(".qk_btn a").click(function(){
		iptinit()
		location.reload() 
		})
	/*下拉框*/
    $(".clkarea").click(function(){$(".option").hide();
		$(this).parent().find(".option").show();
		$(".clkarea").parent().css("z-index","100");	
		$(this).parent().css("z-index","1000");	
	})
	
	/*点击下拉框选项*/
	$('.jobbar').on('click','.option a',function(){
		var seltext=$(this).text();
		var inctop=$(this).data("inctop");var incbtm=$(this).data("incbtm");
		var incode=$(this).data("incode");var relcode=$(this).data("relcode");
		var scacode=$(this).data("scacode");var comcode=$(this).data("comcode");
		$(this).parent().siblings().find("input").val(seltext);
		$(this).parent().siblings().find("input").data("inctop",inctop).data("incbtm",incbtm).data("incode",incode).data("relcode",relcode).data("scacode",scacode).data("comcode",comcode)
		$(".option").hide();
		/*职位列表*/
		
		jobload(jobdata(0),true);	
	})
	/*点击空白处*/
	var _flag = false; // 全局变量，用于记住鼠标是否在DIV上
	document.getElementById('incomebox').onmouseover = function (){
		_flag = true;	};	 
	document.getElementById('incomebox').onmouseout = function (){
		_flag = false;	};	 
	document.getElementById('createDatebox').onmouseover = function (){
		_flag = true;	};	 
	document.getElementById('createDatebox').onmouseout = function (){
		_flag = false;	};	
	document.getElementById('industrybox').onmouseover = function (){
		_flag = true;	};	 
	document.getElementById('industrybox').onmouseout = function (){
		_flag = false;	};
	document.getElementById('companyScalebox').onmouseover = function (){
		_flag = true;	};	 
	document.getElementById('companyScalebox').onmouseout = function (){
		_flag = false;	};	
	document.getElementById('companyTypebox').onmouseover = function (){
		_flag = true;	};	 
	document.getElementById('companyTypebox').onmouseout = function (){
		_flag = false;	};
	document.body.onclick = function (){
		if(_flag){			//不隐藏DIV
		}else{
			$(".option").hide();
		}
	};
	/*点击复选框查询*/
	
	$('.jobbar').on('click','#jobTypebox input',function(){
		chnub=[]
		$("#jobTypebox input").each(function(){
			if($(this).is(':checked')==true){
				chnub.push($(this).data("typecode"))
				}
		 });
		
		jobload(jobdata(0),true);
	})
	
	/*地区数据*/	
	loadcity();
	/*去除选中地区*/
	$('.areachosed').on('click','.areaitem i',function(){
		$(this).parent().remove();
		var code=$(this).parent().data("code");
		$(".shenglist li a[data-code='"+code+"']").removeClass("on");
	})
	$('.areachosedbox').on('click','.areaitem i',function(){
		$(this).parent().remove();
		var code=$(this).parent().data("code");
		$(".shenglist li a[data-code='"+code+"']").removeClass("on");
		areacd=[];
		 $(".areachosed_abs span").each(function(){
				areacd.push($(this).data("code"))
				
		 });
		jobload(jobdata(0),true);
	})
	/*地区弹层*/	
	$(".areabar").click(function(){
		$(".tk_dl").show();
		$('.loginbg').height($(document).height());
		var html= $(".areachosed_abs").html();
		$(".areachosed_abs2").html(html);
	})
	/*关闭弹层*/
	$("#tkcls").click(function(){
		$(".tk_dl").hide();	
		areacd=[];
		var html= $(".areachosed_abs2").html();
		$(".areachosed_abs").html(html);
		$(".tk_dl").hide();		
		$(".areachosed_abs span").each(function(){
				areacd.push($(this).data("code"))
				
		 });
		 jobload(jobdata(0),true);	
		$(".areachosed .err").hide()
	})
	/*省级城市tab*/
	$(".shengbox li a").click(function(){		
		var code=$(this).data("code");
		var sheng=$(this).html();		
		$("#s_citybox").addClass("on").html(sheng).siblings().removeClass("on");
		$("#s_citybox").css("display","inline-block")
		$(".s_citybox").show().siblings().hide();
		/*省级城市数据*/
		loadshengcity(code);
	})
	$("#hotbox").click(function(){
		$(this).addClass("on").siblings().hide();
		$(".hotbox").show().siblings().hide();
	})
	/*热门城市选择*/
	$(".hotcity li a").click(function(){
		var citycode=$(this).data("code");
		var citytxt=$(this).text();
		if($(this).attr('class')=="on"){
			$(".areachosed span[data-code='"+citycode+"']").remove();
			$(this).removeClass("on");$(".areachosed .err").hide()
			}
		else{
			if($(".areachosed .areaitem").length<3&&$(".areachosed .areaitem").length>-1){
				citychose(citytxt,citycode);
				$(this).addClass("on");				
				}
			else{
				$(".areachosed .err").show()
				}
			}
			
			
	})
	$(".s_citybox").on('click','a',function(){
		var citytxt=$(this).text();
		var citycode=$(this).data("code");
		if($(this).attr('class')=="on"){
			$(".areachosed span[data-code='"+citycode+"']").remove();
			$(this).removeClass("on");$(".areachosed .err").hide()
			}
		else{
			if($(".areachosed .areaitem").length<3&&$(".areachosed .areaitem").length>-1){
				citychose(citytxt,citycode);
				$(this).addClass("on");				
				}
			else{
				$(".areachosed .err").show()
				}
			
			
			}
	})
	/*确定选择城市*/
	$(".tk_btn").click(function(){
		areacd=[];
		var html= $(".areachosed_abs2").html();
		$(".areachosed_abs").html(html);
		$(".tk_dl").hide();		
		$(".areachosed_abs span").each(function(){
				areacd.push($(this).data("code"))
				
		 });
		 jobload(jobdata(0),true);
		 $(".areachosed .err").hide()
	})
	
	selectopts();//数据字典-职位
	selectopts1();//数据字典-发布时间
	selectopts2();//数据字典-月薪
	selectopts3();//数据字典-职位性质
	selectopts4();//数据字典-企业性质
	selectopts5();//数据字典-企业规模
});
function iptinit(){
	$('#industry').val("行业不限");
	$('#createDate').val("发布时间不限");
	$('#income').val("月薪范围不限");
	$('#companyScale').val("不限");
	$('#companyType').val("不限");
	}
function loadcity(){
	/*热门*/
	var hotcthtml = "";	
	var hcy=LocalData.citys.hotcity;
	for(var i=0;i<hcy.length;i++){		
		hotcthtml += '<li><a data-code="' + hcy[i][0] + '" href="javascript:;">' + hcy[i][1] + '</a></li>';
		};
	$(".hotcity").html(hotcthtml);  
	 /*省份*/
	var shenghtml = "";	
	var ctlist=LocalData.citys.list;
	for(var i=0;i<ctlist.length;i++){	
		if(ctlist[i][0]==2){	
		shenghtml += '<li><a data-code="' + ctlist[i][1][0] + '" href="javascript:;">' + ctlist[i][1][1] + '<label>0</label></a></li>';
		}
	};
	$(".shengbox").html(shenghtml);   
}
function loadshengcity(code){
	var shtml = "";	
	var ctlist=LocalData.citys.list;
	for(var i=0;i<ctlist.length;i++){	
		if(ctlist[i][0]==2 && ctlist[i][1][0]==code){
			shtml += '<span class="s_title"><a data-code="' + ctlist[i][1][0] + '" href="javascript:;" >' + ctlist[i][1][1] + '</a></span>';		
			shtml += '<ul>';
			for(var j=1;j<ctlist[i][2].length;j++){				
					shtml += '<li><a data-code="' + ctlist[i][2][j][0] + '" href="javascript:;">' + ctlist[i][2][j][1] + '</a></li>';
				}
			shtml += '</ul>';
				
		}
	}
	$(".s_citybox").html(shtml);   
}
function citychose(citytxt,citycode){
		
		var htmlcity = "";
		htmlcity += '<span class="areaitem" data-code="' + citycode + '">' + citytxt + '<i class="iconfont">&#xe604;</i></span>';
		$(".areachosed_abs2").append(htmlcity);	
			
		
	}
	
var isHasPaged=false;
/*joblist*/
function jobload(data,topage){	
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/job/jobList",
			data:data,
			beforeSend:function(){
		    $(".jobbar_content ul").html('<span class="nols"><i>查找中，请稍后...</i></span>');			 
		    },
            success: function (job) {
				if(topage){isHasPaged=false;}
			var htmljob = "";		
			if(job.status== "SUCCESS"){
				if(job.content.total%data.rows==0){totalPage=parseInt(job.content.total/data.rows);}
				else{totalPage=parseInt(job.content.total/data.rows)+1;}
				
				if(job.content.rows.length>0){
					for(var i=0; i<job.content.rows.length; i++){
					htmljob += '<li class="clearfix"><span class="com_img"><img src="' + job.content.rows[i].companyLogo + '" alt=""></span>'
					htmljob += '<div class="jobinfo"><div class="jobtitle"><a href="detail.html?id='+job.content.rows[i].jobId+'" target="_blank">' + job.content.rows[i].jobName + '</a>'
					var jobtp=job.content.rows[i].jobType;
					if(jobtp=="自由职业"){
						htmljob += '<span class="zy">自由</span></div>'}
					else if(jobtp=="全职"){
						htmljob += '<span class="qz">全职</span></div>'}
					else if(jobtp=="实习"){
						htmljob += '<span class="sx">实习</span></div>'}
					else if(jobtp=="兼职"){
						htmljob += '<span class="jz">兼职</span></div>'}
					else if(jobtp=="临时工"){
						htmljob += '<span class="ls">临时工</span></div>'}
					else {
						htmljob += '<span class="qt">其他</span></div>'}
					
					htmljob += '<span class="ico company"><i></i>' + job.content.rows[i].companyName + '</span>'
					if(job.content.rows[i].areaCode!==null&&job.content.rows[i].areaCode!==""){
                    htmljob += '<span class="ico address"><i></i>' + job.content.rows[i].areaCode + '</span>'}
					if(job.content.rows[i].incomeBottom==0&&job.content.rows[i].incomeTop==0){
						htmljob += '<span class="ico price"><i></i>面议</span></div></li>';
					}
					else{
                    htmljob += '<span class="ico price"><i></i>¥' + job.content.rows[i].incomeBottom + '-' + job.content.rows[i].incomeTop + '</span></div></li>';
					}
					}
				}
				else{//没有job
					htmljob += '<span class="nols"><i>没有符合要求的职位</i></span>';
				}
				if(job.content.total<=10){$('.pagination').hide();}
				 if(job.content.total>10&&!isHasPaged){$('.pagination').show();
					 $('.pagination').off('click');
				 $('.pagination').createPage({
                  pageCount:totalPage,
                  current:1,
                  isHasGoto:false,
                  backFn:function(page){
                      //单击回调方法，p是当前页码
					  
					   jobload(jobdata(page))  ;  
                  }
            	 });
				 }
				 isHasPaged=true;
				 var jobnum=job.content.total
				
			}			
				else{//没有job
					htmljob += '<span class="nols"><i>error:' + job.message + '</i></span>';
			}
			$(".jobbar_content ul").html(htmljob);
			$(".jobnum i").text(jobnum);
			
            }
        });
}
/*机遇查询参数*/
function jobdata(page){	
	var pageSize = "10";//每页行数
	if(page==0){
		var currentPage = "1";//当前页
	}
	else{
		var currentPage = page;//当前页
	}
	var totalPage = "0";//总页数
	var rowCount = "0";//总条数
	var params="";//参数 
	var incomeTop=$("#income").data("inctop");
	var incomeBottom=$("#income").data("incbtm");
	var incode=$("#industry").data("incode");		//	行业
	var relcode=$("#createDate").data("relcode");//发布时间
	var scacode=$("#companyScale").data("scacode");//企业规模
	var comcode=$("#companyType").data("comcode");//企业性质
	
	if(chnub.join(',')==""){
		var chnub2=[]
	}
	else{
		chnub2=chnub.join(',')
	}
	if(areacd.join(',')==""){
		var areacd2=[]
	}
	else{
		areacd2=areacd.join(',')
	}
	var data={
		incomeTop:incomeTop,
		incomeBottom:incomeBottom,
		industryId:incode,//	行业
		jobType:chnub2,
		companyType:comcode,//企业性质
		companyScale:scacode,//企业规模
		releaseDateCode:relcode,//发布时间
		page:currentPage,
		rows:pageSize,	
		areaCode:areacd2,
	}
	return data;	
}			
/*数据字典职位下拉列表*/
function selectopts(){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/dictionary/getByCode",
			data:{code:'industry'},
            success: function (opt) {
			var htmlopt1 = "";		
			if(opt.status== "SUCCESS"){
				htmlopt1 += '<a href="javascript:;" data-incode="">行业不限</a>';
				if(opt.content.length>0){
					for(var i=0; i<opt.content.length; i++){
					var code=opt.content[i].code;						
					htmlopt1 += '<a href="javascript:;" data-incode="' + code + '" >' + opt.content[i].name + '</a>';					
					}
				}
				else{
					
				}				
			}			
				else{
					htmlopt1 += 'error';
			}
			$("#industrybox .option").html(htmlopt1);
            }
	});
}
/*数据字典发布时间下拉列表*/
function selectopts1(){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/dictionary/getByCode",
			data:{code:'jobReleaseDate'},
            success: function (opt) {
			var htmlopt1 = "";		
			if(opt.status== "SUCCESS"){
				htmlopt1 += '<a href="javascript:;" data-relcode="" >发布时间不限</a>';
				if(opt.content.length>0){					
					for(var i=0; i<opt.content.length; i++){
					var code=opt.content[i].code;						
					htmlopt1 += '<a href="javascript:;" data-relcode="' + code + '" >' + opt.content[i].name + '</a>';					
					}
				}
				else{
					
				}				
			}			
				else{
					htmlopt1 += 'error';
			}
			$("#createDatebox .option").html(htmlopt1);
            }
	});
}
/*数据字典月薪下拉列表*/
function selectopts2(){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/dictionary/getByCode",
			data:{code:'incomeRange'},
            success: function (opt) {
			var htmlopt1 = "";		
			if(opt.status== "SUCCESS"){
				htmlopt1 += '<a href="javascript:;"  data-incbtm="">月薪范围不限</a>';
				if(opt.content.length>0){
					for(var i=0; i<opt.content.length; i++){
						var code=opt.content[i].code;
						var n_code=new RegExp('.*[\_]+(.*)[\_]+(.*)');
						var incbtm=code.replace(n_code,"$1");
						var inctop=code.replace(n_code,"$2");
					htmlopt1 += '<a href="javascript:;" data-incbtm="' + incbtm + '" data-inctop="' + inctop + '">' + opt.content[i].name + '</a>';					
					}
				}
				else{
					
				}				
			}			
				else{
					htmlopt1 += 'error';
			}
			$("#incomebox .option").html(htmlopt1);
            }
	});
}
/*数据字典职位性质复选框*/
function selectopts3(){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/dictionary/getByCode",
			data:{code:'jobType'},
            success: function (opt) {
			var htmlopt1 = "";		
			if(opt.status== "SUCCESS"){
				if(opt.content.length>0){					
					for(var i=0; i<opt.content.length; i++){
					var code=opt.content[i].code;						
					htmlopt1 += '<span><input class="num'+i+'" name="" type="checkbox" value="" data-typecode="' + code + '" ><label>' + opt.content[i].name + '</label></span>';					
					}
				}
				else{
					
				}				
			}			
				else{
					htmlopt1 += 'error：' + opt.message;
			}
			$("#jobTypebox").html(htmlopt1);
					
		
            }
	});
}
/*数据字典企业性质下拉列表*/
function selectopts4(){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/dictionary/getByCode",
			data:{code:'companyType'},
            success: function (opt) {
			var htmlopt1 = "";		
			if(opt.status== "SUCCESS"){
				htmlopt1 += '<a href="javascript:;" data-comcode="">不限</a>';
				if(opt.content.length>0){					
					for(var i=0; i<opt.content.length; i++){
						var code=opt.content[i].code;						
					htmlopt1 += '<a href="javascript:;" data-comcode="' + code + '" >' + opt.content[i].name + '</a>';					
					}
				}
				else{
					
				}				
			}			
				else{
					htmlopt1 += 'error';
			}
			$("#companyTypebox .option").html(htmlopt1);
            }
	});
}
/*数据字典企业规模下拉列表*/
function selectopts5(){
	$.ajax({
            type: "get",
            dataType: "json",
            url: $._CACHEOBJ.context+"/dictionary/getByCode",
			data:{code:'companyScale'},
            success: function (opt) {
			var htmlopt1 = "";		
			if(opt.status== "SUCCESS"){
				htmlopt1 += '<a href="javascript:;" data-scacode="">不限</a>';
				if(opt.content.length>0){					
					for(var i=0; i<opt.content.length; i++){
					var code=opt.content[i].code;						
					htmlopt1 += '<a href="javascript:;" data-scacode="' + code + '" >' + opt.content[i].name + '</a>';					
					}
				}
				else{
					
				}				
			}			
				else{
					htmlopt1 += 'error';
			}
			$("#companyScalebox .option").html(htmlopt1);
            }
	});
}


