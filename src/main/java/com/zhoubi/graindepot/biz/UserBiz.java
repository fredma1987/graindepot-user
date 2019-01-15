package com.zhoubi.graindepot.biz;

import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.bean.UserBean;
import com.zhoubi.graindepot.constant.UserConstant;
import com.zhoubi.graindepot.entity.User;
import com.zhoubi.graindepot.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2018-12-5.
 */
@Service
public class UserBiz {
    @Autowired
    private UserMapper userMapper;

    /**
     * 根据用户名获取用户信息
     *
     * @param username
     * @return
     */
    public BaseUser getUserByUsername(String username) {
        return userMapper.userByUsername(username);
    }

    public List<UserBean> selectPageList(Map map){
        return userMapper.selectPageList(map);
    }

    public Integer selectPageCount(Map map){
        return userMapper.selectPageCount(map);
    }

}
