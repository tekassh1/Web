package application;

import data.UserRequest;
import integration.ActiveSessionsDao;
import jakarta.annotation.PostConstruct;
import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.sql.Timestamp;

@Named
@SessionScoped
public class PointChecker implements Serializable {

    @NotNull(message = "Request should contains \"x\" value")
    private Double x;

    @NotNull(message = "Request should contains \"y\" value")
    private Double y;

    @NotNull(message = "Request should contains \"r\" value")
    private Integer r;

    private final Integer xMin = -5;
    private final Integer yMin = -5;
    private final Integer rMin = 1;

    private final Integer xMax = 3;
    private final Integer yMax = 5;
    private final Integer rMax = 5;

    private Timestamp requestTime;
    private long requestStartedTime;

    @Inject
    DataValidator dataValidator;
    @Inject
    ActiveSessionsDao activeSessionsDao;

    public String processRequest(){
        startTimer();

        if (!dataValidator.isDataCorrect(x, y, r)) return "errorPage?faces-redirect=true";
        boolean result = isPointInArea(x, y, r);

        UserRequest request = new UserRequest();
        request.setRequestTime(requestTime);
        request.setX(x);
        request.setY(y);
        request.setR(r);
        request.setResult(result);
        double duration = requestStartedTime - System.currentTimeMillis();
        request.setExecutionTime(duration);

        activeSessionsDao.saveRequest(request);

        return "testPage?faces-redirect=true";
    }

    private void startTimer(){
        requestStartedTime = System.currentTimeMillis();
        requestTime = new Timestamp(requestStartedTime);
    }

    private boolean isPointInArea(Double x, Double y, Integer r) {
        return checkRectangle(x, y, r) || checkTriangle(x, y, r) || checkArc(x, y, r);
    }

    private boolean checkRectangle(Double x, Double y, Integer r){
        return x <= 0 && x >= ((double) -r /2) && y <= r && y >= 0;
    }

    private boolean checkTriangle(Double x, Double y, Integer r) {
        return x >= 0 && y >= 0 && y <= (r - 2*x);
    }

    private boolean checkArc(Double x, Double y, Integer r) {
        return x <= 0 && y <= 0 && (Math.pow(x, 2) + Math.pow(y, 2) <= Math.pow(r, 2));
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

    public Integer getxMin() {
        return xMin;
    }

    public Integer getyMin() {
        return yMin;
    }

    public Integer getrMin() {
        return rMin;
    }

    public Integer getxMax() {
        return xMax;
    }

    public Integer getyMax() {
        return yMax;
    }

    public Integer getrMax() {
        return rMax;
    }
}
