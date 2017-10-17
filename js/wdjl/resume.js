var app = angular.module('ResumePreApp', []);
app.controller('ResumePreCtrl',['$scope','$http',function($scope, $http) {
    $http.get($._CACHEOBJ.context+"/user/archive/detail")
    .success(function(response) {
    	console.log(response);
    	if(/未登录/.test(response.message)){
    		mainModule.popLoginBox();
    	}
		$scope.data = response.content||[];
		resModule($scope.data);
		});
		var resModule=function(data){			
			$scope.edus = data.educations||[];
			$scope.langs = data.languages||[];
			$scope.trains = data.trainings||[];
			$scope.camps = data.campusDuties||[];
			$scope.honors = data.honors||[];
			$scope.inters = data.internships||[];
			$scope.pros = data.projects||[];
			$scope.skill = data.skill||{};
			$scope.certs = data.certificate||{};
			$scope.works = data.works||[];
			$scope.jobInts = data.jobIntension||[];
			//$scope.jobIntlists = data.jobIntension.industryList||{};
			calculateFinishedPerc($scope.data);			
		}
		
		
		
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
}]);
app.filter('genderFormat',function() {
	return function(x) {
		return x=='M'?'男':'女';
	};
});

app.filter('dateToBirthYear',function() {
	return function(x) {
		var date=new Date(x),year=date.getFullYear(),nowYear=(new Date()).getFullYear(),birthYear=nowYear-year;
		return birthYear;
	};
});	
app.filter('birthdateFormat',function() {
	return function(x) {
		var x=new Date(x),
            year=x.getFullYear(),month=x.getMonth()+1,
            datetime=year+'-'+month;
			if(year==2099){datetime='今'}
        return datetime;
	};
});	
