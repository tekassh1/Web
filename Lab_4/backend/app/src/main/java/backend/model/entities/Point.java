package backend.model.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.sql.Date;

@Entity
@Table(name = "points")
public class Point {
    @Id
    @GeneratedValue
    @SequenceGenerator(name = "user_requests_seq", allocationSize = 1)
    @Column(name = "id")
    @JsonIgnore
    private Long point_id;

    @Column(name = "x", nullable = false)
    private Double x;

    @Column(name = "y", nullable = false)
    private Double y;

    @Column(name = "r", nullable = false)
    private Double r;

    @Column(name = "result", nullable = false)
    private Boolean result;

    @Column(name = "request_time", nullable = false)
    @JsonFormat(pattern = "HH:mm:ss, dd:MM:yyyy", timezone="Europe/Moscow")
    private Date requestTime;

    @Column(name = "executeion_time", nullable = false)
    private Double executionTime;

    @ManyToOne
    @JoinColumn(name="user_id")
    @JsonIgnore
    private User user;

    public Point(Long id, Double x, Double y, Double r, Boolean result, Date requestTime, Double executionTime) {
        this.point_id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.result = result;
        this.requestTime = requestTime;
        this.executionTime = executionTime;
    }

    public Point() {}

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

    public Double getR() {
        return r;
    }

    public void setR(Double r) {
        this.r = r;
    }

    public boolean getResult() {
        return result;
    }

    public void setResult(Boolean result) {
        this.result = result;
    }

    public Date getRequestTime() {
        return requestTime;
    }

    public void setRequestTime(Date requestTime) {
        this.requestTime = requestTime;
    }

    public Double getExecutionTime() {
        return executionTime;
    }

    public void setExecutionTime(double executionTime) {
        this.executionTime = executionTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}