package application;

import java.time.LocalDateTime;

public class HitResult {
    private Double x;
    private Double y;
    private Integer r;

    private boolean result;
    private LocalDateTime requestTime;
    private Double executionTime;

    public HitResult(Double x, Double y, Integer r, boolean result, LocalDateTime requestTime, Double executionTime) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.requestTime = requestTime;
        this.executionTime = executionTime;
    }

    public Double getX() {
        return x;
    }

    public void setX(Double x) {
        this.x = x;
    }

    public Double getY() {
        return y;
    }

    public void setY(Double y) {
        this.y = y;
    }

    public Integer getR() {
        return r;
    }

    public void setR(Integer r) {
        this.r = r;
    }

    public boolean isResult() {
        return result;
    }

    public void setResult(boolean result) {
        this.result = result;
    }

    public LocalDateTime getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(LocalDateTime requestTime) {
        this.requestTime = requestTime;
    }

    public Double getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(Double executionTime) {
        this.executionTime = executionTime;
    }
}
