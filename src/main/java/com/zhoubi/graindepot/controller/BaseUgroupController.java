package com.zhoubi.graindepot.controller;

import com.alibaba.fastjson.JSONObject;
import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.bean.*;
import com.zhoubi.graindepot.biz.BaseElementBiz;
import com.zhoubi.graindepot.biz.BaseMenuBiz;
import com.zhoubi.graindepot.biz.BaseUgroupBiz;
import com.zhoubi.graindepot.biz.BaseUserBiz;
import com.zhoubi.graindepot.entity.AuthorityMenuTree;
import com.zhoubi.graindepot.msg.ObjectRestResponse;
import com.zhoubi.graindepot.util.TreeUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
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
public class BaseUgroupController extends BaseController {
    @Autowired
    private BaseUgroupBiz baseUgroupBiz;
    @Autowired
    private BaseMenuBiz baseMenuBiz;
    @Autowired
    private BaseUserBiz baseUserBiz;
    @PostMapping("ugroup/ugroupUser")
    @ResponseBody
    public ObjectRestResponse<BaseUser> ugroupUser(@RequestParam Map param) {
        if(param.get("username")!=null){
            param.put("username","%"+param.get("username")+"%");
        }
        if(param.get("relname")!=null){
            param.put("relname","%"+param.get("relname")+"%");
        }
        if(param.get("groupname")!=null){
            param.put("groupname","%"+param.get("groupname")+"%");
        }
        if(param.get("companyname")!=null){
            param.put("companyname","%"+param.get("companyname")+"%");
        }
        if(param.get("graindepotname")!=null){
            param.put("graindepotname","%"+param.get("graindepotname")+"%");
        }
        List<BaseUser> gu = baseUserBiz.selectAllMemberByGroupId(param);
        return new ObjectRestResponse<BaseUser>().rel(true).result(gu);
    }

    @PostMapping("ugroup/allUser")
    @ResponseBody
    public ObjectRestResponse<BaseUser> allUser(@RequestParam Map param) {
        if(param.get("username")!=null){
            param.put("username","%"+param.get("username")+"%");
        }
        if(param.get("relname")!=null){
            param.put("relname","%"+param.get("relname")+"%");
        }
        if(param.get("groupname")!=null){
            param.put("groupname","%"+param.get("groupname")+"%");
        }
        if(param.get("companyname")!=null){
            param.put("companyname","%"+param.get("companyname")+"%");
        }
        if(param.get("graindepotname")!=null){
            param.put("graindepotname","%"+param.get("graindepotname")+"%");
        }
        List<BaseUser> gu = baseUserBiz.selectList(param);
        return new ObjectRestResponse<BaseUser>().rel(true).result(gu);
    }
    @GetMapping("ugroup/list")
    public List<BaseUgroup> ugroupList(String ugroupname,Integer ugrouptype) {
        Map e = new HashMap();
        e.put("ugrouptype",ugrouptype);
        if(StringUtils.isNotBlank(ugroupname)){
            e.put("ugroupname", "%" + ugroupname + "%");
        }
        return baseUgroupBiz.selectList(e);
    }
    @PostMapping("ugroup/edit")
    public JsonResult ugroupEdit(BaseUgroup baseugroup) {
        if (baseugroup.getUgroupid()==null) {
            //新增
            if(baseugroup.getParentid()==null){
                baseugroup.setParentid(-1);//如果不选择上级用户组，则默认是根用户组
            }
            baseUgroupBiz.insert(baseugroup);
            return new JsonResult("添加成功", true);
        }else {
            //修改
            baseUgroupBiz.update(baseugroup);
            return new JsonResult("修改成功", true);
        }

    }

    @PostMapping("ugroup/del")
    public JsonResult menuDel(String ids) {
        if (StringUtils.isNotEmpty(ids)) {
            Map map=new HashMap();
            map.put("Where_IdsStr", ids);
            baseUgroupBiz.deleteMap(map);
        }

        return new JsonResult("删除成功", true);
    }

    @GetMapping("ugroup/authorityTreeByUser")
    @ResponseBody
    public List<AuthorityMenuTree> authorityTreeByUser(Integer parentid){
        BaseUser user=getCurrentUser();
        if ("admin".equals(user.getUsername())) {
            List<AuthorityMenuTree> trees = new ArrayList<AuthorityMenuTree>();
            AuthorityMenuTree node = null;
            Map e=new HashMap();
            List<BaseMenu> menulist= baseMenuBiz.selectList(e);
            for (BaseMenu menu : menulist) {
                node = new AuthorityMenuTree();
                node.setText(menu.getTitle());
                BeanUtils.copyProperties(menu, node);
                trees.add(node);
            }
            return TreeUtil.bulid(trees, parentid);
        }else {
            List<AuthorityMenuTree> trees = new ArrayList<AuthorityMenuTree>();
            int userid = user.getUserid();
            AuthorityMenuTree node = null;
            List<BaseMenu> menulist=baseMenuBiz.getUserAuthorityMenuByUserId(userid);
            for (BaseMenu menu : menulist) {
                node = new AuthorityMenuTree();
                node.setText(menu.getTitle());
                BeanUtils.copyProperties(menu, node);
                trees.add(node);
            }
            return TreeUtil.bulid(trees, parentid);
        }
    }
    @RequestMapping(value = "ugroup/{ugroupid}/authority/menu", method = RequestMethod.GET)
    @ResponseBody
    public ObjectRestResponse<List<AuthorityMenuTree>> getMenuAuthority(@PathVariable int ugroupid) {
        return new ObjectRestResponse().result(baseMenuBiz.getAuthorityMenu(ugroupid)).rel(true);
    }
    @RequestMapping(value = "ugroup/{ugroupid}/{ugrouptype}/authority/menu", method = RequestMethod.POST)
    @ResponseBody
    public ObjectRestResponse modifiyMenuAuthority(@PathVariable int ugroupid,@PathVariable int ugrouptype, String menuTrees) {
        BaseUser user=getCurrentUser();
        Map a = new HashMap();
        a.put("ugroupid", ugroupid);
        String authoritytype;
        if(ugrouptype==1){
            authoritytype="ugroup";
        }else if(ugrouptype==2){
            authoritytype="department";
        }else{
            authoritytype="self";
        }
        List<AuthorityMenuTree> menus = JSONObject.parseArray(menuTrees, AuthorityMenuTree.class);
        baseMenuBiz.modifyAuthorityMenu(user.getUserid(),ugroupid,authoritytype, menus);
        return new ObjectRestResponse().rel(true);
    }

}
