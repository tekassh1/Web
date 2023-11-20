package data;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "active_sessions")
public class ActiveSession {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "session_id")
    private String sessionID;

    @OneToMany
    @JoinColumn(name = "session_id")
    private Set<UserRequest> requests;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getSessionID() {
        return sessionID;
    }

    public void setSessionID(String sessionID) {
        this.sessionID = sessionID;
    }

    public Set<UserRequest> getRequests() {
        return requests;
    }

    public void setRequests(Set<UserRequest> requests) {
        this.requests = requests;
    }
}