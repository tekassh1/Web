package backend.repository;

import backend.model.entities.Point;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PointsRepository extends CrudRepository<Point, Long> {

}