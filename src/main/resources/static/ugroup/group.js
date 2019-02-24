var group = {
    baseUrl: "/graindepot-user/ugroup",
    entity: "ugroup",
    tableId: "grouptable",
    toolbarId: "toolbar",
    unique: "ugroupid",
    order: "asc",
    currentItem: {},
    code: "ugroupid",
    parentCode: "parentid",
    rootValue: -1,
    explandColumn: 1,
    currentAuthorityMenu: {}
};
group.columns = function () {
    return [
        {
            field: 'selectItem',
            radio: true
        }, {
            field: 'ugroupname',
            title: '名称'
        }, {
            field: 'ugrouplevelstr',
            title: '级别'
        }, {
            field: 'cityname',
            title: '市'
        }, {
            field: 'countyname',
            title: '县区'
        }, {
            field: 'companyname',
            title: '企业'
        }, {
            field: 'graindepotname',
            title: '库点'
        }];
};
//得到查询的参数
group.queryParams = function () {
    if(group.ugrouptype==undefined){
        group.ugrouptype=1;
    }
    var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        ugroupname: $("#ugroupname").val(),
        ugrouptype: group.ugrouptype
    };
    return temp;
};
group.init = function () {
    group.table = $('#' + group.tableId).bootstrapTreeTable({
        id: group.unique,// 选取记录返回的值
        code: group.code,// 用于设置父子关系
        parentCode: group.parentCode,// 用于设置父子关系
        rootCodeValue: group.rootValue,
        url: group.baseUrl + '/list', //请求后台的URL（*）
        method: 'get', //请求方式（*）
        toolbar: '#' + group.toolbarId, //工具按钮用哪个容器
        striped: true, //是否显示行间隔色
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        ajaxParams: group.queryParams(),//传递参数（*）
        expandColumn: group.explandColumn,//在哪一列上面显示展开按钮,从0开始
        expandAll: false,
        columns: group.columns(),
        dblClickRow: group.dblClickRow,
        mousedown:group.mousedown
    });
};
group.select = function (layerTips) {
    var rows = group.table.bootstrapTreeTable('getSelections');
    if (rows.length == 1) {
        group.currentItem = rows[0];
        return true;
    } else {
        layerTips.msg("请选中一行");
        return false;
    }
};
group.refresh = function () {
    group.table.bootstrapTreeTable('refresh', group.queryParams());
};
group.dblClickRow = function () {
    group.select();
    var id = group.currentItem.id;
    toGroupEdit(id);
};
/**
 * 右击再该菜单下增加子菜单
 * @param e
 */
group.mousedown = function (e) {
    if(e.which==3){
        var scrolltop=($(document).scrollTop());
        var smallmenu = $('#smallmenu');
        smallmenu.css("z-index","1000");
        smallmenu.css("visibility","visible");
        smallmenu.css("left",e.clientX+6+"px");
        smallmenu.css("top",e.clientY+2+scrolltop+"px");
        /*menu.select();
         var id = menu.currentItem.id;
         toMenuAdd(id);*/
    }
};
function doAdd(){
    $('#smallmenu').css("visibility","hidden");
    var rows = group.table.bootstrapTreeTable('getSelections');
    var id = "-1";
    if (rows.length == 1) {
        id = rows[0].id;
    }
    toGroupAdd(id);
}
function doEdit(){
    var rows = group.table.bootstrapTreeTable('getSelections');
    var id = "-1";
    if (rows.length == 1) {
        id = rows[0].id;
    }
    toGroupEdit(id);
}
function doDel(){
    $('#smallmenu').css("visibility","hidden");
    var rows = group.table.bootstrapTreeTable('getSelections');
    var id = "-1";
    if (rows.length == 1) {
        id = rows[0].id;
    }
    toGroupDel(id);
}
layui.use(['form', 'layedit', 'laydate', 'element'], function () {
    group.init();
    var allItems = null;
    var editIndex;
    var allGroupItems = null;
    var layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
        layer = layui.layer, //获取当前窗口的layer对象
        form = layui.form(),
        layedit = layui.layedit;
    var first=1;
    var element = layui.element();
            element.tabAdd('ugrouptype', {
                title: '角色类型'
                , content: ""
                , id: 1
            });
            element.tabAdd('ugrouptype', {
                title: '部门类型'
                , content: ""
                , id: 2
            });
            element.tabAdd('ugrouptype', {
                title: '自定义类型'
                , content: ""
                , id: 3
            });
        element.tabChange('ugrouptype', first);
    //一些事件监听
    element.on('tab(ugrouptype)', function (data) {
        group.ugrouptype = $('#ugrouptypetab .layui-this').attr("lay-id");
        group.refresh();
    });
    //初始化页面上面的按钮事件
    $('#btn_query').on('click', function () {
        group.table.bootstrapTreeTable('refresh', group.queryParams());
    });
    var addBoxIndex = -1;
    $('#btn_add').on('click', function () {
        if (addBoxIndex !== -1)
            return;
        var rows = group.table.bootstrapTreeTable('getSelections');
        var id = "-1";
        if (rows.length == 1) {
            id = rows[0].id;
        }
        toGroupAdd(id);
    });
    $('#btn_edit').on('click', function () {
        if (addBoxIndex !== -1)
            return;
        if (group.select(layerTips)) {
            var id = group.currentItem.id;
            toGroupEdit(id);
        }
    });
    $('#btn_del').on('click', function () {
        if (group.select(layerTips)) {
            var id = group.currentItem.id;
            toGroupDel(id);
        }
    });

    $('#btn_userManager').on("click", function () {
        if (group.select(layerTips)) {
            var id = group.currentItem.id;
              window.spindex =layer.open({
                type: 2 //此处以iframe举例
                ,title: "添加用户"
                ,area: ['90%', '90%']
                ,shade: 0.5
                ,content: group.entity + '/user?ugroupid='+id
            });
        }
    });
    $('#btn_resourceManager').on("click", function () {
        if (group.select(layerTips)) {
            var id = group.currentItem.id;
            var nodeMap = {};
            $.get(group.entity + '/authority', null, function (form) {
                var index = layer.open({
                    type: 1,
                    title: '分配权限',
                    content: form,
                    btn: ['保存', '取消'],
                    shade: false,
                    offset: ['20px', '20%'],
                    area: ['600px', '400px'],
                    maxmin: true,
                    yes: function (index) {
                        //触发表单的提交事件
                        $('form.layui-form').find('button[lay-filter=edit]').click();
                    },
                    full: function (elem) {
                        var win = window.top === window.self ? window : parent.window;
                        $(win).on('resize', function () {
                            var $this = $(this);
                            elem.width($this.width()).height($this.height()).css({
                                top: 0,
                                left: 0
                            });
                            elem.children('div.layui-layer-content').height($this.height() - 95);
                        });
                    },
                    success: function (layero, index) {
                        var form = layui.form();
                        $.ajax({
                            type: "GET",
                            url: "/graindepot-user/ugroup/authorityTreeByUser?parentid=-1",
                            success: function (defaultData) {
                                //authorityElement.init(0);
                                var $checkableTree = $('#menuTreeview').treeview({
                                    data: defaultData,
                                    levels: 1,
                                    showIcon: false,
                                    showCheckbox: true,
                                    multiSelect: false,
                                    levels: 5,
                                    state: {
                                        checked: true,
                                        disabled: true,
                                        expanded: true,
                                        selected: true
                                    },
                                    onNodeUnchecked: function (event, data) {

                                        var selectNodes = treeViewHelper.getChildrenNodeIdArr(data);//获取所有子节点
                                        if (selectNodes) { //子节点不为空，则选中所有子节点
                                            $('#menuTreeview').treeview('uncheckNode', [selectNodes, {silent: true}]);
                                        }
                                    },
                                    onNodeChecked: function (event, data) {
                                        group.currentAuthorityMenu = data;
                                        var selectNodes = treeViewHelper.getChildrenNodeIdArr(data);//获取所有子节点
                                        if (selectNodes) {
                                            $('#menuTreeview').treeview('checkNode', [selectNodes, {silent: true}]);
                                        }
                                        var parNodes = treeViewHelper.getParentIdArr("menuTreeview", data);
                                        if (parNodes) {
                                            $('#menuTreeview').treeview('checkNode', [parNodes, {silent: true}]);
                                            authorityElement.refresh();
                                        }
                                    },
                                    onNodeSelected: function(event, data) {
                                        group.currentAuthorityMenu = data;
                                        authorityElement.refresh();
                                    } ,
                                    onNodeUnselected: function(event, data) {
                                        //group.currentAuthorityMenu = {};
                                        //authorityElement.refresh();
                                    }
//
                                });
                                var findCheckableNodess = function () {
                                    return $checkableTree.treeview('search', [
                                        $('#input-check-node').val(), {
                                            ignoreCase: false,
                                            exactMatch: false
                                        }]);
                                };
                                var checkableNodes = findCheckableNodess();

                                $('#input-check-node').on('keyup', function (e) {
                                    checkableNodes = findCheckableNodess();
                                    $('.check-node')
                                        .prop('disabled', !(checkableNodes.length >= 1));
                                });
                                $.get(group.baseUrl + '/' + id + "/authority/menu", null, function (data) {
                                    if (data.rel) {
                                        var nodes = $('#menuTreeview').treeview('getUnselected', 0);
                                        var map = {};
                                        for (var i = 0; i < nodes.length; i++) {
                                            map[nodes[i].menuid] = nodes[i].nodeId;
                                            nodeMap[nodes[i].nodeId] = nodes[i];
                                        }
                                        var ts=[];
                                        for (var i = 0; i < data.result.length; i++) {
                                            var node = data.result[i];
                                            ts.push(map[node.menuid]);
                                            //$('#menuTreeview').treeview('checkNode', [map[node.id], {silent: true}]);
                                        }
                                        $('#menuTreeview').treeview('checkNode', [ts, {silent: true}]);
                                    }
                                });
                            }
                        });

                        form.on('submit(edit)', function (data) {
                            var menuList = [];
                            menuList=$('#menuTreeview').treeview('getChecked');
                            $.ajax({
                                url: group.baseUrl + '/' + id + "/"+group.ugrouptype+"/authority/menu",
                                type: 'POST',
                                data: {"menuTrees": JSON.stringify(menuList)},
                                dataType: "json",
                                success: function () {
                                    layerTips.msg('更新成功');
                                    layer.close(index);
                                    // location.reload();
                                }

                            });
                            //这里可以写ajax方法提交表单
                            return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
                        });
                    },
                    end:function(){
                        group.currentAuthorityMenu = {};
                        element.currentItem = {};
                    }
                });
                layer.full(index);
            });
        }
    });
});
function toGroupDel(id) {
    $.bootstrapBox.confirm.init({
        message: "确认删除？",
        callback: function (result) {
            if (result) {
                //删除
                $.post("/graindepot-user/ugroup/del", {ids:id}, function (result) {
                    $.bootstrapBox.alert.init({
                        message: result.message
                    });
                    group.table.bootstrapTreeTable('refresh', group.queryParams());
                })

            }

        }
    });

}

function toGroupAdd(parentid) {
    $.bootstrapBox.dialog.init({
        title: "新增用户组",
        url: "/graindepot-user/page/ugroup/edit?parentid="+parentid,
        width: '800px',
        height: '600px'
    })
}

function toGroupEdit(id) {
    $.bootstrapBox.dialog.init({
        title: "修改用户组",
        url: "/graindepot-user/page/ugroup/edit?id=" + id,
        width: '800px',
        height: '600px'
    })
}
function toGroupSave(result){
    $.bootstrapBox.dialog.close();
    /*$.bootstrapBox.alert.init({
     message: result.message
     });*/
    group.table.bootstrapTreeTable('refresh', group.queryParams());
}
