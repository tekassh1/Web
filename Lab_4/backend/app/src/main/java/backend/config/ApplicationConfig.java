package backend.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@Configuration
@Import(PersistenceConfig.class)
@PropertySource("classpath:application.properties")
@ComponentScan({"backend.controller"})
@EnableJpaRepositories(basePackages={"backend.repository"})
public class ApplicationConfig {}