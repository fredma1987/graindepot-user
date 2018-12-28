package com.zhoubi.graindepot.rpc;


import com.alibaba.fastjson.JSON;
import com.zhoubi.graindepot.bean.UserBean;
import com.zhoubi.graindepot.biz.UserBiz;
import com.zhoubi.graindepot.controller.BaseController;
import com.zhoubi.graindepot.entity.User;
import com.zhoubi.graindepot.entity.UserInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

/**
 * ${DESCRIPTION}
 *
 * @author administrator
 * @create 2017-07-01 14:39
 */
@Controller
@RequestMapping("api")
public class UserService {
    @Autowired
    private UserBiz userBiz;

    @RequestMapping(value = "/user/username/{username}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public UserBean getUserByUsername(@PathVariable("username") String username) {
        UserBean user = userBiz.getUserByUsername(username);
        return user;
    }

    @RequestMapping(value = "/feignTest", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public String feignTest(HttpSession session) {
        UserBean user=(UserBean)session.getAttribute("currentUser");
        return "hello world feign:"+session.getId()+"  "
                +session.getAttribute("test")+"  "+ JSON.toJSONString(user);
    }
}
