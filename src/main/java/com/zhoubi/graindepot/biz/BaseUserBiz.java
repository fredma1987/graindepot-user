package com.zhoubi.graindepot.biz;import com.zhoubi.graindepot.bean.BaseUser;import com.zhoubi.graindepot.mapper.BaseUserMapper;import com.zhoubi.graindepot.base.BaseMapper;import com.zhoubi.graindepot.base.BaseService;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Service;@Servicepublic class BaseUserBiz extends BaseService<BaseUser>  {	@Autowired	private BaseUserMapper BaseUserMapper;	@Override	protected BaseMapper<BaseUser> getMapper() {		return BaseUserMapper;	}	public int updateUserInfo(BaseUser item){		return BaseUserMapper.updateUserInfo(item);	}}