package data;

import jakarta.ejb.Stateful;
import jakarta.enterprise.context.SessionScoped;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Stateful
@SessionScoped
public class UserSessionBean implements Serializable {
    private List<UserRequestData> recentRequests;

    public UserSessionBean(){
        recentRequests = new ArrayList<>();
    };

    public void addNewResult(UserRequestData data) {
        recentRequests.add(0, data);
    }

    public List<UserRequestData> getRecentRequests() {
        return recentRequests;
    }

    public void setRecentRequests(List<UserRequestData> recentRequests) {
        this.recentRequests = recentRequests;
    }
}