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
			  stringa += "<th>" + obj.Body.tagInfo[i];
		  }			  
	   }
	   //stringa = stringa + "<th>" + obj.Body.tagInfo[0]+ "<th>" +obj.Body.tagInfo[1]+ "<th>"+ obj.Body.tagInfo[2]+"<th>"+obj.Body.tagInfo[3];

        for (j = 0; j < cols_num; j++)// 
        {
            if(tabelColumnArray[j+i])
			{
				stringa += "<th>" + obj.Body.dataPro[j];
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
					if( parseInt(obj.Body.records[i][5][j])> 50 && obj.Body.records[i][5][j].length <15)
					{stringb = stringb + "<td class='css3'>" + obj.Body.records[i][5][j];}
				else
				    {stringb = stringb + "<td>" + obj.Body.records[i][5][j];}
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

// <summary> 
//		解析KV71返回的历史数据（用于表格显示）
// </summary> 
function KV71HistoryCreateReportString(JSONformat_HistoryDatas,iStatisticType)
{
	// var iShowTagName = 1;     //  显示变量名称
	// var iShowTimeStamp = 2;   //  显示时间
	var iStatisticSum = 4;    //  统计总和值
	var iStatisticAve = 8;    //  统计平均值
	var iStatisticMax = 16;   //  统计最大值
	var iStatisticMin = 32;   //  统计最小值

    var stringa = null;
    var obj = JSON.parse(JSONformat_HistoryDatas);
    if (obj != null)//
    {
        var i, j,k;
		//cols_num正常应该等于obj.Body.records.length
		var cols_num = obj.Body.tagNum;
		var rows_num = 0;
		for (var i = 0; i < obj.Body.records.length; ++i) 
		{
			rows_num = obj.Body.records[i][3].length;
			break;
		}		
		
        //设置各列-------------------------------
       stringa = " <tr class='css0'>";
       if (iStatisticType & iShowTagName) 
		{
			if (iStatisticType & iShowTimeStamp) 
			{
				stringa = stringa + "<th>" + "DataTime";
			}
			for (j = 0; j < cols_num; j++)
	        {
	            stringa = stringa + "<th>" + obj.Body.records[j][0];
	        }
		}
		else
		{
			if (iStatisticType & iShowTimeStamp) 
			{
				stringa = stringa + "<th>" + "DataTime";
				for (j = 0; j < cols_num; j++)
		        {
		            stringa = stringa + "<th>" + " ";
		        }
			}
		}
        
        stringa = stringa + "</tr>";
        //设置各行-------------------------------
        //	限制报表最大行数为64
        if (rows_num >= 64) {
        	rows_num = 64;
        }
        for (i = 0; i < rows_num; i++) //
        {
			var stringb = "";
			if (i% 2 == 0) { stringb = "<tr class='css1'>"; }
			else { stringb = "<tr class='css2'>"; }
			//	质量戳信息
			if (iStatisticType & iShowTimeStamp) 
			{
				stringb = stringb + "<td>" + obj.Body.records[0][3][i][2];
			}
			for (j = 0; j < cols_num; j++)//
			{
//					stringb = stringb + "<td>" + obj.Body.records[i][3][k][j];
//				if( parseInt(obj.Body.records[i][3][k][j])> 50 && obj.Body.records[i][3][k][j].length <15)
//					stringb = stringb + "<td class='css3'>" + obj.Body.records[i][3][k][j];
//				else
//					stringb = stringb + "<td>" + obj.Body.records[i][3][k][j];
				//	值信息
				stringb = stringb + "<td>" + obj.Body.records[j][3][i][0];
			}
			stringb = stringb + "</tr>";

			stringa = stringa + stringb;
		}
		++rows_num;
		if (iStatisticType & iStatisticSum){ 	//	求和信息
			if (rows_num % 2) {stringb = "<tr class='css1'>";}
			else { stringb = "<tr class='css2'>"; }
			if (iStatisticType&iShowTimeStamp) 
			{
				stringb = stringb + "<td>" + "总和";
			}
			for (j = 0; j < cols_num; j++)//
			{
				stringb = stringb + "<td>" + obj.Body.records[j][4];
			}
			stringb = stringb + "</tr>";
			stringa = stringa + stringb;
		}
		rows_num++;
		if (iStatisticType & iStatisticAve){ 	//	求平均信息
			if (rows_num % 2) {stringb = "<tr class='css1'>";}
			else { stringb = "<tr class='css2'>"; }
			if (iStatisticType&iShowTimeStamp) 
			{
				stringb = stringb + "<td>" + "平均值";
			}
			for (j = 0; j < cols_num; j++)//
			{
				stringb = stringb + "<td>" + obj.Body.records[j][5];
			}
			stringb = stringb + "</tr>";
			stringa = stringa + stringb;
		}
		rows_num++;
		if (iStatisticType & iStatisticMax){ 	//	求最大信息
			if (rows_num % 2) {stringb = "<tr class='css1'>";}
			else { stringb = "<tr class='css2'>"; }
			if (iStatisticType&iShowTimeStamp) 
			{
				stringb = stringb + "<td>" + "最大值";
			}
			for (j = 0; j < cols_num; j++)//
			{
				stringb = stringb + "<td>" + obj.Body.records[j][6];
			}
			stringb = stringb + "</tr>";
			stringa = stringa + stringb;
		}
		rows_num++;
		if (iStatisticType & iStatisticMin){ 	//	求最小信息
			if (rows_num % 2) {stringb = "<tr class='css1'>";}
			else { stringb = "<tr class='css2'>"; }
			if (iStatisticType&iShowTimeStamp) 
			{
				stringb = stringb + "<td>" + "最小值";
			}
			for (j = 0; j < cols_num; j++)//
			{
				stringb = stringb + "<td>" + obj.Body.records[j][7];
			}
			stringb = stringb + "</tr>";
			stringa = stringa + stringb;
		}
    }
    return stringa;
}

function KV71HistoryCreateEChartsDatasString(JSONformat_HistoryDatas)//
{
    var stringa = "";
	var stringb = "";
	var stringc = "";
    var obj = JSON.parse(JSONformat_HistoryDatas);
    if (obj != null)//
    {
        var i, j,k;
		var rows_num = parseInt(obj.Body.tagNum);
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


function InitHistoryTagNames()
{
	var DataSourceName = "KV2";
	var CommandType = "enumtagname";  //这里querytype分为4种类型historydata、realdata、select、noselect
	var tagType = "historytagname";
	
	var iclient = new KM.ClientInterface;
	iclient.KmGetAllTagNameFromDataSource( g_userhandle,DataSourceName,CommandType,tagType,function(Json_tag_nemes)
	{				
		//g_KV71HistTagNames = Json_tag_nemes;
		var ret = Json_tag_nemes.spline(",");
		for (i = 0; i < ret.length; ++i)
		{
			var tagName = ret[i];
			var idx = i + 1;
			$("tagsel").append("<option value='"+idx+"' selected=true>"+tagName+"</option>");
		}
	});
}