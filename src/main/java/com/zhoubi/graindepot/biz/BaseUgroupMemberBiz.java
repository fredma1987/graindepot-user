package com.zhoubi.graindepot.biz;import com.zhoubi.graindepot.bean.BaseUgroupMember;import com.zhoubi.graindepot.mapper.BaseUgroupMemberMapper;import com.zhoubi.graindepot.base.BaseMapper;import com.zhoubi.graindepot.base.BaseService;import org.apache.commons.lang.StringUtils;import org.springframework.beans.factory.annotation.Autowired;import org.springframework.stereotype.Service;import java.util.ArrayList;import java.util.HashMap;import java.util.List;import java.util.Map;@Servicepublic class BaseUgroupMemberBiz extends BaseService<BaseUgroupMember>  {	@Autowired	private BaseUgroupMemberMapper BaseUgroupMemberMapper;	@Override	protected BaseMapper<BaseUgroupMember> getMapper() {		return BaseUgroupMemberMapper;	}	public void modifyGroupUsers(Integer ugroupid, String members) {		Map map=new HashMap();		if (StringUtils.isNotEmpty(members)&&ugroupid!=null) {			map.put("Where_ugroupid", ugroupid);			BaseUgroupMemberMapper.deleteMap(map);			List<BaseUgroupMember> list=new ArrayList();			String[] mem = members.split(",");			for(String m:mem){				BaseUgroupMember um=new BaseUgroupMember();				um.setUgroupid(ugroupid);				um.setUserid(Integer.valueOf(m));				um.setIsleader((short) 0);				list.add(um);			}			BaseUgroupMemberMapper.insertList(list);		}	}}