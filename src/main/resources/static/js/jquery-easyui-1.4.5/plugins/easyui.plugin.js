$.extend($.fn.datagrid.methods, {
	statistics: function (jq) {
		var opt=$(jq).datagrid('options').columns;
		var rows = $(jq).datagrid("getRows");
		var footer = [];
		footer['sum'] = "";
		footer['avg'] = "";
		footer['max'] = "";
		footer['min'] = "";
		for(var j=0; j<opt.length; j++){
			for(var i=0; i<opt[j].length; i++){
				if(opt[j][i].sum){
					footer['sum'] = footer['sum'] + sum(opt[j][i].field)+ ',';
				}
				if(opt[j][i].avg){
					footer['avg'] = footer['avg'] + avg(opt[j][i].field)+ ',';
				}
				if(opt[j][i].max){
					footer['max'] = footer['max'] + max(opt[j][i].field)+ ',';
				}
				if(opt[j][i].min){
					footer['min'] = footer['min'] + min(opt[j][i].field)+ ',';
				}
			}
		}

		var footerObj = [];
		
		if(footer['sum'] != ""){
			var tmp = '{' + footer['sum'].substring(0,footer['sum'].length - 1) + "}";
			var obj = eval('(' + tmp + ')');
			if(opt.length==1){
				if(opt[0][0].field!='CK'){
					if(obj[opt[0][0].field] == undefined){
						footer['sum'] += '"' + opt[0][0].field + '":"<b>当页合计:</b>"';
						obj = eval('({' + footer['sum'] + '})');
					}else{
						obj[opt[0][0].field] = "<b>当页合计:</b>" + obj[opt[0][0].field];
					}
				}else{
					if(obj[opt[0][1].field] == undefined){
						footer['sum'] += '"' + opt[0][1].field + '":"<b>当页合计:</b>"';
						obj = eval('({' + footer['sum'] + '})');
					}else{
						obj[opt[0][1].field] = "<b>当页合计:</b>" + obj[opt[0][1].field];
					}
				}
			}else{
				footer['sum'] += '"' + 'provincename' + '":"<b>当页合计:</b>"';
				obj = eval('({' + footer['sum'] + '})');
			}

			footerObj.push(obj);
		}

		if(footer['avg'] != ""){
			var tmp = '{' + footer['avg'].substring(0,footer['avg'].length - 1) + "}";
			var obj = eval('(' + tmp + ')');
			if(opt.length==1){
				if(opt[0][0].field!='CK'){
					if(obj[opt[0][0].field] == undefined){
						footer['avg'] += '"' + opt[0][0].field + '":"<b>当页均值:</b>"';
						obj = eval('({' + footer['avg'] + '})');
					}else{
						obj[opt[0][0].field] = "<b>当页均值:</b>" + obj[opt[0][0].field];
					}
				}else{
					if(obj[opt[0][1].field] == undefined){
						footer['avg'] += '"' + opt[0][1].field + '":"<b>当页均值:</b>"';
						obj = eval('({' + footer['avg'] + '})');
					}else{
						obj[opt[0][1].field] = "<b>当页均值:</b>" + obj[opt[0][1].field];
					}
				}
			}else{
				footer['avg'] += '"' + 'provincename' + '":"<b>当页均值:</b>"';
				obj = eval('({' + footer['avg'] + '})');
			}

			footerObj.push(obj);
		}
		
		if(footer['max'] != ""){
			var tmp = '{' + footer['max'].substring(0,footer['max'].length - 1) + "}";
			var obj = eval('(' + tmp + ')');
			if(opt.length==1){
				if(opt[0][0].field!='CK'){
					if(obj[opt[0][0].field] == undefined){
						footer['max'] += '"' + opt[0][0].field + '":"<b>当页最大值:</b>"';
						obj = eval('({' + footer['max'] + '})');
					}else{
						obj[opt[0][0].field] = "<b>当页最大值:</b>" + obj[opt[0][0].field];
					}
				}else{
					if(obj[opt[0][1].field] == undefined){
						footer['max'] += '"' + opt[0][1].field + '":"<b>当页最大值:</b>"';
						obj = eval('({' + footer['max'] + '})');
					}else{
						obj[opt[0][1].field] = "<b>当页最大值:</b>" + obj[opt[0][1].field];
					}
				}
			}else{
				footer['max'] += '"' + 'provincename' + '":"<b>当页最大值:</b>"';
				obj = eval('({' + footer['max'] + '})');
			}

			footerObj.push(obj);
		}
		
		if(footer['min'] != ""){
			var tmp = '{' + footer['min'].substring(0,footer['min'].length - 1) + "}";
			var obj = eval('(' + tmp + ')');
			if(opt.length==1){
				if(opt[0][0].field!='CK'){
					if(obj[opt[0][0].field] == undefined){
						footer['min'] += '"' + opt[0][0].field + '":"<b>当页最小值:</b>"';
						obj = eval('({' + footer['min'] + '})');
					}else{
						obj[opt[0][0].field] = "<b>当页最小值:</b>" + obj[opt[0][0].field];
					}
				}else{
					if(obj[opt[0][1].field] == undefined){
						footer['min'] += '"' + opt[0][1].field + '":"<b>当页最小值:</b>"';
						obj = eval('({' + footer['min'] + '})');
					}else{
						obj[opt[0][1].field] = "<b>当页最小值:</b>" + obj[opt[0][1].field];
					}
				}
			}else{
				footer['min'] += '"' + 'provincename' + '":"<b>当页最小值:</b>"';
				obj = eval('({' + footer['min'] + '})');
			}

			footerObj.push(obj);
		}
		
		
		
		if(footerObj.length > 0){
			$(jq).datagrid('reloadFooter',footerObj); 
		}
		
		
		function sum(filed){
			var sumNum = 0;
			for(var i=0;i<rows.length;i++){
				if (!rows[i][filed]||rows[i][filed]=="") {
					rows[i][filed]=0
				}
				sumNum += Number(rows[i][filed]);
			}
			return '"' + filed + '":"' + sumNum.toFixed(2) +'"';
		}
		function avg(filed){
			var sumNum = 0;
			for(var i=0;i<rows.length;i++){
				if (!rows[i][filed]||rows[i][filed]=="") {
					rows[i][filed]=0
				}
				sumNum += Number(rows[i][filed]);
			}
			if(rows.length>0){				
				return '"' + filed + '":"'+ (sumNum/rows.length).toFixed(2) +'"';
			}else{
				return '"' + filed + '":"'+ 0 +'"';
			}
		}

		function max(filed){
			var max = 0;
			for(var i=0;i<rows.length;i++){
				if (!rows[i][filed]||rows[i][filed]=="") {
					rows[i][filed]=0
				}
				if(i==0){
					max = Number(rows[i][filed]);
				}else{
					max = Math.max(max,Number(rows[i][filed]));
				}
			}
			return '"' + filed + '":"'+ max +'"';
		}
		
		function min(filed){
			var min = 0;
			for(var i=0;i<rows.length;i++){
				if (!rows[i][filed]||rows[i][filed]=="") {
					rows[i][filed]=0
				}
				if(i==0){
					min = Number(rows[i][filed]);
				}else{
					min = Math.min(min,Number(rows[i][filed]));
				}
			}
			return '"' + filed + '":"'+ min +'"';
		}
	}
});
/**
 * 自动合并单元格
 */
$.extend($.fn.datagrid.methods, {
    autoMergeCells : function (jq, fields) {
        return jq.each(function () {
            var target = $(this);
            if (!fields) {
                fields = target.datagrid("getColumnFields");
            }
            var rows = target.datagrid("getRows");
            var i = 0,
            j = 0,
            temp = {};
            for (i; i < rows.length; i++) {
                var row = rows[i];
                j = 0;
                for (j; j < fields.length; j++) {
                    var field = fields[j];
                    var tf = temp[field];
                    if (!tf) {
                        tf = temp[field] = {};
                        tf[row[field]] = [i];
                    } else {
                        var tfv = tf[row[field]];
                        if (tfv) {
                            tfv.push(i);
                        } else {
                            tfv = tf[row[field]] = [i];
                        }
                    }
                }
            }
            $.each(temp, function (field, colunm) {
                $.each(colunm, function () {
                    var group = this;
                    
                    if (group.length > 1) {
                        var before,
                        after,
                        megerIndex = group[0];
                        for (var i = 0; i < group.length; i++) {
                            before = group[i];
                            after = group[i + 1];
                            if (after && (after - before) == 1) {
                                continue;
                            }
                            var rowspan = before - megerIndex + 1;
                            if (rowspan > 1) {
                                target.datagrid('mergeCells', {
                                    index : megerIndex,
                                    field : field,
                                    rowspan : rowspan
                                });
                            }
                            if (after && (after - before) != 1) {
                                megerIndex = after;
                            }
                        }
                    }
                });
            });
        });
    }
});
/**
 * 为datagrid动态增删toolbar
 */
$.extend($.fn.datagrid.methods, {
	addToolbarItem : function (jq, items) {
		return jq.each(function () {
			var dpanel = $(this).datagrid('getPanel');
			var toolbar = dpanel.children("div.datagrid-toolbar");
			if (!toolbar.length) {
				toolbar = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(dpanel);
				$(this).datagrid('resize');
			}
			var tr = toolbar.find("tr");
			for (var i = 0; i < items.length; i++) {
				var btn = items[i];
				if (btn == "-") {
					$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
				} else {
					var td = $("<td></td>").appendTo(tr);
					var b = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
					b[0].onclick = eval(btn.handler || function () {});
					b.linkbutton($.extend({}, btn, {
							plain : true
						}));
				}
			}
		});
	},
	addToolbarItemToOtherLine : function (jq, items) {
		debugger;
		return jq.each(function () {
			var dpanel = $(this).datagrid('getPanel');
			var toolbar = dpanel.children("div.datagrid-toolbar");
			if (!toolbar.length) {
				toolbar = $("<div class=\"datagrid-toolbar\"><table cellspacing=\"0\" cellpadding=\"0\"><tr></tr></table></div>").prependTo(dpanel);
				$(this).datagrid('resize');
			}

			$("<tr>").appendTo(toolbar);
			var tr = toolbar.children("tr:last-child");

			for (var i = 0; i < items.length; i++) {
				var btn = items[i];
				if (btn == "-") {
					$("<td><div class=\"datagrid-btn-separator\"></div></td>").appendTo(tr);
				} else {
					var td = $("<td></td>").appendTo(tr);
					var b = $("<a href=\"javascript:void(0)\"></a>").appendTo(td);
					b[0].onclick = eval(btn.handler || function () {});
					b.linkbutton($.extend({}, btn, {
						plain : true
					}));
				}
			}
			$("</tr>").appendTo(toolbar);

		});
	},
	removeToolbarItem : function (jq, param) {
		return jq.each(function () {
			var dpanel = $(this).datagrid('getPanel');
			var toolbar = dpanel.children("div.datagrid-toolbar");
			var cbtn = null;
			if (typeof param == "number") {
				cbtn = toolbar.find("td").eq(param).find('span.l-btn-text');
			} else if (typeof param == "string") {
				cbtn = toolbar.find("span.l-btn-text:contains('" + param + "')");
			}
			if (cbtn && cbtn.length > 0) {
				cbtn.closest('td').remove();
				cbtn = null;
			}
		});
	},
	removeToolbarItemAll : function (jq) {
		return jq.each(function () {
			var dpanel = $(this).datagrid('getPanel');
			var toolbar = dpanel.children("div.datagrid-toolbar");
			toolbar.remove();
		});
	}
});
/**
 * EasyUI DataGrid根据字段动态合并单元格
 * 参数 tableID 要合并table的id
 * 参数 colList 要合并的列,用逗号分隔(例如："name,department,office");
 */
 function mergeCellsByField(tableID, colList) {
     var ColArray = colList.split(",");
     var tTable = $("#" + tableID);
     var TableRowCnts = tTable.datagrid("getRows").length;
     var tmpA;
     var tmpB;
     var PerTxt = "";
     var CurTxt = "";
     var alertStr = "";
     for (j = ColArray.length - 1; j >= 0; j--) {
         PerTxt = "";
         tmpA = 1;
         tmpB = 0;
 
        for (i = 0; i <= TableRowCnts; i++) {
             if (i == TableRowCnts) {
                 CurTxt = "";
             }
             else {
                 CurTxt = tTable.datagrid("getRows")[i][ColArray[j]];
             }
             if (PerTxt == CurTxt) {
                 tmpA += 1;
             }
             else {
                 tmpB += tmpA;
                 
                 tTable.datagrid("mergeCells", {
                     index: i - tmpA,
                     field: ColArray[j], //合并字段
                     rowspan: tmpA,
                     colspan: null
                 });
                 tTable.datagrid("mergeCells", { //根据ColArray[j]进行合并
                     index: i - tmpA,
                     field: "Ideparture",
                     rowspan: tmpA,
                     colspan: null
                 });
                
                 tmpA = 1;
             }
             PerTxt = CurTxt;
         }
     }
 }
//扩展
 $.extend($.fn.datagrid.methods, {   
/** 
* 开打提示功能  
* @param {} jq  
* @param {} params 提示消息框的样式  
* @return {}  
 */  
doCellTip : function(jq, params) {   
    function showTip(data, td, e) {   
        if ($(td).text() == "")   
            return;   
        data.tooltip.text($(td).text()).css({   
                    top : (e.pageY + 10) + 'px',   
                    left : (e.pageX + 20) + 'px',   
                    'z-index' : $.fn.window.defaults.zIndex,   
                    display : 'block'   
                });

}
	return jq.each(function() {
        var grid = $(this);   
        var options = $(this).data('datagrid');   
        if (!options.tooltip) {   
            var panel = grid.datagrid('getPanel').panel('panel');   
            var defaultCls = {   
                'border' : '1px solid #333',   
                'padding' : '1px',   
                'color' : '#333',   
                'background' : '#f7f5d1',   
                'position' : 'absolute',   
                'max-width' : '200px',   
                'border-radius' : '4px',   
                '-moz-border-radius' : '4px',   
                '-webkit-border-radius' : '4px',   
                'display' : 'none'   
            };
            var tooltip = $("<div></div>").appendTo('body');   
            tooltip.css($.extend({}, defaultCls, params.cls));   
            options.tooltip = tooltip;   
            panel.find('.datagrid-body').each(function() {   
                var delegateEle = $(this).find('> div.datagrid-body-inner').length   
                        ? $(this).find('> div.datagrid-body-inner')[0]   
                        : this;   
                $(delegateEle).undelegate('td', 'mouseover').undelegate(   
                        'td', 'mouseout').undelegate('td', 'mousemove')   
                        .delegate('td', {   
                            'mouseover' : function(e) {   
                                if (params.delay) {   
                                    if (options.tipDelayTime)   
                                        clearTimeout(options.tipDelayTime);   
                                    var that = this;   
                                    options.tipDelayTime = setTimeout(   
                                            function() {   
                                                showTip(options, that, e);   
                                            }, params.delay);   
                                } else {   
                                    showTip(options, this, e);   
                                }   

                            },   
                            'mouseout' : function(e) {   
                                if (options.tipDelayTime)   
                                    clearTimeout(options.tipDelayTime);   
                                options.tooltip.css({   
                                            'display' : 'none'   
                                        });   
                            },   
                            'mousemove' : function(e) {   
                                var that = this;   
                                if (options.tipDelayTime) {   
                                    clearTimeout(options.tipDelayTime);   
                                    options.tipDelayTime = setTimeout(   
                                            function() {   
                                                showTip(options, that, e);   
                                            }, params.delay);   
                                } else {   
                                    showTip(options, that, e);   
                                }   
                            }   
                        });   
            });   

        }   

    });   
},   
/** 
 * 关闭消息提示功能  
 * @param {} jq  
 * @return {}  
 */  
cancelCellTip : function(jq) {   
    return jq.each(function() {   
                var data = $(this).data('datagrid');   
                if (data.tooltip) {   
                    data.tooltip.remove();   
                    data.tooltip = null;   
                     var panel = $(this).datagrid('getPanel').panel('panel');   
                     panel.find('.datagrid-body').undelegate('td',   
                             'mouseover').undelegate('td', 'mouseout')   
                             .undelegate('td', 'mousemove')   
                 }   
                 if (data.tipDelayTime) {   
                     clearTimeout(data.tipDelayTime);   
                     data.tipDelayTime = null;   
                 }   
             });   
 }   
});
/**限制textbox输入特殊字符*/
$.extend($.fn.textbox.defaults, {
	inputEvents : {
		keyup : function(e, param) {
			var opts = $(e.data.target).textbox("getText");
			opts = opts.replace(/[{}\[\],:,",<,>]+/, "");
			$(e.data.target).textbox("setValue", opts);
		}
	}
});
 /**
  * 货位状态格式化 0：空仓状态 1：作业状态 2：保管状态
  * @param val
  * @param row
  * @returns {String}
  */
function formatStatus(val,row){
		if (val==0){
			return '空仓状态';
		} else if (val==1){
			return '作业状态';
		} else if (val==2){
			return '保管状态';
		} 
}

/**
 * 应急调度优先级
 * @param val
 * @param row
 * @returns {String}
 */
function formatYjddyxjb(val,row){
	if (val==1){
		return '最优先级';
	} else if (val==2){
		return '优先级';
	} else {
		return '';
	} 
}

function formatSpflag(val,row){
	if (val==0){
		return '未审核';
	} else if (val==1){
		return '已审核';
	} else if (val==2){
		return '审核不通过';
	} 
}

function formatInoutflag(val,row){
	if (val==1){
		return '入库';
	} else if (val==-1){
		return '出库';
	} else {
		return '';
	}
}

function formatIsupdown(val,row){
	if (val==0){
		return '否';
	} else if (val==1){
		return '是';
	}
}

function formatNoticestatus(val,row){
	if (val==0){
		return '待发布';
	} else if (val==1){
		return '已发布';
	}else if (val==2){
		return '撤回';
	} 
}

function formatRootflag(val,row){
	if (val==0){
		return '原生';
	} else if (val==-1){
		return '未知来源';
	} else if (val>0){
		return val;
	} 
}
/**
 * 计划类型格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatPlantype(val,row){
	if (val==1){
		return '轮换计划';
	} else if (val==2){
		return '轮出计划';
	} else if (val==3){
		return '轮入计划';
	} 
}

/**
 * 种植品种格式化
 * @param val
 * @param row
 */
function formatPGrain(val,row){
	if (val==1){
		return '红小麦';
	} else if (val==4){
		return '本地粳稻';
	} else if (val==8){
		return '普通籼稻';
	} else if (val==10){
		return '大豆';
	} else if (val==11){
		return '玉米';
	} 
}

function formatvalue(val,rowData,rowIndex){
    if(val!=null)
        return val.toFixed(2);
}

function formatGrainType(val,row){
	if(val==1){
		return "原粮";
	}
	if(val==2){
		return "成品粮";
	}
}
/**
 * 粮食等级格式化（1：一等/级 2：二等/级 3：三等/级 4：四等/级 5：五等/级 6：等外，原粮：等，成品粮：级）
 * @param val
 * @param row
 * @returns {String}
 */
function formatGrade(val,row){
	if (val==0){
		return '未定等';
	}else if (val==1){
		return '一等';
	} else if (val==2){
		return '二等';
	} else if (val==3){
		return '三等';
	} else if (val==4){
		return '四等';
	} else if (val==5){
		return '五等';
	} else if (val==6){
		return '等外';
	} 
}

/**
 * 应急任务格式化
 */
function formatYJRW(val,row){
	if (val==1){
		return '原粮保障';
	} else if (val==2){
		return '成品粮保障';
	} else if (val==3){
		return '应急加工';
	} else if (val==4){
		return '应急配送中心';
	} else if (val==5){
		return '应急保供网点';
	} else if (val==6){
		return '运输';
	} 
}
/***级别格式化***/
function formatLevel(val,row){
	if (val==1){
		return '国家级';
	} else if (val==2){
		return '省级';
	} else if (val==3){
		return '市级';
	} else if (val==4){
		return '县级';
	} else if (val==5){
		return '企业级';
	} else if (val==6){
		return '库点级';
	} else if (val==7){
		return '个人级';
	}
}
/***级别格式化***/
function formatJyywlxbh(val,row){
	if (val==1){
		return '加工';
	} else if (val==2){
		return '储备';
	} else if (val==3){
		return '收纳';
	} else if (val==4){
		return '中转';
	} else if (val==5){
		return '特殊';
	} else if (val==9){
		return '其他';
	}
}
/***货币格式化***/
function formatMoney(val,row){
	if (val < 0){
		return '<span style="color:red;">('+val+')</span>';
	} else {
		var number=val; 
		if (number=="") return ""; 
		if(number<0) 
			return '-'+outputDollars(Math.floor(Math.abs(number)-0) + '') + outputCents(Math.abs(number) - 0); 
		else 
			return outputDollars(Math.floor(number-0) + '') + outputCents(number - 0); 
	}
}
function outputDollars(number) 
		{ 
		if (number.length<= 3) 
		return (number == '' ? '0' : number); 
		else 
		{ 
		var mod = number.length%3; 
		var output = (mod == 0 ? '' : (number.substring(0,mod))); 
		for (i=0 ; i< Math.floor(number.length/3) ; i++) 
		{ 
		if ((mod ==0) && (i ==0)) 
		output+= number.substring(mod+3*i,mod+3*i+3); 
		else 
		output+= ',' + number.substring(mod+3*i,mod+3*i+3); 
		} 
		return (output); 
		} 
		} 
function outputCents(amount) 
		{ 
		amount = Math.round( ( (amount) - Math.floor(amount) ) *100); 
		return (amount<10 ? '.0' + amount : '.' + amount); 
		}
/**
 * ‘是’与‘否’格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatIsNo(val,row){
	if(val==0){
		return '否';
	}else if(val==1){
		return '是';
	}
}
/**
 * 是否屏蔽格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatIsClosed(val,row){
	if(val==0){
		return '正常';
	}else if(val==1){
		return '屏蔽';
	}
}
/**
 * 性别格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatSex(val,row){
	if(val==0){
		return '女';
	}else if(val==1){
		return '男';
	}else{
		return '未指定';
	}
}
/**
 * 是否是价格监控点格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatIsMoni(val,row){
	if(val==0){
		return '否';
	}else if(val==1){
		return '是';
	}
}
/**
 * 是否是价格监控点格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatIsYj(val,row){
	if(val==0){
		return '否';
	}else if(val==1){
		return '是';
	}
}
/**
 * 仓房结构格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatStructure(val,row){
	if(val==1){
		return '钢筋砼';
	}else if(val==2){
		return '砖混';
	}else if(val==3){
		return '钢板';
	}else if(val==99){
		return '其他';
	}
}
/**
 * 仓房状态
 * @param val
 * @param row
 * @returns {String}
 */
function formatState(val,row){
	if(val==1){
		return '完全可用';
	}else if(val==2){
		return '需大修';
	}else if(val==3){
		return '待报废';
	}else if(val==4){
		return '待拆除';
	}else if(val==5){
		return '死角仓';
	}else if(val==6){
		return '其他';
	}
}
/**
 * 数字格式化成整型
 * @param val
 * @param row
 * @returns {String}
 */
function formatInt(val,row){
	if(val!=null){
		return parseInt(val);  
	}else{
		return '';
	}
}
/**
 * 时间格式化
 * @param value
 * @param row
 * @returns {String}
 */
function formatTime(value,row){  
	if(value=='NaN'||value==undefined){
		return '';
	}  
	var date = new Date(value.replace("T", " ").replace("-", "/").replace("-", "/"));
	var year = date.getFullYear().toString();
	var month = (date.getMonth() + 1);
	var day = date.getDate().toString();
	var hour = date.getHours().toString();
//	if (!!window.ActiveXObject || "ActiveXObject" in window){//判断当前使用的浏览器为IE
//		if(hour<8){
//			hour = 24-(8-hour);
//			if(day==1){
//				day=
//			}else{
//				day=day-1;
//			}
//		}else{
//			hour = hour-8;
//		}
//	} 
//	alert(hour);
	
	var minutes = date.getMinutes().toString();
	var seconds = date.getSeconds().toString();
	if (month < 10) 
	{
		 month = "0" + month;
	} 
	if (day < 10) 
	{ 
		day = "0" + day;
	} 
	if (hour < 10)
	{
		hour = "0" + hour;
	} 
	if (minutes < 10) 
	{   
		minutes = "0" + minutes;
	}
	 if (seconds < 10) 
	{
		seconds = "0" + seconds; 
	}
		return year + "-" + month + "-" + day + " " + hour + ":" + minutes + ":" + seconds;
}
/**
 *日期格式化
 * @param value
 * @param row
 * @returns {String}
 */
function formatDate(value,row){  
	if(value=='NaN'||value==undefined){
		return '';
	}   
	var date = new Date(value.replace("T", " ").replace("-", "/").replace("-", "/"));
	var year = date.getFullYear().toString();
	var month = (date.getMonth() + 1);
	var day = date.getDate().toString();
	if (month < 10) 
	{
		 month = "0" + month;
	} 
	if (day < 10) 
	{ 
		day = "0" + day;
	} 
		return year + "-" + month + "-" + day;
}
/**
 * CST日期格式化
 * @param strTime
 * @returns {String}
 */
function formatCSTDate (strTime) {  
	if(strTime==''||strTime==null){
		return '';
	}
	var date = new Date(strTime);    
	return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
}
function myformatter(date){
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	if(typeof(dayOfWeek)!='undefined'&&dayOfWeek!=null&&dayOfWeek!=''){
		if(date.getDay()!=dayOfWeek){
			alert('日期必须是周'+dayOfWeek);
			return ;
		}
	}
	return y+'-'+(m<10?('0'+m):m)+'-'+(d<10?('0'+d):d);
}
	function myparser(s){
	   if (!s) return new Date();
	   var ss = (s.split('-'));
	   var y = parseInt(ss[0],10);
	   var m = parseInt(ss[1],10);
	   var d = parseInt(ss[2],10);
	   if (!isNaN(y) && !isNaN(m) && !isNaN(d)){
	       return new Date(y,m-1,d);
	   } else {
	       return new Date();
	   }
	}
	
/**
 * 审核状态格式化
 */
function formatSHstatus(val,row){
	if(val == 0){
		return "待审核";
	}else if(val == 1){
		return "审核通过";
	}else if(val == 2){
		return "审核不通过";
	}else if(val == ''){
		return "未审核";
	}else{
		return "";
	}
}

function formatEquipstate(val,row){
	if(val == 0){
		return "入库保管中";
	}else if(val == 1){
		return "被领用";
	}else if(val == 2){
		return "已报废";
	}else if(val == 3){
		return "维修中";
	}else{
		return "";
	}
}


/**
 * 突发事件类型格式化
 */
function formatIncidenttype(val,row){
	if(val == 1){
		return "自然灾害";
	}else if(val == 2){
		return "卫生事件";
	}else if(val == 3){
		return "市场异常";
	}else if(val == 4){
		return "其他";
	}else{
		return "";
	}
}

function misleveltype(val,row){
	if(val == 1){
		return "特别重大事故";
	}else if(val == 2){
		return "重大事故";
	}else if(val == 3){
		return "较大事故";
	}else if(val == 4){
		return "一般事故";
	}else{
		return "";
	}
}





/**
 * 摄像头类型格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatVideotype(val,row){
	if(val == 1){
		return "球机";
	}else if(val == 2){
		return "枪机";
	}
}
/**
 * 是否在线格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatIsonline(val,row){
	if(val == 1){
		return "在线";
	}else if(val == 0){
		return "不在线";
	}
}
/**
 * 视频厂家格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatFacid(val,row){
	if(val == 1){
		return "海康";
	}else if(val == 2){
		return "大华";
	}else if(val == 3){
		return "天地伟业";
	}else{
		return "其他";
	}
}
/**
 * 视频位置大类格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatPlace(val,row){
	if(val == 1){
		return "室外监控";
	}else if(val == 2){
		return "室内监控";
	}
}
/**
 * 连接方式格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatConnecttype(val,row){
	if(val == 1){
		return "硬盘录像机";
	}else if(val == 2){
		return "摄像头直连";
	}
}
/**
 * 摄像头分类格式化
 * @param val
 * @param row
 * @returns {String}
 */
function formatSignal(val,row){
	if(val == 1){
		return "网络";
	}else if(val == 2){
		return "模拟";
	}
}


function formatlhSpflag(val,row){
	if (val==0){
		return '待上报';
	} else if (val==1){
		return '待审核';
	} else if (val==2){
		return '市待上报';
	} else if (val==3){
		return '待审批';
	} else if (val==4){
		return '已批准';
	} else if (val==5){
		return '已生成';
	} else if (val==6){
		return '已下达';
	} else if (val==9){
		return '驳回修改';
	}
}

//扩展easyui表单的验证
$.extend($.fn.validatebox.defaults.rules, {
	//验证汉子
	CHS: {
		validator: function (value) {
			return /^[\u0391-\uFFE5]+$/.test(value);
		},
		message: '只能输入汉字'
	},
	//移动手机号码验证
	mobile: {//value值为文本框中的值
		validator: function (value) {
			var reg = /^1[3|4|5|8|9]\d{9}$/;
			return reg.test(value);
		},
		message: '输入手机号码格式不准确.'
	},
	//国内邮编验证
	zipcode: {
		validator: function (value) {
			var reg = /^[1-9]\d{5}$/;
			return reg.test(value);
		},
		message: '邮编必须是非0开始的6位数字.'
	},
	//用户账号验证(只能包括 _ 数字 字母)
	account: {//param的值为[]中值
		validator: function (value, param) {
			if (value.length < param[0] || value.length > param[1]) {
				$.fn.validatebox.defaults.rules.account.message = '用户名长度必须在' + param[0] + '至' + param[1] + '范围';
				return false;
			} else {
				if (!/^[\w]+$/.test(value)) {
					$.fn.validatebox.defaults.rules.account.message = '用户名只能数字、字母、下划线组成.';
					return false;
				} else {
					return true;
				}
			}
		}, message: ''
	},
	idcard: {// 验证身份证
		validator: function (value) {
			if (!value) {
				return true
			}
			var reg =/^\d{17}(\d|x|X)$/;
			return reg.test(value);
		},
		message: '身份证号码格式不正确'
	}
});

function formatZero(val,row) {
	if (val == 0) {
		return '';
	}else{
		return val;
	}
}


