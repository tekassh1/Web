package backend.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan({"backend.controller", "backend.repository"})
public class ApplicationContextConfiguration {}