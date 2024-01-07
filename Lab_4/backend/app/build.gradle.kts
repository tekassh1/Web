plugins {
    java
    war
}

group = "org.govnocode"
version = "1.0-SNAPSHOT"

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
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(17))
    }
}