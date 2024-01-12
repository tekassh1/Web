package backend.security;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.io.IOException;

@Component
public class JWTInterceptor implements HandlerInterceptor {

    @Autowired
    private JWTProvider jwtProvider;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws IOException {

        String accessToken = request.getHeader("accessToken");
        String username = request.getHeader("username");

        if (accessToken == null || !jwtProvider.validateAccessToken(username, accessToken)) {
            response.sendError(HttpStatus.UNAUTHORIZED.value(), "Wrong access token!");
            return false;
        }
        else {
            response.setStatus(HttpStatus.OK.value());
            return true;
        }
    }
}