package backend.model.http;

public class AuthRequest {
    private String authType;
    private String username;
    private String password;

    public AuthRequest(String authType, String username, String password) {
        this.authType = authType;
        this.username = username;
        this.password = password;
    }

    public AuthRequest() {}

    public String getAuthType() {
        return authType;
    }

    public void setAuthType(String authType) {
        this.authType = authType;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
