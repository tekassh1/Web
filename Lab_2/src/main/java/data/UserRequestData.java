package data;

import java.io.Serializable;

public class UserRequestData implements Serializable {
    double x;
    double y;
    double r;

    long reqStartTime;

    String requestTime;
    String executionTime;
    boolean checkResult;

    public UserRequestData(double x, double y, double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public UserRequestData(double x, double y, double r, long reqStartTime, String requestTime,
                           String executionTime, boolean checkResult) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.reqStartTime = reqStartTime;
        this.requestTime = requestTime;
        this.executionTime = executionTime;
        this.checkResult = checkResult;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public String getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(String requestTime) {
        this.requestTime = requestTime;
    }

    public String getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }

    public boolean isCheckResult() {
        return checkResult;
    }

    public void setCheckResult(boolean checkResult) {
        this.checkResult = checkResult;
    }

    public long getReqStartTime() {
        return reqStartTime;
    }

    public void setReqStartTime(long reqStartTime) {
        this.reqStartTime = reqStartTime;
    }
}