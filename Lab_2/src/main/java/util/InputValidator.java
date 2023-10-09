package util;

import data.UserRequestData;

import java.util.Arrays;

public class InputValidator {
    public static boolean validateInput(UserRequestData values) {
        double[] acceptableR = {1, 2, 3, 4, 5};
        if (values.getClicked() != 1 && values.getClicked() != 0) throw new NumberFormatException();
        return Arrays.stream(acceptableR).anyMatch(a -> a == values.getR());
    }
}
