package com.zhoubi.graindepot.mapper;

import com.zhoubi.graindepot.bean.UserBean;
import com.zhoubi.graindepot.entity.User;

import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018-12-5.
 */
public interface UserMapper {
    List listUser();

    // UserBean selectOneByMap(Map map);
    //获取当前的登录用户
    UserBean userByUsername(String username);

    List<UserBean> selectPageList(Map map);

    Integer selectPageCount(Map map);
}
