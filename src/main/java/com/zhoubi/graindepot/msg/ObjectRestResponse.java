package com.zhoubi.graindepot.msg;

/**
 * Created by Administrator on 2018-12-5.
 */
public class ObjectRestResponse <T> {
    boolean rel;
    String msg;
    T result;

    public boolean isRel() {
        return rel;
    }

    public void setRel(boolean rel) {
        this.rel = rel;
    }

    public String getMsg() {
        return msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public T getResult() {
        return result;
    }

    public void setResult(T result) {
        this.result = result;
    }

    public ObjectRestResponse rel(boolean rel) {
        this.setRel(rel);
        return this;
    }

    public ObjectRestResponse msg(String msg) {
        this.setMsg(msg);
        return this;
    }

    public ObjectRestResponse result(T result) {
        this.setResult(result);
        return this;
    }

    public ObjectRestResponse(boolean rel, T result, String msg) {
        this.rel = rel;
        this.msg = msg;
        this.result = result;
    }

    public ObjectRestResponse(boolean rel, T result) {
        this.rel = rel;
        this.result = result;
    }

    public ObjectRestResponse() {
    }
}
