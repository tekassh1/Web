package data;

import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "active_sessions")
public class ActiveSession {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "session_id", unique = true)
    private String sessionID;

    @OneToMany(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "session_id", nullable = false)
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<UserRequest> requests = new ArrayList<>();

    public Long getId() {
        return id;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public List<UserRequest> getRequests() {
        return requests;
    }

    public void addRequest(UserRequest request) {
        requests.add(request);
    }
}