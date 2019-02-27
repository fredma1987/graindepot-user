package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.base.PagerModel;
import com.zhoubi.graindepot.bean.BaseMenu;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.biz.BaseMenuBiz;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/2/20/020.
 */
@RestController("")
public class BaseMenuController extends BaseController {
    @Autowired
    private BaseMenuBiz baseMenuBiz;
    @GetMapping("menu/list")
    public List<BaseMenu> menuList(String title) {
        Map e = new HashMap();
        if(StringUtils.isNotBlank(title)){
            e.put("title","%"+title+"%");
        }
        return baseMenuBiz.selectList(e);
    }

    @PostMapping("menu/edit")
    public JsonResult menuEdit(BaseMenu basemenu) {
        if (basemenu.getMenuid()==null) {
            //新增
            if(basemenu.getParentid()==null){
                basemenu.setParentid(-1);//如果不选择上级菜单，则默认是根菜单
            }
            baseMenuBiz.insert(basemenu);
            return new JsonResult("添加成功", true);
        }else {
            //修改
            if(basemenu.getParentid()==null){
                basemenu.setParentid(-1);//如果不选择上级菜单，则默认是根菜单
            }
            baseMenuBiz.update(basemenu);
            return new JsonResult("修改成功", true);
        }

    }

    @PostMapping("menu/del")
    public JsonResult menuDel(String ids) {
        if (StringUtils.isNotEmpty(ids)) {
            Map map=new HashMap();
            map.put("Where_IdsStr", ids);
            baseMenuBiz.deleteMap(map);
        }

        return new JsonResult("删除成功", true);
    }
}
