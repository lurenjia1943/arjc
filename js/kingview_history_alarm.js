
 function send_sql(sqlString) //连接数据库。获得数据集
 {
	var datasourcename = "PG1";
	var obj_Name="";

	var JsonString_Condition_SQL = KmCreateJsonString_Condition_SQL(sqlString);
	var iclient = new KM.ClientInterface;
	iclient.KmGetSQLDatas(g_userhandle,datasourcename,JsonString_Condition_SQL,function(JsonString_Result_PGDatas)
	{
		if(typeof JsonString_Result_PGDatas == "object")
		{
			if(typeof JsonString_Result_PGDatas.responseText != "undefined")
			{
				
				alert(JsonString_Result_PGDatas.responseText);
			}
			else
			{
				alert("未定义错误");
			}
		}
		else
		{	
			var ret = JsonString_Result_PGDatas.split(":");
			if( ret[0] == "failed")
			{
				
				alert(ret[1]);
				if(ret[1] == "用户没有登录或者在其他地方登录，请重新登录！")
				{
					//跳转
				}
			}
			else
			{
				obj_Name=JsonString_Result_PGDatas;
			}		
		}
	});
	if(obj_Name=='success:SQL语句执行成功')return true;
	if(obj_Name==''){return null;};
	return obj_Name;
 }
 
function getlist(JSONformat_PGDatas)
 {
	var tdata_str = ''; 
	var obj = JSON.parse(JSONformat_PGDatas);
    if (obj != null)//
    {	
		var i, j;
		var rows_num = parseInt(obj.Body.records.length);
        var field_count = obj.Body.field.length;// 变量的个数。
		var fieldname= ["a","b","c","d","e"];
		var bt = ["变量名","变量描述","报警类型","报警时间","事件类型","事件时间","限值","报警值","报警组","优先级","操作员"];
		//准备数据	
		tdata_str = '{"total":'+rows_num+',"rows":[';
		for(i=0;i<field_count;i++)
		{
			tdata_str = tdata_str +"{";	
			tdata_str = tdata_str + '"' + fieldname[0] + '":"' +bt[i] + '","' + fieldname[1] + '":"' + obj.Body.records[0][i]+'"';
			tdata_str = tdata_str +"}";
			if(i!=field_count-1)
			{
				tdata_str=tdata_str+",";
			}
		}
		tdata_str = tdata_str + "]}";			
		
		var tdata_obj = JSON.parse(tdata_str);
		
		$('#tablelist').datagrid({
			data:tdata_obj,
			fitColumns: true,
			singleSelect: true,
			columns:
				 [[
					{field:'a',title:'', width:100, align:'center'},
					{field:'b',title:'', width:100, align:'center'},
				]],
			remoteSort:false,	
		});
} 
 }
 function gettable(JSONformat_PGDatas)
 {
	var tdata_str = ''; 
	
	var obj = JSON.parse(JSONformat_PGDatas);
    if (obj != null)//
    {	
		var dianjihang;
		var i, j;
		var blname = [];
		var rows_num = parseInt(obj.Body.records.length);
        var field_count = obj.Body.field.length;// 变量的个数。
		var fieldname= ["a","b","c","d","e"];
		
		//准备数据	
		tdata_str = '{"total":'+rows_num+',"rows":[';
		for(var i=0;i<rows_num;i++)
		{
			tdata_str = tdata_str +"{";
			
			for(j=0;j<field_count;j++)
			{
				var filedname = fieldname[j];
				
				if(j==4)
				{
					tdata_str = tdata_str + '"' + filedname + '":"' +  '>' +'"';
				}
				else 
				{
					tdata_str = tdata_str + '"' + filedname + '":"' +obj.Body.records[i][j] +'"';
				}
				if(j!=field_count-1)
					{
						tdata_str=tdata_str+",";
					}	
			}
			tdata_str = tdata_str +"}";
			if(i!=rows_num-1)
				tdata_str = tdata_str + ',';
				
		}
		
		for(var i=0;i<rows_num;i++)
		{
			blname[i] = obj.Body.records[i][0]; //得到变量名数组，准备传递到下一个页面用
		}
		tdata_str = tdata_str + "]}";			
		
		var tdata_obj = JSON.parse(tdata_str);
		
		$('#tabledata').datagrid({
			data:tdata_obj,
			fitColumns: true,
			singleSelect: true,
			 rowStyler:
			function(index,row)
			{
				if (row.b=="报警")
				{
					return 'color:red;font-weight:bold;';
				}
				else if(row.b=="恢复") 	
				{
					return 'color:green;font-weight:bold;';
				}
				else  if(row.b=="确认") 	
				{
					return 'color:blue;font-weight:bold;';
				}
			}, 
			columns:
				 [[
					{field:'a',title:'变量名称', width:100, align:'center'},
					{field:'b',title:'事件类型', width:100, align:'center'},
					{field:'c',title:'事件时间', width:100, align:'center'},
					{field:'d',title:'报警类型', width:100, align:'center'},
					{field:'e',title:'详细', width:100, align:'center'},
					]],
						
			onClickCell:function(index,field,value){
				if(field=="e")
				{	dianjihang = index;
					//var parame = {blnames:blname,index:dianjihang};
					window.sessionStorage.paramebl = blname;
					window.sessionStorage.parameindex = index;
					EnterHisotryAlarmDetailPage();
				}
			},

			
			remoteSort:false,	
		});
	}
	
	//return parame;
	
}
 
function baotou()
{ 
		$('#tabledata').datagrid({
					fitColumns: true,
					singleSelect: true,
					columns:
						 [[
							{field:'a',title:'变量名称', width:100, align:'center'},
							{field:'b',title:'事件类型', width:100, align:'center'},
							{field:'c',title:'事件时间', width:100, align:'center'},
							{field:'d',title:'报警类型', width:100, align:'center',},
							{field:'e',title:'详细', width:100, align:'center'},
							]],
					
					remoteSort:false,	
				});
}		