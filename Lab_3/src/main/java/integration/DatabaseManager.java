package integration;

import jakarta.annotation.PostConstruct;
import jakarta.annotation.PreDestroy;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Named;
import jakarta.persistence.EntityManager;
import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import jakarta.persistence.PersistenceException;

@Named
@ApplicationScoped
public class DatabaseManager {
    private EntityManagerFactory emf;

    @PostConstruct
    public void init() {
        try {
            emf = Persistence.createEntityManagerFactory("mainUnit");
            if (emf == null) throw new PersistenceException();
        }
        catch (PersistenceException e) {
            System.err.println("Database connection error! Check credentials.");
            System.exit(1);
        }
    }

    public synchronized EntityManager generateEntityManager(){
        return emf.createEntityManager();
    }

    @PreDestroy
    public void closeConnection(){
        if (emf!= null && emf.isOpen())
            emf.close();
    }
}