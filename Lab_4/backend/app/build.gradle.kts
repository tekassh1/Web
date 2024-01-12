plugins {
    java
    war
}

group = "org.govnocode"

repositories {
    mavenCentral()
}

dependencies {
    implementation("com.google.guava:guava:32.1.1-jre")

    implementation("org.springframework:spring-core:6.1.2")
    implementation("org.springframework:spring-context:6.1.2")
    implementation("org.springframework:spring-web:6.1.2")
    implementation("org.springframework:spring-webmvc:6.1.2")
    implementation("org.springframework:spring-beans:6.1.2")

    compileOnly("jakarta.servlet:jakarta.servlet-api:6.0.0")

    implementation("com.fasterxml.jackson.core:jackson-databind:2.16.0")

    implementation("org.postgresql:postgresql:42.6.0")
    implementation("org.hibernate.orm:hibernate-core:6.3.1.Final")
    implementation("jakarta.persistence:jakarta.persistence-api:3.1.0")
    implementation("org.springframework.data:spring-data-commons:3.2.1")
    implementation("org.springframework.data:spring-data-jpa:3.2.1")

    implementation("org.apache.commons:commons-lang3:3.14.0")
    implementation("commons-codec:commons-codec:1.15")
    implementation("com.auth0:java-jwt:4.4.0")
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}