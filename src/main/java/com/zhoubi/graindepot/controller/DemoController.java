package com.zhoubi.graindepot.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.zhoubi.graindepot.bean.UserBean;
import com.zhoubi.graindepot.entity.User;
import com.zhoubi.graindepot.mapper.UserMapper;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextImpl;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by zhanghao on 2018/12/28.
 */
@Controller
public class DemoController {
    @Autowired
    private UserMapper userMapper;

    @GetMapping("test")
    @ResponseBody
    public String test(HttpSession session){
        session.setAttribute("test","abc");
        UserBean user=(UserBean)session.getAttribute("currentUser");
        return "hello world user:"+session.getId()+"  "+ JSON.toJSONString(user);
    }
    @GetMapping("list")
    @ResponseBody
    public List list(){
        return userMapper.listUser();
    }

    @GetMapping("one")
    @ResponseBody
    public UserBean getUserByUsername(String username) {
        return userMapper.userByUsername(username);
    }

    @GetMapping("table")
    public String table(){
        return "/demo/table";
    }
    @GetMapping("table2")
    public String table2(){
        return "table2";
    }

    @GetMapping("tableList")
    @ResponseBody
    public Map tableList(HttpServletRequest request,String username){
        Map param=new HashMap();
        if (StringUtils.isNoneEmpty(username)) {
            param.put("username","%"+username+"%");
        }
        param.put("offset",Integer.valueOf(request.getParameter("start")));
        param.put("pageSize",Integer.valueOf(request.getParameter("length")));

        List<UserBean> userBeanList=userMapper.selectPageList(param);
        Integer count=userMapper.selectPageCount(param);
        Map result=new HashMap();
        //result.put("draw",1);
        result.put("recordsTotal",count);
        result.put("recordsFiltered",count);
        result.put("data",userBeanList);
        return result;
    }


    @PostMapping("tableListPost")
    @ResponseBody
    public List tableListPost(HttpServletRequest request){
        List<UserBean> userBeanList=userMapper.listUser();
        return userBeanList;
    }


    @GetMapping("userById")
    @ResponseBody
    public List userById(Integer id){
        List<UserBean> userBeanList=userMapper.listUser();
        List<UserBean> result=new ArrayList<UserBean>();
        for (UserBean u:userBeanList) {
            if (u.getId()==id) {
                result.add(u);
            }
        }
        return result;
    }

}
