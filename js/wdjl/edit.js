var langDegreeData=['请选择','良好','精通'];
var degreeData=['请选择','博士研究生','硕士研究生','本科','专科','其他'];
var teamScaleData=['请选择','1-3人','4-7人','8-10人','11-20人','21人以上'];
var positionLevelData=['请选择','实习/见习','初级','资深(非管理岗)','经理/主管','总监/部门负责人','执行官/总裁'];
	var editModule={
		bindEvents:function(){
			var self=this;
			$('body').on('click','.left-wrap li',function(){
				var $this=$(this),idstr=$this.data('id');
				document.getElementById(idstr).scrollIntoView();
			});
	    	$('#j_r_wrap').on('click','.i-edit',function(){
	    		var $this=$(this),id=$this.data('id');
	    		$(id).find('.detail-wrap').addClass('active-detail-edit');
	    		$this.addClass('active-edit');
	    	});
	    	$('#j_r_wrap').on('click','.i-add',function(){
	    		var $this=$(this),id=$this.data('id');
	    		$(id).find('.detail-wrap').addClass('active-detail-edit');
	    		$this.addClass('active-add');
	    	});
	    	$('#j_r_wrap').on('click','.but-cancel',function(){
	    		var $this=$(this),id=$this.data('id'),$container=$(id);
	    		$container.find('.detail-wrap').removeClass('active-detail-edit');
	    		$container.find('.i-edit').removeClass('active-edit');
	    		$container.find('.i-add').removeClass('active-add');

	    	});
		    // var deg=0;
		    $('body').on('click','#j_photo_turn_left',function(){
		       var isNeedOffset,jcrop_api=editModule.jcrop_api,deg=jcrop_api.rotateObj.angle;
		        deg-=90;
		        var degstr='rotateZ('+deg+'deg)';
		        if(deg<-270){
		            deg=0;
		            degstr='rotateZ('+deg+'deg)';
		        }
		        
		        if((deg/90)%2==0){
		            isNeedOffset=false;
		        }else{
		            isNeedOffset=true;
		        }
		         jcrop_api.rotateImg(degstr,isNeedOffset);
		         $('.preview').css('transform',degstr);
		         jcrop_api.setSelect([ 60, 70, 540, 330 ]);
		         jcrop_api.rotateObj.angle=deg;
		    });
		    $('body').on('click','#j_photo_turn_right',function(){
		    	var isNeedOffset,jcrop_api=editModule.jcrop_api,deg=jcrop_api.rotateObj.angle;
		        deg+=90;
		        var degstr='rotateZ('+deg+'deg)';
		        if(deg>270){
		            deg=0;
		            degstr='rotateZ('+deg+'deg)';
		        }
		        
		        if((deg/90)%2==0){
		            isNeedOffset=false
		        }else{
		            isNeedOffset=true;
		        }
		         jcrop_api.rotateImg(degstr,isNeedOffset);
		         $('.preview').css('transform',degstr);
		         jcrop_api.setSelect([ 60, 70, 540, 330 ]);
		         jcrop_api.rotateObj.angle=deg;
		    });
			$('body').on('mouseenter mouseleave','#j_left_wrap',function(e){
	            if(e.type=="mouseenter"&&window.scrollY>600){
	              $('body').css('overflow-y','hidden');
	            }else{
	                $('body').css('overflow-y','auto');
	            }
	            console.log(e.type);
	        });
		},
	    initSelectYears:function(){
	        var dom='',
	            year=new Date().getFullYear(),arr=[];
	        for(var i=0;i<60;i++){
	        	arr.push(year--);
	        }
	        return arr;
	    },
	    initSelectMonths:function(){
	        var dom='',month=12,arr=[];
	        for(var i=0;i<12;i++){
	        	arr.push(month--)
	        }
	        return arr;
	    },
	    initSelectDays:function(){
	        var dom='',day=31,arr=[];
	        for(var i=1;i<32;i++){
	        	arr.push(day--);
	        }
	        return arr;
	    },
	    initSelectWorkExperience:function(){
	    	//工作经验
	    	var arr=['请选择','刚参加工作','已工作1年','已工作2年','已工作3年','已工作4年','已工作5年','已工作6年','已工作7年','8年及以上'];
	    	return arr;
	    },
	    initSelectWorkTime:function(){
	    	//到岗时间
	    	var arr=['请选择','1周内','一个月内','1～3个月','3个月以上','面议'];
	    	return arr;
	    },
	    initSelectPersonalState:function(){
	    	//个人状态
	    	var arr=['请选择','在职','已离职','在职看新机会'];
	    	return arr;
	    },
	    switchToFirstStep:function(){
	    	$('#j_photojcrop_steps_wrap').toggleClass('active-first active-second');
	    	$('.preview').attr('src','/img/wdjl/photo.jpg').removeAttr('style');
	    },
		fileOnChange:function(file) {

			// return;
			// var fd = new FormData();
			// fd.append('file', e.target.files[0]);
			// var file=e.target;
	        // Get a reference to the fileList
	        var files = !!file.files ? file.files : [];
	        // If no files were selected, or no FileReader support, return
	        if (!files.length || !window.FileReader) return;
            var fileType=files[0].type;
            // Create a new instance of the FileReader
            var reader = new FileReader();

            // Read the local file as a DataURL
            reader.readAsDataURL(files[0]);
            console.info(files[0]);
			window.photoName=files[0].name;
			if(files[0].size/(1240*1240)>3){
				$('#j_photojcrop_steps_wrap').find('.err').fadeIn();
				var st=setTimeout(function(){
					$('#j_photojcrop_steps_wrap').find('.err').fadeOut();
					clearTimeout(st);
				},5000);
			}else{
				$('#j_photojcrop_steps_wrap').find('.err').fadeOut();
			}
            // When loaded, set image data as background of div
            reader.onloadend = function(){
    			$('#j_photojcrop_steps_wrap').toggleClass('active-first active-second');
    			$('#img_target').attr('src',this.result);
				$('.preview').attr('src',this.result);
				editModule.jcropPhoto();

            }
            
			// $interface.upload(fd).then(function(data) {
			// 	$scope.uploadPhoto = data.file.fileName;
			// });
		},
		jcropPhoto:function(){
		    // Create variables (in this scope) to hold the API and image size
		    var jcrop_api=editModule.jcrop_api,
		        boundx,
		        boundy,aspectRatio,

		        // Grab some information about the preview pane
		        $preview = $('#preview-pane'),
		        $pcnt = $('#preview-pane .preview-container'),
		        $pimg_2x = $('#preview-pane .preview-2x-container img.preview'),
		        $pimg_3x = $('#preview-pane .preview-3x-container img.preview'),
		        $pimg = $('#preview-pane .preview-container img.preview'),

		        xsize = $pcnt.width(),
		        ysize = $pcnt.height();
		    console.log(xsize);
		    var updatePreview=function(c)
		    {
		      if (parseInt(c.w) > 0)
		      {
		      	function px(n) {
			      return Math.round(n) + 'px';
			    }
		      	//旋转偏移量
		      	// var wsbounds=this.getWidgetSize();
		      	// aspectRatio=wsbounds[0]/wsbounds[1];
        	// 	var rotateOffset=Math.round(wsbounds[0]-wsbounds[1]);
		        var rx = xsize / c.w;
		        var ry = ysize / c.h;
		        var rx2=rx*2;ry2=ry*2;
		        var rx3=rx*(130/30);ry3=ry*(130/30);
		        var left=rx * c.x,top=ry * c.y,left2=rx2 * c.x,top2=ry2 * c.y,left3=rx3 * c.x,top3=ry3 * c.y;
		        var isRotated=jcrop_api.rotateObj.isRotated;
		        var w=rx * boundx,h=ry * boundy,w2=rx2*boundx,h2=ry2*boundy,w3=rx3*boundx,h3=ry3*boundy;
		        if(isRotated){
		        	var offset=(w-h)/2;
		        	left+=offset;
		        	top-=offset;
		        	var offset2=(w2-h2)/2;
		        	left2+=offset2;
		        	top2-=offset2;
		        	var offset3=(w3-h3)/2;
		        	left3+=offset3;
		        	top3-=offset3;
		        }
		        $pimg.css({
		          width: px(w),
		          height:px(h),
		          marginLeft:px(-left),
		          marginTop: px(-top)
		        });
		        $pimg_2x.css({
		          width: px(w2),
		          height: px(h2),
		          marginLeft: px(-left2),
		          marginTop: px(-top2)
		        });
		        $pimg_3x.css({
		          width: px(w3),
		          height: px(h3),
		          marginLeft: px(-left3),
		          marginTop:px(-top3)
		        });
		        console.log(jcrop_api&&jcrop_api.tellSelect());
		        console.log(jcrop_api&&jcrop_api.tellScaled());
		        window.jcropPhotoSelect=jcrop_api&&jcrop_api.tellSelect();
		      }
		    };
		    jcrop_api&&jcrop_api.destroy();
		    $('#img_target').Jcrop({
		        onChange: updatePreview,
		        onSelect: updatePreview,
		        aspectRatio:1,
		        boxWidth:258,
		        boxHeight:264
		    },function(){
		      // Use the API to get the real image size
		      var bounds = this.getBounds();
		      boundx = bounds[0];
		      boundy = bounds[1];
		      console.log(this.getBounds());
		      var wsbounds=this.getWidgetSize();
		      aspectRatio=wsbounds[0]/wsbounds[1];
		      console.log(aspectRatio);
		      // Store the API in the jcrop_api variable
		      jcrop_api = this;
		      editModule.jcrop_api=this;
		      // Move the preview into the jcrop container for css positioning
		      // $preview.appendTo(jcrop_api.ui.holder);
		      jcrop_api.setSelect([ 60, 70, 540, 330 ]);
		      jcrop_api.ui.holder.css('top',(264-wsbounds[1])/2);
		    });
		},
	    uri:{
	    	allInfoDataQuery:'user/archive/detail',
	    	objectiveAdd:'userJobIntension/save',
	    	objectiveUpdate:'userJobIntension/update',
	    	basicInfoQuery:'user/basicInfo/detail',
	    	basicInfoSave:'user/basicInfo/update',
	    	contactInfoQuery:'user/contactInfo/detail',
	    	contactInfoSave:'user/contactInfo/update',
	    	skillQuery:'user/skill/detail',
	    	skillSave:'user/skill/update',
	    	certQuery:'user/certificate/detail',
	    	getSelectData:'dictionary/getResumeData',
	    	getByCode:'dictionary/getByCode',
	    	langAdd:'user/language/add',
	    	langUpdate:'user/language/update',
	    	langDel:'user/language/delete',
	    	langList:'user/language/list',
	    	langDetail:'user/language/detail',
	    	certDetail:'user/certificate/detail',
	    	certSave:'user/certificate/update',
	    	educationList:'user/education/list',
	    	educationDel:'user/education/delete',
	    	educationUpdate:'user/education/update',
	    	educationAdd:'user/education/add',
	    	educationDetail:'user/education/detail',
	    	trainAdd:'userTraining/add',
	    	trainUpdate:'userTraining/update',
	    	trainDel:'userTraining/delete',
	    	schoolSave:'userCampusDudy/save',
	    	schoolUpdate:'userCampusDudy/update',
	    	schoolDel:'userCampusDudy/delete',
	    	honorSave:'userHonor/save',
	    	honorUpdate:'userHonor/update',
	    	honorDel:'userHonor/delete',
	    	workSave:'userWork/save',
	    	workUpdate:'userWork/update',
	    	workDel:'userWork/delete',
	    	internshipSave:'userInternship/save',
	    	internshipUpdate:'userInternship/update',
	    	internshipDel:'userInternship/delete',
	    	projectSave:'userProject/save',
	    	projectUpdate:'userProject/update',
	    	projectDel:'userProject/delete',
	    	photoUpdate:'user/basicInfo/updatePhoto',
	    	togglePhotoShowInResume:'user/basicInfo/setPhotoShowOrNot'
	    },
	    getVendorPrefix:function(){
	        var vendorPrefix,
	        vendorRegex = /^(Moz|webkit|ms|o)(?=[A-Z])/,
	        bodyStyle = document.body && document.body.style,
	        match;
		    if (bodyStyle) {
		      for (var prop in bodyStyle) {
		      	console.log(prop);
		        if (match = vendorRegex.exec(prop)) {
		          vendorPrefix = match[0];
		          vendorPrefix = vendorPrefix.substr(0, 1).toLowerCase() + vendorPrefix.substr(1);
		          console.log(vendorPrefix);
		          break;
		        }
		      }
		    }
		    return (vendorPrefix&&(vendorPrefix+'-'))||'';
	    },
		init:function(){
			this.bindEvents();
			mainModule.judgeUri(this.uri);
		}
	};
	editModule.init();
	var app = angular.module('app', []);
	app.controller('appCtrl',['$scope','$http','editModule','$interface','$timeout',function($scope,$http,editModule,$interface,$timeout) {
		$scope.cityData=[];
		$scope.cityChildData={};
		$scope.years=editModule.initSelectYears();
		$scope.months=editModule.initSelectMonths();
		$scope.days=editModule.initSelectDays();
		$scope.workExperienceData=editModule.initSelectWorkExperience();
		$scope.workTimeData=editModule.initSelectWorkTime();
		$scope.personalStateData=editModule.initSelectPersonalState();
		$scope.industryData=[];
		$scope.jobtypeData=[];
		$scope.certCommonData=[];
		$scope.certOtherData=[];
		$scope.certOtherChildData=[];
		$scope.certOtherChildItemData=[];
		$scope.langSkillData=[];
		$scope.langSkillChildData=[];
		$scope.langDegreeData=langDegreeData;
		$scope.degreeData=degreeData;
		$scope.teamScaleData=teamScaleData;
		$scope.positionLevelData=positionLevelData;
		$scope.hotCity=[];
		$scope.userInfo={};
		//用户信息初始化
		$scope.userObjectiveCitys=[];
		$scope.userObjectiveIndustrys=[];
		$scope.userObjectiveJobTypes=[];
		//总查询接口 start code
		//各个列表
		$scope.trainList=[];
		$scope.schoolList=[];
		$scope.honorList=[];
		// 编辑加遮罩
		$scope.shadeInfo={
			basicInfoShow:false,
			objectiveInfoShow:false,
			contactInfoShow:false,
			langInfoShow:false,
			skillInfoShow:false,
			certInfoShow:false,
			educationInfoShow:false,
			trainInfoShow:false,
			schoolInfoShow:false,
			honorInfoShow:false,
			workInfoShow:false,
			internshipInfoShow:false,
			projectInfoShow:false
		};
		var changeShade=function(targetStrKey,cancelUpdate){
			var shadeInfo=$scope.shadeInfo,targetStrKey=targetStrKey+'Show';
			if(cancelUpdate){
				for(var key in shadeInfo){
					shadeInfo[key]=false;
				}
				$scope.shadeInfo=shadeInfo;
				return;
			}
			for(var key in shadeInfo){
				shadeInfo[key]=true;
			}
			shadeInfo[targetStrKey]=false;
			$scope.shadeInfo=shadeInfo;
		};
		$scope.changeShade=changeShade;
		//testarea支持回车换行
		$scope.enterToNewLine=function(e){
			// var e=window.event||e,keyCode=e.keyCode;
			// if(e.which==13||keyCode==13){
			// 	var val=angular.element(e.target).val(),selectionStart=e.target.selectionStart;
			// 	val=val.substr(0,selectionStart)+'\n'+val.substr(selectionStart);
			// 	angular.element(e.target).val(val);
			// 	e.target.selectionStart=selectionStart+1;
			// 	e.target.selectionEnd=selectionStart+1;
			// 	e.preventDefault&&e.preventDefault();
			// }
			// console.log(e);
			// e.stopPropagation&&e.stopPropagation();
			// e.returnValue=false;
			// return false;
		}
		// 此处编辑前复制一份数据，为取消编辑时做还原
		var userInfoClone,selectedAddressClone,contactInfoClone;
		// 求职意向编辑前要copy的数据
		var userObjectiveIndustrysClone,userObjectiveJobTypesClone,userObjectiveCitysClone,userObjectiveClone;
		$scope.copyInfoForEdit=function(typestr){
			switch(typestr){
				case 'basicInfo':
					userInfoClone=angular.copy($scope.userInfo);
					selectedAddressClone=$scope.selectedAddress;
				break;
				case 'objectiveInfo':
					userObjectiveClone=angular.copy($scope.userObjective);
					userObjectiveIndustrysClone=angular.copy($scope.userObjectiveIndustrys);
					userObjectiveJobTypesClone=angular.copy($scope.userObjectiveJobTypes);
					userObjectiveCitysClone=angular.copy($scope.userObjectiveCitys);
				break;
				case 'contactInfo':
					contactInfoClone=angular.copy($scope.contactInfo);
				break;
			}
			changeShade(typestr);
			console.log('编辑前复制一份数据'+typestr);
		}
		$scope.cancelInfoUpdate=function(typestr){
			switch(typestr){
				case 'basicInfo':
					$scope.userInfo=userInfoClone;
					$scope.selectedAddress=selectedAddressClone;
				break;
				case 'objectiveInfo':
					$scope.userObjective=userObjectiveClone;
					$scope.userObjectiveIndustrys=userObjectiveIndustrysClone;
					$scope.userObjectiveJobTypes=userObjectiveJobTypesClone;
					$scope.userObjectiveCitys=userObjectiveCitysClone;
				break;
				case 'contactInfo':
					$scope.contactInfo=contactInfoClone;
				break;
			}
			changeShade(typestr,true);
			console.log('编辑前复制一份数据'+typestr);
		}
		// $scope.schoolList=[];
		// 验证email、tel
		$scope.checkInput=function(typestr,val){
			var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
			var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
			var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
			var PHONE_REGEXP=/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0-9]|17[0-9])\d{8}$/;
			switch(typestr){
				case 'contact-email':
					if(!EMAIL_REGEXP.test(val)){
						$scope.contactInfoErr.email='邮箱格式不正确';
					}else{
						$scope.contactInfoErr.email=undefined;
					}
				break;
				case 'contact-tel':
					if(!PHONE_REGEXP.test(val)){
						$scope.contactInfoErr.mobilePhone='手机格式不正确';
					}else{
						$scope.contactInfoErr.mobilePhone=undefined;
					}
				break;
				case 'work-year':
					val.startYear=val.startYear.replace(/\D/g,'');
					console.log(val);
				break;
			}
			console.log(val);
		}
		$scope.checkNumberInput=function(e){
			var e=window.event||e,keyCode=e.keyCode;
			if((keyCode<48&&keyCode!=8&&keyCode!=9)||keyCode>57){
				e.preventDefault();
			}
		}
		var allInfoDataQuery=function(){
			$interface.get(editModule.uri.allInfoDataQuery).then(function(result){
				mainModule.log('总查询的用户数据',result);
				if(result.status=='SUCCESS')
				{
					queryBasicInfo(result.content.basicInfo);
					$scope.photoInfo=result.content.photo||{};
					$scope.photoInfo.photo&&($scope.photoInfo.photo=$scope.photoInfo.photo+'?rad='+Math.random());
					$scope.trainList=result.content.trainings||[];
					$scope.schoolList=result.content.campusDuties||[];
					$scope.honorList=result.content.honors||[];
					$scope.projectList=result.content.projects||[];
					$scope.workList=result.content.works||[];
					$scope.internshipList=result.content.internships||[];
					$scope.educationList=result.content.educations||[];
					$scope.langList=result.content.languages||[];
					$scope.contactInfo=result.content.contactInfo||{};
					$scope.certInfo=result.content.certificate||{};
					$scope.userCertCerts=result.content.certificate&&result.content.certificate.certificateChosenList||[];
					$scope.skillInfo=result.content.skill||{};
					$scope.userskillskills=result.content.skill&&result.content.skill.masterSkillChosenList||[];
					$scope.userskilledskills=result.content.skill&&result.content.skill.practisedSkillChosenList||[];
					// 求职意向
					$scope.userObjective=result.content.jobIntension||{};
					$scope.userObjectiveIndustrys=result.content.jobIntension&&result.content.jobIntension.industryList||[];
					$scope.userObjectiveJobTypes=result.content.jobIntension&&result.content.jobIntension.categoryList||[];
					$scope.userObjectiveCitys=result.content.jobIntension&&result.content.jobIntension.citysList||[];

					calculateFinishedPerc(result.content);
				}
			})
		};
		// 设置头像是否在简历中显示
		$scope.togglePhotoShowInResume=function(){
			var isShowPhotoInResume=$scope.photoInfo.show;
			isShowPhotoInResume?(isShowPhotoInResume=false):(isShowPhotoInResume=true);
			$interface.post(editModule.uri.togglePhotoShowInResume,{show:isShowPhotoInResume}).then(function(result){
				mainModule.log('设置头像在简历中是否显示接口返回数据',result);
				if(result.status=='SUCCESS'){
					$scope.photoInfo.show=isShowPhotoInResume;
				}
			})
		}
		// 查询是否显示
		$scope.resumeFinishedInfo={};
		var calculateFinishedPerc=function(content){
			var perc=0,averagePer=100/13,resumeFinishedInfo=$scope.resumeFinishedInfo;
			// 基本信息
			if(content.basicInfo&&content.basicInfo.name&&content.basicInfo.gender){
				perc+=averagePer;
				resumeFinishedInfo.basicInfoFinished=true;
			}
			// 求职意向
			if(content.jobIntension&&content.jobIntension.industry&&content.jobIntension.category){
				perc+=averagePer;
				resumeFinishedInfo.jobIntensionFinished=true;
			}
			// 联系方式
			if(content.contactInfo&&content.contactInfo.mobilePhone&&content.contactInfo.email){
				perc+=averagePer;
				resumeFinishedInfo.contactInfoFinished=true;
			}
			//语言能力
			if(content.languages&&content.languages.length>0){
				perc+=averagePer;
				resumeFinishedInfo.languagesFinished=true;
			}
			// 掌握技能
			if(content.skill&&content.skill.masterSkillChosenList.length>0){
				perc+=averagePer;
				resumeFinishedInfo.skillFinished=true;
			}
			// 证书
			if(content.certificate&&content.certificate.certificateChosenList.length>0){
				perc+=averagePer;
				resumeFinishedInfo.certificateFinished=true;
			}
			// 教育经历
			if(content.educations&&content.educations.length>0){
				perc+=averagePer;
				resumeFinishedInfo.educationsFinished=true;
			}
			// 培训经历
			if(content.trainings&&content.trainings.length>0){
				perc+=averagePer;
				resumeFinishedInfo.trainingsFinished=true;
			}
			// 校内职务
			if(content.campusDuties&&content.campusDuties.length>0){
				perc+=averagePer;
				resumeFinishedInfo.campusDutiesFinished=true;
			}
			// 获得荣誉
			if(content.honors&&content.honors.length>0){
				perc+=averagePer;
				resumeFinishedInfo.honorsFinished=true;
			}
			// 工作经历
			if(content.works&&content.works.length>0){
				perc+=averagePer;
				resumeFinishedInfo.worksFinished=true;
			}
			// 实习经历
			if(content.internships&&content.internships.length>0){
				perc+=averagePer;
				resumeFinishedInfo.internshipsFinished=true;
			}
			// 项目经历
			if(content.projects&&content.projects.length>0){
				perc+=averagePer;
				resumeFinishedInfo.projectsFinished=true;
			}
			$scope.resumeFinishedPerc=Math.round(perc)+'%';
			$('#j_progress').css('width',perc+'%');
		};
		var addFinishedPerc=function(typestr){
			var perc=parseInt($scope.resumeFinishedPerc)||0,averagePer=100/13,resumeFinishedInfo=$scope.resumeFinishedInfo,isFinished;
			// 基本信息
			switch(typestr){
				case '#j_info_wrap':
					if(!resumeFinishedInfo.basicInfoFinished){
						resumeFinishedInfo.basicInfoFinished=true;
						isFinished=true;
					}
				break;
				case '#j_objective_wrap':
					if(!resumeFinishedInfo.jobIntensionFinished){
						resumeFinishedInfo.jobIntensionFinished=true;
						isFinished=true;
					}
				break;
				case '#j_contact_wrap':
					if(!resumeFinishedInfo.contactInfoFinished){
						resumeFinishedInfo.contactInfoFinished=true;
						isFinished=true;
					}
				break;
				case '#j_lang_wrap':
					if(!resumeFinishedInfo.languagesFinished){
						resumeFinishedInfo.languagesFinished=true;
						isFinished=true;
					}
				break;
				case '#j_skill_wrap':
					if(!resumeFinishedInfo.skillFinished){
						resumeFinishedInfo.skillFinished=true;
						isFinished=true;
					}
				break;
				case '#j_cert_wrap':
					if(!resumeFinishedInfo.certificateFinished){
						resumeFinishedInfo.certificateFinished=true;
						isFinished=true;
					}
				break;
				case '#j_education_wrap':
					if(!resumeFinishedInfo.educationsFinished){
						resumeFinishedInfo.educationsFinished=true;
						isFinished=true;
					}
				break;
				case '#j_trained_wrap':
					if(!resumeFinishedInfo.trainingsFinished){
						resumeFinishedInfo.trainingsFinished=true;
						isFinished=true;
					}
				break;
				case '#j_school_wrap':
					if(!resumeFinishedInfo.campusDutiesFinished){
						resumeFinishedInfo.campusDutiesFinished=true;
						isFinished=true;
					}
				break;
				case '#j_honor_wrap':
					if(!resumeFinishedInfo.honorsFinished){
						resumeFinishedInfo.honorsFinished=true;
						isFinished=true;
					}
				break;
				case '#j_work_wrap':
					if(!resumeFinishedInfo.worksFinished){
						resumeFinishedInfo.worksFinished=true;
						isFinished=true;
					}
				break;
				case '#j_internship_wrap':
					if(!resumeFinishedInfo.internshipsFinished){
						resumeFinishedInfo.internshipsFinished=true;
						isFinished=true;
					}
				break;
				case '#j_project_wrap':
					if(!resumeFinishedInfo.projectsFinished){
						resumeFinishedInfo.projectsFinished=true;
						isFinished=true;
					}
				break;
			}
			if(isFinished){
				perc+=averagePer;
				if(perc>100){perc=100;}
				$scope.resumeFinishedPerc=Math.round(perc)+'%';
				$('#j_progress').css('width',perc+'%');
			}
		};
		// allInfoDataQuery();
		//总查询接口 end code
		//证书 start code
		$scope.certInfo={};
		$scope.userCertCerts=[];
		//对象参数过滤，比如undefined、请选择、[]等类型，这是一个总的过滤，以前写了一些字段单的过滤
		var filterUndefinedKeyToObj=function(obj){
			for(var key in obj){
				if(!obj[key]||obj[key].length==0||obj[key]=='000'||obj[key]=='请选择'){
					delete(obj[key]);
				}
			}
		};
		$scope.certInfoSave=function(idstr){
			var certInfo=$scope.certInfo;
			var userCertCerts=$scope.userCertCerts;
			certInfo.certificateChosenList=userCertCerts;
			filterUndefinedKeyToObj(certInfo);
			disableUpdateBtn('certInfo');
			mainModule.log('要添加的证书',certInfo);
			$interface.post(editModule.uri.certSave,certInfo).then(function(result){
				mainModule.log('添加证书接口返回数据',certInfo);
				$scope.certInfoErr=errDealtWith(result.content)||{};
				succDealtWith(idstr,result);
			});
		}
		//证书 end code
		//教育经历添加 startcode
		$scope.educationInfo={};
		$scope.educationInfoSave=function(idstr){
			var educationInfo=$scope.educationInfo;
			mainModule.log('要添加的教育经历',educationInfo);
			// var startDate=Date.parse(new Date(educationInfo.startYear+'-'+educationInfo.startMonth)),
			// 	endDate=Date.parse(new Date(educationInfo.endYear+'-'+educationInfo.endMonth));
			// educationInfo.startDate=startDate?startDate:undefined;
			// educationInfo.endDate=endDate?endDate:undefined;
			transformYearMonthToDate(educationInfo);
			var uri='',isUpdate=educationInfo.id?true:false;
			isUpdate?(uri=editModule.uri.educationUpdate):(uri=editModule.uri.educationAdd);
			filterUndefinedKeyToObj(educationInfo);
			disableUpdateBtn('educationInfo');
			$interface.post(uri,educationInfo).then(function(result){
				mainModule.log('教育经历添加接口返回',result);
				$scope.educationInfoErr=errDealtWith(result.content)||{};
				if(isUpdate){succDealtWith(idstr,result);}else{succDealtWith(idstr,result,$scope.educationList);}
				// $scope.educationList.push(result.content);
			})
		}
		$scope.toNowClick=function(typestr){
			switch(typestr){
				case 'education_tonow':
					$scope.educationInfo.asYet=true;
				break;
				case 'train_tonow':
					$scope.trainInfo.asYet=true;
				break;
				case 'school_tonow':
					$scope.schoolInfo.asYet=true;
				break;
				case 'project_tonow':
					$scope.projectInfo.asYet=true;
				break;
				case 'work_tonow':
					$scope.workInfo.asYet=true;
				break;
			}
		}
		var addDomStateChange=function(idstr){
			var $wrap=angular.element(idstr);
			$wrap.find('.detail-wrap').addClass('active-detail-edit');
    		$wrap.find('.i-add').addClass('active-add');
		};
		$scope.infoEdit=function(item,typestr){
			mainModule.log('要编辑的item数据',item);
			var shadeTypeStr='';
			switch(typestr){
				case 'education_edit':
					item.startYear=new Date(item.startDate).getFullYear();
					item.startMonth=new Date(item.startDate).getMonth()+1;
					if(!item.asYet){
						item.endYear=new Date(item.endDate).getFullYear();
						item.endMonth=new Date(item.endDate).getMonth()+1;
					}
					$scope.educationInfo=item;
					// angular.element('#j_education_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_education_wrap');
					shadeTypeStr='educationInfo';
				break;
				case 'train_edit':
					item.startYear=new Date(item.startDate).getFullYear();
					item.startMonth=new Date(item.startDate).getMonth()+1;
					var endYear=new Date(item.endDate).getFullYear();
					if(endYear==2099){item.asYet=true;}
					if(!item.asYet){
						item.endYear=endYear;
						item.endMonth=new Date(item.endDate).getMonth()+1;
					}
					$scope.trainInfo=item;
					// angular.element('#j_trained_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_trained_wrap');
					shadeTypeStr='trainInfo';
				break;
				case 'school_edit':
					item.startYear=new Date(item.startDate).getFullYear();
					item.startMonth=new Date(item.startDate).getMonth()+1;
					var endYear=new Date(item.endDate).getFullYear();
					if(endYear==2099){item.asYet=true;}
					if(!item.asYet){
						item.endYear=endYear;
						item.endMonth=new Date(item.endDate).getMonth()+1;
					}
					$scope.schoolInfo=item;
					// angular.element('#j_school_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_school_wrap');
					shadeTypeStr='schoolInfo';
				break;
				case 'honor_edit':
					item.obtainYear=new Date(item.obtainDate).getFullYear();
					item.obtainMonth=new Date(item.obtainDate).getMonth()+1;
					$scope.honorInfo=item;
					// angular.element('#j_honor_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_honor_wrap');
					shadeTypeStr='honorInfo';
				break;
				case 'project_edit':
					item.startYear=new Date(item.startDate).getFullYear();
					item.startMonth=new Date(item.startDate).getMonth()+1;
					var endYear=new Date(item.endDate).getFullYear();
					if(endYear==2099){item.asYet=true;}
					if(!item.asYet){
						item.endYear=endYear;
						item.endMonth=new Date(item.endDate).getMonth()+1;
					}
					$scope.projectInfo=item;
					// angular.element('#j_project_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_project_wrap');
					shadeTypeStr='projectInfo';
				break;
				case 'work_edit':
					item.startYear=new Date(item.startDate).getFullYear();
					item.startMonth=new Date(item.startDate).getMonth()+1;
					var endYear=new Date(item.endDate).getFullYear();
					if(endYear==2099){item.asYet=true;}
					if(!item.asYet){
						item.endYear=endYear;
						item.endMonth=new Date(item.endDate).getMonth()+1;
					}
					item.industryData?($scope.workIndustrys.push(item.industryData)):'';
					item.jobCategoryData?($scope.workJobTypes.push(item.jobCategoryData)):'';
					if(item.city){
						var cityCode=item.city.substr(0,3),cityChildCode=item.city;
						item.citySelected=cityHashData[cityCode];
						//工作经历行业
						// if(!cityHashData[cityChildCode]){
						getByCode(cityCode,function(result){
							mainModule.log('工作经历编辑地址getcode数据',result);
							cacheHashDataForArr(cityHashData,result);
							$scope.workCityChildData=result;
							item.cityChildSelected=cityHashData[cityChildCode];
						})
						// }
					}
					$scope.workInfo=item;
					// angular.element('#j_work_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_work_wrap');
					shadeTypeStr='workInfo';
				break;
				case 'internship_edit':
					item.startYear=new Date(item.startDate).getFullYear();
					item.startMonth=new Date(item.startDate).getMonth()+1;
					var endYear=new Date(item.endDate).getFullYear();
					if(endYear==2099){item.asYet=true;}
					if(!item.asYet){
						item.endYear=endYear;
						item.endMonth=new Date(item.endDate).getMonth()+1;
					}
					//实习经历行业
					item.industryData?($scope.internshipIndustrys.push(item.industryData)):'';
					item.jobCategoryData?($scope.internshipJobTypes.push(item.jobCategoryData)):'';
					if(item.city){
						var cityCode=item.city.substr(0,3),cityChildCode=item.city;
						item.citySelected=cityHashData[cityCode];
						getByCode(cityCode,function(result){
							mainModule.log('实习经历编辑地址getcode数据',result);
							cacheHashDataForArr(cityHashData,result);
							$scope.internshipCityChildData=result;
							item.cityChildSelected=cityHashData[cityChildCode];
						})
					}
					$scope.internshipInfo=item;
					// angular.element('#j_internship_wrap').find('.i-add').trigger('click');
					addDomStateChange('#j_internship_wrap');
					shadeTypeStr='internshipInfo';
				break;
			}
			changeShade(shadeTypeStr);
		}
		$scope.infoDel=function(item,typestr,index){
			mainModule.log('要删除的item数据',item);
			switch(typestr){
				case 'education_del':
					$interface.get(editModule.uri.educationDel,{id:item.id}).then(function(result){
						mainModule.log('教育经历删除接口返回',result);
						$scope.educationList.splice(index,1);
					})
				break;
				case 'train_del':
					$interface.get(editModule.uri.trainDel,{id:item.id}).then(function(result){
						mainModule.log('培训经历删除接口返回',result);
						$scope.trainList.splice(index,1);
					})
				break;
				case 'school_del':
					$interface.get(editModule.uri.schoolDel,{id:item.id}).then(function(result){
						mainModule.log('校内删除接口返回',result);
						$scope.schoolList.splice(index,1);
					})
				break;
				case 'honor_del':
					$interface.get(editModule.uri.honorDel,{id:item.id}).then(function(result){
						mainModule.log('荣誉删除接口返回',result);
						$scope.honorList.splice(index,1);
					})
				break;
				case 'project_del':
					$interface.get(editModule.uri.projectDel,{id:item.id}).then(function(result){
						mainModule.log('项目经验删除接口返回',result);
						$scope.projectList.splice(index,1);
					})
				break;
				case 'work_del':
					$interface.get(editModule.uri.workDel,{id:item.id}).then(function(result){
						mainModule.log('工作经验删除接口返回',result);
						$scope.workList.splice(index,1);
					})
				break;
				case 'internship_del':
					$interface.get(editModule.uri.internshipDel,{id:item.id}).then(function(result){
						mainModule.log('实习经验删除接口返回',result);
						$scope.internshipList.splice(index,1);
					})
				break;
			}
		}
		$scope.cancelUpdate=function(typestr){
			var shadeTypeStr='';
			switch(typestr){
				case 'lang_update_cancel':
					$scope.langInfo={};
					$scope.langLangSelected=$scope.langSkillData[0];
					$scope.langInfoErr={};
					$scope.langLangLevelList=[{}];
					shadeTypeStr='langInfo';
				break;
				case 'train_update_cancel':
					$scope.trainInfo={};
					$scope.trainInfoErr={};
					shadeTypeStr='trainInfo';
				break;
				case 'education_update_cancel':
					$scope.educationInfo={};
					$scope.educationInfoErr={};
					shadeTypeStr='educationInfo';
				break;
				case 'school_update_cancel':
					$scope.schoolInfo={};
					$scope.schoolInfoErr={};
					shadeTypeStr='schoolInfo';
				break;
				case 'honor_update_cancel':
					$scope.honorInfo={};
					$scope.honorInfoErr={};
					shadeTypeStr='honorInfo';
				break;
				case 'project_update_cancel':
					$scope.projectInfo={};
					$scope.projectInfoErr={};
					shadeTypeStr='projectInfo';
				break;
				case 'work_update_cancel':
					$scope.workInfoErr={};
					workInfoInit();
					shadeTypeStr='workInfo';
					hideLeftWrap();
				break;
				case 'internship_update_cancel':
					$scope.internshipInfoErr={};
					internshipInfoInit();
					shadeTypeStr='internshipInfo';
				break;
			}
			changeShade(shadeTypeStr,true);
		}
		$scope.educationList=[];
		var educationList=function(){
			$interface.get(editModule.uri.educationList).then(function(result){
				mainModule.log('教育经历查询列表返回',result);
				$scope.educationList=result.content;
			})
		};
		// educationList();
		//教育经历 endcode
		//培训经历添加 startcode
		$scope.trainInfo={};
		$scope.trainInfoSave=function(idstr){
			var trainInfo=$scope.trainInfo;
			// if(trainInfo.startYear&&trainInfo.startMonth){
			// 	var startDate=trainInfo.startYear+'-'+trainInfo.startMonth;
			// 	trainInfo.startDate=Date.parse(new Date(startDate));
			// }
			// if(trainInfo.endYear&&trainInfo.endMonth){
			// 	var endDate=trainInfo.endYear+'-'+trainInfo.endMonth;
			// 	trainInfo.endDate=Date.parse(new Date(endDate));
			// }
			// if(trainInfo.asYet){
			// 	trainInfo.endDate=Date.parse(new Date('2099-01'));
			// }
			transformYearMonthToDate(trainInfo);
			mainModule.log('要添加的培训经历',trainInfo);
			var uri='',isUpdate=trainInfo.id?true:false;
			isUpdate?(uri=editModule.uri.trainUpdate):(uri=editModule.uri.trainAdd);
			filterUndefinedKeyToObj(trainInfo);
			disableUpdateBtn('trainInfo');
			$interface.post(uri,trainInfo).then(function(result){
				mainModule.log('培训经历添加接口返回',result);
				$scope.trainInfoErr=errDealtWith(result.content)||{};
				if(isUpdate){succDealtWith(idstr,result);}else{succDealtWith(idstr,result,$scope.trainList);}
				
				// $scope.trainList.push(result.content);
			})
		}

		//培训经历 endcode
		// 校内职务 start code
		var transformYearMonthToDate=function(obj){
			if(obj.startYear&&obj.startMonth){
				if((obj.startMonth=parseInt(obj.startMonth))<10){
					obj.startMonth='0'+obj.startMonth;
				}
				var startDate=obj.startYear+'-'+obj.startMonth+'-01';
				obj.startDate=Date.parse(new Date(startDate));
			}else{
				delete obj.startDate
			}
			if(obj.endYear&&obj.endMonth){
				if((obj.endMonth=parseInt(obj.endMonth))<10){
					obj.endMonth='0'+obj.endMonth;
				}
				var endDate=obj.endYear+'-'+obj.endMonth+'-01';
				obj.endDate=Date.parse(new Date(endDate));
			}else{
				delete obj.endDate;
			}
			if(obj.asYet){
				obj.endDate=Date.parse(new Date('2099-01-01'));
			}
			if(obj.obtainYear&&obj.obtainMonth){
				if((obj.obtainMonth=parseInt(obj.obtainMonth))<10){
					obj.obtainMonth='0'+obj.obtainMonth;
				}
				var startDate=obj.obtainYear+'-'+obj.obtainMonth+'-01';
				obj.obtainDate=Date.parse(new Date(startDate));
			}else{
				delete obj.obtainDate;
			}
		};
		$scope.schoolInfo={};
		$scope.schoolInfoSave=function(idstr){
			var schoolInfo=$scope.schoolInfo;
			transformYearMonthToDate(schoolInfo);
			mainModule.log('要保存的校内职务数据',schoolInfo);
			var uri='',isUpdate=schoolInfo.id?true:false;isUpdate?(uri=editModule.uri.schoolUpdate):(uri=editModule.uri.schoolSave);
			filterUndefinedKeyToObj(schoolInfo);
			disableUpdateBtn('schoolInfo');
			$interface.post(uri,schoolInfo).then(function(result){
				mainModule.log('保存校内职务接口返回数据',result);
				$scope.schoolInfoErr=errDealtWith(result.content)||{};
				if(isUpdate){succDealtWith(idstr,result)}else{succDealtWith(idstr,result,$scope.schoolList);}
			})
		}
		//校内职务 end code
		// 获得荣誉 start code
		$scope.honorInfo={};
		$scope.honorInfoSave=function(idstr){
			var honorInfo=$scope.honorInfo;
			transformYearMonthToDate(honorInfo);
			mainModule.log('要保存的获得荣誉数据',honorInfo);
			var uri='',isUpdate=honorInfo.id?true:false;isUpdate?(uri=editModule.uri.honorUpdate):(uri=editModule.uri.honorSave);
			filterUndefinedKeyToObj(honorInfo);
			disableUpdateBtn('honorInfo');
			$interface.post(uri,honorInfo).then(function(result){
				mainModule.log('保存荣誉接口返回数据',result);
				$scope.honorInfoErr=errDealtWith(result.content)||{};
				if(isUpdate){succDealtWith(idstr,result)}else{succDealtWith(idstr,result,$scope.honorList)}
			})
		}
		//获得荣誉 end code
		//工作经历 start code
		var workInfoInit=function(){
			$scope.workInfo={};
			$scope.workIndustrys=[];
			$scope.workJobTypes=[];
		};
		workInfoInit();
		$scope.saveWorkInfo=function(idstr){
			var workInfo=$scope.workInfo;
			transformYearMonthToDate(workInfo);
			filterEmpthSelectFiled(workInfo,'positionLevel',workInfo.positionLevel);
			filterEmpthSelectFiled(workInfo,'city',workInfo.cityChildSelected&&workInfo.cityChildSelected.code);
			filterEmptyFieldToObj(workInfo,'industry',arrToString($scope.workIndustrys));
			filterEmptyFieldToObj(workInfo,'jobCategory',arrToString($scope.workJobTypes));
			filterEmptyFieldToObj(workInfo,'cityText',workInfo.cityChildSelected&&workInfo.cityChildSelected.name);
			filterEmptyFieldToObj(workInfo,'industryText',arrToTextString($scope.workIndustrys));
			filterEmptyFieldToObj(workInfo,'jobCategoryText',arrToTextString($scope.workJobTypes));
			mainModule.log('要保存的工作经历数据',workInfo);
			var uri='',isUpdate=workInfo.id?true:false;isUpdate?(uri=editModule.uri.workUpdate):(uri=editModule.uri.workSave);
			disableUpdateBtn('workInfo');
			$interface.post(uri,workInfo).then(function(result){
				mainModule.log('保存工作经历接口返回数据',result);
				$scope.workInfoErr=errDealtWith(result.content)||{};
				if(isUpdate&&result.status=='SUCCESS')
				{
					succDealtWith(idstr,result);
					workInfo.industryData=$scope.workIndustrys[0];
					workInfo.jobCategoryData=$scope.workJobTypes[0];
				}else{
					succDealtWith(idstr,result,$scope.workList)
				}
				//初始化行业、职位类别
				if(result.status=='SUCCESS'){
					workInfoInit();
				}
			})
		}
		$scope.workCityChange=function(item){
			getByCode(item.code,function(result){
				cacheHashDataForArr(cityHashData,result);
				$scope.workCityChildData=result;
				$scope.workInfo.cityChildSelected=result[0];
			})
			
		}
		//工作经历 end code
		//实习经历 start code
		var internshipInfoInit=function(){
			$scope.internshipInfo={};
			$scope.internshipIndustrys=[];
			$scope.internshipJobTypes=[];
		};
		internshipInfoInit();
		$scope.saveinternshipInfo=function(idstr){
			var internshipInfo=$scope.internshipInfo;
			transformYearMonthToDate(internshipInfo);
			filterEmpthSelectFiled(internshipInfo,'positionLevel',internshipInfo.positionLevel);
			filterEmpthSelectFiled(internshipInfo,'city',internshipInfo.cityChildSelected&&internshipInfo.cityChildSelected.code);
			filterEmptyFieldToObj(internshipInfo,'industry',arrToString($scope.internshipIndustrys));
			filterEmptyFieldToObj(internshipInfo,'jobCategory',arrToString($scope.internshipJobTypes));
			filterEmptyFieldToObj(internshipInfo,'cityText',internshipInfo.cityChildSelected&&internshipInfo.cityChildSelected.name);
			filterEmptyFieldToObj(internshipInfo,'industryText',arrToTextString($scope.internshipIndustrys));
			filterEmptyFieldToObj(internshipInfo,'jobCategoryText',arrToTextString($scope.internshipJobTypes));
			mainModule.log('要保存的实习经历数据',internshipInfo);
			var uri='',isUpdate=internshipInfo.id?true:false;isUpdate?(uri=editModule.uri.internshipUpdate):(uri=editModule.uri.internshipSave);
			disableUpdateBtn('workInfo');
			$interface.post(uri,internshipInfo).then(function(result){
				mainModule.log('保存实习经历接口返回数据',result);
				$scope.internshipInfoErr=errDealtWith(result.content)||{};
				if(isUpdate&&result.status=='SUCCESS'){
					succDealtWith(idstr,result);
					internshipInfo.industryData=$scope.internshipIndustrys[0];
					internshipInfo.jobCategoryData=$scope.internshipJobTypes[0];
				}else{
					succDealtWith(idstr,result,$scope.internshipList)
				}
				if(result.status=='SUCCESS'){
					internshipInfoInit();
				}
			})
		}
		$scope.internshipCityChange=function(item){
			getByCode(item.code,function(result){
				cacheHashDataForArr(cityHashData,result);
				$scope.internshipCityChildData=result;
				$scope.internshipInfo.cityChildSelected=result[0];
			})
		}
		//实习经历 end code
		// 项目经验 start code
		$scope.projectInfo={};
		$scope.projectInfoSave=function(idstr){
			var projectInfo=$scope.projectInfo;
			transformYearMonthToDate(projectInfo);
			mainModule.log('要保存的项目经验数据',projectInfo);
			filterEmpthSelectFiled(projectInfo,'scale');
			var uri='',isUpdate=projectInfo.id?true:false;isUpdate?(uri=editModule.uri.projectUpdate):(uri=editModule.uri.projectSave);
			filterUndefinedKeyToObj(projectInfo);
			disableUpdateBtn('projectInfo');
			$interface.post(uri,projectInfo).then(function(result){
				mainModule.log('保存项目经验接口返回数据',result);
				$scope.projectInfoErr=errDealtWith(result.content)||{};
				if(isUpdate){succDealtWith(idstr,result)}else{succDealtWith(idstr,result,$scope.projectList);}
				if(result.status=='SUCCESS'){
					$scope.projectInfo={};
				}
			})
		}
		//项目经验 end code
		//语言能力chang
		$scope.langLangSelectChange=function(item){
			getByCode(item.code,function(result){
				$scope.langSkillChildData=result;
				var langLangLevelList=$scope.langLangLevelList;
				for(var i=0,ii=langLangLevelList.length;i<ii;i++){
					langLangLevelList[i].langLangLevelSelected=result[0];
				}
				cacheHashDataForArr(langSkillHashData,result);
			})
		}
		//语言能力添加 startcode
		//为能添加多个等级考试设定数组
		$scope.langLangLevelList=[{}];
		$scope.addLangLangLevelList=function(){
			mainModule.log('添加等级考试多个',$scope.langLangLevelList);
			$scope.langLangLevelList.push({});
		}
		$scope.delLangLangLevelItem=function(index){
			$scope.langLangLevelList.splice(index,1);
		}
		var filterEmpthSelectFiled=function(obj,key,value){
			if(obj[key]=='请选择'){delete(obj[key])}
			if(value&&value!='请选择'&&value!='000'&&value.length!=0){
				obj[key]=value;
			}
		};
		$scope.langInfo={};
		$scope.langLangAdd=function(idstr){
			var langLangLevelList=$scope.langLangLevelList,langInfo=$scope.langInfo;
			if($scope.langLangSelected.name!='请选择'){
				langInfo.gradeExaminations=[];
				for(var i=0,ii=langLangLevelList.length;i<ii;i++){
					var item=langLangLevelList[i],obj={};
					//空的等级obj不添加
					if(item.langLangLevelSelected){
						obj.name=item.langLangLevelSelected.name;
						obj.code=item.langLangLevelSelected.code;
						obj.score=item.score;
						langInfo.gradeExaminations.push(obj);
					}
				}
			}
			filterEmptyFieldToObj(langInfo,'id',langInfo.id);
			filterEmpthSelectFiled(langInfo,'readingAndWriting',$scope.langInfo.readingAndWriting);
			filterEmpthSelectFiled(langInfo,'listeningAndSpeaking',$scope.langInfo.listeningAndSpeaking);
			filterEmpthSelectFiled(langInfo,'name',$scope.langLangSelected.name);
			filterEmpthSelectFiled(langInfo,'code',$scope.langLangSelected.code);
			filterEmpthSelectFiled(langInfo,'languageGradeExaminationFOList',langInfo.gradeExaminations);

			var uri='',isUpdate=langInfo.id?true:false;
			isUpdate?(uri=editModule.uri.langUpdate):(uri=editModule.uri.langAdd);
			disableUpdateBtn('langInfo');
			$interface.post(uri,langInfo).then(function(result){
				mainModule.log('添加语言能力接口返回数据',result);
				$scope.langInfoErr=errDealtWith(result.content)||{};
				if(isUpdate){succDealtWith(idstr,result)}else{succDealtWith(idstr,result,$scope.langList)}
			})
			mainModule.log('要添加的语言能力数据',langInfo);
		}
		$scope.langDel=function(index){
			var langInfo=$scope.langList[index];
			$interface.get(editModule.uri.langDel,{languageId:langInfo.id}).then(function(result){
				mainModule.log('删除语言能力接口返回数据',result);
				succDealtWith(undefined,result,$scope.langList,index);
			});
		}
		$scope.editLangInfo=function(index,idstr){
			console.log(index);
			// angular.element(idstr).find('.i-add').trigger('click');
			addDomStateChange(idstr);
			var langInfo=$scope.langList[index];
			$scope.langInfo=langInfo;
			$scope.langLangSelected=langSkillHashData[langInfo.code];
			getByCode(langInfo.code,function(result){
				cacheHashDataForArr(langSkillHashData,result);
				$scope.langSkillChildData=result;
				for(var i=0,ii=langInfo.gradeExaminations.length;i<ii;i++){
					var item=langInfo.gradeExaminations[i];
					mainModule.log('获取的hash等级考试数据',langSkillHashData[item.code]);
					item.langLangLevelSelected=langSkillHashData[item.code];
				}
				$scope.langLangLevelList=langInfo.gradeExaminations;
			})
			// $scope.langLangSelected=
			changeShade('langInfo');
		}
		$scope.langList=[];
		var queryLangList=function(){
			$interface.get(editModule.uri.langList).then(function(result){
				mainModule.log('查询的语言列表数据',result);
				$scope.langList=result.content||[];
			});
		};
		// queryLangList();
		//语言能力 endcode
		//证书模块证书选择 start code
		$scope.certSelectClick=function(typestr){
			$scope.typestr=typestr;
			$scope.popboxbgShow=true;
			$scope.certPopboxShow=true;
			$scope.certSelectedArr=$scope.userCertCerts||[];
		}
		//证书弹框
		$scope.certPopboxShow=false;
		$scope.certTabActiveIndex=0;
		$scope.certTabItemClick=function(index,item){
			// $scope.certOtherChildItemData=certData.childOfOther[index];
			$scope.certTabActiveIndex=index;
			getByCode(item.code,function(result){
				$scope.certOtherChildItemData=result;
			})
		}
		$scope.certSelectedArr=[];
		//选择的checkbox＝true的容器，为初始化用
		var certCheckedArr=[];
		$scope.certItemClick=function(item){
			var arr=$scope.certSelectedArr,index=arr.indexOf(item);
			for(var i=0,ii=arr.length;i<ii;i++){
				if(item.code==arr[i].code){
					index=i;
					item.checked=true;
					break;
				}
			}
			if(index==-1){
				arr.push(item);
			}else{
				arr.splice(index,1);
			}
			console.log(item);
			item.checked?(item.checked=false):(item.checked=true);
			certCheckedArr.push(item);
		}
		//证书模块 end code
		//技能模块技能选择 start code
		//通用删除所选标签
		$scope.delLabel=function(arr,index){
			arr.splice(index,1);
		}
		$scope.skillSelectClick=function(typestr){
			$scope.typestr=typestr;
			$scope.popboxbgShow=true;
			$scope.skillPopboxShow=true;
			switch(typestr){
				case 'skill_skill_select':
					$scope.skillSelectedArr=$scope.userskillskills||[];
				break;
				case 'skill_skilled_select':
					$scope.skillSelectedArr=$scope.userskilledskills||[];
				break;
			}
			
		}
		//技能弹框
		$scope.skillPopboxShow=false;
		$scope.skillTabActiveIndex=0;
		$scope.skillTabItemClick=function(index,item){
			getByCode(item.code,function(result){
				$scope.skillOtherChildItemData=result;
				$scope.skillTabActiveIndex=index;
			})

		}
		//选择的精通的技能数组
		$scope.skillSelectedArr=[];
		//选择的checkbox＝true的容器，为初始化用
		var skillCheckedArr=[];
		$scope.skillItemClick=function(item){
			var arr=$scope.skillSelectedArr,index=arr.indexOf(item);
			for(var i=0,ii=arr.length;i<ii;i++){
				if(item.code==arr[i].code){
					index=i;
					item.checked=true;
					break;
				}
			}
			if(index==-1){
				arr.push(item);
			}else{
				arr.splice(index,1);
			}
			console.log(item);
			item.checked?(item.checked=false):(item.checked=true);
			skillCheckedArr.push(item);
		}
		$scope.skillInfo={};
		$scope.skillInfoSave=function(idstr){
			var skillInfo=$scope.skillInfo;
			skillInfo.masterSkillChosenList=$scope.userskillskills;
			skillInfo.practisedSkillChosenList=$scope.userskilledskills;
			filterUndefinedKeyToObj(skillInfo);
			disableUpdateBtn('skillInfo');
			mainModule.log('要保存的技能模块数据',skillInfo);
			$interface.post(editModule.uri.skillSave,skillInfo).then(function(result){
				mainModule.log('保存的技能模块接口返回数据',result);
				$scope.skillInfoErr=errDealtWith(result.content);
				succDealtWith(idstr,result);
			})
		}
		//技能模块 end code
		// 职位类别弹框数据
		var prevJobTypeItem={},childPrevJobTypeItem={},grandChildPrevJobTypeItem={};
		$scope.jobtypeClick=function(item){
			$scope.initJobTypePopboxSelect();
			getByCode(item.code,function(result){
				$scope.jobtypeChildData=result;
				//选择项的一些状态初始化
				item.isActive=true;
				prevJobTypeItem=item;
			});
		}
		$scope.initJobTypePopboxSelect=function(){
			prevJobTypeItem.isActive=false;
			childPrevJobTypeItem.isActive=false;
			grandChildPrevJobTypeItem.isActive=false;
			$scope.jobtypeChildData=[];
			$scope.jobtypeGrandChildData=[];
		}
		$scope.jobtypeChildClick=function(item){
			getByCode(item.code,function(result){
				$scope.jobtypeGrandChildData=result;
				childPrevJobTypeItem.isActive=false;
				grandChildPrevJobTypeItem.isActive=false;
				item.isActive=true;
				childPrevJobTypeItem=item;
			})
		}
		$scope.jobtypeSelectedLabels=[];
		$scope.jobtypeGrandChildClick=function(item){
			if($scope.jobtypeSelectedLabels.indexOf(item)==-1){
				switch($scope.typestr){
					case 'work_jobtype_select':
						$scope.jobtypeSelectedLabels=[item];
					break;
					case 'internship_jobtype_select':
						$scope.jobtypeSelectedLabels=[item];
					break;
					default:
						$scope.jobtypeSelectedLabels.push(item);
					break;
				}
			}
			
			grandChildPrevJobTypeItem.isActive=false;
			item.isActive=true;
			grandChildPrevJobTypeItem=item;
		}
		$scope.deleteJobTypeSelectedLabel=function(item){
			var arr=$scope.jobtypeSelectedLabels,index=arr.indexOf(item);
			arr.splice(index,1);
		}
		$scope.saveJobTypeSelectedLabels=function(){
			switch($scope.typestr){
				case 'objective_jobtype_select':
					$scope.userObjectiveJobTypes=$scope.jobtypeSelectedLabels;
					$scope.closeJobTypeSelect();
				break;
				case 'work_jobtype_select':
					$scope.workJobTypes=$scope.jobtypeSelectedLabels;
					$scope.closeJobTypeSelect();
				break;
				case 'internship_jobtype_select':
					$scope.internshipJobTypes=$scope.jobtypeSelectedLabels;
					$scope.closeJobTypeSelect();
				break;
			}
		}
		// 显示职位选择弹框
		$scope.showJobTypeSelect=function(typestr){
			switch(typestr){
				case 'objective_jobtype_select':
					$scope.jobtypeSelectedLabels=$scope.userObjectiveJobTypes;
				break;
				case 'work_jobtype_select':
					$scope.jobtypeSelectedLabels=$scope.workJobTypes;
				break;
			}
			$scope.typestr=typestr;
			$scope.jobtypePopboxShow=true;
			$scope.popboxbgShow=true;
		}
		$scope.closeJobTypeSelect=function(){
			$scope.jobtypePopboxShow=false;
			$scope.popboxbgShow=false;
			$scope.typestr='';
			$scope.jobtypeSelectedLabels=[];
			$scope.initJobTypePopboxSelect();
		}
		//行业弹框效果声明的
		var prevItem={},childPrevItem={};
		$scope.industryChange=function(item){
			getByCode(item.code,function(result){
				cacheHashDataForArr(industryHashData,result);
				$scope.industryChildData=result;
				prevItem.isActive=false;
				item.isActive=true;
				prevItem=item;
			})
		}
		$scope.industryChildChange=function(item){
			childPrevItem.isActive=false;
			item.isActive=true;
			childPrevItem=item;
			if($scope.industrySelectedLabels.indexOf(item)==-1){
				switch($scope.typestr){
					case 'work_industry_select':
						$scope.industrySelectedLabels=[item];
					break;
					case 'internship_industry_select':
						$scope.industrySelectedLabels=[item];
					break;
					default:
						$scope.industrySelectedLabels.push(item);
					break;
				}
				mainModule.log('已选择行业标签数组',$scope.industrySelectedLabels);
			}
		}
		$scope.deleteSelectedLabel=function(item,typestr){
			var arr,index;
			switch(typestr){
				case 'industry':
					 arr=$scope.industrySelectedLabels;
					 index=arr.indexOf(item);
				break;
				case 'skill':
					 arr=$scope.skillSelectedArr;
					 index=arr.indexOf(item);
				break;
				case 'cert':
					 arr=$scope.certSelectedArr;
					 index=arr.indexOf(item);
				break;
			}
			arr.splice(index,1);
			// childPrevItem.isActive=false;
		}
		//弹出行业选择
		$scope.selectIndustry=function(typestr){
			$scope.typestr=typestr;
			$scope.popboxbgShow=true;
			$scope.industryPopboxShow=true;
			switch($scope.typestr){
				case 'objective_industry_select':
					$scope.industrySelectedLabels=$scope.userObjectiveIndustrys;
				break;
				case 'work_industry_select':
					$scope.industrySelectedLabels=$scope.workIndustrys;
				break;
			}
		}
		$scope.closeIndustryPopbox=function(){
			$scope.popboxbgShow=false;
			$scope.industryPopboxShow=false;
			//初始化弹框状态
			prevItem.isActive=false;
			childPrevItem.isActive=false;
			$scope.industrySelectedLabels=[];
			$scope.industryChildData=[];
		}
		//关闭证书弹框
		$scope.closeCertPopbox=function(){
			$scope.certSelectedArr=[];
			$scope.popboxbgShow=false;
			$scope.certPopboxShow=false;
			for(var i=0,ii=certCheckedArr.length;i<ii;i++){
				var item=certCheckedArr[i];
				item.checked=false;
			}
		}
		//关闭技能弹框
		$scope.closeskillPopbox=function(){
			$scope.skillSelectedArr=[];
			$scope.popboxbgShow=false;
			$scope.skillPopboxShow=false;
			for(var i=0,ii=skillCheckedArr.length;i<ii;i++){
				var item=skillCheckedArr[i];
				item.checked=false;
			}
		}
		$scope.saveSelectedLabels=function(){
			switch($scope.typestr){
				case 'objective_industry_select':
					$scope.userObjectiveIndustrys=$scope.industrySelectedLabels;
					$scope.closeIndustryPopbox();
				break;
				case 'cert_cert_select':
					$scope.userCertCerts=$scope.certSelectedArr;
					$scope.closeCertPopbox();
				break;
				case 'skill_skill_select':
					//默认的精通的技能选择
					$scope.userskillskills=$scope.skillSelectedArr;
					$scope.closeskillPopbox();
				break;
				case 'skill_skilled_select':
					//熟练的技能选择
					$scope.userskilledskills=$scope.skillSelectedArr;
					$scope.closeskillPopbox();
				break;
				case 'work_industry_select':
					$scope.workIndustrys=$scope.industrySelectedLabels;
					$scope.closeIndustryPopbox();
				break;
				case 'internship_industry_select':
					$scope.internshipIndustrys=$scope.industrySelectedLabels;
					$scope.closeIndustryPopbox();
				break;
			}
		}
		//个人信息添加标签
		$scope.infoPersonalLabels=[];
		$scope.infoPersonalLabel='';
		$scope.infoAddPersonalLabel=function(label){
			if(label!=''&&$scope.infoPersonalLabels.indexOf(label)==-1){
				$scope.infoPersonalLabels.push(label);
			}
			angular.element('.j-personal-label-input').val('');
		}
		$scope.delPersonalLabel=function(label){
			var arr=$scope.infoPersonalLabels,index=arr.indexOf(label);
			arr.splice(index,1);
		}
		$scope.selectedAddress={};
		// $scope.selectedAddress2={};
		// $scope.selectedAddress3={};
		// $scope.selectedAddress4={};

		// 城市弹框
		$scope.popCityChildData=[];
		$scope.popProvinceClick=function(item){
			getByCode(item.code,function(result){
				$scope.popCityChildData=result;
				$scope.popCitySelectedName=item.name;
			})
		}
		$scope.popCitySwitchToAll=function(){
			$scope.popCityChildData=[];
		}
		//弹框选择的城市信息
		$scope.popSelectedCitys=[];
		$scope.popCityLabelClick=function(item){
			var arr=$scope.popSelectedCitys,index=arr.indexOf(item);
			if(arr.length<3&&index==-1){
				arr.push(item);
			}
		}
		$scope.delPopSelectedCity=function(item){
			var arr=$scope.popSelectedCitys,index=arr.indexOf(item);
			arr.splice(index,1);
		}
		$scope.cityPopboxShow=false;
		$scope.savePopSelectedCitys=function(){
			switch($scope.typestr){
				case 'objective_city_select':
					$scope.userObjectiveCitys=$scope.popSelectedCitys;
					$scope.closeCityPopbox();
				break;
			}
		}
		$scope.showCitySelectPopbox=function(typestr){
			$scope.popboxbgShow=true;
			$scope.cityPopboxShow=true;
			$scope.typestr=typestr;
			switch(typestr){
				case 'objective_city_select':
					$scope.popSelectedCitys=$scope.userObjectiveCitys;
				break;
			}
		}
		$scope.closeCityPopbox=function(){
			$scope.cityPopboxShow=false;
			$scope.popboxbgShow=false;
			$scope.popSelectedCitys=[];
		}
		// 行业弹框
		// 头像弹框
		$scope.showPhotoUploadPopbox=function(){
			$scope.popboxbgShow=true;
			$scope.uploadImgPopboxShow=true;
		}
		$scope.uploadImgPopboxShow=false;
		// $scope.defaultPhoto='/img/wdjl/photo.jpg';
		// $scope.uploadPhoto='/img/index/103.png';
		$scope.closeuploadImgSelect=function(){
			$scope.popboxbgShow=false;
			$scope.uploadImgPopboxShow=false;
		}
		$scope.upload=function(imgId) {
			document.querySelector(String.format("#{0}", imgId)).click();
		};
		$scope.photoUpdate=function(idstr){
			var uploadPhotoBase64=$('#img_target').attr('src');
			var photoInfo={
				x:jcropPhotoSelect.x,
				y:jcropPhotoSelect.y,
				width:jcropPhotoSelect.w,
				height:jcropPhotoSelect.h,
				photoFile:{name:photoName,content:uploadPhotoBase64}
			};
			if(editModule.jcrop_api.angle!=0){
				photoInfo.angle=editModule.jcrop_api.rotateObj.angle;
			}
			mainModule.log('要上传头像数据',photoInfo);
			disableUpdateBtn('photo');
			$interface.post(editModule.uri.photoUpdate,photoInfo).then(function(result){
				if(result.status=='SUCCESS'){
					$scope.closeuploadImgSelect();
					$scope.photoInfo.photo=result.content.photo+'?rad='+Math.random()*8;
				}
			})
			// $.ajax({
			// 	type:'post',
			// 	data:JSON.stringify(photoInfo),
			// 	contentType:'application/json',
			// 	processData: false,
			// 	url:editModule.uri.photoUpdate,
			// 	success:function(result){
			// 		mainModule.log('上传头像接口返回数据',result);
			// 		if(result.status='SUCCESS'){
			// 			$scope.closeuploadImgSelect();
			// 			$scope.userInfo.photo=result.content;
			// 		}
			// 	}
			// })
		}
		// $scope.$watch('uploadPhotoModel.uploadPhoto',function(){
		// 	$scope.switchToSecondStep();
		// 	console.log('正在改变头像');
		// })
		// 头像弹框
	    // 发请求'11002001,'
	    $scope.userObjectiveIndustrys=[];
	    $scope.objectiveAdd=function(){
		    var data={industry:'23',category:'',citys:'',expectSalary:234234,showNegotiable:'',currentSalary:'',showPrivacy:1};
		    $http.post(editModule.uri.objectiveAdd,data).then(function(result){
		    	console.log(result);
		    })
	    }
	    $scope.testPost=function(){
	    	var courseId=JSON.stringify({id:'1f653f34826643369c019a35039add16'})
	    	var data={chapterId:'73e9a439b86946879afa5078a55ef755',courseId:'1f653f34826643369c019a35039add16',content:courseId};
	    	$interface.save(mainModule.uri.addNotes,data).then(function(result){
	    		console.log(result);
	    	});
	    }
	    var getByCode=function(code,callback){
	    	$interface.get(editModule.uri.getByCode,{code:code}).then(function(result){
	    		mainModule.log('bycode接口返回',result);
	    		callback(result.content);
	    	});
	    };
	    // 选择框事件
	    var changeSelectedAddress=function(item,type,callback){
	    	mainModule.log('地区选择事件触发',item);
	    	if(item){
		    	var data={code:item.code},cityChildItemData=$scope.cityChildData[item.code];
		    	//只能从一而终，一个数据源里面做渲染，不然出bug
		    	if(!cityChildItemData){
			    	$interface.get(editModule.uri.getByCode,data).then(function(result){
			    		mainModule.log('获取省下面市接口返回如下',result);
			    		var content=result.content;
			    		cacheHashDataForArr(cityHashData,content);
			    		$scope.cityChildData[item.code]=content;
			    		switch(type){
			    			case '0':
			    				$scope.selectedAddress.selectedAddress2=content[0];
			    			break;
			    			case '1':
			    				$scope.selectedAddress.selectedAddress4=content[0];
			    			break;
			    		}
			    		callback&&callback();
			    		mainModule.log('省下面市缓存数据如下',$scope.cityChildData);
			    	});
			    	console.log($scope.selectedAddress.selectedAddress1);
			    }else{
			    	switch(type){
		    			case '0':
		    				$scope.selectedAddress.selectedAddress2=cityChildItemData[0];
		    			break;
		    			case '1':
		    				$scope.selectedAddress.selectedAddress4=cityChildItemData[0];
		    			break;
		    		}
			    }
	    	}
	    };
	    $scope.changeSelectedAddress1=changeSelectedAddress;
	    //获取基本信息
	    //缓存城市数据key，value
	    var cityHashData={},industryHashData={},langSkillHashData={},cacheHashDataForArr=function(obj,arr){
	    	for(var i=0,ii=arr.length;i<ii;i++){
	    		var item=arr[i];
	    		obj[item.code]=item;
	    	}
	    };
	    var queryBasicInfo=function(userInfo){
		    // $interface.get(editModule.uri.basicInfoQuery).then(function(result){
			   //  	mainModule.log('获取用户基本信息接口返回如下',result);
		    	if(userInfo){
			   		//var userInfo=result.content||{};
			    	var birthdate=userInfo.birthdate,datearr;
			    	birthdate=mainModule.formatBirthdate(birthdate);
			    	datearr=birthdate.split('-');
			    	userInfo.infoYear=parseInt(datearr[0]);
			    	userInfo.infoMonth=parseInt(datearr[1]);
			    	userInfo.infoDay=parseInt(datearr[2]);
			    	//以上为生日显示转换
			    	var domicileAddress=userInfo.domicileAddress.substr(0,3),presentAddress=userInfo.presentAddress.substr(0,3);
			    	mainModule.log('缓存的hashcitydata数据如下',cityHashData);
			    	$scope.selectedAddress.selectedAddress1=cityHashData[presentAddress];
			    	$scope.selectedAddress.selectedAddress3=cityHashData[domicileAddress];
			    	//两个地址数据，只能同步渲染，否则联动有异常
			    	changeSelectedAddress(cityHashData[presentAddress],'0',function(){
			    		changeSelectedAddress(cityHashData[domicileAddress],'1',function(){
			    			userInfo.presentAddress=cityHashData[userInfo.presentAddress].name;
			    			userInfo.domicileAddress=cityHashData[userInfo.domicileAddress].name;

			    		});
			    	});
			    	$scope.infoPersonalLabels=(userInfo.individualTag&&userInfo.individualTag.split(','))||[];
			    	//以上为地区显示转换
			    	$scope.userInfo=userInfo;
		    	}
		    // });
	    };
	    //获取联系信息
	    // $interface.get(editModule.uri.contactInfoQuery).then(function(result){
	    // 	mainModule.log('获取联系方式接口返回如下',result);
	    // 	$scope.contactInfo=result.content||{};
	    // 	$scope.contactInfo.email='150010@qq.com';
	    // });
		//工作经历编辑再取消的时候，会导致左边导航栏覆盖到footer模块上面，导致重叠
		var hideLeftWrap=function(){
			angular.element('#j_left_wrap').find('.left-wrap').css('position','static');
		};
	    //统一的方法处理接口返回
	    var succDealtWith=function(idstr,result,list,index){
	    	if(result.status=='SUCCESS'){
	    		console.log(result);
	    		if(idstr){
	    			angular.element(idstr).find('.detail-wrap').removeClass('active-detail-edit');
	    			angular.element(idstr).find('.i-add').removeClass('active-add');
	    			angular.element(idstr).find('.i-edit').removeClass('active-edit');
	    			addFinishedPerc(idstr);
	    		}
	    		//送vip提示
	    		if(result.code=='SUCCESS'){
	    			mainModule.showGlobalHintBar('已成功获得3天VIP!');
	    		}
	    		if(index==undefined&&list){
	    			//新增处理
	    			list.push(result.content);
	    		}else if(list){
	    			//删除处理
	    			list.splice(index,1);
	    		}
	    		//增加或修改后info初始化；
	    		var typestr='',shadeTypeStr='';
	    		switch(idstr){
	    			case '#j_info_wrap':
	    				shadeTypeStr='basicInfo';
	    			break;
	    			case '#j_objective_wrap':
	    				shadeTypeStr='objectiveInfo';
	    			break;
	    			case '#j_contact_wrap':
	    				shadeTypeStr='contactInfo';
	    			break;
	    			case '#j_lang_wrap':
	    				typestr='lang_update_cancel';
	    				shadeTypeStr='langInfo';
	    			break;
	    			case '#j_skill_wrap':
	    				shadeTypeStr='skillInfo';
	    			break;
	    			case '#j_cert_wrap':
	    				shadeTypeStr='certInfo';
	    			break;
	    			case '#j_education_wrap':
	    				typestr='education_update_cancel';
	    				shadeTypeStr='educationInfo';
	    			break;
	    			case '#j_trained_wrap':
	    				typestr='train_update_cancel';
	    				shadeTypeStr='trainInfo';
	    			break;
	    			case '#j_school_wrap':
	    				typestr='school_update_cancel';
	    				shadeTypeStr='schoolInfo';
	    			break;
	    			case '#j_honor_wrap':
	    				typestr='honor_update_cancel';
	    				shadeTypeStr='honorInfo';
	    			break;
	    			case '#j_work_wrap':
	    				typestr='work_update_cancel';
	    				shadeTypeStr='workInfo';
	    			break;
	    			case '#j_internship_wrap':
	    				typestr='internship_update_cancel';
	    				shadeTypeStr='internshipInfo';
	    			break;
	    			case '#j_project_wrap':
	    				typestr='project_update_cancel';
	    				shadeTypeStr='projectInfo';
	    			break;
	    		}
	    		$scope.cancelUpdate(typestr);
	    		changeShade(shadeTypeStr,true);
	    	}
	    }
	    $scope.contactInfoErr={};
	    $scope.updateContactInfo=function(idstr){
	    	var contactInfo=$scope.contactInfo;
	    	filterUndefinedKeyToObj(contactInfo);
	    	disableUpdateBtn('contactInfo');
	    	$interface.post(editModule.uri.contactInfoSave,contactInfo).then(function(result){
	    		mainModule.log('更新联系方式信息接口返回',result);
	    		$scope.contactInfoErr=errDealtWith(result.content)||{};
	    		succDealtWith(idstr,result);
	    	})
	    }
	    // 获取数据字典
	    $interface.get(editModule.uri.getSelectData).then(function(result){
	    	mainModule.log('获取数据字典接口返回如下',result);
	    	var cityData=result.content.area||[];
	    	$scope.cityData=cityData;
	    	$scope.industryData=result.content.industry||[];
	    	$scope.jobtypeData=result.content.jobType||[];
	    	//初始化语言模块选择项
	    	$scope.langSkillData=result.content.language||[];
	    	$scope.langSkillData.unshift({code:'000',name:'请选择'});
	    	$scope.langLangSelected=$scope.langSkillData[0]
	    	cacheHashDataForArr(cityHashData,cityData);
	    	cacheHashDataForArr(langSkillHashData,$scope.langSkillData);
	    	//初始化select
	    	$scope.cityData.unshift({code:'000',name:'请选择'});
	    	$scope.selectedAddress.selectedAddress1=$scope.cityData[0];
	    	$scope.cityChildData['000']=[{code:'000',name:'请选择'}];
	    	$scope.selectedAddress.selectedAddress2=$scope.cityChildData['000'][0];
	    	$scope.selectedAddress.selectedAddress3=$scope.cityData[0];
	    	$scope.selectedAddress.selectedAddress4=$scope.cityChildData['000'][0];
	    	//工作经历工作城市初始化
	    	$scope.workInfo.citySelected=$scope.cityData[0];
	    	//基本信息必须放在数据字典后
	    	//证书的数据字典
	    	$scope.certCommonData=result.content.hotCertificate;
	    	$scope.certOtherData=result.content.otherCertificate;
	    	$scope.certOtherChildItemData=result.content.firstCertificate;
	    	//技能数据字典
	    	$scope.skillCommonData=result.content.hotSkill;
	    	$scope.skillOtherData=result.content.skill;
	    	$scope.skillOtherChildItemData=result.content.firstSkill;
	    	$scope.hotCity=result.content.hotCity;
	    	// queryBasicInfo();
	    	allInfoDataQuery();
	    });
	    // $scope.saveContactInfo=function(){
	    // 	var contactInfo=$scope.contactInfo||{};
	    // 	$interface.save(editModule.uri.contactInfoSave,contactInfo).then(function(result){
	    // 		mainModule.log('保存联系方式信息接口返回数据如下',result.data);

	    // 	})
	    // }
	    var errDealtWith=function(content){
	    	errArr={};
    		var arr=content||[];
    		for(var i=0,ii=arr.length;i<ii;i++){
    			var item=arr[i];
    			errArr[item.field]=item.message;
    		}
    		return errArr;
	    };
	    //防止网速慢情况下多次提交，声明的对象
	    $scope.disabledInfo={};
	    var disableUpdateBtn=function(typestr){
	    	var key=typestr+'UpdateBtnDisabled';
	    	$scope.disabledInfo[key]=true;
	    	$timeout(function(){
	    		$scope.disabledInfo[key]=false;
	    	},2000);
	    };
	    // 保存基本信息
	    $scope.saveBasicInfo=function(idstr){
	    	var userInfo=$scope.userInfo;
	    	if(userInfo.infoYear&&userInfo.infoMonth&&userInfo.infoDay){
		    	var birthdate=userInfo.infoYear+'-'+userInfo.infoMonth+'-'+userInfo.infoDay;
		    	userInfo.birthdate=birthdate;
	    	}
    	    
	    	userInfo.presentAddress=$scope.selectedAddress.selectedAddress2.code;
	    	userInfo.domicileAddress=$scope.selectedAddress.selectedAddress4.code;
	    	userInfo.individualTag=$scope.infoPersonalLabels.toString();
	    	mainModule.log('保存基本信息现住地址省',$scope.selectedAddress.selectedAddress1);
	    	mainModule.log('保存基本信息现住地址市',$scope.selectedAddress.selectedAddress2);
	    	mainModule.log('保存基本信息户口省',$scope.selectedAddress.selectedAddress3);
	    	mainModule.log('保存基本信息户口市',$scope.selectedAddress.selectedAddress4);
	    	filterEmptyFieldToObj(userInfo,'presentAddressText',$scope.selectedAddress.selectedAddress2.name);
	    	filterEmptyFieldToObj(userInfo,'domicileAddressText',$scope.selectedAddress.selectedAddress4.name);
	    	filterUndefinedKeyToObj(userInfo);
	    	mainModule.log('保存基本信息数据如下',userInfo);
	    	disableUpdateBtn('basicInfo');
	    	$interface.post(editModule.uri.basicInfoSave,userInfo).then(function(result){
	    		mainModule.log('保存基本信息接口返回数据如下',result.data);
	    		//保存后地区代码重新转换

	    		userInfo.presentAddress?userInfo.presentAddress=cityHashData[userInfo.presentAddress].name:undefined;
	    		userInfo.domicileAddress?userInfo.domicileAddress=cityHashData[userInfo.domicileAddress].name:undefined;
	    		succDealtWith(idstr,result);
	    		// $scope.userInfoErr=result.data.content||{};
	    		// var arr=result.data.content||[];
	    		// for(var i=0,ii=arr.length;i<ii;i++){
	    		// 	var item=arr[i];
	    		// 	$scope.userInfoErr[item.field]=item.message;
	    		// }
	    		$scope.userInfoErr=errDealtWith(result.content)||{};
	    	})
	    }
	    var arrToString=function(arr){
	    	var resultArr=[];
	    	for(var i=0,ii=arr.length;i<ii;i++){
	    		var item=arr[i];
	    		resultArr.push(item.code);
	    	}
	    	return resultArr.join(',').length>0?resultArr.join(','):'';
	    };
	    var arrToTextString=function(arr){
	    	var resultArr=[];
	    	for(var i=0,ii=arr.length;i<ii;i++){
	    		var item=arr[i];
	    		resultArr.push(item.name);
	    	}
	    	return resultArr.join(',').length>0?resultArr.join(','):'';
	    };
	    var filterEmptyFieldToObj=function(obj,key,value){
	    	if(value&&value!='请选择'&&value!='000'){
	    		obj[key]=value;
	    	}
	    };
	    //求职意向数据
	    $scope.userObjective={};
	    $scope.objectiveUpdate=function(idstr){
	    	var industry=$scope.userObjectiveIndustrys,category=$scope.userObjectiveJobTypes,citys=$scope.userObjectiveCitys;
	    	var userObjective=$scope.userObjective;
	    	var objectiveInfo={};
	    	filterEmptyFieldToObj(objectiveInfo,'industry',arrToString(industry));
	    	filterEmptyFieldToObj(objectiveInfo,'industryText',arrToTextString(industry));
	    	filterEmptyFieldToObj(objectiveInfo,'category',arrToString(category));
	    	filterEmptyFieldToObj(objectiveInfo,'jobCategoryText',arrToTextString(category));

	    	filterEmptyFieldToObj(objectiveInfo,'citys',arrToString(citys));
	    	filterEmptyFieldToObj(objectiveInfo,'citysText',arrToTextString(citys));

	    	filterEmptyFieldToObj(objectiveInfo,'expectSalary',userObjective.expectSalary);
	    	filterEmptyFieldToObj(objectiveInfo,'showNegotiable',userObjective.showNegotiable);
	    	filterEmptyFieldToObj(objectiveInfo,'currentSalary',userObjective.currentSalary);
	    	filterEmptyFieldToObj(objectiveInfo,'showPrivacy',userObjective.showPrivacy);
	    	mainModule.log('求职意向要保存的用户数据',objectiveInfo);
	    	disableUpdateBtn('objectiveInfo');
	    	$interface.post(editModule.uri.objectiveUpdate,objectiveInfo).then(function(result){
	    		mainModule.log('求职意向保存接口返回数据',result);
	    		$scope.objectiveInfoErr=errDealtWith(result.content)||{};
	    		succDealtWith(idstr,result)
	    	})
	    }
	}]);
	var editModuleStr='editModule';
	app.service(editModuleStr, function() {
	    return editModule;
	});
	app.factory('$interface',['$http',function($http){
		return {
			save:function(uri,data){
					return $http.post(uri,data,{
						headers : {
							"Content-Type" : "application/x-www-form-urlencoded",
							"Accept" : "application/json; charset=utf-8",
						},
						transformRequest : function(data, headersGetter) {
							var param = function(obj) {
								var query = "";
								var name, value, fullSubName, subName, subValue, innerObj, i;
								for (name in obj) {
									value = obj[name];
									if (value instanceof Array) {
										for (i = 0; i < value.length; ++i) {
											subValue = value[i];
											fullSubName = name + "[" + i + "]";
											innerObj = {};
											innerObj[fullSubName] = subValue;
											query += param(innerObj) + "&";
										}
									} else if (value instanceof Object) {
										for (subName in value) {
											subValue = value[subName];
											fullSubName = name + "[" + subName + "]";
											innerObj = {};
											innerObj[fullSubName] = subValue;
											query += param(innerObj) + "&";
										}
									} else if (value !== undefined && value !== null) {
										query += encodeURIComponent(name) + "=" + encodeURIComponent(value) + "&";
									}
								}
								return query.length ? query.substr(0, query.length - 1) : query;
							};
							return angular.isObject(data) && String(data) !== "[object File]" ? param(data) : data;
						},
						params : {}
					}).then(function(result){
			    	console.log(result);
			    	return result.data;
			    })
			},
			get:function(uri,data){
				// var time = parseInt(new Date().getTime()/1000),
				// 	apiParams={time:time};
				return $http.get(uri,{params:data||{},cache:true}).then(function(result){
					mainModule.assertCookieExpired(result.data,true);
			    	return result.data;
				});
			},
			post:function(uri,data){
				return $http.post(uri,data).then(function(result){
		    		return result.data;
	    		});
			},
			upload:function(file){
				return $http.post(url, file, {
					transformRequest : angular.identity,
					headers : {
						'Content-Type' : undefined
					},
					params : defaultParams
				}).then(function(response) {
					console.log(response.data);
					return response.data;
				});
			}
		}
	}]);
	app.directive("jjFileOnChange", function() {
		return {
			restrict : "A",
			link : function(scope, element, attrs) {
				var onChangeFunc = scope.$eval(attrs.jjFileOnChange);
				element.bind('change', onChangeFunc);
			}
		};
	});
    app.filter('birthdateFormat',function() {
        return function(x) {
            return x?(mainModule.formatBirthdate(x)):'';
        };
    });
     app.filter('genderFormat',function() {
        return function(x) {
            return x?(x=='M'?'（男）':'（女）'):'';
        };
    });
    app.filter('dateFormatToMonth',function() {
        return function(x) {
        	var date=new Date(x),year=date.getFullYear(),month=date.getMonth()+1,str;
        	str=year+'年'+month+'月';
        	if(year==2099){str='至今'}
            return str;
        };
    });
    app.filter('isShowZhi',function(){
    	return function(x){
    		var date=new Date(x),year=date.getFullYear();
        	return year==2099?'':' 至 ';
    	}
    });
    app.filter('filterField',function(){
    	return function(x){
    		if(x=='请选择'||x==0){
    			x='';
    		}
    		return x;
    	}
    });
    // app.filter('number',function(){
    // 	return function(x){ return (x&&x.replace(/\D/g,''))||'';}
    // })
    // app.directive('emailinput', ['$sce', function($sce) {
    //       return {
    //         restrict: 'A', // only activate on element attribute
    //         require: '?ngModel', // get a hold of NgModelController
    //         link: function(scope, element, attrs, ngModel) {
    //           if (!ngModel) return; // do nothing if no ng-model

    //           // Specify how UI should be updated
    //           // ngModel.$render = function() {
    //           //   element.val($sce.getTrustedHtml(ngModel.$viewValue || ''));
    //           // };

    //           // Listen for change events to enable binding
				// var URL_REGEXP = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/;
				// var EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
				// var NUMBER_REGEXP = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))([eE][+-]?\d+)?\s*$/;
    //           element.on('blur', function() {
    //           	var val=element.val();
    //             console.log('该文本的值'+val);
    //             if(!EMAIL_REGEXP.test(val)){
    //             	scope.contactInfoErr.email='邮箱格式不正确';
    //             }else{
    //             	scope.contactInfoErr.email='';
    //             }
                
    //           });
    //       	}
    //       };
    // }]);
    // app.directive('textarea', ['$sce', function($sce) {
    //       return {
    //         restrict: 'E', // only activate on element attribute
    //         require: '?ngModel', // get a hold of NgModelController
    //         link: function(scope, element, attrs, ngModel) {
    //           element.on('keydown', function(e) {
				// var e=window.event||e,keyCode=e.keyCode;
				// if(e.which==13||keyCode==13){
				// 	var val=angular.element(e.target).val(),selectionStart=e.target.selectionStart;
				// 	val=val.substr(0,selectionStart)+'\n'+val.substr(selectionStart);
				// 	angular.element(e.target).val(val);
				// 	e.target.selectionStart=selectionStart+1;
				// 	e.target.selectionEnd=selectionStart+1;
				// 	e.preventDefault&&e.preventDefault();
				// }
				// console.log(e);
    //           });
    //       	}
    //       };
    // }]);

String.format = function() {
	if (arguments.length == 0)
		return this;
	for (var i = 1, rs = arguments[0]; i < arguments.length; i++)
		rs = rs.replace(new RegExp("\\{" + (i - 1) + "\\}", "g"), arguments[i]);
	return rs;
};
