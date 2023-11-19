package integration;

import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;

@Named
@ApplicationScoped
public class DatabaseManager {
    private EntityManagerFactory emf = Persistence.createEntityManagerFactory( "mainUnit" );

    public EntityManagerFactory getEmf() {
        return emf;
    }

    public EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
}