package application;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Named;

import java.io.Serializable;

@Named
@SessionScoped
public class PointChecker implements Serializable {
    public String getName(){
        return "This is unbelievable name!";
    }
}
