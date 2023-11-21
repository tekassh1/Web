package data;

import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "active_sessions")
public class ActiveSession {
    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "session_id", unique = true)
    private String sessionID;

    @OneToMany(cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "session_id", nullable = false)
    private Set<UserRequest> requests = new HashSet<>();

    public Long getId() {
        return id;
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