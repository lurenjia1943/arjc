function send_sql(sqlString) //�������ݿ⡣������ݼ�
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
				alert("δ�������");
			}
		}
		else
		{	
			var ret = JsonString_Result_PGDatas.split(":");
			if( ret[0] == "failed")
			{
				
				alert(ret[1]);
				if(ret[1] == "�û�û�е�¼�����������ط���¼�������µ�¼��")
				{
					//��ת
				}
			}
			else
			{
				obj_Name=JsonString_Result_PGDatas;
			}		
		}
	});
	if(obj_Name=='success:SQL���ִ�гɹ�')return true;
	if(obj_Name==''){return null;};
	return obj_Name;
 }
 function getuser(JSONformat_PGDatas)
 {
	var obj = JSON.parse(JSONformat_PGDatas);
	var user = [];
	var field_count = obj.Body.field.length;
    if (obj != null && obj.Body.recordNum > 0)//
    {	
		for(var i=0;i<field_count;i++)
		{
		  user[i] = obj.Body.records[0][i]; 	
		}
	}
	return user;
	
}