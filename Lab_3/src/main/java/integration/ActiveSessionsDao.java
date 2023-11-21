package integration;

import data.ActiveSession;
import data.UserRequest;
import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.SessionScoped;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.NoResultException;
import jakarta.persistence.Query;
import jakarta.servlet.http.HttpSession;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

@Named
@SessionScoped
public class ActiveSessionsDao implements Serializable {
    @Inject
    private DatabaseManager dbManager;

    private EntityManager em;

    private String sessionId;

    @PostConstruct
    public void init(){
        em = dbManager.generateEntityManager();
        sessionId = getSessionId();
    }

    private String getSessionId() {
        FacesContext ctx = FacesContext.getCurrentInstance();
        HttpSession session = (HttpSession) ctx.getExternalContext().getSession(false);
        return session.getId();
    }

    public List<ActiveSession> getActive() {
        return em.createQuery("SELECT a from ActiveSession a", ActiveSession.class).getResultList();
    }

    public Set<UserRequest> getRequests() {

        Query query = em.createQuery("FROM ActiveSession where sessionID=:sessionId")
                .setParameter("sessionId", sessionId);
        ActiveSession sessionObj = (ActiveSession) query.getSingleResult();

        return sessionObj.getRequests();
    }

    public void saveRequest(UserRequest request) {
        em.getTransaction().begin();

        ActiveSession currentSession;
        Query query = em.createQuery("FROM ActiveSession where sessionID=:sessionId")
                .setParameter("sessionId", sessionId);
        try {
            currentSession = (ActiveSession) query.getSingleResult();
        }
        catch (NoResultException e) {
            currentSession = new ActiveSession();
            currentSession.setSessionID(sessionId);
            em.persist(currentSession);
        }
        currentSession.getRequests().add(request);

        em.getTransaction().commit();
    }

    @PreDestroy
    public void removeActive() {
        em.getTransaction().begin();

        em.createQuery("delete from ActiveSession a where a.sessionID=:sessionID")
                .setParameter("sessionID", sessionId)
                .executeUpdate();

        em.getTransaction().commit();
    }
}