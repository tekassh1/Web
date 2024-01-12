package backend.config;

import backend.security.JWTInterceptor;
import backend.security.JWTProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableWebMvc
@Configuration
@Import(PersistenceConfig.class)
@PropertySource({"classpath:application.properties", "classpath:security.properties"})
@ComponentScan({"backend.controller", "backend.services", "backend.security"})
@EnableJpaRepositories(basePackages={"backend.repository"})
public class ApplicationConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedMethods("*")
                .maxAge(3600);
    }

    @Bean
    public JWTInterceptor jwtInterceptor() {
        return new JWTInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(jwtInterceptor()).addPathPatterns("/main");
    }
}