# Dockerfile for Spring Boot backend

# Build stage
FROM maven:3.9-eclipse-temurin-21

# Set the working directory
WORKDIR /backend

# Copy the generated JAR file from the builder stage
COPY /target/*.jar app.jar

# Expose the port that Spring Boot will run on
EXPOSE 8080

#install Spring Boot artifact
VOLUME /tmp

# Run the application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar", "app.jar"]