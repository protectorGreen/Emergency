var testdata = require("./testData.js");
var envconfig = {
	"debug": true,
	//"debug": false,
	"host":"http://39.105.124.54",
	// "host": "http://192.168.1.104:10005",
	"localsrv": "http://192.168.3.122",
	//"localsrv": "http://192.168.3.103",
	//"signsrv": "http://localhost:5000",
	//"signsrv": "http://192.168.3.103:5000",
	//"signsrv":"http://192.168.1.106:4421",
	//"signsrv":"http://192.168.1.102:5000",
	//"signsrv": "http://169.254.79.145:5000",
	//"signsrv": "http://192.168.3.118:5000",
	//"signsrv": "http://192.168.31.252:8090",
	//"signsrv": "http://192.168.1.100:8090",
	//"signsrv": "http://192.168.1.102:5000",
	//"signsrv": "http://10.6.225.97:5000",
	//"signsrv": "http://192.168.3.122:5000",
	//"signsrv": "http://10.6.225.97:5000",	
	//"signsrv": "ws://10.6.225.97:5000",
	//"signsrv": "http://10.6.249.186:5000",	
	"signsrv":"http://192.168.1.104:31693"
	//http://10.6.225.97/
};

var currentContext = {
	page: "mydata", // 当前页面
	h_id: 0,
	p_id: 0, //当前推演ID
	ep_id: 0, // 预案
	chatpr: [], //当前通信席位,席位id
	bdeduction: false, //是否开启推演
	hr_id: 0,
	pr_id: 0
};

var dataContext = {
	// 推演席位数据  p_id:[],
	prs: {

	},
	// 设备 HR_ID:[], 指挥部成员下属设备
	equipments: {

	}
};

var Ur_Data = {
	"Ur_ID": null,
	"Ur_Phone": null,
	"Ur_Pwd": null,
	"Ur_Name": null,
	"Ur_H": []
};

var HT_Data = [

];

// 设置当前用户属性
function setUr(attr, value) {
	Ur_Data[attr] = value;
}

// 清楚当前用户
function clearUr() {
	for (var attr in Ur_Data) {
		Ur_Data[attr] = null;
	}
}

function requestGet(url, data, successfunc, failfunc) {
	uni.request({
		method: "GET",
		url: envconfig.host + url,
		dataType: "json",
		success: (ret) => {
			console.log("requeset**[url]:" + url + "[data]:" + data + "[ret]" + ret);
			if (ret && ret['statusCode'] == 200) {
				let retData = ret['data'];
				if (retData && retData['status'] == 0) {
					successfunc(retData);
				}
			} else {
				console.log("请求url:" + url + "//错误:" + ret['errMsg']);
			}
			//successfunc(ret);
		},
		fail: (ret) => {
			console.log("请求url:" + url + "//错误:" + ret);
		}
	})
}

function request(url, data, successfunc, failfunc) {
	uni.request({
		url: envconfig.host + url,
		data: data,
		method: "POST",
		success: (ret) => {
			console.log("requeset**[url]:" + url + "[data]:" + data + "[ret]" + ret);
			if (ret && ret['statusCode'] == 200) {
				let retData = ret['data'];
				if (retData && retData['status'] == 0) {
					if (successfunc && typeof(successfunc) == 'function') {
						successfunc(retData);
					}
				}
			}
		},
		fail: function(ret) {
			if (failfunc && typeof(failfunc) == 'function') {
				failfunc(ret);
			}
		}
	})
}

// 用户登陆
function login(paramData, successfunc, failfunc) {
	//if (envconfig.debug) {
	if (true) {
		let retData = {
			status: 0,
			data: testdata.testdata.logindata
		};
		successfunc(retData);
	} else {
		request('/pf/login', paramData, function(ret) {
			successfunc(ret);
		}, failfunc);
		//request('/pf/login', data, successfunc, failfunc);
	}
}

// 用户注册
function reg(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let regData = {
			status: 0,
			data: testdata.testdata.logindata
		}
		successfunc(regData);
	} else {
		// /v1/pf/CreateUser
		request('/v1/pf/CreateUser', paramData, successfunc, failfunc);
	}
}

// 保存用户
function saveUr(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let saveData = {
			status: 0,
			data: testdata.testdata.logindata
		}
		successfunc(saveData);
	} else {
		// /v1/Pf/EditUser
		request('/v1/Pf/EditUser', paramData, successfunc, failfunc)
	}
}

// 获取指挥部类型
function getHtType(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let HtTypeData = {
			status: 0,
			data: testdata.testdata.hqtype
		}
		successfunc(HtTypeData);
		//successfunc.apply(HtTypeData, this);
	} else {
		// /v1/Tem/QueryHeadquarterType
		request('/v1/Tem/QueryHeadquarterType', paramData, successfunc, failfunc);
	}
}

// 获取指挥部，条件指挥部类型及区域
function getHT(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let HTData = {
			status: 0,
			data: testdata.testdata.ht
		}
		successfunc(HTData);
	} else {
		// /v1/Tem/QueryHeadquarterDto 联合区域和指挥部类型
		// /v1/Tem/QueryHeadquarter
		request("/v1/Tem/QueryHeadquarter", paramData, successfunc, failfunc);
	}
}

// 加入指挥部
function joinH(paramData, successfunc, failfunc) {
	// /v1/Tem/CreateUserHeadquarter
	// {
	//   "uH_ID": 0,
	//   "ur_ID": 1,
	//   "h_ID": 1,
	//   "isDel": 0,
	//   "remark": "备注1"
	// }
	if (envconfig.debug) {
		let hData = {
			status: 0,
			data: testdata.testdata.uH
		}
		successfunc(hData);
	} else {
		request("/v1/Tem/CreateUserHeadquarter", paramData, successfunc, failfunc);
	}
}

// 获取用户所属指挥部
function getHeadquanterByUser(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let huData = {
			status: 0,
			data: testdata.testdata.uH
		}
		successfunc(huData);
	} else {
		//	/v1/Pf/QueryUserHeadquarter
		requestGet("/v1/Pf/QueryUserHeadquarter", paramData, successfunc, failfunc);
	}
}

// 获取预案及预案下推演
function getEpAndPerormance(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let epdata = {
			status: 0,
			data: testdata.testdata.ep
		}
		successfunc(epdata);
	} else {
		// /v1/Tem/QueryEmergencyPlan
		request("/v1/Tem/QueryEmergencyPlan", paramData, successfunc, failfunc);
	}
}

// 获取推演下席位
function getPerformanceRole(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let performanceData = {
			status: 0,
			data: testdata.testdata.pr
		}
		successfunc(performanceData);
	}
	// /v1/Tem/QueryPerformanceRole 推演席位 的参数   P_ID 推演ID
	request("/v1/Tem/QueryPerformanceRole", paramData, successfunc, failfunc);
}

// 申请席位
function applySeat(paramData, successfunc, failfunc) {
	if (envconfig.debug) {
		let seatData = {
			status: 0,
			data: null
		}
		successfunc(seatData);
	}
	request("");
}

// 获取指挥部成员下装备物资
function getSupplycate(paraData, successfunc, failfunc) {
	if (envconfig.debug) {
		let supplyData = {
			status: 0,
			data: testdata.testdata.supplycate
		}
		successfunc(supplyData);
	}
	request("/v1/Tem/QuerySupplyCate", paraData, successfunc, failfunc);
}

// 保存指挥部成员装备物资
function saveSupplycate(paraData, successfunc, failfunc) {
	if (envconfig.debug) {
		let supplyData = {
			status: 0,
			data: testdata.testdata.supplycate
		}
		successfunc(supplyData);
	}
	//CreatePerformanceRoleSupply/EditPerformanceRoleSupply
	request("/v1/Tem/", paraData, successfunc, failfunc);
}

var testdatas = {
	member: {
		cPhone: "",
		cName: "",
		headquanters: [{

		}]
	},
	headquanterstypeobj: {
		"1": "群体性事件应急指挥部",
		"2": "电力事故应急指挥部",
		"3": "重大网络与信息安全事件应急指挥部",
		"4": "通信保障应急指挥部",
		"5": "核应急指挥部",
		"6": "反恐和刑事案件应急指挥部",
		"7": "突发事件应急救助指挥部",
		"8": "空气重污染应急指挥部",
		"9": "建筑工程事故应急指挥部",
		"10": "城市公共设施事故应急指挥部",
		"11": "交通安全应急指挥部",
		"12": "防汛抗旱应急指挥部",
		"13": "突发公共卫生事件应急指挥部",
		"14": "涉外突发事件应急指挥部",
		"15": "生产安全事故应急指挥部",
		"16": "森林防火应急指挥部",
		"17": "人防工程事故应急指挥部",
		"18": "重大动植物疫情应急指挥部",
		"19": "消防安全应急指挥部",
		"20": "地震应急指挥部",
		"21": "食品药品安全应急指挥部等",
	},
	headquanterstypearray: [{
			"1": "群体性事件应急指挥部"
		},
		{
			"2": "电力事故应急指挥部"
		},
		{
			"3": "重大网络与信息安全事件应急指挥部"
		},
		{
			"4": "通信保障应急指挥部"
		},
		{
			"5": "核应急指挥部"
		},
		{
			"6": "反恐和刑事案件应急指挥部"
		},
		{
			"7": "突发事件应急救助指挥部"
		},
		{
			"8": "空气重污染应急指挥部"
		},
		{
			"9": "建筑工程事故应急指挥部"
		},
		{
			"10": "城市公共设施事故应急指挥部"
		},
		{
			"11": "交通安全应急指挥部"
		},
		{
			"12": "防汛抗旱应急指挥部"
		},
		{
			"13": "突发公共卫生事件应急指挥部"
		},
		{
			"14": "涉外突发事件应急指挥部"
		},
		{
			"15": "生产安全事故应急指挥部"
		},
		{
			"16": "森林防火应急指挥部"
		},
		{
			"17": "人防工程事故应急指挥部"
		},
		{
			"18": "重大动植物疫情应急指挥部"
		},
		{
			"19": "消防安全应急指挥部"
		},
		{
			"20": "地震应急指挥部"
		},
		{
			"21": "食品药品安全应急指挥部等"
		}
	],
	headquantersArray: [{
			"name": "群体性事件应急指挥部"
		},
		{
			"name": "电力事故应急指挥部"
		},
		{
			"name": "重大网络与信息安全事件应急指挥部"
		},
		{
			"name": "通信保障应急指挥部"
		},
		{
			"name": "核应急指挥部"
		},
		{
			"name": "反恐和刑事案件应急指挥部"
		},
		{
			"name": "突发事件应急救助指挥部"
		},
		{
			"name": "空气重污染应急指挥部"
		},
		{
			"name": "建筑工程事故应急指挥部"
		},
		{
			"name": "城市公共设施事故应急指挥部"
		},
		{
			"name": "交通安全应急指挥部"
		},
		{
			"name": "防汛抗旱应急指挥部"
		},
		{
			"name": "突发公共卫生事件应急指挥部"
		},
		{
			"name": "涉外突发事件应急指挥部"
		},
		{
			"name": "生产安全事故应急指挥部"
		},
		{
			"name": "森林防火应急指挥部"
		},
		{
			"name": "人防工程事故应急指挥部"
		},
		{
			"name": "重大动植物疫情应急指挥部"
		},
		{
			"name": "消防安全应急指挥部"
		},
		{
			"name": "地震应急指挥部"
		},
		{
			"name": "食品药品安全应急指挥部等"
		}
	]

}

module.exports = {
	currentContext: currentContext,
	dataContext: dataContext,
	//currentPage: currentPage,
	HT_Data: HT_Data,
	Ur_Data: Ur_Data,
	envconfig: envconfig,
	login: login,
	setUr: setUr,
	clearUr: clearUr,
	reg: reg,
	saveUr: saveUr,
	getHtType: getHtType,
	getHT: getHT,
	getHeadquanterByUser: getHeadquanterByUser,
	getEpAndPerormance: getEpAndPerormance,
	getPerformanceRole: getPerformanceRole,
	getSupplycate: getSupplycate,
	saveSupplycate: saveSupplycate,
	applySeat: applySeat,
	joinH: joinH,
	headquantersArray: testdatas.headquantersArray,
	request: request
}
