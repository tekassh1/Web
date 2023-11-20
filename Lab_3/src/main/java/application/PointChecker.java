package application;

import integration.DatabaseManager;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

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

    @Inject
    DatabaseManager databaseManager;

    public String goToResultPage(){
        FacesContext ctx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) ctx.getExternalContext().getSession(false);
        String sessionId = session.getId();

        System.out.println(sessionId);
        System.out.println(databaseManager.getEntityManager());
        return "testPage?faces-redirect=true";
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
