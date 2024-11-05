# Dockerfile for Spring Boot backend

# Build stage
FROM maven:3.9-eclipse-temurin-21 AS builder

# Set the working directory
WORKDIR /backend

COPY . .
RUN mvn clean package -DskipTests

# Runtime stage
FROM eclipse-temurin:21-jdk-jammy

# Set the working directory
WORKDIR /backend

# Expose the port that Spring Boot will run on
EXPOSE 8080

#install Spring Boot artifact
VOLUME /tmp

# Copy the generated JAR file from the builder stage
COPY --from=builder /backend/target/*.jar busradar.jar

# Run the application
ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar", "busradar.jar"]