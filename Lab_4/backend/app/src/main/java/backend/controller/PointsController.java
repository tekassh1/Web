package backend.controller;

import backend.model.entities.Point;
import backend.model.http.PointRequest;
import backend.repository.UsersRepository;
import backend.services.PointsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PointsController {

    private PointsService pointsService;

    public PointsController(@Autowired PointsService pointsService) {
        this.pointsService = pointsService;
    }

    @PostMapping("/checkPoint")
    public ResponseEntity<Point> checkPoint(@RequestHeader(value = "username") String username,
                                                    @RequestBody PointRequest point) {
        Long requestTime = System.currentTimeMillis();
        Point pointRes = pointsService.performPoint(username, requestTime, point);

        return ResponseEntity.ok(pointRes);
    }

    @GetMapping("/getPoints")
    public ResponseEntity<List<Point>> getPoints(@RequestHeader(value = "username") String username) {
        return ResponseEntity.ok(pointsService.getUserPoints(username));
    }
}