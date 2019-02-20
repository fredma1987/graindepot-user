var theTable;
var element = {
    baseUrl: "/graindepot-user/element",
    tableId: "elementTable",
    currentItem:{}
};
element.init=function(menuid) {
    var currentmenuid;
    if(theTable!=undefined){
        theTable.destroy();
    }
    if(menu.currentItem.id==undefined){
        return;
    }else{
        currentmenuid=menu.currentItem.id;
    }
    if(menuid==0){
        currentmenuid=0;
    }
    var param = {"menuid":currentmenuid};
    theTable = $('#' + element.tableId).bootstrapTable({
        //数据来源（包括处理分页，排序，过滤） ，即url，action，接口，等等
        ajax: {
            url: element.baseUrl+"/list/page",
            data: param,
            type: "GET"
        },
        columns: [
            {data: "code"},
            {data: "name"},
            {data: "type"},
            {data: "uri"},
            {data: "method"}
        ]
    });
};
element.select = function (layerTips) {
    var rows = $('#' + element.tableId).bootstrapTable("getChecked");
    if (rows.length == 1) {
        element.currentItem = rows[0];
        return true;
    } else {
        layerTips.msg("请选中一行");
        return false;
    }
};

element.refresh = function(){
    menu.select();
    element.init();
};
layui.use(['form', 'layedit', 'laydate'], function () {
    element.init();
    var editIndex;
    var layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
        layer = layui.layer, //获取当前窗口的layer对象
        form = layui.form(),
        layedit = layui.layedit,
        laydate = layui.laydate;
    var addBoxIndex = -1;
    //初始化页面上面的按钮事件
    $('#btn_element_add').on('click', function () {
        var menuid=menu.currentItem.id;
        toElementAdd(menuid);
    });
    $('#btn_element_edit').on('click', function () {
        if (element.select(layerTips)) {
            if (addBoxIndex !== -1)
                return;
            var id = element.currentItem.elementid;
            toElementEdit(id);

        }
    });
    $('#btn_element_del').on('click', function () {
        if (element.select(layerTips)) {
            var id = element.currentItem.elementid;
            toElementDel(id);
        }
    });
});
function toElementDel(id) {
    $.bootstrapBox.confirm.init({
        message: "确认删除？",
        callback: function (result) {
            if (result) {
                //删除
                $.post("/graindepot-user/element/del", {ids:id}, function (result) {
                    $.bootstrapBox.alert.init({
                        message: result.message
                    });
                });
                element.init();
            }

        }
    });

}

function toElementAdd(menuid) {
    $.bootstrapBox.dialog.init({
        title: "新增页面元素",
        url: "/graindepot-user/page/element/edit?menuid="+menuid,
        width: '800px',
        height: '500px'
    })
}

function toElementEdit(id) {
    $.bootstrapBox.dialog.init({
        title: "修改页面元素",
        url: "/graindepot-user/page/element/edit?id=" + id,
        width: '800px',
        height: '500px'
    })
}
function toElementSave(result) {
    $.bootstrapBox.dialog.close();
    /*$.bootstrapBox.alert.init({
        message: result.message
    });*/
    element.init();
}

function toDetail(elementid) {
    $.bootstrapBox.dialog.init({
        title: "页面元素详情",
        url: "/graindepot-user/page/element/detail/" + elementid,
        width: '1500px',
        height: '630px'
    })
}
