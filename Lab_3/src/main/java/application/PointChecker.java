package application;

import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.FacesValidator;
import jakarta.faces.validator.Validator;
import jakarta.faces.validator.ValidatorException;
import jakarta.inject.Named;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

@Named
@SessionScoped
@FacesValidator
public class PointChecker implements Serializable, Validator {

    @NotNull(message = "Request should contains \"x\" value")
    private Integer x;

    @NotNull(message = "Request should contains \"y\" value")
    private Integer y;

    @NotNull(message = "Request should contains \"r\" value")
    private Integer r;

    private final Integer xMin = -5;
    private final Integer yMin = -5;
    private final Integer rMin = 1;

    private final Integer xMax = 3;
    private final Integer yMax = 5;
    private final Integer rMax = 5;

    public String goToResultPage(){
        return "WEB-INF/testPage";
    }

    public Integer getX() {
        return x;
    }

    public void setX(Integer x) {
        this.x = x;
    }

    public Integer getY() {
        return y;
    }

    public void setY(Integer y) {
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

    @Override
    public void validate(FacesContext facesContext, UIComponent uiComponent, Object o) throws ValidatorException {

    }
}
