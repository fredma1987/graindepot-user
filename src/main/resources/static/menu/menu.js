var menu = {
    baseUrl: "/graindepot-user/menu",
    entity: "menu",
    tableId: "menuTable",
    toolbarId: "toolbar",
    unique: "menuid",
    order: "asc",
    currentItem: {},
    code: "menuid",
    parentCode: "parentid",
    rootValue: -1,
    explandColumn: 1
};
menu.columns = function () {
    return [
        {
            field: 'selectItem',
            radio: true
        }, {
            field: 'title',
            title: '菜单',
            width: '30%'
        }, {
            field: 'code',
            title: '编码',
            width: '22%'
        }, {
            field: 'href',
            title: 'url',
            width: '43%'
        }, {
            field: 'ordernum',
            title: '排序',
            width: '5%'
        }];
};
//得到查询的参数
menu.queryParams = function () {
    var temp = { //这里的键的名字和控制器的变量名必须一直，这边改动，控制器也需要改成一样的
        title: $("#title").val()
    };
    return temp;
};
menu.init = function () {
    menu.table = $('#' + menu.tableId).bootstrapTreeTable({
        id: menu.unique,// 选取记录返回的值
        code: menu.code,// 用于设置父子关系
        parentCode: menu.parentCode,// 用于设置父子关系
        rootCodeValue: menu.rootValue,
        url: menu.baseUrl + '/list', //请求后台的URL（*）
        method: 'get', //请求方式（*）
        toolbar: '#' + menu.toolbarId, //工具按钮用哪个容器
        striped: true, //是否显示行间隔色
        cache: false, //是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
        ajaxParams: menu.queryParams,//传递参数（*）
        expandColumn: menu.explandColumn,//在哪一列上面显示展开按钮,从0开始
        expandAll: true,
        columns: menu.columns(),
        clickRow: menu.clickRow,
        dblClickRow: menu.dblClickRow,
        mousedown:menu.mousedown
    });
};
menu.select = function (layerTips) {
    var rows = menu.table.bootstrapTreeTable('getSelections');
    if (rows.length == 1) {
        menu.currentItem = rows[0];
        return true;
    } else {
        layerTips.msg("请选中一行");
        return false;
    }
};
menu.clickRow = function () {
    element.refresh();
};
menu.dblClickRow = function () {
    menu.select();
    var id = menu.currentItem.id;
    toMenuEdit(id);
};
/**
 * 右击再该菜单下增加子菜单
 * @param e
 */
menu.mousedown = function (e) {
    if(e.which==3){
        menu.select();
        var id = menu.currentItem.id;
        toMenuAdd(id);
    }
};
menu.refresh = function () {
    menu.table.bootstrapTreeTable("refresh");
};
window.onkeypress=function (e) {
    if (e.charCode==32){
        var id = menu.currentItem.id;
        if(id!=undefined){
            toMenuDel(id);
        }
    }
};

layui.use(['form', 'layedit', 'laydate'], function () {
    menu.init();
    $('#' + menu.tableId + '>.treegrid-tbody>tr').click(function () {
        var rows = menu.table.bootstrapTreeTable('getSelections');
        menu.currentItem = rows[0];
    });
    var layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
        layer = layui.layer, //获取当前窗口的layer对象
        form = layui.form(),
        layedit = layui.layedit;
//初始化页面上面的按钮事件
    $('#btn_query').on('click', function () {
        menu.table.bootstrapTreeTable('refresh', menu.queryParams());
    });
    var addBoxIndex = -1;
    $('#btn_add').on('click', function () {
        if (addBoxIndex !== -1)
            return;
        var rows = menu.table.bootstrapTreeTable('getSelections');
        var id = "-1";
        if (rows.length == 1) {
            id = rows[0].id;
        }
        toMenuAdd(id);
    });
    $('#btn_edit').on('click', function () {
        if (addBoxIndex !== -1)
            return;
        if (menu.select(layerTips)) {
            var id = menu.currentItem.id;
            toMenuEdit(id);
        }
    });
    $('#btn_del').on('click', function () {
        if (menu.select(layerTips)) {
            var id = menu.currentItem.id;
            toMenuDel(id);
        }
    });
});
function toMenuDel(id) {
    $.bootstrapBox.confirm.init({
        message: "确认删除？",
        callback: function (result) {
            if (result) {
                //删除
                $.post("/graindepot-user/menu/del", {ids:id}, function (result) {
                    $.bootstrapBox.alert.init({
                        message: result.message
                    });
                    menu.table.bootstrapTreeTable('refresh', menu.queryParams());
                    element.init(0);
                })

            }

        }
    });

}

function toMenuAdd(parentid) {
    $.bootstrapBox.dialog.init({
        title: "新增菜单",
        url: "/graindepot-user/page/menu/edit?parentid="+parentid,
        width: '800px',
        height: '500px'
    })
}

function toMenuEdit(id) {
    $.bootstrapBox.dialog.init({
        title: "修改菜单",
        url: "/graindepot-user/page/menu/edit?id=" + id,
        width: '800px',
        height: '500px'
    })
}
function toMenuSave(result) {
    $.bootstrapBox.dialog.close();
    /*$.bootstrapBox.alert.init({
        message: result.message
    });*/
    menu.table.bootstrapTreeTable('refresh', menu.queryParams());
    element.init(0);
}

function toMenuDetail(menuid) {
    $.bootstrapBox.dialog.init({
        title: "菜单详情",
        url: "/graindepot-user/page/menu/detail/" + menuid,
        width: '1500px',
        height: '630px'
    })
}
