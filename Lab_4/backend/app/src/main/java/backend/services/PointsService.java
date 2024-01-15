package backend.services;

import backend.model.entities.Point;
import backend.model.entities.User;
import backend.model.http.PointRequest;
import backend.repository.PointsRepository;
import backend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class PointsService {

    private UsersRepository usersRepository;
    private PointsRepository pointsRepository;

    public PointsService(@Autowired UsersRepository usersRepository,
                         @Autowired PointsRepository pointsRepository) {
        this.usersRepository = usersRepository;
        this.pointsRepository = pointsRepository;
    }

    public Point performPoint(String username, Long requestTime, PointRequest point) {
        boolean result = checkRectangle(point) || checkTriangle(point) || checkSector(point);

        Point pointRes = new Point();
        pointRes.setX(point.getX());
        pointRes.setY(point.getY());
        pointRes.setR(point.getR());
        pointRes.setResult(result);

        SimpleDateFormat sdf = new SimpleDateFormat("hh:mm:ss, dd:MM:yyyy");
        Date date = new Date(requestTime);

        System.out.println(sdf.format(date));

        pointRes.setRequestTime(date);
        pointRes.setExecutionTime(System.currentTimeMillis() - requestTime);

        savePoint(username, pointRes);
        return pointRes;
    }

    private boolean checkRectangle(PointRequest point) {
        Double x = point.getX();
        Double y = point.getY();
        Double r = point.getR();
        return (x <= 0) && (y >= 0) && (x >= (-r / 2)) && (y <= r);
    }

    private boolean checkTriangle(PointRequest point) {
        Double x = point.getX();
        Double y = point.getY();
        Double r = point.getR();

        return (x >= 0) && (y <= 0) && (y >= (x - r));
    }

    private boolean checkSector(PointRequest point) {
        Double x = point.getX();
        Double y = point.getY();
        Double r = point.getR();

        return (x >= 0) && (y >= 0) && ((Math.pow(x, 2) + Math.pow(y, 2)) <= Math.pow(r / 2, 2));
    }

    public void savePoint(String username, Point point) {
        User user = usersRepository.findByUsername(username);
        point.setUser(user);
        pointsRepository.save(point);
    }

    public List<Point> getUserPoints(String username) {
        User user = usersRepository.findByUsername(username);
        return user.getRequests();
    }
}