package backend.repository;

import backend.model.entities.User;
import org.springframework.context.annotation.Bean;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsersRepository extends CrudRepository<User, Long> {

    @Override
    Optional<User> findById(Long aLong);

    boolean existsByUsername(String username);

    User findByUsername(String username);


}