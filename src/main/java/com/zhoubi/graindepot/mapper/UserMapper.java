package com.zhoubi.graindepot.mapper;

import com.zhoubi.graindepot.entity.User;
import org.apache.ibatis.annotations.Param;
import tk.mybatis.mapper.common.Mapper;

/**
 * Created by Administrator on 2018-12-5.
 */
public interface UserMapper extends Mapper<User> {
    User getUserById(@Param("id") Integer id);
}
