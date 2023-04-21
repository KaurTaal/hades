package ut.ee.hades.app.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class AuthUtils {

    private AuthUtils() {

    }

    public static boolean isValidEmail(String email) {
        String regex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);
        return matcher.matches();
    }
}
