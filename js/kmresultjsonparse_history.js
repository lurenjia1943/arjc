
function CreateReportHtmlInnerString(KV71HistoryDatas, iStatisticType)
        {
            // var iShowTagName = 1;     //  显示变量名称
            // var iShowTimeStamp = 2;   //  显示时间
            var iStatisticSum = 4;    //  统计总和值
            var iStatisticAve = 8;    //  统计平均值
            var iStatisticMax = 16;   //  统计最大值
            var iStatisticMin = 32;   //  统计最小值

            var reportString = "";
            var obj = JSON.parse(KV71HistoryDatas);
            if (obj != null)//
            {
                //cols_num正常应该等于obj.Body.records.length
                var cols_num = obj.Body.tagNum;
                var rows_num = 0;
                for (var i = 0; i < obj.Body.records.length; ++i) 
                {
                    rows_num = obj.Body.records[i][3].length;
                    break;
                }       

                //  限制报表最大行数为60
                if (rows_num >= 60) 
                {
                    rows_num = 60;
                }

                for (iCol = 0; iCol < cols_num; ++iCol) 
                {
                    var tagReportString="";
                    // tagReportString = tagReportString + "<label style='float:left;width:100%;text-align:left;background-color:#9BCD9B;'>" + obj.Body.records[iCol][0] + "</label><br/>";
                    //tagReportString = tagReportString + "<tr>";
                    tagReportString = tagReportString + "<tr class='css1'>";
                    tagReportString = tagReportString + "<td>" + obj.Body.records[iCol][0] + 
                    "</td>";
                    tagReportString = tagReportString + "<td>" + " " + "</td>";
                    tagReportString = tagReportString + "</tr>";
                    for (iRow = 0; iRow < rows_num; ++iRow) 
                    {
                        tagReportString = tagReportString + "<tr>";
                        tagReportString = tagReportString + "<td>" + obj.Body.records[0][3][iRow][2] + "</td>"; 
                        tagReportString = tagReportString + "<td>" + obj.Body.records[iCol][3][iRow][0] + "</td>";
                        tagReportString = tagReportString + "</tr>";
                    } 

                    if (iStatisticType & iStatisticSum){    //  求和信息
                        tagReportString = tagReportString + "<tr class='css2'><td>";
                        tagReportString = tagReportString + "总和" + "</td>";
                        tagReportString = tagReportString + "<td>" + obj.Body.records[iCol][4] + "</td>";
                    }

                    if (iStatisticType & iStatisticAve){    //  求平均信息
                        tagReportString = tagReportString + "<tr class='css2'><td>";
                        tagReportString = tagReportString + "平均值" + "</td>";
                        tagReportString = tagReportString + "<td>" + obj.Body.records[iCol][5] + "</td>";
                    }

                    if (iStatisticType & iStatisticMax){    //  求最大信息
                        tagReportString = tagReportString + "<tr class='css2'><td>";
                        tagReportString = tagReportString + "最大值" + "</td>";
                        tagReportString = tagReportString + "<td>" + obj.Body.records[iCol][6] + "</td>";
                    }

                    if (iStatisticType & iStatisticMin){    //  求最小信息
                        tagReportString = tagReportString + "<tr class='css2'><td>";
                        tagReportString = tagReportString + "最小值" + "</td>";
                        tagReportString = tagReportString + "<td>" + obj.Body.records[iCol][7] + "</td>";
                    }

                    reportString = reportString + tagReportString + "<br/>";
                }
            }
            return reportString;
        }

function GetDateDiff(startTime, endTime, diffType) {
    //将xxxx-xx-xx的时间格式，转换为 xxxx/xx/xx的格式 
    startTime = startTime.replace(/\-/g, "/");
    endTime = endTime.replace(/\-/g, "/");

    //将计算间隔类性字符转换为小写
    diffType = diffType.toLowerCase();
    var sTime = new Date(startTime);      // 开始时间
    var eTime = new Date(endTime);  	  // 结束时间
    //作为除数的数字
    var divNum = 1;
    switch (diffType) {
        case "second":
            divNum = 1000;
            break;
        case "minute":
            divNum = 1000 * 60;
            break;
        case "hour":
            divNum = 1000 * 3600;
            break;
        case "day":
            divNum = 1000 * 3600 * 24;
            break;
        default:
            break;
    }
    return parseInt((eTime.getTime() - sTime.getTime()) / parseInt(divNum));
}

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}