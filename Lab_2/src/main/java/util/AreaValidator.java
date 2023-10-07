package util;

import data.UserRequestData;

public class AreaValidator {
    public static boolean checkArea(UserRequestData values) {
        double x = values.getX();
        double y = values.getY();
        double r = values.getR();

        return checkRectangle(x, y, r) && checkSector(x, y, r) && checkTriangle(x, y, r);
    }

    private static boolean checkRectangle(double x, double y, double r) {
        return (x >= 0) && (x <= r) && (y <= r/2) && (y >= 0);
    }

    private static boolean checkTriangle(double x, double y, double r) {
        return (x <= 0) && (y >= 0) && (y <= (x+r)/2);
    }

    private static boolean checkSector(double x, double y, double r) {
        return (x <= 0) && (y <= 0) && (Math.pow(x, 2) + Math.pow(y, 2) <= r);
    }
}
