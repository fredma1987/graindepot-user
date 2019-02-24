package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.base.PagerModel;
import com.zhoubi.graindepot.bean.BaseElement;
import com.zhoubi.graindepot.bean.BaseMenu;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.biz.BaseElementBiz;
import com.zhoubi.graindepot.biz.BaseMenuBiz;
import com.zhoubi.graindepot.msg.ObjectRestResponse;
import com.zhoubi.graindepot.msg.TableResultResponse;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/2/20/020.
 */
@RestController("")
public class BaseElementController extends BaseController {
    @Autowired
    private BaseElementBiz baseElementBiz;
    @GetMapping("element/list/page")
    public PagerModel basePageList(int start, int length, String name,Integer menuid) {
        PagerModel<BaseElement> e = new PagerModel();
        e.setStart(start);
        e.setLength(length);
        if (StringUtils.isNotEmpty(name)) {
            e.putWhere("name", "%" + name + "%");
        }
        if(menuid!=null){
            e.putWhere("menuid", menuid);
        }
        PagerModel<BaseElement> result = baseElementBiz.selectListByPage(e);
        return result;
    }
    @GetMapping(value = "element/pageByUser")
    @ResponseBody
    public TableResultResponse<BaseElement> pageByUser(@RequestParam(defaultValue = "10") int limit,
                                                   @RequestParam(defaultValue = "1") int offset, String name, @RequestParam(defaultValue = "0") int menuid) {
        BaseUser user = getCurrentUser();
        List<BaseElement> elements = new ArrayList<BaseElement>();
        PagerModel<BaseElement> e = new PagerModel();
        int start =limit*(offset-1);
        e.setStart(start);
        e.setLength(limit);
        if (StringUtils.isNotEmpty(name)) {
            e.putWhere("name", "%" + name + "%");
        }
        if(menuid!=0){
            e.putWhere("menuid", menuid);
        }
        PagerModel<BaseElement> result = baseElementBiz.selectListByPage(e);
        elements=result.getData();
        return new TableResultResponse<BaseElement>(elements.size(), elements);
    }
    @GetMapping("element/list")
    public List<BaseElement> elementList() {
         Map e = new HashMap();
         return baseElementBiz.selectList(e);
    }

    @PostMapping("element/edit")
    public JsonResult basemenuEdit(BaseElement baseelement) {
        if (baseelement.getElementid()==null) {
            //新增
            baseElementBiz.insert(baseelement);
            return new JsonResult("添加成功", true);
        }else {
            //修改
            baseElementBiz.update(baseelement);
            return new JsonResult("修改成功", true);
        }

    }

    @PostMapping("element/del")
    public JsonResult basemenuDel(String ids) {
        if (StringUtils.isNotEmpty(ids)) {
            Map map=new HashMap();
            map.put("Where_IdsStr", ids);
            baseElementBiz.deleteMap(map);
        }

        return new JsonResult("删除成功", true);
    }
    @RequestMapping(value = "element/{ugroupid}/authority/element", method = RequestMethod.GET)
    @ResponseBody
    public ObjectRestResponse<List<Integer>> getlementAuthority(@PathVariable int ugroupid) {
        Map m =new HashMap();
        m.put("ugroupid",ugroupid);
        m.put("authoritytype","ugroup");
        m.put("resourcetype","button");
        List<Integer> result=baseElementBiz.getAuthorityElement(m);
        return new ObjectRestResponse().result(result).rel(true);
    }
}
