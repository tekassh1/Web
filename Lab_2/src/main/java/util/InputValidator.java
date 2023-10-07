package util;

import data.UserRequestData;

import java.util.Arrays;

public class InputValidator {
    public static boolean validateValues(UserRequestData values) {
        double x = values.getX();
        double y = values.getY();
        double r = values.getR();

        double[] acceptableX = {-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2};
        double[] acceptableR = {1, 2, 3, 4, 5};

        return Arrays.stream(acceptableX).anyMatch(a -> a == x) &&
                Arrays.stream(acceptableR).anyMatch(a -> a == r) &&
                (y <= 3 && y >= -3);
    }
}
