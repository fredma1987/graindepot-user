package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.bean.BaseUser;
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
public class PageController {
    @Autowired
    private BaseUserBiz baseUserBiz;

    @GetMapping("/user")
    public String toUser(Model model) {
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
    public String toEdit(Model model,Integer id) {
        String title = "编辑用户";
        BaseUser baseUser = new BaseUser();
        if (id != null) {
            baseUser = baseUserBiz.selectById(id);
        }
        model.addAttribute("title", title);
        model.addAttribute("item", baseUser);
        String path = "/user/edit";
        return path;
    }


}
