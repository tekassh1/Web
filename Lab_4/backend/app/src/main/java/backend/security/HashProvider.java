package backend.security;

import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class HashProvider {

    @Value("${pass.secret}") private String passSecret;

    public HashProvider() {}

    public String generateSalt() {
        return RandomStringUtils.random(16);
    }

    public String hashPass(String pass) {
        return new HmacUtils(HmacAlgorithms.HMAC_MD5, passSecret).hmacHex(pass);
    }
}
