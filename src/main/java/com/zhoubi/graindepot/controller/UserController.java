package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.base.PagerModel;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.biz.BaseUserBiz;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by zhanghao on 2019/1/9.
 */
@RestController("")
public class UserController {
    @Autowired
    private BaseUserBiz baseUserBiz;

    @GetMapping("user/list/page")
    public PagerModel userPageList(int start, int length, String username) {
        PagerModel<BaseUser> e = new PagerModel();
        e.setStart(start);
        e.setLength(length);
        if (StringUtils.isNotEmpty(username)) {
            e.putWhere("username", "%" + username + "%");
        }
        PagerModel<BaseUser> result = baseUserBiz.selectListByPage(e);
        return result;
    }


}
