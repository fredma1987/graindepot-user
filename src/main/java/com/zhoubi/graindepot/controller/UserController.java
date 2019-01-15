package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.base.PagerModel;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.bean.UserBean;
import com.zhoubi.graindepot.biz.BaseUserBiz;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by zhanghao on 2019/1/9.
 */
@RestController("")
public class UserController extends BaseController{
    @Autowired
    private BaseUserBiz baseUserBiz;

    @GetMapping("user/list/page")
    public PagerModel userPageList(int start, int length, String username) {
        BaseUser currentUser = getCurrentUser();
        PagerModel<BaseUser> e = new PagerModel();
        e.addOrder("createtime desc");
        e.setStart(start);
        e.setLength(length);
        if (StringUtils.isNotEmpty(username)) {
            e.putWhere("username", "%" + username + "%");
        }
        PagerModel<BaseUser> result = baseUserBiz.selectListByPage(e);
        return result;
    }

    @PostMapping("user/edit")
    public JsonResult userEdit(BaseUser baseUser) {
        if (baseUser.getUserid()==0) {
            //新增
            baseUser.setRelpass(baseUser.getPassword());
            //默认密码123456
            String password = new BCryptPasswordEncoder(12).encode("123456");
            baseUser.setPassword(password);
            if (StringUtils.isNotEmpty(baseUser.getBirthdayStr())) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    baseUser.setBirthday(sdf.parse(baseUser.getBirthdayStr()));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            baseUser.setCreatetime(new Date());
            baseUserBiz.insert(baseUser);
            return new JsonResult("添加成功", true);
        }else {
            //修改
            if (StringUtils.isNotEmpty(baseUser.getBirthdayStr())) {
                try {
                    SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                    baseUser.setBirthday(sdf.parse(baseUser.getBirthdayStr()));
                } catch (ParseException e) {
                    e.printStackTrace();
                }
            }
            baseUser.setUpdatetime(new Date());
            baseUserBiz.updateUserInfo(baseUser);
            return new JsonResult("修改成功", true);
        }

    }

    @PostMapping("user/del")
    public JsonResult userDel(String ids) {
        if (StringUtils.isNotEmpty(ids)) {
            Map map=new HashMap();
            map.put("Where_IdsStr", ids);
         //   baseUserBiz.deleteMap(map);
        }

        return new JsonResult("删除成功", true);
    }



}
