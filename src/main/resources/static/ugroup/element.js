var authorityElement;
var theTable;
var authorityElement = {
    baseUrl: "/graindepot-user/element",
    tableId: "elementTable",
    currentItem:{}
};
authorityElement.init=function(menuid) {
    var param = {"menuid":menuid};
    if(theTable!=undefined){
        theTable.destroy();
    }
    theTable = $('#' + authorityElement.tableId).bootstrapTable({
        //数据来源（包括处理分页，排序，过滤） ，即url，action，接口，等等
        ajax: {
            url: authorityElement.baseUrl+"/list/page",
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
authorityElement.select = function (layerTips) {
    var rows = $('#' + authorityElement.tableId).bootstrapTable("getChecked");
    if (rows.length == 1) {
        authorityElement.currentItem = rows[0];
        return true;
    } else {
        layerTips.msg("请选中一行");
        return false;
    }
};

authorityElement.refresh = function(){
    var menuid=group.currentAuthorityMenu.menuid;
    authorityElement.init(menuid);
    setTimeout(function() {
        if (group.currentItem.id != undefined) {
            $.get(authorityElement.baseUrl + '/' + group.currentItem.id + "/authority/element", null, function (data) {
                checkById(data.result);
            });
        }
        },1000);
};
function checkById(ids){
    var table = $('#' + authorityElement.tableId).DataTable();
    if(table.rows(0)[0]!=""){
        table.rows()[0].forEach(function (curr, index) {
            var elementid=table.row(index).data().elementid;
            for(var i=0;i<ids.length;i++) {
                if (ids[i] == elementid) {
                    $($(table.row(index).node()).find('input:checkbox:first').get(0)).prop('checked','checked');
                }
            }
        });
    }
}
layui.use(['form', 'layedit', 'laydate'], function () {
    authorityElement.init(0);
    var editIndex;
    var layerTips = parent.layer === undefined ? layui.layer : parent.layer, //获取父窗口的layer对象
        layer = layui.layer, //获取当前窗口的layer对象
        form = layui.form(),
        layedit = layui.layedit,
        laydate = layui.laydate;
    var addBoxIndex = -1;
    //初始化页面上面的按钮事件

});

function toDetail(elementid) {
    $.bootstrapBox.dialog.init({
        title: "页面元素详情",
        url: "/graindepot-user/page/element/detail/" + elementid,
        width: '1500px',
        height: '630px'
    })
}