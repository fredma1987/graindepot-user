package com.zhoubi.graindepot.controller;

import com.zhoubi.graindepot.base.JsonResult;
import com.zhoubi.graindepot.bean.BaseUgroup;
import com.zhoubi.graindepot.bean.BaseUser;
import com.zhoubi.graindepot.biz.BaseUgroupBiz;
import com.zhoubi.graindepot.biz.BaseUgroupMemberBiz;
import com.zhoubi.graindepot.biz.BaseUserBiz;
import com.zhoubi.graindepot.msg.ObjectRestResponse;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Administrator on 2019/2/20/020.
 */
@RestController("")
public class BaseUgroupMemberController extends BaseController {
    @Autowired
    private BaseUgroupMemberBiz baseUgroupMemberBiz;
    @PostMapping("ugroupmember/{ugroupid}/user")
    @ResponseBody
    public ObjectRestResponse modifiyUsers(@PathVariable Integer ugroupid, String members) {
        if(ugroupid!=null&&members!=null) {
            baseUgroupMemberBiz.modifyGroupUsers(ugroupid, members);
            return new ObjectRestResponse().rel(true);
        }else{
            return new ObjectRestResponse().rel(false);
        }
    }
    @GetMapping("ugroupmember/list")
    public List<BaseUgroup> ugroupmemberList() {
        Map e = new HashMap();
        return baseUgroupMemberBiz.selectList(e);
    }
    @PostMapping("ugroupmember/del")
    public JsonResult ugroupmemberDel(String ids) {
        if (StringUtils.isNotEmpty(ids)) {
            Map map=new HashMap();
            map.put("Where_IdsStr", ids);
            baseUgroupMemberBiz.deleteMap(map);
        }

        return new JsonResult("删除成功", true);
    }
}
