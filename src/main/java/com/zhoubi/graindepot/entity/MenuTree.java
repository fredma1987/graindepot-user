package com.zhoubi.graindepot.entity;


import java.util.List;

/**
 * Created by Ace on 2017/6/12.
 */
public class MenuTree extends TreeNode{
    String title;
    String href;
    boolean spread = false;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public boolean isSpread() {
        return spread;
    }

    public void setSpread(boolean spread) {
        this.spread = spread;
    }

}
