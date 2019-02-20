package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.bean.BaseElement;
import com.zhoubi.graindepot.bean.BaseMenu;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.bean.UserBean;
import com.zhoubi.graindepot.biz.BaseElementBiz;
import com.zhoubi.graindepot.biz.BaseMenuBiz;
import com.zhoubi.graindepot.biz.BaseUserBiz;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * Created by zhanghao on 2019/1/9.
 */
@Controller
@RequestMapping("page")
public class PageController extends BaseController {
    @Autowired
    private BaseUserBiz baseUserBiz;
    @Autowired
    private BaseMenuBiz baseMenuBiz;
    @Autowired
    private BaseElementBiz baseElementBiz;

    @GetMapping("/user")
    public String toUser(Model model) {
        BaseUser currentUser = getCurrentUser();
        String title = "用户列表";
        model.addAttribute("title", title);
        String path = "/user/list";
        return path;
    }

    @GetMapping("/user/detail/{id}")
    public String toDetail(Model model, @PathVariable int id) {
        String title = "用户详情";
        BaseUser baseUser = baseUserBiz.selectById(id);
        model.addAttribute("title", title);
        model.addAttribute("item", baseUser);
        String path = "/user/detail";
        return path;
    }

    @GetMapping("/user/edit")
    public String toEdit(Model model, Integer id) {
        String title = "编辑用户";
        BaseUser baseUser = new BaseUser();
        if (id != null) {
            baseUser = baseUserBiz.selectById(id);
        }
        model.addAttribute("title", title);
        model.addAttribute("item", baseUser);
        model.addAttribute("id", id);
        String path = "/user/edit";
        return path;
    }

    @GetMapping("/menu")
    public String toMenu(Model model) {
        String title = "菜单列表";
        model.addAttribute("title", title);
        String path = "/menu/list";
        return path;
    }

    @GetMapping("/menu/detail/{id}")
    public String toMenuDetail(Model model, @PathVariable int id) {
        String title = "菜单详情";
        BaseMenu baseMenu = baseMenuBiz.selectById(id);
        model.addAttribute("title", title);
        model.addAttribute("item", baseMenu);
        String path = "/menu/detail";
        return path;
    }

    @GetMapping("/menu/edit")
    public String toMenuEdit(Model model, Integer id,Integer parentid) {
        String title = "编辑菜单";
        BaseMenu basemenu = new BaseMenu();
        if (id != null) {
            basemenu = baseMenuBiz.selectById(id);
        }
        if(parentid!=null){
            model.addAttribute("parentid", parentid);
            return "/menu/add";
        }
        model.addAttribute("title", title);
        model.addAttribute("item", basemenu);
        model.addAttribute("id", id);
        String path = "/menu/edit";
        return path;
    }
    @GetMapping("/element")
    public String toElement(Model model) {
        String title = "页面元素列表";
        model.addAttribute("title", title);
        String path = "/menu/list";
        return path;
    }

    @GetMapping("/element/detail/{id}")
    public String toElementDetail(Model model, @PathVariable int id) {
        String title = "页面元素详情";
        BaseElement baseelement = baseElementBiz.selectById(id);
        model.addAttribute("title", title);
        model.addAttribute("item", baseelement);
        String path = "/menu/detail";
        return path;
    }

    @GetMapping("/element/edit")
    public String toElementEdit(Model model, Integer id,Integer menuid) {
        String title = "编辑页面元素";
        BaseElement baseelement = new BaseElement();
        if (id != null) {
            baseelement = baseElementBiz.selectById(id);
            model.addAttribute("title", title);
            model.addAttribute("item", baseelement);
            model.addAttribute("id", id);
            String path = "/element/edit";
            return path;
        }
        if(menuid==null||menuid==0){
            model.addAttribute("title", title);
            model.addAttribute("item", baseelement);
            return "/element/addnew";
        }else{
            model.addAttribute("title", title);
            model.addAttribute("item", baseelement);
            model.addAttribute("menuid", menuid);
            return "/element/add";
        }
    }

}
