package com.zhoubi.graindepot.rpc;


import com.zhoubi.graindepot.biz.UserBiz;
import com.zhoubi.graindepot.controller.BaseController;
import com.zhoubi.graindepot.entity.User;
import com.zhoubi.graindepot.entity.UserInfo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

/**
 * ${DESCRIPTION}
 *
 * @author administrator
 * @create 2017-07-01 14:39
 */
@Controller
@RequestMapping("api")
public class UserService extends BaseController<UserBiz, User> {
    @Autowired
    private UserBiz userBiz;

    @RequestMapping(value = "/user/username/{username}", method = RequestMethod.GET, produces = "application/json")
    @ResponseBody
    public UserInfo getUserByUsername(@PathVariable("username") String username) {
        UserInfo info = new UserInfo();
        User user = userBiz.getUserByUsername(username);

        BeanUtils.copyProperties(user, info);
        info.setId(user.getId());
        return info;
    }
}
