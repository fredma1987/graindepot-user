package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.bean.BaseMenu;
import com.zhoubi.graindepot.bean.BaseResourceAuthority;
import com.zhoubi.graindepot.bean.BaseUgroup;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.biz.BaseMenuBiz;
import com.zhoubi.graindepot.biz.BaseResourceAuthorityBiz;
import com.zhoubi.graindepot.biz.BaseUgroupBiz;
import com.zhoubi.graindepot.biz.BaseUserBiz;
import com.zhoubi.graindepot.entity.AuthorityMenuTree;
import com.zhoubi.graindepot.msg.ObjectRestResponse;
import com.zhoubi.graindepot.util.TreeUtil;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * Created by Administrator on 2019/2/20/020.
 */
@RestController("")
public class BaseResourceAuthController extends BaseController {
    @Autowired
    private BaseResourceAuthorityBiz baseResourceAuthorityBiz;

    @PostMapping("resourceauthority/insertList")
    public JsonResult insertList(@RequestParam Map param) {
        BaseUser user=getCurrentUser();
        List<BaseResourceAuthority> list=new ArrayList<BaseResourceAuthority>();
        if(param!=null){
            String resourceids[]=param.get("resourceids").toString().split(",");
            String resourcetypes[]=param.get("resourcetypes").toString().split(",");
            for(int i=0;i<resourceids.length;i++){
                BaseResourceAuthority r=new BaseResourceAuthority();
                r.setUgroupid(Integer.valueOf(param.get("ugroupid").toString()));
                r.setAuthoritytype(param.get("authoritytype").toString());
                r.setResourceid(Integer.valueOf(resourceids[i]));
                r.setResourcetype(resourcetypes[i]);
                r.setCreatetime(new Date());
                r.setCreateuserid(user.getUserid());
                list.add(r);
            }
        }
        Map m=new HashMap();
        m.put("Where_ugroupid",Integer.valueOf(param.get("ugroupid").toString()));
        m.put("Where_authoritytype",param.get("authoritytype").toString());
        m.put("Where_resourcetype_no","menu");
        baseResourceAuthorityBiz.deleteMap(m);
        baseResourceAuthorityBiz.insertList(list);
        return new JsonResult("资源授权成功", true);
    }
}
