KM = {};
KM.ClientInterface = function() 
{
    Object.call(this);
}

KM.ClientInterface.prototype= new Object;

// <summary> 
//		登录
// </summary> 
KM.ClientInterface.prototype.KmLogin = function(username, password ,OnLoginResult) //
{
	var pwdRtn;
	var publickeytemp;
	$.ajax({
		async : false,
		type : 'post',
		url : KmWebDataServer_URL  + "/getpublickeystring",
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			OnLoginResult("Get public key string falied:"+textStatus);
		},
		success : function(publickey) {
			var pwdRtn1 = cryptico.encrypt(password, publickey);
			pwdRtn = pwdRtn1.cipher;
			publickeytemp = publickey;
		}
	});
	pwdRtn = pwdRtn.replace(/\+/g, "%2B");
	var data1 = "username=" + username + "&"+ "password=" + pwdRtn;
//	var data1 = "username=" + username + "&" + "password=" ;
	$.ajax({
		async : false,
		type : 'get',
		url : KmWebDataServer_URL  + "/login",
		data : data1,
		error : function(loginresult) {
			OnLoginResult(loginresult);
		},
		success : function(loginresult) {
			OnLoginResult(loginresult+":"+publickeytemp);

		}
	});

	// ----------------------------------------
}

// <summary> 
//		退出登录
// </summary> 

KM.ClientInterface.prototype.KmLogoff = function(
				userhandle, OnLogoffResult) 
{
	var data = "userhandle=" + userhandle;
	$.ajax({
		async : false,
		type : 'get',
		url : KmWebDataServer_URL  + "/logoff",
		data : data,
		error : function(logoffresult) {
			OnLogoffResult(logoffresult);
		},
		success : function(logoffresult) {
			OnLogoffResult(logoffresult);

		}
	});
}


// <summary> 
//		构建json格式的object字符串
// </summary> 

function KmCreateJsonString_Tags(Tags)
{
	var JsonString = "";
	JsonString = JsonString + "[" + "\n" ;
	var len = Tags.length;
	for(var i = 0;i<len ;i++) 
	{
		JsonString = JsonString + "\"" + Tags[i] + "\""  ;
		if( i != len-1)
			JsonString = JsonString + "," ;
		JsonString = JsonString + "\n";
	}
	//JsonString = JsonString + "\n";
	JsonString = JsonString + "]";
	
	return JsonString;
}

function KmCreateJsonString_Condition_Industry(starttime,endtime,querytype)
{
	var JsonString = "";
	JsonString = JsonString + "{" + "\n" ;
	JsonString = JsonString + "\"starttime\"" +":" + "\"" + starttime + "\"" + "," + "\n";
	JsonString = JsonString + "\"endtime\"" +":" + "\"" + endtime + "\"" + "," + "\n";
	JsonString = JsonString + "\"querytype\"" +":" + "\"" + querytype + "\""  + "\n";
	JsonString = JsonString +"}";

	return JsonString;
}

function KmCreateJsonString_Condition_SQL(sqlstring)
{
	var JsonString = "";
	JsonString = JsonString + "[" + "\n" ;
	JsonString = JsonString + "\"querystring\"" +":" + "\"" + sqlstring + "\""  + "\n";
	JsonString = JsonString +"]";

	return JsonString;
}


// <summary> 
//		获取历史数据
// </summary> 
KM.ClientInterface.prototype.KmGetHistoryDatas = function(handle,DataSourceName,CommandType,JsonString_Tags,JsonString_Condition_Industry,OnGetHistoryDatas)
{
	var JsonString = "";
	JsonString = JsonString + "{" + "\n" ;
	JsonString = JsonString + "\"handle\"" + ":" + "\"" + handle + "\"" + "," + "\n";
	JsonString = JsonString + "\"datasourcename\"" + ":" + "\"" + DataSourceName  +"\"" + "," + "\n";
	JsonString = JsonString + "\"dowork\":[" + "\n";
	JsonString = JsonString + "\"querytype\":" + "\"" + CommandType + "\"" + ","  + "\n";
	JsonString = JsonString + "\"tags\"" + ":" + JsonString_Tags + "," + "\n";
	JsonString = JsonString + "\"condition\"" + ":" + JsonString_Condition_Industry + "\n";
	JsonString = JsonString + "]}";
	
	$.ajax({
		async : false,
		type : 'post',
		url : KmWebDataServer_URL  + "/dowork",
		data : JsonString,
		error : function(JsonString_Result_HistoryDatas) {
			OnGetHistoryDatas(JsonString_Result_HistoryDatas);
		},
		success : function(JsonString_Result_HistoryDatas) {
			OnGetHistoryDatas(JsonString_Result_HistoryDatas);

		}
	});
}

// <summary> 
//		获取实时数据
// </summary>
KM.ClientInterface.prototype.KmGetRealDatas = function(handle, DataSourceName, CommandType,JsonString_Tags, OnGetRealDatas)
{
	var JsonString = "";
	JsonString = JsonString + "{" + "\n" ;
	JsonString = JsonString + "\"handle\"" + ":" + "\"" + handle + "\"" + "," + "\n";
	JsonString = JsonString + "\"datasourcename\"" + ":" +"\"" + DataSourceName +"\""+ "," + "\n";
	JsonString = JsonString + "\"dowork\":[" + "\n";
	JsonString = JsonString + "\"querytype\":" + "\"" + CommandType + "\"" + "," + "\n";
	JsonString = JsonString + "\"tags\"" + ":" + JsonString_Tags +  "," + "\n";
	JsonString = JsonString + "\"condition\"" + ":" + "[]" + "\n";
	JsonString = JsonString + "]}";
	
	$.ajax({
		async : false,
		type : 'post',
		url : KmWebDataServer_URL  + "/dowork",
		data : JsonString,
		error : function(JsonString_Result_RealtimeDatas) {
			OnGetRealDatas(JsonString_Result_RealtimeDatas);
		},
		success : function(JsonString_Result_RealtimeDatas) {
			OnGetRealDatas(JsonString_Result_RealtimeDatas);

		}
	});
}

// <summary> 
//		获取关系库数据（执行是SQL语句）
// </summary> 
KM.ClientInterface.prototype.KmGetSQLDatas = function(handle,DataSourceName,JsonString_Condition_SQL,OnGetSQLDatas)
{
	var JsonString = "";
	JsonString = JsonString + "{" + "\n" ;
	JsonString = JsonString + "\"handle\"" + ":" + "\"" + handle + "\"" + "," + "\n";
	JsonString = JsonString + "\"datasourcename\"" + ":" + "\""+DataSourceName +"\""+ "," + "\n";
	JsonString = JsonString + "\"dowork\":[" + "\n";
	JsonString = JsonString + "\"querytype\"" + ":" + "\"" + "select" + "\"" + "," + "\n";
	JsonString = JsonString + "\"condition\"" + ":" + JsonString_Condition_SQL + "\n";
	JsonString = JsonString + "]}";
	
	$.ajax({
		async : false,
		type : 'post',
		url : KmWebDataServer_URL  + "/dowork",
		data : JsonString,
		error : function(JsonString_Result_SQLDatas) {
			OnGetSQLDatas(JsonString_Result_SQLDatas);
		},
		success : function(JsonString_Result_SQLDatas) {
			OnGetSQLDatas(JsonString_Result_SQLDatas);
		}
	});
	
}
// <summary> 
//		执行SQL语句（非select）
// </summary> 
KM.ClientInterface.prototype.KmExecuteSQL = function(handle,DataSourceName,JsonString_Condition_SQL,OnExecuteSQL)
{
	var JsonString = "";
	JsonString = JsonString + "{" + "\n" ;
	JsonString = JsonString + "\"handle\"" + ":" + "\"" + handle + "\"" + "," + "\n";
	JsonString = JsonString + "\"datasourcename\"" + ":" + "\""+ DataSourceName + "\""+ "," + "\n";
	JsonString = JsonString + "\"dowork\":[" + "\n";
	JsonString = JsonString + "\"querytype\"" + ":" + "\"" + "noselect" + "\"" + "," + "\n";
	JsonString = JsonString + "\"condition\"" + ":" + JsonString_Condition_SQL + "\n";
	JsonString = JsonString + "]}";
	
	$.ajax({
		async : false,
		type : 'post',
		url : KmWebDataServer_URL  + "/dowork",
		data : JsonString,
		error : function(JsonString_Result_SQL) {
			OnExecuteSQL(JsonString_Result_SQL);
		},
		success : function(JsonString_Result_SQL) {
			OnExecuteSQL(JsonString_Result_SQL);
		}
	});
}
