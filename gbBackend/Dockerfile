# ========= BUILD STAGE =========
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

# Copiamos primero el pom para cachear dependencias
COPY pom.xml .
RUN mvn -q -e -DskipTests dependency:go-offline

# Copiamos el código
COPY src ./src

# Construimos el jar
RUN mvn -q -DskipTests clean package

# ========= RUN STAGE =========
FROM eclipse-temurin:21-jre
WORKDIR /app

# Timezone (para evitar dramas y mantener coherencia)
ENV TZ=America/Argentina/Cordoba

# Copiamos el jar sin depender del nombre exacto
COPY --from=build /app/target/*.jar app.jar

EXPOSE 8080

# Ejecutamos Spring Boot
ENTRYPOINT ["java","-jar","/app/app.jar"]
