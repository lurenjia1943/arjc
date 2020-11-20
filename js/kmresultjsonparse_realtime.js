//变量域信息
g_FieldNameArray = [
                     "VALUE","ACK","ALARM","HIHILIMIT","HIHISTATUS","HILIMIT","HISTATUS",
					  "LOLIMIT","LOSTATUS","LOLOLIMIT","LOLOSTATUS","MAJOR_PCT","MAJOR_STATUS",
					  "MINOR_PCT","MINOR_STATUS","DEVTARGET","ROCPCT","ROCSTATUS","MAXEU","MINEU",
					  "VALUESTART","VALUESIZE","CHARTLENGTH","CHARTSTART","PEN1","PEN2","PEN3","PEN4",
					  "GROUPID","PRIORITY","EXTEND1","EXTEND2","SCOOTERLEFT","SCOOTERRIGHT","UPDATEPROCESS","UPDATETREND",
					  "VALUEEND","PEN5","PEN6","PEN7","PEN8","NAME","COMMENT","MINRAW","MAXRAW","QUALITY",
					  "QUALITY_STRING","TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  "TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","ALARMENABLE","RECLOGENABLE",
					  "DATACHANGED","DATAUPDATE","LIMITDEAD","DEVDEAD","ALARMDELAYTIME"
                     ];
//add by shuai.qiao
g_FieldNameArray_Bool = [
						"VALUE","ACK","ALARM","ALARMENABLE","DATACHANGED","DATAUPDATE","EXTEND1","EXTEND2",
					  	"GROUPID","PRIORITY","NAME","COMMENT","QUALITY","QUALITY_STRING",
					  	"TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","RECLOGENABLE",
                     	];
g_FieldNameArray_Int = [
						"VALUE","ACK","ALARM","ALARMENABLE","DATACHANGED","DATAUPDATE",
					  	"GROUPID","PRIORITY","DEVTARGET","HIHILIMIT","HIHISTATUS","HILIMIT","HISTATUS",
					  	"LOLIMIT","LOSTATUS","LOLOLIMIT","LOLOSTATUS","MAJOR_PCT","MAJOR_STATUS",
					  	"MINOR_PCT","MINOR_STATUS","ROCPCT","ROCSTATUS","LIMITDEAD","DEVDEAD","ALARMDELAYTIME","EXTEND1","EXTEND2","NAME","COMMENT","QUALITY","QUALITY_STRING","TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","RECLOGENABLE",
                     	];
g_FieldNameArray_Float = [
						"VALUE","ACK","ALARM","ALARMENABLE","DATACHANGED","DATAUPDATE",
					  	"GROUPID","PRIORITY","DEVTARGET","HIHILIMIT","HIHISTATUS","HILIMIT","HISTATUS",
					  	"LOLIMIT","LOSTATUS","LOLOLIMIT","LOLOSTATUS","MAJOR_PCT","MAJOR_STATUS",
					  	"MINOR_PCT","MINOR_STATUS","ROCPCT","ROCSTATUS","LIMITDEAD","DEVDEAD","ALARMDELAYTIME","EXTEND1","EXTEND2","NAME","COMMENT","QUALITY","QUALITY_STRING","TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","RECLOGENABLE",
                     	];
g_FieldNameArray_String = [
						"VALUE","DATACHANGED","NAME","COMMENT","QUALITY","QUALITY_STRING",
						"TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE",
                     	];


g_FieldNameArray_IOBool = [
						"VALUE","ACK","ALARM","ALARMENABLE","DATACHANGED","DATAUPDATE","EXTEND1","EXTEND2",
					  	"GROUPID","PRIORITY","NAME","COMMENT","QUALITY","QUALITY_STRING",
					  	"TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","RECLOGENABLE",					  	
                     	];
g_FieldNameArray_IOInt = [
						"VALUE","ACK","ALARM","ALARMENABLE","DATACHANGED","DATAUPDATE",
					  	"GROUPID","PRIORITY","DEVTARGET","HIHILIMIT","HIHISTATUS","HILIMIT","HISTATUS",
					  	"LOLIMIT","LOSTATUS","LOLOLIMIT","LOLOSTATUS","MAJOR_PCT","MAJOR_STATUS","MAXEU","MINEU","MAXRAW","MINRAW",
					  	"MINOR_PCT","MINOR_STATUS","ROCPCT","ROCSTATUS","LIMITDEAD","DEVDEAD","ALARMDELAYTIME","EXTEND1","EXTEND2","NAME","COMMENT","QUALITY","QUALITY_STRING","TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","RECLOGENABLE",
                     	];
g_FieldNameArray_IOFloat = [
						"VALUE","ACK","ALARM","ALARMENABLE","DATACHANGED","DATAUPDATE",
					  	"GROUPID","PRIORITY","DEVTARGET","HIHILIMIT","HIHISTATUS","HILIMIT","HISTATUS",
					  	"LOLIMIT","LOSTATUS","LOLOLIMIT","LOLOSTATUS","MAJOR_PCT","MAJOR_STATUS","MAXEU","MINEU","MAXRAW","MINRAW",
					  	"MINOR_PCT","MINOR_STATUS","ROCPCT","ROCSTATUS","LIMITDEAD","DEVDEAD","ALARMDELAYTIME","EXTEND1","EXTEND2","NAME","COMMENT","QUALITY","QUALITY_STRING","TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE","RECLOGENABLE",					  	
                     	];
g_FieldNameArray_IOString = [
						"VALUE","DATACHANGED","NAME","COMMENT","QUALITY","QUALITY_STRING",
						"TIME_YEAR","TIME_MONTH","TIME_DATE","TIME_HOUR","TIME_MINUTE","TIME_SECOND",
					  	"TIME_MSEC","TIME_DATESTRING","TIME_TIMESTRING","TIME_ZONE",
                     	];					 
//end add by shuai.qiao
// <summary> 
//		解析返回的历史数据（用于展示图表）
// </summary> 
function HistoryCreateHighChartsDatasString(JSONformat_HistoryDatas)//
{
    var stringa = "";
	var stringb = "";
	var stringc = "";
    var obj = JSON.parse(JSONformat_HistoryDatas);
    if (obj != null)//
    {
        var i, j,k;
		var rows_num = parseInt(obj.Body.fieldNum);
        var cols_num = obj.Body.dataPro.length;//obj.cols_num;
		stringa = stringa+"[";
        //设置各行-------------------------------
        for (i = 0; i < rows_num; i++) //
        {
			if(i%2 == 0)
				stringb = stringb +  "{type:" + "'" + "spline" + "'" + "," + " name:"+"'"+obj.Body.records[i][0]+"'"+","+"data:[";
			else
				stringb = stringb + "{type:" + "'" + "column" + "'" + "," + " name:"+"'"+obj.Body.records[i][0]+"'"+","+"data:[";
			for(k = 0;k < obj.Body.records[i][3].length;k++)
			{
				stringb = stringb + obj.Body.records[i][3][k][0];
				if( k!= obj.Body.records[i][3].length-1)
				{
					stringb = stringb  + ","
				}
				if(i == 0)
				{
					stringc = stringc  + "'" + obj.Body.records[i][3][k][2] +"'";
					if( k!= obj.Body.records[i][3].length-1)
					{
						stringc = stringc  + ","
					}
				}
				
			}
			stringb = stringb +"]}"
			if( i!=rows_num-1 )
			{
				stringb = stringb +",";
			}
        }
    }
	stringa = stringa + stringb +"]";
	stringa = stringa + "*{categories:[" + stringc + "]";
    return stringa;
}
// <summary> 
//		解析返回的历史数据（用于表格显示）
// </summary> 
function HistoryCreateTableinnerHtmlString(JSONformat_HistoryDatas)//
{
    var stringa = null;
    var obj = JSON.parse(JSONformat_HistoryDatas);
    if (obj != null)//
    {
        var i, j,k;
		var rows_num = parseInt(obj.Body.tagNum);
        var cols_num = obj.Body.dataPro.length;//obj.cols_num;
        
        //设置各列-------------------------------
       stringa = " <tr class='css0'>";
	   stringa = stringa + "<th>" + obj.Body.tagInfo[0]+ "<th>" +obj.Body.tagInfo[1];
        for (j = 0; j < cols_num; j++)// 
        {
            stringa = stringa + "<th>" + obj.Body.dataPro[j];
        }
        stringa = stringa + "</tr>";
        //设置各行-------------------------------
        for (i = 0; i < rows_num; i++) //
        {
			for(k = 0;k < obj.Body.records[i][3].length;k++)
			{
				var stringb = "";
				if (k % 2 == 0) { stringb = "<tr class='css1'>"; }
				else { stringb = "<tr class='css2'>"; }
				stringb = stringb + "<td>" + obj.Body.records[i][0];
				stringb = stringb + "<td>" + obj.Body.records[i][1];
				for (j = 0; j < cols_num; j++)//
				{
//					stringb = stringb + "<td>" + obj.Body.records[i][3][k][j];
					if( parseInt(obj.Body.records[i][3][k][j])> 50 && obj.Body.records[i][3][k][j].length <15)
						stringb = stringb + "<td class='css3'>" + obj.Body.records[i][3][k][j];
					else
						stringb = stringb + "<td>" + obj.Body.records[i][3][k][j];
				}
				stringb = stringb + "</tr>";

				stringa = stringa + stringb;
			}
        }
    }
    return stringa;
}
// <summary> 
//		解析返回的实时数据（用户表格展示）
// </summary> 
function RealtimeCreateTableinnerHtmlString(JSONformat_RealtimeDatas,tabelColumnArray)//
{
    var stringa = null;
    var obj = JSON.parse(JSONformat_RealtimeDatas);
    if (obj != null)//
    {
        var i, j;
		var rows_num = parseInt(obj.Body.tagNum);
        var cols_num = obj.Body.dataPro.length;//obj.cols_num;
        
        //设置各列-------------------------------
       stringa = " <tr class='css0'>";
	   for(i=0; i< 4; i++)
	   {
		  if(tabelColumnArray[i])
          {
          	if (obj.Body.tagInfo[i] == "tagName") 
          	{
          		stringa += "<th>" + "变量名";
          	}
          	else if (obj.Body.tagInfo[i] == "dataType") 
          	{
          		stringa += "<th>" + "数据类型";
          	}
    		else if (obj.Body.tagInfo[i] == "dataSubType") 
          	{
          		stringa += "<th>" + "子类型";
          	}
          	else if (obj.Body.tagInfo[i] == "tagComment") 
          	{
          		stringa += "<th>" + "描述";
          	}
          	else if (obj.Body.tagInfo[i] == "value") 
          	{
          		stringa += "<th>" + "值";
          	}
          	else if (obj.Body.tagInfo[i] == "dataTime") 
          	{
          		stringa += "<th>" + "时间戳";
          	}
          	else  
          	{
          		stringa += "<th>" + obj.Body.tagInfo[i];
          	}
		  }			  
	   }
	   //stringa = stringa + "<th>" + obj.Body.tagInfo[0]+ "<th>" +obj.Body.tagInfo[1]+ "<th>"+ obj.Body.tagInfo[2]+"<th>"+obj.Body.tagInfo[3];

        for (j = 0; j < cols_num; j++)// 
        {
            if(tabelColumnArray[j+i])
			{
				if (obj.Body.dataPro[j] == "tagName") 
	          	{
	          		stringa += "<th>" + "变量名";
	          	}
	          	else if (obj.Body.dataPro[j] == "dataType") 
	          	{
	          		stringa += "<th>" + "数据类型";
	          	}
			else if (obj.Body.dataPro[j] == "dataSubType") 
			{
				stringa += "<th>" + "子类型";
			}
	          	else if (obj.Body.dataPro[j] == "tagComment") 
	          	{
	          		stringa += "<th>" + "描述";
	          	}
	          	else if (obj.Body.dataPro[j] == "value") 
	          	{
	          		stringa += "<th>" + "值";
	          	}
	          	else if (obj.Body.dataPro[j] == "dataTime") 
	          	{
	          		stringa += "<th>" + "时间戳";
	          	}
	          	else  
	          	{
	          		stringa += "<th>" + obj.Body.dataPro[j];
	          	}
			}
			//stringa = stringa + "<th>" + obj.Body.dataPro[j];
        }
        stringa = stringa + "</tr>";
        //设置各行-------------------------------
        for (i = 0; i < rows_num; i++) //
        {
			var stringb = "";
			if (i % 2 == 0) { stringb = "<tr class='css1'>"; }
			else { stringb = "<tr class='css2'>"; }
			//stringb = stringb + "<td>" + obj.Body.records[i][0];
			//stringb = stringb + "<td>" + obj.Body.records[i][1];
			//stringb = stringb + "<td>" + obj.Body.records[i][2];
			//stringb = stringb + "<td>" + obj.Body.records[i][3];
			for(var k=0; k < 4; k++)
			{
				if(tabelColumnArray[k])
                   {
			          stringb += "<td>" + obj.Body.records[i][k];
		           }	
			}
			for (j = 0; j < cols_num; j++)//
			{
				//stringb = stringb + "<td>" + obj.Body.records[i][3][j];
				if(tabelColumnArray[j+k])
				{
					//if( parseInt(obj.Body.records[i][5][j])> 50 && obj.Body.records[i][5][j].length <15)
					//mod by yang.lei 2015-11-27 
					//if( obj.Body.records[i][1] != "字符串型" && parseInt(obj.Body.records[i][5][j])> 50 && obj.Body.records[i][5][j].length <15)
					if( obj.Body.records[i][1] != "字符串型" && obj.Body.records[i][4] == "是" && j == 0)
					//end by yang.lei
					{stringb = stringb + "<td class='css3'>" + obj.Body.records[i][6][j];}
				else
				    {stringb = stringb + "<td>" + obj.Body.records[i][6][j];}
				}

			}
			stringb = stringb + "</tr>";

			stringa = stringa + stringb;
			
        }

    }
		

	
    return stringa;
}

// <summary> 
//		解析关系库返回的数据（用于表格显示）
// </summary> 
function BDCreateTableinnerHtmlString(JSONformat_DatabaseDatas)//数据库数据转表格
{
	var stringa = null;

    var obj = JSON.parse(JSONformat_DatabaseDatas);
    if (obj != null)//
    {
        var i, j;
		var rows_num = parseInt(obj.Body.recordNum);
        var cols_num = obj.Body.field.length;//obj.cols_num;
		
		//设置各列-------------------------------
       stringa = " <tr class='css0'>";
	   for (j = 0; j < cols_num; j++)// 
        {
            stringa = stringa + "<th>" + obj.Body.field[j];
        }
        stringa = stringa + "</tr>";
        //设置各行-------------------------------
        if (rows_num == 0)
        {
            return stringa;
		}
        for (i = 0; i < rows_num; i++) //
        {
			var stringb = "";
			if (i % 2 == 0) { stringb = "<tr class='css1'>"; }
			else { stringb = "<tr class='css2'>"; }
			if(cols_num == 1)
			{
				if( parseInt(obj.Body.records[i])> 100)
						stringb = stringb + "<td class='css3'>" + obj.Body.records[i];
					else
					stringb = stringb + "<td>" + obj.Body.records[i];
			}
			else
			{
				for (j = 0; j < cols_num; j++)//
				{
					if( parseInt(obj.Body.records[i][cols_num-1])> 100)
						stringb = stringb + "<td class='css3'>" + obj.Body.records[i][j];
					else
					stringb = stringb + "<td>" + obj.Body.records[i][j];
				}
			}
			stringb = stringb + "</tr>";

			stringa = stringa + stringb;
			
        }
	}
	return stringa;
}

//获取实时变量的值
function GetRealDataFromKVAction(tagNameArray)
{
		var DataSourceName = "KV1";
		var CommandType = "realdata";
		var JsonString_Tags = KmCreateJsonString_Tags(tagNameArray);			
		var iclient = new KM.ClientInterface;
		var retJsonSting;
		iclient.KmGetRealDatas(g_userhandle, DataSourceName, CommandType,JsonString_Tags,function(JsonString_Result_KVRealtimeDatas)
		{
			if(typeof JsonString_Result_KVRealtimeDatas == "object")
			{
				if(typeof JsonString_Result_KVRealtimeDatas.responseText != "undefined")
				{
					alert(JsonString_Result_KVRealtimeDatas.responseText);
				}
				else
				{
					alert("未定义错误");
				}
			}
			else
			{
				var ret = JsonString_Result_KVRealtimeDatas.split(":");
				if( ret[0] == "failed")
				{
					alert(ret[1]);
					if(ret[1] == "用户没有登录或者在其他地方登录，请重新登录！")
					{
						window.sessionStorage.userhandle = 0;
						window.sessionStorage.publickey = "";
						window.location = "../login.html";
					}
				}
				else
				{
					retJsonSting = JsonString_Result_KVRealtimeDatas;
					   
				}
			}

			
		});
		return retJsonSting;
}

//获取域值
function GetFieldValueFromKVAction(tagName ,fieldID)
{
	
	var DataSourceName = "KV1";
	var CommandType = "realfielddata";	
	var iclient = new KM.ClientInterface;
	var retJsonSting;
	iclient.KmGetRealFieldDatas(g_userhandle, DataSourceName, CommandType,tagName,fieldID,function(JsonString_Result_KVRealtimeFieldDatas)
	{
		if(typeof JsonString_Result_KVRealtimeFieldDatas == "object")
		{
			if(typeof JsonString_Result_KVRealtimeFieldDatas.responseText != "undefined")
			{
				alert(JsonString_Result_KVRealtimeFieldDatas.responseText);
			}
			else
			{
				alert("未定义错误");
			}
		}
		else
		{
			var ret = JsonString_Result_KVRealtimeFieldDatas.split(":");
			if( ret[0] == "failed")
			{
				alert(ret[1]);
				if(ret[1] == "用户没有登录或者在其他地方登录，请重新登录！")
				{
					window.sessionStorage.userhandle = 0;
					window.sessionStorage.publickey = "";
					window.location = "../login.html";
				}
			}
			else
			{
				retJsonSting = JsonString_Result_KVRealtimeFieldDatas;
				   
			}
		}

		
	});
	return retJsonSting;
	
}

function SetFieldValueToKVAction(tagName,fieldID,fieldType,value)
{
	var DataSourceName = "KV1";
	var CommandType = "setrealfielddata";	
	var iclient = new KM.ClientInterface;
	var retJsonSting;
	iclient.KmSetRealFieldDatas(g_userhandle, DataSourceName, CommandType,tagName,fieldID,fieldType,value,function(JsonString_Result_KVSetRealtimeFieldDatas)
	{
		if(typeof JsonString_Result_KVSetRealtimeFieldDatas == "object")
		{
			if(typeof JsonString_Result_KVSetRealtimeFieldDatas.responseText != "undefined")
			{
				alert(JsonString_Result_KVSetRealtimeFieldDatas.responseText);
			}
			else
			{
				alert("未定义错误");
			}
		}
		else if(JsonString_Result_KVSetRealtimeFieldDatas == "failed")
		{
			retJsonSting = false;
		}
		else
		{
			var ret = JsonString_Result_KVSetRealtimeFieldDatas.split(":");
			if( ret[0] == "failed")
			{
				alert(ret[1]);
				if(ret[1] == "用户没有登录或者在其他地方登录，请重新登录！")
				{
					window.sessionStorage.userhandle = 0;
					window.sessionStorage.publickey = "";
					window.location = "../login.html";
				}
				retJsonSting = false;
			}
			else
			{
				retJsonSting = true;		   
			}
		}

		
	});
	return retJsonSting;
	
}
//获取报警组信息
function GetAlarmGroupFromKVAction()
{
	var DataSourceName = "KV3";
	var CommandType = "emnualarmgroup";
	var StationName = "local";
	var RetAlarmGroup = "";				
	var iclient = new KM.ClientInterface;
	iclient.KmGetAlarmGroup(g_userhandle,DataSourceName,CommandType,StationName,function(JsonString_Result_KVAlarmGroup)
	{
	   if(typeof JsonString_Result_KVAlarmGroup == "object")
		{
			if(typeof JsonString_Result_KVAlarmGroup.responseText != "undefined")
			{
				alert(JsonString_Result_KVAlarmGroup.responseText);
			}
			else
			{
				alert("未定义错误");
			}
		}
		else
		{
			var ret = JsonString_Result_KVAlarmGroup.split(":");
			if( ret[0] == "failed")
			{
				alert(ret[1]);
				if(ret[1] == "用户没有登录或者在其他地方登录，请重新登录！")
				{
					window.sessionStorage.userhandle = 0;
					window.sessionStorage.publickey = "";
					window.location = "../login.html";
				}
			}
			else
			{
			   RetAlarmGroup = JsonString_Result_KVAlarmGroup;
			}
			
		}
	
	
	});
return RetAlarmGroup;
}